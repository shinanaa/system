<template>
  <div class="plugin common">
    <div class="search">
      <div class="search-item">
        <span>名称</span>
        <el-input v-model="search.wheelName" placeholder="请输入内容"></el-input>
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
          <el-button @click="addWheel" type="primary">新增</el-button>
        </div>
        <div class="btn-change">
          <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
          <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
        </div>
      </div>
      <div v-if="listType" class="table-main">
        <el-table
          :data="wheelList"
          style="width: 100%">
          <el-table-column prop="mc" label="名称"></el-table-column>
          <el-table-column prop="dm" label="代码"></el-table-column>
          <el-table-column prop="xh" label="序号"></el-table-column>
          <el-table-column prop="zt" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.zt === '1'">编辑</span>
              <span v-if="scope.row.zt === '2'">发布</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="editWheel(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteWheel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="!listType" class="card-mian">
        <div class="cardItem" v-for="(item, index) in wheelList" :key="index">
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
              <span class="info-value">{{item.zt === 'Y' ? '使用' : '停用'}}</span>
            </div>
          </div>
          <div class="card-btn">
            <el-button size="mini" type="success" @click="editWheel(item)">修改</el-button>
            <el-button size="mini" type="danger" @click="deletePlugin(item)">删除</el-button>
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
      <el-dialog :title="dialogTitle" :visible.sync="showDialog" :before-close="cancelSet">
        <el-form :model="wheelForm" ref="wheelForm" :rules="wheelRules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="mc">
            <el-input type="text" v-model="wheelForm.mc"></el-input>
          </el-form-item>
          <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
            <el-input type="text" v-model="wheelForm.dm"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth" prop="tpwj">
            <el-upload
              class="img-uploader"
              action="#"
              :http-request="imgUpload"
              :show-file-list="false">
              <img v-if="wheelForm.tpwj" :src="wheelForm.tpwj" class="img">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="序号" :label-width="formLabelWidth" prop="xh">
                <el-input type="text" v-model="wheelForm.xh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="zt">
                <el-select v-model="wheelForm.zt" placeholder="请选择">
                  <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelSet">取 消</el-button>
          <el-button type="primary" @click="submitSet">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getCrouselInfo, addCrouselItem, editCrouselItem, deleteCrouselItem, getCrouselItem, uploadFile} from '@/api/carousel'
import {ERR_CODE} from 'common/js/config'
import {getToken} from 'common/js/cache'
import {pagingMixin} from 'common/js/mixin'
export default {
  name: 'carousel',
  mixins: [pagingMixin],
  data () {
    return {
      listType: true,
      search: {
        wheelName: '',
        state: ''
      },
      states: [
        {value: '', label: '全部'},
        {value: '1', label: '编辑'},
        {value: '2', label: '发布'}
      ],
      wheelList: [],
      // 弹窗
      isAdd: true,
      showDialog: false,
      wheelForm: {
        mc: '',
        dm: '',
        tpwj: '',
        xh: '',
        zt: ''
      },
      wheelRules: {
        mc: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dm: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        tpwj: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ],
        zt: [
          { required: true, message: '状态不能为空', trigger: 'change' }
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
      return this.isAdd ? '轮播增加' : '轮播修改'
    }
  },
  created () {
    this._getWheelList({search: this.search, page: 1})
  },
  methods: {
    imgUpload (content) {
      let url = 'uploadImg'
      this._noticeUpload(content.file, url)
    },
    _noticeUpload (file, url) {
      let ImgData = new FormData()
      ImgData.append('upfile', file)
      ImgData.append('fileType', 'imageFile')
      ImgData.append('authorization', getToken())
      console.log(ImgData)
      uploadFile(ImgData, url).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.wheelForm.tpwj = res.dz
          this.$refs.wheelForm.validateField('tpwj')
        }
      })
    },
    searchPlugin () {
      this._getWheelList({search: this.search, page: 1})
    },
    deleteWheel (rowData) {
      console.log(rowData)
      this._deleteWheelInfo(rowData)
    },
    editWheel (rowData) {
      this._getWheelItem(rowData.lbid)
      this.showDialog = true
      this.isAdd = false
    },
    addWheel () {
      this.showDialog = true
      this.isAdd = true
    },
    pageChange (val) {
      this.currentPage = val
      this._getWheelList({search: this.search})
    },
    cancelSet () {
      this.showDialog = false
      this.$refs.wheelForm.resetFields()
    },
    submitSet () {
      this.$refs.wheelForm.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            console.log('tianjai')
            this._addWheelInfo(this.wheelForm)
          } else {
            console.log('xiugai')
            this._editWheelInfo(this.wheelForm)
          }
        } else {
          return false
        }
      })
    },
    _deleteWheelInfo (params) {
      const deleteParams = {
        lbid: params.lbid,
        url: 'deleteCarouselInfo'
      }
      deleteCrouselItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getWheelList({search: this.search})
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
    _addWheelInfo (params) {
      const addParams = {
        mc: params.mc,
        dm: params.dm,
        tpwj: params.tpwj,
        xh: params.xh,
        zt: params.zt,
        url: 'addCarouselInfo'
      }
      addCrouselItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getWheelList({search: this.search})
        } else {
          this.cancelSet()
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
    _editWheelInfo (params) {
      console.log(params)
      const editParams = {
        mc: params.mc,
        dm: params.dm,
        tpwj: params.tpwj,
        xh: params.xh,
        zt: params.zt,
        lbid: params.lbid,
        url: 'editCarouselInfo'
      }
      editCrouselItem(editParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getWheelList({search: this.search})
        } else {
          this.cancelSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _getWheelItem (lbid) {
      const getInfo = {
        lbid: lbid,
        url: 'getCarouselById'
      }
      getCrouselItem(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          const wheelItem = res.list[0]
          console.log(wheelItem)
          this.wheelForm = JSON.parse(JSON.stringify(wheelItem))
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getWheelList ({search, page = this.currentPage}) {
      const getInfo = {
        mc: search.wheelName,
        zt: search.state,
        pageSize: this.pageSize,
        pageCurrent: page,
        url: 'getCarouselInfo'
      }
      getCrouselInfo(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.wheelList = res.rows
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
  .dialog
    .img-uploader
      /deep/  .el-upload
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
        &:hover
          border-color: #409EFF;
    .avatar-uploader-icon
      width: 178px
      height: 178px
      line-height: 178px
      display: block
    .img
      width: 175px
      height: 175px
      display: block
</style>
