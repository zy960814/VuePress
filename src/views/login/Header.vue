<template>
  <div class="content">
    <div class="body">
      <div>
        <img src="/static/img/login/logo_48.png" alt/>
        <h1>全国一体化在线政务服务平台<br>国家文物局综合行政管理平台</h1>
      </div>
      <div>
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="0">
            <router-link to="/">返回首页</router-link>
          </el-menu-item>
          <!-- <el-menu-item class="tab" index="1">
            <router-link to="/login?type=1">在线申请</router-link>
          </el-menu-item>
          <el-menu-item class="tab" index="2">
            <router-link to="/login?type=2">办公入口</router-link>
          </el-menu-item> -->
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      activeIndex: {
        type: String,
        default: '2'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 60px;
    background-color: #B71C1C;

    .body {
      margin: 0 auto;
      width: 75%;
      display: flex;
      justify-content: space-between;

      img {
        position: relative;
        top: 6px;
      }

      h1 {
        display: inline-block;
        color: #FFF;
        font-size: 18px;
        margin: 0 0 0 10px;
        height: 44px;
        line-height: 22px;
      }

      .el-menu.el-menu--horizontal {
        border-bottom: none;
      }

      .el-menu {
        background-color: #B71C1C;
      }

      .el-menu--horizontal > .el-menu-item {
        color: #FFF;
        font-weight: bold;
        font-size: 16px;
        padding: 0;

        &:not(.is-disabled):hover, &:not(.is-disabled):focus {
          background-color: #B71C1C;
        }

        &.is-active {
          border-color: #B71C1C;
        }

        &.tab.is-active:after {
          position: absolute;
          content: "";
          left: 50%;
          bottom: 4px;
          border: 3px solid #FFF;
          transform: translateX(-50%);
          border-radius: 50%;
        }

        a {
          display: block;
          // padding: 0 20px;
        }
      }
    }
  }
</style>
