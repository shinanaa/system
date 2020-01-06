<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#606266"
        active-text-color="#21324f"
      >
        <router-link to="/user">
          <el-menu-item index="1">
            <span slot="title">用户管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/module">
          <el-menu-item index="2">
            <span slot="title">模块管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/plugin">
          <el-menu-item index="3">
            <span slot="title">功能管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/role">
          <el-menu-item index="4">
            <span slot="title">角色管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/log">
          <el-menu-item index="5">
            <span slot="title">日志管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/unit">
          <el-menu-item index="6">
            <span slot="title">单位管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/notice">
          <el-menu-item index="7">
            <span slot="title">通知公告</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-scrollbar>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.el-menu
  text-align:center
  .el-menu-item
    font-size: 17px
    font-weight: bold
</style>
