<template>
    <div class="log">
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
    _changeData (date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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
  @import "~common/stylus/mixin"
  .log
    padding: 0 35px
    margin-top: 133px
    .search
      .search-item
        display: inline-block
        margin-right: 15px
        padding: 20px 0
        span
          color: #606266
        .el-input
          width: auto
    .table-wrapper
      background: #FFFFFF
      border-radius: 8px
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
      .table-btn
        padding: 15px 20px
        clearfix()
        .btn-handle
          float: left
        .btn-change
          float: right
          margin-top: 5px
          font-size: 28px
          color: #606266
          .active
            color: #409eff
      .table-main
      .card-mian
        clearfix()
        .cardItem
          float: left
          padding: 15px 2.5%
          margin-left: 4%
          margin-bottom: 20px
          width: 20%
          box-sizing: border-box
          background-color: #f2f6fc
          border-radius: 15px
          .userName
            line-height: 38px
            font-size: 17px
            text-align: center
            color: #606266
            border-bottom: 1px solid #909399
          .info-item
            margin-top: 15px
            font-size: 15px
            .info-key
              display: inline-block
              margin-right: 10px
              width: 70px
              height: 30px
              line-height: 30px
              text-align: center
              background: #FFFFFF
              box-shadow: 0px 0px 5px 0px rgba(76, 112, 161, 0.5)
              border-radius: 3px
            .info-value
              textOverflow(calc(100% - 85px))
        .card-btn
          heihgt: 70px
          line-height: 70px
      .el-pagination
        padding: 15px 20px
</style>
