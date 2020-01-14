<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload" action="" :multiple="true" :file-list="fileList" :show-file-list="true" :auto-upload="true"
        list-type="picture-card" :on-remove="handleRemove"  :before-upload="beforeUpload" :http-request="httpRequest">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      imgBase64Array: []
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      console.log(arr)
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    uploadSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = file
          this.listObj[objKeyArr[i]].hasSuccess = true
          this.listObj[objKeyArr[i]].src = response.Data
          return
        }
      }
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    async beforeUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    file2Base64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (ev) {
          resolve(ev.target.result.split(',')[1])
        }
      })
    },
    async httpRequest (option) {
      console.info(option)
      const resultBase64 = await this.file2Base64(option.file)
      const params = {
        fileId: '',
        fileGroupId: '',
        pic: resultBase64
      }
      await this.$http.postRequest('UploadFileImage', params).then((result) => {
        this.uploadSuccess(result, option.file)
      }).catch((err) => {
        option.onError(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.editor-slide-upload
  margin-bottom: 20px
  /deep/ .el-upload--picture-card
    width: 100%
</style>
