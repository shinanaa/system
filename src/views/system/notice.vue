<template>
    <div class="notice">
      <div class="search">
        <div class="search-item">
          <span>类型：</span>
          <el-select v-model="search.type" placeholder="请选择">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>标题：</span>
          <el-input v-model="search.title" placeholder="请输入文章标题"></el-input>
        </div>
        <div class="search-item">
          <span>状态：</span>
          <el-select v-model="search.state" placeholder="请选择">
            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="searchNotice">查询</el-button>
      </div>
      <div class="table-wrapper">
        <div class="table-btn">
          <div class="btn-handle">
            <el-button type="primary" @click="addNotice">新增</el-button>
          </div>
          <div class="btn-change">
            <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
            <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
          </div>
        </div>
        <div v-if="listType" class="table-main">
          <el-table
            :data="noticeList"
            style="width: 100%">
            <el-table-column prop="lx" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.lx === '1'">通知</span>
                <span v-if="scope.row.lx === '2'">公告</span>
              </template>
            </el-table-column>
            <el-table-column prop="bt" label="标题"></el-table-column>
            <el-table-column prop="fbsj" label="发布时间"></el-table-column>
            <el-table-column prop="fbyhmc" label="发布人"></el-table-column>
            <el-table-column prop="zt" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.zt === '1'">编辑</span>
                <span v-if="scope.row.zt === '2'">发布</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="seeNotice(scope.row)" v-if="scope.row.zt === '2'">查看</el-button>
                <el-button size="mini" type="success" @click="editNotice(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteNotice(scope.row)" v-if="scope.row.zt === '1'">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!listType" class="card-mian">
          <div class="cardItem" v-for="(item, index) in noticeList" :key="index">
            <div class="userName">{{item.bt}}</div>
            <div class="infoWrapper">
              <div class="info-item">
                <span class="info-key">类型</span>
                <span class="info-value">{{item.lx}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">发布时间</span>
                <span class="info-value">{{item.fbsj}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">发布人</span>
                <span class="info-value">{{item.fbyhmc}}</span>
              </div>
              <div class="info-item">
                <span class="info-key">状态</span>
                <span class="info-value" v-if="item.zt === '1'">编辑</span>
                <span class="info-value" v-if="item.zt === '2'">发布</span>
              </div>
            </div>
            <div class="card-btn">
              <el-button size="mini" type="primary" @click="seeNotice(item)" v-if="item.zt === '2'">查看</el-button>
              <el-button size="mini" type="success" @click="editNotice(item)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteNotice(item)" v-if="item.zt === '1'">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showNoticeDialog">
          <el-form :model="noticeForm" ref="UsersForm" :rules="userRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型" :label-width="formLabelWidth" prop="yhmc">
                  <el-select v-model="noticeForm.type" placeholder="请选择">
                    <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" :label-width="formLabelWidth" prop="dm">
                  <el-select v-model="noticeForm.state" placeholder="请选择">
                    <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="标题" :label-width="formLabelWidth" prop="mm">
              <el-input type="text" v-model="noticeForm.title"></el-input>
            </el-form-item>
            <el-form-item label="来源" :label-width="formLabelWidth" prop="XH">
              <el-input type="text" v-model="noticeForm.XH"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="zt">
              <el-upload
                class="img-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false">
                <img v-if="noticeForm.imageUrl" :src="noticeForm.imageUrl" class="img">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="附件" :label-width="formLabelWidth" prop="fjwj">
              <el-input type="fjwj" v-model="noticeForm.fjwj"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth" prop="XH">
              <!--<tinymce :height="300" v-model="noticeForm.content" :id="tinymceId"></tinymce>-->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelNoticeSet">取 消</el-button>
            <el-button type="primary" @click="submitNoticeSet">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getNoticeInfo} from '@/api/notice'
import {ERR_CODE} from 'common/js/config'
// import Tinymce from '@/components/Tinymce'
export default {
  name: 'notice',
  // components: {Tinymce},
  data () {
    return {
      listType: true,
      search: {
        type: '',
        title: '',
        state: ''
      },
      types: [
        {value: '1', label: '通知'},
        {value: '2', label: '公告'}
      ],
      states: [
        {value: '', label: '全部'},
        {value: '1', label: '编辑'},
        {value: '2', label: '发布'}
      ],
      noticeList: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 5,
      // 弹窗
      isAdd: true,
      showNoticeDialog: false,
      tinymceId: '',
      noticeForm: {
        type: '',
        state: '',
        title: '',
        imageUrl: '',
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
    this.tinymceId = new Date().getTime() + ''
    this._getNoticeList(this.search)
  },
  methods: {
    pageChange (val) {
      this.currentPage = val
      this._getUserList(this.pageSize, val)
    },
    seeNotice () {},
    addNotice () {
      this.showNoticeDialog = true
      this.isAdd = true
    },
    editNotice () {},
    cancelNoticeSet () {},
    submitNoticeSet () {},
    deleteNotice () {},
    searchNotice () {
      console.log(this.search)
      this._getNoticeList(this.search)
    },
    _getNoticeList (parmas) {
      const getInfo = {
        type: parmas.type,
        title: parmas.title,
        state: parmas.state,
        pageSize: this.pageSize,
        pageCurrent: this.currentPage,
        url: 'getNoticeInfo'
      }
      console.log(getInfo)
      getNoticeInfo(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.noticeList = res.rows
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
  .notice
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
    .dialog
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
        width: 178px
        height: 178px
        display: block
</style>
