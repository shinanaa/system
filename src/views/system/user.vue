<template>
    <div class="user common">
      <div class="search">
        <div class="search-item">
          <span>部门：</span>
          <!--<el-cascader-->
            <!--v-model="search.department"-->
            <!--:options="departments"></el-cascader>-->
          <div style="display: inline-block;padding: 5px 10px;background: #ffffff;">
            <el-tree
              :data="departments"
              :props="departmentTree"
              :expand-on-click-node="false"
              ref="departmentTree"
              highlight-current
              node-key="value"></el-tree>
          </div>
        </div>
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
            <el-table-column prop="bmmc" label="部门"></el-table-column>
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
                  <span class="info-key">部门</span>
                  <span class="info-value">{{item.bmmc}}</span>
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
            <el-form-item label="名称" :label-width="formLabelWidth" prop="mc">
              <el-input type="text" v-model="userForm.mc"></el-input>
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
            <el-form-item label="部门" :label-width="formLabelWidth" prop="XH">
              <el-tree :data="departments" :props="departmentsTree" show-checkbox ref="departmentsTree" node-key="value"></el-tree>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="XH">
              <el-input type="text" v-model="userForm.xh"></el-input>
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
import {getUserList, editUserItem, addUserItem, deleteUserItem, getUserItem} from '@/api/user'
import {getRoleList, getUserDepartmentTree} from '@/api/treeAndList'
import {ERR_CODE} from 'common/js/config'
export default {
  name: 'user',
  data () {
    return {
      listType: true,
      search: {
        department: [],
        role: '',
        userName: '',
        state: ''
      },
      departments: [],
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
        mc: '',
        dm: '',
        mm: '',
        xh: '',
        zt: '',
        yhid: '',
        yhjsid: []
      },
      departmentTree: {
        label: 'label',
        children: 'children'
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
      departmentsTree: {
        label: 'label',
        children: 'children'
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
  async created () {
    this._getUserList(this.search)
    // 获取搜索中角色列表
    getRoleList(this.roles)
    // 获取搜索中的部门列表
    this.departments = await getUserDepartmentTree()
  },
  methods: {
    searchUser () {
      this._getUserList(this.search)
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
      this.showUserDialog = true
      this.isAdd = false
      this._getUserItem(rowData.yhid)
    },
    pageChange (val) {
      this.currentPage = val
      this._getUserList(this.search)
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
          this._getUserList(this.search)
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
      console.log(params)
      const checkArr = this.$refs.departmentsTree.getCheckedNodes()
      console.log(checkArr)
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
          this._getUserList(this.search)
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
          this._getUserList(this.search)
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
    _getUserItem (userId) {
      const getInfo = {
        userId,
        url: 'getUserById'
      }
      getUserItem(getInfo).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          // 将返回的值赋值给表单
          // if (this.userForm.mm) {
          //   this.userForm.mm = '******'
          // }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getUserList (params) {
      const getInfo = {
        mc: params.userName,
        jsid: params.role,
        zt: params.state,
        pageSize: this.pageSize,
        pageCurrent: this.currentPage,
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
  @import "~common/stylus/common"
</style>
