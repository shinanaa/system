<template>
    <div class="moduleLayout">
      <sliderbar class="sidebar-container"></sliderbar>
      <div class="module-main">
        <div class="router-show">
          <hamburger class="hamburger-container" :toggleClick="toggleSideBar"></hamburger>
          <breadcrumb></breadcrumb>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>

<script>
import sliderbar from '@/components/slidebar/slidebar'
import Hamburger from '@/components/Hamburger/Hamburger'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
export default {
  name: 'module-layout',
  components: {
    sliderbar,
    Breadcrumb,
    Hamburger
  },
  methods: {
    toggleSideBar () {
      console.log(123)
      // this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.moduleLayout
  .module-main
    margin-left: $slide-width
    .router-show
      position: fixed
      top: 80px
      left: 260px
      right: 0
      z-index: 10
      background: #FFFFFF
      .hamburger-container
        line-height: 58px
        height: 50px
        float: left
        padding: 0 10px
</style>
