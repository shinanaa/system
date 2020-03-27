<template>
    <div class="plugin common">
      <div class="search">
        <div class="search-item">
          <span>模块</span>
          <el-select v-model="search.module" placeholder="请选择">
            <el-option v-for="item in moduleList" :key="item.mkid" :label="item.mc" :value="item.mkid"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>名称</span>
          <el-input v-model="search.moduleName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>状态</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchPlugin">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button @click="addPlugin" type="primary">新增</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="pluginList"
            style="width: 100%">
            <el-table-column prop="mc" label="模块"></el-table-column>
            <el-table-column prop="mcjc" label="简称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="mcqc" label="全称"></el-table-column>
            <el-table-column prop="dz" label="地址"></el-table-column>
            <el-table-column prop="tb" label="图标"></el-table-column>
            <el-table-column prop="xh" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editPlugin(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deletePlugin(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item, index) in pluginList" :key="index">
            <div class="userName">{{item.mcjc}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">全称</span>
                <span class="info-value">{{item.mcqc}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">模块</span>
                <span class="info-value">{{item.mc}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">地址</span>
                <span class="info-value">{{item.dz}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">代码</span>
                <span class="info-value">{{item.dm}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">图标</span>
                <span class="info-value">{{item.tb}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">序号</span>
                <span class="info-value">{{item.xh}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">状态</span>
                <span class="info-value">{{item.zt === 'Y' ? '使用' : '禁用'}}</span>
              </div>
            </div>
            <div class="card-btn">
              <el-button size="mini" type="success" @click="editPlugin(item)">修改</el-button>
              <el-button size="mini" type="danger" @click="deletePlugin(item)">删除</el-button>
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
      <div class="dialog">
        <el-dialog :title="dialogTitle" :visible.sync="showPluginDialog">
          <el-form :model="pluginForm" ref="pluginForm" :rules="pluginRules">
            <el-form-item label="简称" :label-width="formLabelWidth" prop="mcjc">
              <el-input type="text" v-model="pluginForm.mcjc"></el-input>
            </el-form-item>
            <el-form-item label="模块" :label-width="formLabelWidth" prop="mkid">
              <el-select v-model="pluginForm.mkid" placeholder="请选择">
                <el-option v-for="item in moduleList" :key="item.mkid" :label="item.mc" :value="item.mkid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="全称" :label-width="formLabelWidth" prop="mcqc">
              <el-input type="text" v-model="pluginForm.mcqc"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input type="text" v-model="pluginForm.dm"></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth" prop="tb">
              <el-input type="text" v-model="pluginForm.tb"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="dz">
              <el-input type="text" v-model="pluginForm.dz"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="xh">
              <el-input type="text" v-model="pluginForm.xh"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
              <el-select v-model="pluginForm.zt" placeholder="请选择">
                <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUserSet">取 消</el-button>
            <el-button type="primary" @click="submitUserSet">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getPluginList, addPluginItem, editPluginItem, getPluginItem} from '@/api/plugin'
import {getModuleTree} from '@/api/module'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'plugin',
  data () {
    return {
      listType: true,
      search: {
        module: '',
        moduleName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      moduleList: [],
      pluginList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5,
      // 弹窗
      isAdd: true,
      showPluginDialog: false,
      pluginForm: {
        mcjc: '',
        mkid: '',
        mcqc: '',
        dm: '',
        tb: '',
        dz: '',
        xh: '',
        zt: ''
      },
      pluginRules: {
        mkid: [
          { required: true, message: '模块不能为空', trigger: 'blur' }
        ],
        dm: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ]
      },
      formLabelWidth: '60px'
    }
  },
  computed: {
    stateDialog () {
      let stateDialog = JSON.parse(JSON.stringify(this.states))
      stateDialog.shift()
      return stateDialog
    },
    dialogTitle () {
      return this.isAdd ? '功能增加' : '功能修改'
    }
  },
  created () {
    this._getPluginList(this.search)
    getModuleTree('getModuleTree', 'Y').then((res) => {
      if (res.errcode === ERR_CODE) {
        console.log(res)
        this.moduleList = res.list
      } else {
        return false
      }
    })
  },
  methods: {
    searchPlugin () {
      this._getPluginList(this.search)
    },
    deletePlugin (rowData) {
      console.log(rowData)
      this._deletePluginInfo(rowData)
    },
    editPlugin (rowData) {
      this._getPluginItem(rowData.gnid)
      this.showPluginDialog = true
      this.isAdd = false
    },
    addPlugin () {
      this.showPluginDialog = true
      this.isAdd = true
    },
    pageChange (val) {
      this.currentPage = val
      this._getPluginList(this.search)
    },
    cancelUserSet () {
      this.showPluginDialog = false
      this.$refs.pluginForm.resetFields()
    },
    submitUserSet () {
      this.$refs.pluginForm.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            console.log('tianjai')
            this._addPluginInfo(this.pluginForm)
          } else {
            console.log('xiugai')
            this._editPluginInfo(this.pluginForm)
          }
        } else {
          return false
        }
      })
    },
    _deletePluginInfo (params) {
      const deleteParams = {
        gnid: params.gnid,
        url: 'deletePluginInfo'
      }
      getPluginItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getPluginList(this.search)
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
        console.log(res)
      })
    },
    _addPluginInfo (params) {
      const addParams = {
        mkid: params.mkid,
        mcjc: params.mcjc,
        dm: params.dm,
        mcqc: params.mcqc,
        dz: params.dz,
        tb: params.tb,
        xh: params.xh,
        zt: params.zt,
        url: 'addPluginInfo'
      }
      addPluginItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getPluginList(this.search)
        } else {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _editPluginInfo (params) {
      console.log(params)
      const editParams = {
        mcjc: params.mcjc,
        dm: params.dm,
        mcqc: params.mcqc,
        dz: params.dz,
        tb: params.tb,
        xh: params.xh,
        zt: params.zt,
        mkid: params.mkid,
        gnid: params.gnid,
        url: 'editPluginInfo'
      }
      editPluginItem(editParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          console.log(this.currentPage)
          this._getPluginList(this.search)
        } else {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getPluginItem (gnid) {
      const getInfo = {
        gnid,
        url: 'getPluginById'
      }
      getPluginItem(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.pluginForm = res.list[0]
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getPluginList (params) {
      const getInfo = {
        mkid: params.module,
        mcjc: params.moduleName,
        zt: params.state,
        pageSize: this.pageSize,
        pageCurrent: this.currentPage,
        url: 'getPluginInfo'
      }
      getPluginList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.pluginList = res.rows
          this.total = res.totalCount
        }
        console.log(res)
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
