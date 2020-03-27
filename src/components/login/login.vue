<template>
  <div class="login">
    <div class="logo">
      <img src="@/common/img/logo.png" alt="">
    </div>
    <div class="main">
      <div class="login-wrapper">
        <div class="login-type">
          <ul>
            <li class="type-item" :class="loginFlag === true ? 'active' : ''" @click="loginFlag = true">账号密码</li>
            <li class="type-item" :class="loginFlag === false ? 'active' : ''" @click="validIphone">手机验证</li>
          </ul>
        </div>
        <div>
          <div class="login-form">
            <el-form v-show="loginFlag" class="login-form" :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userName">
                <el-input v-model="loginForm.userName" placeholder="请输入账号">
                  <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="login" show-password>
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <!--<div class="findPwd">忘记密码？</div>-->
              <el-button class="login-btn" @click.native.prevent="login">登录</el-button>
            </el-form>
          </div>
          <div v-show="!loginFlag" class="login-phone">暂无内容</div>
        </div>
      </div>
    </div>
    <div class="link">
        <b v-for="(n, index) in linkInfo" :key="index">{{n.text}}</b>
    </div>
  </div>
</template>

<script>
import {ERR_CODE} from 'common/js/config'
import {mapActions} from 'vuex'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('用户名不能少于5位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能少于4位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loginFlag: true
    }
  },
  methods: {
    validIphone () {
      this.$message({
        showClose: true,
        message: '手机验证暂未开通',
        type: 'warning'
      })
    },
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginForm.url = 'loginOn'
          this.LoginByUsername(this.loginForm).then((res) => {
            if (res.errcode === ERR_CODE) {
              console.log(123)
              this.$router.push({ path: '/' })
            } else {
              console.log(res)
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'error'
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    ...mapActions([
      'LoginByUsername'
    ])
  },
  created () {
    this.linkInfo = [
      {text: '版权信息', linkUrl: ''},
      {text: '关于平台', linkUrl: ''},
      {text: '用户协议', linkUrl: ''},
      {text: '使用帮助', linkUrl: ''}
    ]
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .login
    position: absolute
    top: 50%
    margin: -350px 0 0 0
    width: 100%
    height: 720px
    .logo
      height: 120px
      minWidth()
    .main
      position: relative
      height: 500px
      width: 100%
      min-width: 1200px
      background-image: url('~common/img/login-bg.png')
      background-size: 100%
      background-position: center
      background-repeat: no-repeat
      .login-wrapper
        position: absolute
        top: 50%
        right: 5%
        transform: translate(0, -50%)
        width: 320px
        padding: 20px 30px
        box-sizing:border-box
        border-radius: 7px
        box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.3)
        background-color: rgba(255,255,255,0.7)
        .login-type
          width: 100%
          margin-bottom: 30px
          clearfix()
          .type-item
            float: left
            width: 50%
            height: 50px
            line-height: 50px
            font-size: 20px
            font-weight: 600
            text-align: center
            color: #909399
            &.active
              color: $color-theme
              border-bottom: 2px solid $color-theme
        .findPwd
          text-align: right
          font-size: 14px
          color: $color-theme
          cursor: pointer
        .login-btn
          width: 100%
          margin-top: 10px
          margin-bottom: 15px
          background-color: $color-theme
          color: #FFF
    .link
      minWidth()
      padding-top: 45px
      box-sizing: border-box
      height: 100px
      text-align: center
      margin: auto
      b
        display: inline-block
        padding: 0 20px
        color: $color-theme
        font-weight: bold
        border-right: 2px solid $color-theme
        cursor: pointer
        &:last-child
          border: none
</style>
