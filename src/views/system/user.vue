<template>
    <div class="user">
      <div class="search">
        <!--<div class="search-item">-->
          <!--<span>部门：</span>-->
          <!--<el-cascader-->
            <!--v-model="search.department"-->
            <!--:options="options"></el-cascader>-->
        <!--</div>-->
        <div class="search-item">
          <span>角色：</span>
          <el-select v-model="search.role" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
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
        <el-button type="primary" @click="searchUser">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary" @click="addUser">新增</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="primary">批量删除</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="userList"
            style="width: 100%">
            <el-table-column prop="yhmc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="jsmc" label="角色"></el-table-column>
            <!--<el-table-column prop="department" label="部门"></el-table-column>-->
            <el-table-column prop="XH" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editUser(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
            <div class="cardItem" v-for="(item, index) in userList" :key="index">
              <div class="userName">{{item.yhmc}}</div>
              <div class="infoWrapper">
                <div class="info-item">
                  <span class="info-key">代码</span>
                  <span class="info-value">{{item.dm}}</span>
                </div>
                <div class="info-item">
                  <span class="info-key">角色</span>
                  <span class="info-value">{{item.jsmc}}</span>
                </div>
                <div class="info-item">
                  <span class="info-key">序号</span>
                  <span class="info-value">{{item.XH}}</span>
                </div>
                <div class="info-item">
                  <span class="info-key">状态</span>
                  <span class="info-value">{{item.zt === 'Y' ? '使用' : '禁用'}}</span>
                </div>
              </div>
              <div class="card-btn">
                <el-button size="mini" type="success" @click="editUser(item)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteUser(item)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showUserDialog">
          <el-form :model="userForm" ref="UsersForm" :rules="userRules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="yhmc">
              <el-input type="text" v-model="userForm.yhmc"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input type="text" v-model="userForm.dm"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="mm">
              <el-input type="text" v-model="userForm.mm"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth" prop="jsmc">
              <el-select v-model="userForm.yhjsid" placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="XH">
              <el-input type="text" v-model="userForm.XH"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
              <el-select v-model="userForm.zt" placeholder="请选择">
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
import {getUserList, editUserItem, addUserItem, deleteUserItem} from '@/api/user'
import {getRoleTree} from '@/api/role'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'user',
  data () {
    return {
      listType: true,
      search: {
        // department: [],
        role: '',
        userName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      roles: [],
      userList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5,
      // 弹窗
      isAdd: true,
      showUserDialog: false,
      userForm: {
        yhmc: '',
        dm: '',
        mm: '',
        jsmc: '',
        XH: '',
        zt: '',
        yhid: '',
        yhjsid: []
      },
      userRules: {
        yhmc: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dm: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        mm: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
      return this.isAdd ? '用户增加' : '用户修改'
    }
  },
  created () {
    this._getUserList(this.pageSize, this.currentPage)
    // 获取搜索中角色列表
    getRoleTree('getRoleTree').then((res) => {
      if (res.errcode === ERR_CODE) {
        let roleList = res.list
        roleList.map((item) => {
          let roleItem = {}
          roleItem.label = item.mc
          roleItem.value = item.jsid
          this.roles.push(roleItem)
        })
      } else {
        return false
      }
    })
  },
  methods: {
    searchUser () {
      const searchParmas = JSON.parse(JSON.stringify(this.search))
      searchParmas.pageSize = this.pageSize
      searchParmas.pageCurrent = this.pageCurrent
      this._getSearchList(searchParmas)
    },
    deleteUser (rowData) {
      console.log(rowData)
      this._deleteUserInfo(rowData)
    },
    addUser () {
      this.showUserDialog = true
      this.isAdd = true
    },
    editUser (rowData) {
      console.log(rowData)
      this.userForm = JSON.parse(JSON.stringify(rowData))
      if (this.userForm.mm) {
        this.userForm.mm = '******'
      }
      this.showUserDialog = true
      this.isAdd = false
    },
    pageChange (val) {
      this._getUserList(this.pageSize, val)
    },
    cancelUserSet () {
      this.showUserDialog = false
      this.$refs.UsersForm.resetFields()
    },
    submitUserSet () {
      this.$refs.UsersForm.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this._addUserInfo(this.userForm)
          } else {
            this._editUserInfo(this.userForm)
          }
        } else {
          return false
        }
      })
    },
    _deleteUserInfo (params) {
      const deleteParams = {
        yhid: params.yhid,
        url: 'deleteUserInfo'
      }
      console.log(12)
      console.log(deleteParams)
      deleteUserItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUserList(this.pageSize, this.currentPage)
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
    _addUserInfo (params) {
      const addParams = {
        dm: params.dm,
        mm: params.mm,
        mc: params.yhmc,
        zt: params.zt,
        yhjsid: params.yhjsid,
        url: 'addUserInfo'
      }
      addUserItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUserList(this.pageSize, this.currentPage)
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
    _editUserInfo (params) {
      console.log(params)
      const editParams = {
        dm: params.dm,
        mm: params.mm,
        mc: params.yhmc,
        zt: params.zt,
        yhid: params.yhid,
        url: 'editUserInfo'
      }
      if (params.yhjsid) {
        editParams.yhjsid = params.yhjsid.split(',')
      }
      console.log(editParams)
      editUserItem(editParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getUserList(this.pageSize, this.currentPage)
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
    _getSearchList (searchParmas) {
      const getInfo = {
        mc: searchParmas.userName,
        jsid: searchParmas.role,
        zt: searchParmas.state,
        pageSize: searchParmas.pageSize,
        pageCurrent: searchParmas.currentPage,
        url: 'getUserInfo'
      }
      getUserList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.userList = res.rows
          this.total = res.totalCount
        }
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    _getUserList (pageSize, currentPage) {
      const getInfo = {
        pageSize: pageSize,
        pageCurrent: currentPage,
        url: 'getUserInfo'
      }
      console.log(getInfo)
      getUserList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.userList = res.rows
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
  @import "~common/stylus/mixin"
.user
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
