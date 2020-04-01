<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#606266"
        active-text-color="#21324f"
      >
        <div class="menu-wrapper" v-for="(item, index) in menuList" :key="index">
          <router-link :to="item.path">
            <el-menu-item :index="item.path">
              <span><i class="icon el-icon-menu"></i></span>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </router-link>
        </div>
      </el-menu>
    </el-scrollbar>
</template>

<script>
import {getPluginList} from 'common/js/cache'
export default {
  data () {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  created () {
    this.menuList = getPluginList()
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
