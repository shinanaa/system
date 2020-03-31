<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理模块</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb'
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  .app-breadcrumb.el-breadcrumb
    display: inline-block
    font-size: 14px
    line-height: 50px
    margin-left: 10px
    .no-redirect
      color: #97a8be
      cursor: text
</style>
