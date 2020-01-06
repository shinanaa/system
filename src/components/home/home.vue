<template>
  <div class="home">
    <div class="charts">
      <el-card class="box-infos">
        <div slot="header" class="clearfix card-head">
          <span>信息完善度</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-more"></i></el-button>
        </div>
        <div class="progress-circle">
          <div class="exam">
            <el-progress type="circle" :percentage="25" :width="100"></el-progress>
            <p>考试信息</p>
          </div>
          <div class="teacher">
            <el-progress type="circle" :percentage="66" :width="100"></el-progress>
            <p>教师信息</p>
          </div>
          <div class="student">
            <el-progress type="circle" :percentage="92" :width="100"></el-progress>
            <p>学生信息</p>
          </div>
        </div>
      </el-card>
      <el-card class="box-task">
        <div slot="header" class="clearfix card-head">
          <span>任务量统计</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-more"></i></el-button>
        </div>
      </el-card>
      <el-card class="box-workload">
        <div slot="header" class="clearfix card-head">
          <span>工作量统计</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-more"></i></el-button>
        </div>
      </el-card>
    </div>
    <div class="lists">
      <el-card class="box-pengding">
        <div slot="header" class="clearfix card-head">
          <span>待办</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-more"></i></el-button>
        </div>
      </el-card>
      <div class="list-right">
        <el-card class="notice">
          <div slot="header" class="clearfix card-head">
            <span>公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div class="notice-lists">
            <div class="notice-item">
              <span class="isSee"></span>
              <span class="title">我是公告的一个标题</span>
              <span class="time">2019/11/25 15:14</span>
            </div>
          </div>
        </el-card>
        <el-card class="announcement">
          <div slot="header" class="clearfix card-head">
            <span>通知</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div class="announcement-item">
            <div class="top">
              <span class="title">我是通知的一个标题</span>
              <span class="time">2019/11/25 15:14</span>
            </div>
            <p class="announcement-text">我是一条公告的内容，我应该是一个字符串</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .home
    padding: 30px
    margin-top: 80px
    min-width:1200px
    box-sizing: border-box
    .card-head
      color: $color-theme
    .charts
      display: flex
      justify-content: space-between
      .box-infos
        width: 30%
        display: inline-block
        .progress-circle
          display: flex
          justify-content: space-around
          p
            line-height: 40px
            text-align:center
      .box-task
        width: 30%
        display: inline-block
      .box-workload
        width: 30%
        display: inline-block
    .lists
      margin-top: 30px
      clearfix()
      .box-pengding
        float: left
        width: 49%
      .list-right
        float: right
        width: 49%
        .time
          float: right
          color: #909399
          font-size: 15px
        .title
          color: #606266
        .notice
          color: #000
          .notice-item
            padding: 20px
            border-radius: 5px
            background-color: #F6F6F6
            .isSee
              display: inline-block
              width: 5px
              height: 5px
              margin-right: 5px
              margin-bottom: 3px
              border-radius: 50%
              background-color: #f56c6c
        .announcement
          margin-top: 30px
          .announcement-item
            padding: 0 20px
            line-height: 30px
            border-bottom: 1px solid #dcdfe6
            .title
              font-size: 17px
            p
              color: #909399
</style>
