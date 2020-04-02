<template>
    <div class="department common">
      <div class="search">
        <div class="search-item">
          <span>名称</span>
          <el-input v-model="search.userName" placeholder="请输入内容"></el-input>
        </div>
      <div class="search-item">
        <span>代码</span>
        <el-input v-model="search.code" placeholder="请输入代码"></el-input>
      </div>
        <div class="search-item">
          <span>状态</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchDepartment">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary" @click="addDepartment">新增</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="departmentList"
            style="width: 100%">
            <el-table-column prop="mc" label="名称"></el-table-column>
            <el-table-column prop="dm" label="代码"></el-table-column>
            <el-table-column prop="sjbmmc" label="上级部门"></el-table-column>
            <el-table-column prop="jb" label="级别"></el-table-column>
            <el-table-column prop="xh" label="序号"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.zt === 'Y'">使用</span>
                <span v-if="scope.row.zt === 'N'">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editDepartment(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteDepartment(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item, index) in departmentList" :key="index">
            <div class="userName">{{item.mc}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">代码</span>
                <span class="info-value">{{item.dm}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">上级部门</span>
                <span class="info-value">{{item.sjbmmc}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">级别</span>
                <span class="info-value">{{item.jb}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">序号</span>
                <span class="info-value">{{item.xh}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">状态</span>
                <span v-if="item.zt === 'Y'">使用</span>
                <span v-if="item.zt === 'N'">禁用</span>
              </div>
            </div>
            <div class="card-btn">
              <el-button size="mini" type="success" @click="editDepartment(item)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteDepartment(item)">删除</el-button>
            </div>
          </div>
        </div>
        <el-pagination
          @current-change="pageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="dialog">
        <el-dialog :title="dialogTitle" :visible.sync="showDepartmentDialog">
          <el-form :model="departmentForm" ref="departmentForm" :rules="departmentRules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="mc">
              <el-input type="text" v-model="departmentForm.mc"></el-input>
            </el-form-item>
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input type="text" v-model="departmentForm.dm"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="上级部门" :label-width="formLabelWidth" prop="contacts">
                  <el-tree
                    :data="departments"
                    :props="departmentTree"
                    :expand-on-click-node="false"
                    ref="departmentTree"
                    highlight-current
                    node-key="value"></el-tree>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="级别" :label-width="formLabelWidth" prop="tel">
                  <el-select v-model="departmentForm.jb" placeholder="请选择">
                    <el-option v-for="item in level" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="序号" :label-width="formLabelWidth" prop="order">
                  <el-input type="text" v-model="departmentForm.xh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
                  <el-select v-model="departmentForm.zt" placeholder="请选择">
                    <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUserSet">取 消</el-button>
            <el-button type="primary" @click="submitDepartmentSet">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getDepartmentList, addDepartmentItem, editDepartmentItem, getDepartmentItem} from '@/api/department'
import {getDepartmentTree} from '@/api/treeAndList'
import {ERR_CODE} from 'common/js/config'
import {pagingMixin} from 'common/js/mixin'
export default {
  name: 'department',
  mixins: [pagingMixin],
  data () {
    return {
      listType: true,
      search: {
        code: '',
        userName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: 'N', label: '停用'},
        {value: 'Y', label: '使用'}
      ],
      departmentList: [],
      // 弹窗
      isAdd: true,
      showDepartmentDialog: false,
      departmentForm: {
        mc: '',
        dm: '',
        jb: '',
        xh: '',
        zt: ''
      },
      level: [
        {value: '1', label: '一级'},
        {value: '2', label: '二级'},
        {value: '3', label: '三级'},
        {value: '4', label: '四级'},
        {value: '5', label: '五级'}
      ],
      departments: [], // 部门树
      departmentTree: {
        label: 'label',
        children: 'children'
      },
      departmentRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  computed: {
    stateDialog () {
      let stateDialog = JSON.parse(JSON.stringify(this.states))
      stateDialog.shift()
      return stateDialog
    },
    dialogTitle () {
      return this.isAdd ? '部门增加' : '部门修改'
    }
  },
  created () {
    this._getDepartmentList(this.search)
  },
  methods: {
    pageChange (val) {
      this.currentPage = val
      this._getDepartmentList(this.search)
    },
    async editDepartment (item) {
      this.isAdd = false
      this.showDepartmentDialog = true
      this.departments = await getDepartmentTree()
      this._getDepartmentItem(item.bmid)
    },
    deleteDepartment (item) {
      console.log(item)
      this._deleteDepartmentInfo(item.bmid)
    },
    async addDepartment () {
      this.departments = await getDepartmentTree()
      this.showDepartmentDialog = true
      this.isAdd = true
    },
    cancelUserSet () {
      this.showDepartmentDialog = false
      this.$refs.departmentForm.resetFields()
      this.$refs.departmentTree.setCheckedNodes([])
    },
    submitDepartmentSet () {
      this.$refs.departmentForm.validate(valid => {
        if (valid) {
          this.departmentForm.heightDepartment = this.$refs.departmentTree.getCurrentNode().value
          console.log(this.departmentForm)
          if (this.isAdd) {
            this._addDepartmentInfo(this.departmentForm)
          } else {
            this._editDepartmentInfo(this.departmentForm)
          }
        } else {
          return false
        }
      })
    },
    searchDepartment () {
      this._getDepartmentList(this.search)
    },
    _deleteDepartmentInfo (bmid) {
      const deleteParams = {
        bmid,
        url: 'deleteDepartmentInfo'
      }
      getDepartmentItem(deleteParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getDepartmentList(this.search)
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _addDepartmentInfo (params) {
      const addParams = params
      addParams.url = 'addDepartmentInfo'
      addDepartmentItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getDepartmentList(this.search)
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
    _editDepartmentInfo (params) {
      const editParams = params
      editParams.url = 'editDepartmentInfo'
      editDepartmentItem(editParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.cancelUserSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getDepartmentList(this.search)
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
    _getDepartmentItem (bmid) {
      const getInfo = {
        bmid,
        url: 'getDepartmentById'
      }
      getDepartmentItem(getInfo).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          console.log(res)
          this.departmentForm = res.list[0]
          this.$refs.departmentTree.setCurrentKey(this.departmentForm.sjbmid)
          console.log(this.departmentForm)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getDepartmentList (params) {
      console.log(params)
      const getInfo = {
        mc: params.userName,
        dm: params.code,
        zt: params.state,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        url: 'getDepartmentInfo'
      }
      getDepartmentList(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          console.log(res)
          this.departmentList = res.rows
          this.total = res.totalCount
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common"
</style>
