<template>
  <div class="role common">
    <div class="search">
      <div class="search-item">
        <span>名称</span>
        <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
      </div>
      <div class="search-item">
        <span>状态</span>
        <el-select v-model="search.state" placeholder="请选择">
          <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="searchRoles">查询</el-button>
    </div>
    <div class="table-wrapper">
      <div class="table-btn">
        <div class="btn-handle">
          <el-button @click="addRole" type="primary">新增</el-button>
        </div>
        <div class="btn-change">
          <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
          <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
        </div>
      </div>
      <div v-if="listType" class="table-main">
        <el-table
          :data="roleList"
          style="width: 100%">
          <el-table-column prop="mc" label="名称"></el-table-column>
          <el-table-column prop="dm" label="代码"></el-table-column>
          <el-table-column prop="xh" label="序号"></el-table-column>
          <el-table-column prop="zt" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.zt === 'Y' ? '使用' : '禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="editRole(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteRole(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="!listType" class="card-mian">
        <div class="cardItem" v-for="(item, index) in roleList" :key="index">
          <div class="userName">{{item.mc}}</div>
          <div class="infoWrapper">
            <div class="info-item">
              <span class="info-key">代码</span>
              <span class="info-value">{{item.dm}}</span>
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
            <el-button size="mini" type="success" @click="editRole(item)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteRole(item)">删除</el-button>
          </div>
        </div>
      </div>
      <el-pagination
        :page-size="pageSize"
        @current-change="pageChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="showRoleDialog">
        <el-form :model="roleForm" ref="roleForm" :rules="moduleRules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="mc">
            <el-input type="text" v-model="roleForm.mc"></el-input>
          </el-form-item>
          <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
            <el-input type="text" v-model="roleForm.dm"></el-input>
          </el-form-item>
          <el-form-item label="序号" :label-width="formLabelWidth" prop="xh">
            <el-input type="text" v-model="roleForm.xh"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
            <el-select v-model="roleForm.zt" placeholder="请选择">
              <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!--级联选择 多选-->
          <!--<el-form-item label="功能" :label-width="formLabelWidth">
            <el-cascader
            v-model="roleForm.jsgnid"
            :options="plugins"
            :props="props"></el-cascader>
          </el-form-item>-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="功能" :label-width="formLabelWidth">
                <el-tree :data="plugins" :props="pluginTree" show-checkbox ref="pluginTree" node-key="value"></el-tree>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户" :label-width="formLabelWidth">
                <el-tree :data="userIds" :props="userTree" show-checkbox ref="userTree" node-key="value"></el-tree>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRoleSet">取 消</el-button>
          <el-button type="primary" @click="submitRoleSet">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getRoleList, addRoleItem, editRoleItem, getRoleItem} from '@/api/role'
import {getDepartmentPersonTree, getPluginTree} from '@/api/treeAndList'
import {ERR_CODE} from 'common/js/config'
import {pagingMixin} from 'common/js/mixin'
export default {
  name: 'role',
  mixins: [pagingMixin],
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
      roleList: [],
      // 弹窗
      isAdd: true,
      showRoleDialog: false,
      roleForm: {
        mc: '',
        dm: '',
        xh: '',
        zt: '',
        jsid: '',
        jsgnid: [],
        userids: []
      },
      moduleRules: {
        mc: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dm: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ]
      },
      userIds: [],
      plugins: [],
      pluginTree: {
        label: 'label',
        children: 'children'
      },
      userTree: {
        label: 'label',
        children: 'children'
      },
      props: {
        multiple: true
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
      return this.isAdd ? '角色增加' : '角色修改'
    }
  },
  created () {
    this._getRoleList(this.search)
  },
  methods: {
    searchRoles () {
      this._getRoleList(this.search)
    },
    deleteRole (rowData) {
      console.log(rowData)
      this._deleteRoleInfo(rowData.jsid)
    },
    editRole (rowData) {
      this._getTreeList()
      this._getRoleItem(rowData.jsid)
      this.showRoleDialog = true
      this.isAdd = false
    },
    addRole () {
      this._getTreeList()
      this.showRoleDialog = true
      this.isAdd = true
    },
    pageChange (val) {
      this.currentPage = val
      this._getRoleList(this.search)
    },
    cancelRoleSet () {
      this.showRoleDialog = false
      this.$refs.roleForm.resetFields()
      this.$refs.pluginTree.setCheckedNodes([])
    },
    submitRoleSet () {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          const checkArr = this.$refs.pluginTree.getCheckedNodes()
          this.roleForm.jsgnid = []
          checkArr.filter((item) => {
            // 后端添加模块的isgn字段后，与用户过滤的方法统一封装
            if (item.isgn !== undefined) {
              this.roleForm.jsgnid.push(item.value)
            }
          })
          const userArr = this.$refs.userTree.getCheckedNodes()
          this.roleForm.userids = []
          userArr.filter((item) => {
            if (item.isPerson) {
              this.roleForm.userids.push(item.value)
            }
          })
          if (this.isAdd) {
            this._addRoleInfo(this.roleForm)
          } else {
            this._editModuleInfo(this.roleForm)
          }
        } else {
          return false
        }
      })
    },
    async _getTreeList () {
      // 去除掉若存在不获取的判断，防止数据更新后不获取
      this.userIds = await getDepartmentPersonTree('getDepartmentPersonTree')
      this.plugins = await getPluginTree()
    },
    _deleteRoleInfo (jsid) {
      const deleteParams = {
        jsid,
        url: 'deleteRoleInfo'
      }
      getRoleItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getRoleList(this.search)
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
    _addRoleInfo (params) {
      const addParams = {
        mc: params.mc,
        dm: params.dm,
        xh: params.xh,
        zt: params.zt,
        jsgnid: params.jsgnid,
        userids: params.userids,
        url: 'addRoleInfo'
      }
      addRoleItem(addParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.cancelRoleSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getRoleList(this.search)
        } else {
          this.cancelRoleSet()
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
      const editParams = {
        mc: params.mc,
        dm: params.dm,
        xh: params.xh,
        zt: params.zt,
        jsid: params.jsid,
        jsgnid: params.jsgnid,
        userids: params.userids,
        url: 'editRoleInfo'
      }
      editRoleItem(editParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.cancelRoleSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getRoleList(this.search)
        } else {
          this.cancelRoleSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getRoleItem (jsid) {
      const getInfo = {
        jsid,
        url: 'getRoleById'
      }
      getRoleItem(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(res.list[0])
          const role = res.list[0].role[0]
          this.roleForm.mc = role.mc
          this.roleForm.dm = role.dm
          this.roleForm.xh = role.xh
          this.roleForm.zt = role.zt
          this.roleForm.jsid = role.jsid
          this.$refs.pluginTree.setCheckedKeys(res.list[0].gnids)
          this.$refs.userTree.setCheckedKeys(res.list[0].userids)
          console.log(this.roleForm)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getRoleList (params) {
      const getInfo = {
        mc: params.userName,
        zt: params.state,
        pageSize: this.pageSize,
        pageCurrent: this.currentPage,
        url: 'getRoleInfo'
      }
      getRoleList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.roleList = res.rows
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
