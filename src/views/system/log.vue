<template>
    <div class="log common">
      <div class="search">
        <div class="search-item">
          <span>类型：</span>
          <el-select v-model="search.type" placeholder="请选择">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>用户：</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>日期：</span>
          <el-date-picker
            v-model="search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button type="primary" @click="searchLog">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="logList"
            style="width: 100%">
            <el-table-column prop="rq" label="日期"></el-table-column>
            <el-table-column prop="sj" label="时间"></el-table-column>
            <el-table-column prop="dz" label="地址"></el-table-column>
            <el-table-column prop="yh" label="用户"></el-table-column>
            <el-table-column prop="lx" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.lx === '1'">登录日志</span>
                <span v-if="scope.row.lx === '2'">操作日志</span>
              </template>
            </el-table-column>
            <el-table-column prop="nr" label="内容"></el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item) in logList" :key="item.rzid">
            <div class="userName">{{item.yh}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">日期</span>
                <span class="info-value">{{item.rq}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">地址</span>
                <span class="info-value">{{item.dz}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">类型</span>
                <span class="info-value"  v-if="item.lx === '1'">登录日志</span>
                <span class="info-value"  v-if="item.lx === '2'">操作日志</span>
              </div>
              <div class="info-item">
                <span class="info-key">内容</span>
                <span class="info-value">{{item.zt === 'Y' ? '使用' : '禁用'}}</span>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          hide-on-single-page
          @current-change="pageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import {getLogList} from '@/api/log'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'log',
  data () {
    return {
      listType: true,
      types: [
        {value: '1', label: '登录日志'},
        {value: '2', label: '操作日志'}
      ],
      search: {
        userName: '',
        type: '',
        date: ''
      },
      logList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  created () {
    this._getLogList(this.search)
  },
  methods: {
    searchLog () {
      this._getLogList(this.search)
    },
    pageChange (val) {
      this.currentPage = val
      this._getLogList(this.search)
    },
    _dateAdd0 (time) {
      if (time < 10) {
        time = `0${time}`
      }
      return time
    },
    _changeData (date) {
      return date.getFullYear() + '-' + this._dateAdd0(date.getMonth() + 1) + '-' + this._dateAdd0(date.getDate())
    },
    _getLogList (params) {
      if (this.search.date) {
        if (this.search.date.length) {
          let dateStart = new Date(this.search.date[0])
          let dateEnd = new Date(this.search.date[1])
          this.search.dateStart = this._changeData(dateStart)
          this.search.dateEnd = this._changeData(dateEnd)
        } else {
          this.search.dateStart = ''
          this.search.dateEnd = ''
        }
      } else {
        this.search.dateStart = ''
        this.search.dateEnd = ''
      }
      const getInfo = {
        lx: params.type,
        yh: params.userName,
        ksrq: params.dateStart,
        jsrq: params.dateEnd,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        url: 'getLogInfo'
      }
      getLogList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(res)
          this.total = res.totalCount
          this.logList = res.rows
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common"
</style>
