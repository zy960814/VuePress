<template>
  <div class="navigationBar">
    <div class="logo">
      <img src="@/assets/image/navigation-bar/logo.png" alt="">
      <h1>国家文物局<br>综合行政管理平台</h1>
      <div class="opt">
        <el-tooltip effect="dark" content="门户首页" placement="bottom-start">
          <svg-icon class="opt_icon" icon-class="site"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="布局切换" placement="bottom-start">
          <i class="opt_icon el-icon-menu" @click="menuStyleChange"></i>
        </el-tooltip>
        <el-tooltip effect="dark" content="主题切换" placement="bottom-start">
          <theme-picker class="opt_icon"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏切换" placement="bottom-start">
          <screen-full/>
        </el-tooltip>
      </div>
      <span class="date_info">{{ currentTime }}</span>
    </div>
    <div class="welcome"><span>辽宁兴博文化遗产保护设计有限公司</span>，欢迎您</div>
    <ul class="shortcut">
      <li>
        <span><a href="#/framework/business-notice">
          <i class="el-icon-message"></i>业务通知
        </a></span>
      </li>
      <li>
        <span><a href="#/framework/reminder-work">
          <i class="el-icon-alarm-clock"></i>工作提醒
        </a></span>
      </li>
      <li><span><i class="el-icon-tickets"></i>工作统计</span></li>
      <li>
        <span><a href="#/personal/account-settings">
          <i class="el-icon-setting"></i>账户设置
        </a></span>
      </li>
      <li class="logout_btn" @click="$router.push('/test')"><span><i class="el-icon-switch-button"></i>登出</span></li>
      <li><span @click="toggleSidebar"><i :class="$store.getters.sidebar.opened ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i></span></li>
    </ul>
  </div>
</template>

<script>
  import ScreenFull from '../ScreenFull'
  import ThemePicker from '../ThemePicker'

  export default {
    name: "NavigationBar",
    data() {
      return {
        currentTime: ''
      }
    },
    components: {
      ScreenFull,
      ThemePicker
    },
    mounted() {
      setInterval(() => this.currentTime = new Date().format('yyyy年MM月dd日 HH:mm'), 1000)
    },
    methods: {
      toggleSidebar() {
        this.$store.dispatch('toggleSideBar');
      },
      menuStyleChange() {
        this.$store.dispatch('showMainContainer', false);
        this.$store.dispatch('toggleMenuStyle');
        setTimeout(() => {
          this.$store.dispatch('showMainContainer', true);
        }, 500);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigationBar {
    display: flex;
    justify-content: space-between;
    background-color: $--color-primary;
    padding: 0 10px;
    height: 60px;

    .logo {

      img {
        width: 40px;
        height: 40px;
      }

      h1 {
        display: inline-block;
        text-align: center;
        font-size: 15px;
        margin: 5px 5px 5px 10px;
        line-height: 25px;
        color: #FFF;
        width: 125px;
      }

      .opt {
        display: inline-block;
        border-left: 2px #FFF solid;
        border-right: 2px #FFF solid;
        position: relative;
        top: -14px;
        margin: 0 10px;
        padding-right: 20px;
      }

      .opt_icon {
        font-size: 20px;
        margin-left: 15px;
        color: #FFF;
        cursor: pointer;
        position: relative;
        top: 4px;
      }

      .date_info {
        display: inline-block;
        color: #FFF;
        line-height: 60px;
        margin-left: 10px;
        position: relative;
        top: -13px;
        font-size: 14px;
      }
    }

    .welcome {
      font-size: 14px;
      line-height: 60px;
      color: #FFF;

      span {
        font-size: 14px
      }
    }

    .shortcut {

      li {
        display: inline-block;
        margin-top: 21px;
        padding-right: 20px;
        font-weight: bold;
        font-size: 14px;
        color: #FFF;

        &:last-child {
          padding-right: 10px;
        }

        span {
          line-height: 18px;
          cursor: pointer;
        }

        span:hover {
          opacity: .7;
        }

        i {
          margin-right: 3px;
          font-weight: bold;
        }
      }

      .logout_btn {
        border-left: 2px #FFF solid;
        border-right: 2px #FFF solid;
        padding-left: 20px;
        margin-right: 20px;
      }
    }
  }
</style>
