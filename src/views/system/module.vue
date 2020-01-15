<template>
    <div class="module common">
      <div class="search">
        <div class="search-item">
          <span>名称：</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <span>状态：</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchModule">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button @click="addModule" type="primary">新增</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="moduleList"
            style="width: 100%">
            <el-table-column prop="mc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="tb" label="图标"></el-table-column>
            <el-table-column prop="xh" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editModule(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteModule(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item, index) in moduleList" :key="index">
            <div class="userName">{{item.mc}}</div>
            <div class="infoWrapper">
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
              <el-button size="mini" type="success" @click="editModule(item)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteModule(item)">删除</el-button>
            </div>
          </div>
        </div>
        <el-pagination
          hide-on-single-page
          :current-page="currentPage"
          @current-change="pageChange"
          layout="total, prev, pager, next, jumper"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
      <div class="dialog">
        <el-dialog :title="dialogTitle" :visible.sync="showUserDialog">
          <el-form :model="moduleForm" ref="moduleForm" :rules="moduleRules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="mc">
              <el-input type="text" v-model="moduleForm.mc"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input type="text" v-model="moduleForm.dm"></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth" prop="tb">
              <el-input type="text" v-model="moduleForm.tb"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="xh">
              <el-input type="text" v-model="moduleForm.xh"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
              <el-select v-model="moduleForm.zt" placeholder="请选择">
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
import {getModuleList, addModuleItem, editModuleItem, getMoudleItem} from '@/api/module'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'module',
  data () {
    return {
      listType: true,
      search: {
        userName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      moduleList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5,
      // 弹窗
      isAdd: true,
      showUserDialog: false,
      moduleForm: {
        mc: '',
        dm: '',
        tb: '',
        xh: '',
        zt: ''
      },
      moduleRules: {
        mc: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
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
      return this.isAdd ? '模块增加' : '模块修改'
    }
  },
  created () {
    this._getModuleList(this.search)
  },
  methods: {
    pageChange (val) {
      this.currentPage = val
      this._getModuleList(this.search)
    },
    searchModule () {
      this._getModuleList(this.search)
    },
    deleteModule (rowData) {
      console.log(rowData)
      this._deleteModuleInfo(rowData)
    },
    editModule (rowData) {
      this._getModuleItem(rowData)
      // this.moduleForm = JSON.parse(JSON.stringify(rowData))
      this.showUserDialog = true
      this.isAdd = false
    },
    addModule () {
      this.showUserDialog = true
      this.isAdd = true
    },
    cancelUserSet () {
      this.showUserDialog = false
      this.$refs.moduleForm.resetFields()
    },
    submitUserSet () {
      this.$refs.moduleForm.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this._addModuleInfo(this.moduleForm)
          } else {
            this._editModuleInfo(this.moduleForm)
          }
        } else {
          return false
        }
      })
    },
    _deleteModuleInfo (params) {
      const deleteParams = {
        mkid: params.mkid,
        url: 'deleteModuleInfo'
      }
      getMoudleItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getModuleList(this.search)
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
    _addModuleInfo (params) {
      console.log(params)
      const addParams = {
        dm: params.dm,
        tb: params.tb,
        mc: params.mc,
        zt: params.zt,
        xh: params.xh,
        url: 'addModuleInfo'
      }
      addModuleItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getModuleList(this.search)
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
    _editModuleInfo (params) {
      console.log(params)
      const editParams = {
        mc: params.mc,
        dm: params.dm,
        tb: params.tb,
        xh: params.xh,
        zt: params.zt,
        mkid: params.mkid,
        url: 'editModuleInfo'
      }
      editModuleItem(editParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getModuleList(this.search)
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
    _getModuleItem (params) {
      const getInfo = {
        mkid: params.mkid,
        url: 'getModuleById'
      }
      getMoudleItem(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.moduleForm = res.list[0]
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getModuleList (params) {
      const getInfo = {
        mc: params.userName,
        zt: params.state,
        pageSize: this.pageSize,
        pageCurrent: this.currentPage,
        url: 'getModuleInfo'
      }
      getModuleList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.moduleList = res.rows
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

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/common"
</style>
