<template>
  <el-scrollbar>
    <login-header :activeIndex="menuIndex"/>
    <div class="login-body">
      <div class="login-form clear-float">
          <user-instruction class="fl"/>
          <office-entrance v-if="menuIndex==='2'" @user-login="userLogin" class="fr"/>
          <online-apply v-else @user-login="userLogin" class="fr"/>
      </div>
    </div>
    <div class="footerText">
      <p>本系统为国家文物局政务服务系统，请自觉遵守国家有关法律、法规和政策，不发布、不传播危害国家安全、危害社会公共利益和社会稳定、违反社会公德的有害信息，抵制一切违法、法规行为。</p>
    </div>
    <login-footer/>
    <iframe id="sso_messenger" name="sso_messenger" :src="ssoMessengerSrc" width="0" height="0"
            frameborder="0"></iframe>
  </el-scrollbar>
</template>

<script>
import LoginHeader from "./Header";
import UserInstruction from "./UserInstruction";
import OfficeEntrance from "./OfficeEntrance";
import OnlineApply from "./OnlineApply";
import LoginFooter from "./Footer";
import APP_CONFIG from "@/utils/const";

export default {
  components: {
    LoginHeader,
    UserInstruction,
    OfficeEntrance,
    OnlineApply,
    LoginFooter
  },
  data() {
    return {
      menuIndex: "2",
      ssoMessengerSrc: APP_CONFIG.SSO_AUTH_URL,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route(to) {
      this.renderPage(to.query.type);
    }
  },
  mounted() {
    this.renderPage(this.$route.query.type);
    // 添加消息监听
    window.addEventListener("message", this.messageCallback, false);
    // 当 iframe 加载完毕, 发送消息检测登录信息
    const iframe = document.querySelector("#sso_messenger");
    // 处理兼容行问题
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", () => {
        window.frames["sso_messenger"].postMessage(
          "check_login",
          APP_CONFIG.SSO_HOST
        );
      });
    } else {
      iframe.onload = () => {
        window.frames["sso_messenger"].postMessage(
          "check_login",
          APP_CONFIG.SSO_HOST
        );
      };
    }
  },
  beforeDestroy() {
    // 登录页面销毁前, 移除监听事件, 防止重复监听
    window.removeEventListener("message", this.messageCallback);
  },
  methods: {
    renderPage(type) {
      if (!type) {
        this.$router.push("/login?type=2");
        return;
      }
      this.menuIndex = type === "1" ? "1" : "2";
    },
    // 办公用户登录
    userLogin(loginInfo) {
      /*
            loginInfo: {
              username: "",
              password: "",
              type: ""       1 法人  2 个人  3 办公用户
            }
        */
      window.frames["sso_messenger"].postMessage(
        JSON.stringify(loginInfo),
        APP_CONFIG.SSO_HOST
      );
    },
    // SSO消息回调
    messageCallback(e) {
      if (e.origin === APP_CONFIG.SSO_HOST) {
        const result = JSON.parse(e.data);
        if (result.code !== 707) {
          if (result.code === 200) {
            // 将 ticket 发送给 vuex
            this.$store
              .dispatch("login", result.data.ticket)
              .then(() => {
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                });
                // this.loading = false
              })
              .catch(() => {
                // this.loading = false
                console.log("登录失败");
              });
          } else {
            this.$alert(result.msg, {
              type: "error",
              confirmButtonText: "确定",
              confirmButtonClass: "login_alert_btn"
            });
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  .footerText {
    height: 30px;
    background-color: #b71c1c;
    p {
      margin: 0px;
      font-size: 12px;
      color: #ffffff;
      line-height: 30px;
      text-align: center;
    }
  }
  /deep/ .el-scrollbar__view {
    .login-body {
      min-height: calc(100vh - 278px);
      background-image: url("/static/img/login/bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .login-form {
        width: 75%;
        margin: 0 auto;
        padding: 20px 0;
        min-height: 495px;
      }
    }
  }
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
