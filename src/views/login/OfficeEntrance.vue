<template>
    <el-card class="box-card">
        <div class="form">
        <!-- <h2 class="title">办公用户登录</h2> -->
            <el-tabs v-model="loginInfo.type" :stretch="true" @tab-click="tabClick">
                <el-tab-pane label="法人登录" name="1"></el-tab-pane>
                <el-tab-pane label="个人登录" name="2"></el-tab-pane>
            </el-tabs>
            <div class="warn" v-if="loginInfo.type === '1'">
                <p  >
                    <i class="el-icon-bell"></i>文保工程资质单位、考古发掘资质单位、收藏单位和其他法人注册用户请在此处登录
                </p>
            </div>
            <div  class="warn"  v-else>
                <p>
                    <i class="el-icon-bell"></i>考古发掘项目负责人和其他个人注册用户请在此处登录
                </p>
            </div>
            <div class="radioTabs">
                <el-radio v-model="loginType" label="1">账号密码登录</el-radio>
                <el-radio v-model="loginType" label="2">短信快捷登录</el-radio>
            </div>
            <div v-if="loginType === '1'" style="margin-top:10px;">
                <el-input v-model="loginInfo.username" size="normal" placeholder="用户账号"></el-input>
                <el-input v-model="loginInfo.password" size="normal" placeholder="密码" show-password></el-input>
            </div>
            <div v-else style="margin-top:10px;">
                <el-input v-model="input" size="normal" placeholder="请输入手机号"></el-input>
                <div class="captcha">
                    <el-input v-model="input" size="normal" placeholder="请输入随机密码"></el-input>
                    <el-button type="primary" size="normal">发送</el-button>
                </div>
            </div>
            <div class="other_item" v-if="loginType === '1'">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <span class="forget_pwd">忘记密码？</span>
            </div>
            <div class="other_item" v-else>

            </div>
            <drag-verify
                v-if="!validateFlag"
                :width="310"
                style="margin-top: 10px; width: 310px"
                text="拖动验证"
                success-text="验证成功"
                progress-bar-bg="#B71C1C"
                @pass-callback="validateFlag = true">
            </drag-verify>
            <el-button
                v-else
                @click="$emit('user-login', loginInfo)"
                class="login_btn"
                type="primary"
                size="normal">登录
            </el-button>
            <div class="fontZc">
                <ul>
                    <li class="borderDashed"></li>
                    <li class="borderText">
                        <p>没有账号? <span @click="clickTo">立即注册</span></p>
                    </li>
                    <li class="borderDashed"></li>
                </ul>
            </div>
            <div class="ca_box">
                <div class="ca_login">
                    <div class="icon"></div>
                    <span style="font-size: 14px">国家政务服务<br>平台账号登录</span>
                    <!-- <svg-icon icon-class="u-key"/><br>
                    <span style="font-size: 14px">CA登录</span> -->
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import DragVerify from "@/components/commons/DragVerify";

export default {
  components: {
    DragVerify
  },
  data() {
    return {
      loginInfo: {
        username: "国家文物局测试账号",
        password: "123456",
        type: "1" // 1法人  2个人  3办公用户
      },
      loginType: "1",
      name: "1",
      input: "",
      checked: "",
      validateFlag: false
    };
  },
  mounted() {
    if(localStorage.getItem('loginInfoType')==='2'){
      this.loginInfo.type='2';
    }
  },
  methods: {
    clickTo() {
      if(this.loginInfo.type === '1'){
        this.$router.push('./RegisterLPStep')
      }else if(this.loginInfo.type === '2'){
        this.$router.push('./IndividualRegistration')
      }
    },
    tabClick(){
      localStorage.setItem('loginInfoType',this.loginInfo.type);
    },
  }
};
</script>

<style lang="scss" scoped>
.box-card {
    width: 350px;
    .warn {
        font-size: 8px;
        height: 35px;
        color: #303133;
        line-height: 20px;
        .iconBell{
            width: 20px;
            height: 20px;
            background-color: red;
        }
        p{
            margin: 0px;
        }
    }
  /deep/ .el-tabs__item:hover {
    color: #b71c1c;
    border-bottom-color: #b71c1c;
  }
  /deep/ .el-tabs__item.is-active {
    color: #b71c1c;
  }
  /deep/ .el-tabs__active-bar {
    background-color: #b71c1c;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item {
    padding: 0 20px;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #b71c1c;
    border-color: #b71c1c;
  }

  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #b71c1c;
  }
  /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #b71c1c;
  }

  .el-button--primary {
    background-color: #b71c1c;
    border-color: #b71c1c;
  }

  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #c54949;
    border-color: #c54949;
  }

  /deep/.el-input__inner:focus {
    border-color: #409eff;
  }

  /deep/.el-radio__input.is-checked .el-radio__inner {
    border-color: #b71c1c;
    background: #b71c1c;
  }

  /deep/.el-radio__inner:hover,
  /deep/.el-checkbox__inner:hover {
    border-color: #b71c1c;
  }

  /deep/.el-radio__input.is-checked + .el-radio__label {
    color: #b71c1c;
  }

  .form {
    text-align: center;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      padding: 0;
      margin: 10px 0 24px;
    }

    .el-input {
      margin-bottom: 20px;
    }
    .captcha {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .el-input {
        margin: 0 15px 0 0;
        flex: 1;
      }
    }

    .other_item {
      display: flex;
      justify-content: space-between;
      height: 22px;
      .forget_pwd {
        font-size: 14px;
        cursor: pointer;
        color: #606266;
        &:hover {
          color: #303133;
        }
      }
    }
    .login_btn {
      width: 100%;
      margin-top: 12px;
    }
    .fontZc {
      overflow: hidden;
      height: 40px;
      .borderDashed {
        width: 30%;
        border-bottom: 1px dashed rgb(160, 160, 160);
        line-height: 40px;
        margin-top: 27px;
      }
      li {
        float: left;
      }
      .borderText {
        font-size: 8px;
        color: #303133;
        line-height: 40px;
        padding: 0 5px;
        span {
          color: #c00000;
        }
      }
      .borderText:hover {
          cursor:pointer;
      }
    }

    .ca_box {
      // padding: 10px;
      margin-top: 10px;
      .ca_login {
        display: inline-block;
        cursor: pointer;

        &:hover {
          color: #b71c1c;
        }
        .svg-icon {
          font-size: 45px;
        }
      }
      .icon {
        margin: 0 auto;
        width: 47px;
        height: 47px;
        background-image: url("/static/img/login/icon.png");
        background-repeat: no-repeat;
        background-position-x: -244px;
      }
    }
    .radioTabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      vertical-align: center;
      margin-top: 10px;
    }
  }
}
</style>
