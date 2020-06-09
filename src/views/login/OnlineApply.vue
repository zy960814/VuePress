<template>
    <el-card class="box-card">
        <div class="form">
            <el-tabs v-model="loginInfo.type" :stretch="true">
                <el-tab-pane label="审批监管人员登录" name="1"></el-tab-pane>
            </el-tabs>
            <div class="warn"  v-if="loginInfo.type === '1'">
                <p >
                    <i class="el-icon-bell"></i>国家文物局、国家文物进出境审核管理处、省级文物局、审核评估机构、评审专家、海关用户请在此处登录
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
            <div v-else  style="margin-top:10px;">
                <el-input v-model="input" size="normal" placeholder="手机号"></el-input>
                <div class="captcha">
                    <el-input v-model="input" size="normal" placeholder="验证码"></el-input>
                    <el-button type="primary" size="normal">发送</el-button>
                </div>
            </div>
            <div class="other_item" v-if="loginType === '1'">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <span class="forget_pwd">忘记密码？</span>
            </div>
            <div class="other_item" v-else></div>
            <drag-verify
                v-if="!validateFlag"
                :width="310"
                style="margin-top: 10px; width: 310px"
                text="拖动验证"
                success-text="验证成功"
                progress-bar-bg="#B71C1C"
                @pass-callback="validateFlag=true">
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
                        <p>证书登录</p>
                    </li>
                    <li class="borderDashed"></li>
                </ul>
            </div>
            <!-- <div class="register"><span>注册</span></div> -->
            <div class="ca_box">
                <div class="ca_login">
                    <svg-icon icon-class="u-key"/><br>
                    <span style="font-size: 14px">CA登录</span>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
  import DragVerify from '@/components/commons/DragVerify'

  export default {
    components: {
          DragVerify
    },
    props: {},
    data() {
        return {
            loginInfo: {
                username: '',
                password: '',
                type: '1'  // 1法人  2个人  3办公用户
            },
            loginType: '1',
            input: '',
            validateFlag: false,
            checked: null
        };
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    destroyed() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
  .box-card {
    width: 350px;
    border: none;
    .form{
        text-align: center;
    }
    .warn{
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
    .radioTabs{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        vertical-align: center;
        margin-top: 10px;
    }
    .fontZc{
        overflow: hidden;
        height: 40px;
        .borderDashed{
            width: 40%;
            border-bottom: 1px dashed rgb(160, 160, 160);
            line-height: 40px;
            margin-top: 27px;

        }
        li{
            float: left;

        }
        .borderText{
            font-size: 8px;
            color: #303133;
            line-height: 40px;
            padding: 0 5px;
            span {
                color: #c00000
            }
        }
        // .borderText:hover {
        //     cursor:pointer;
        // }
    }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #B71C1C;
      border-color: #B71C1C;
    }

    /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #B71C1C;
    }

    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #B71C1C;
    }

    .el-button--primary {
      background-color: #B71C1C;
      border-color: #B71C1C;
    }

    .el-button--primary:focus, .el-button--primary:hover {
      background: #c54949;
      border-color: #c54949;
    }

    /deep/ .el-input__inner:focus {
      border-color: #409EFF;
    }

    /deep/ .el-radio__input.is-checked .el-radio__inner {
      border-color: #B71C1C;
      background: #B71C1C;
    }

    /deep/ .el-radio__inner:hover, /deep/ .el-checkbox__inner:hover {
      border-color: #B71C1C;
    }

    /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: #B71C1C;
    }

    /deep/ .el-tabs__active-bar {
      background-color: #B71C1C;
    }

    /deep/ .el-tabs__item {

      &.is-active {
        font-weight: bold;
        color: #B71C1C;
      }

      &:hover {
        color: #B71C1C;
      }
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
      margin-top: 12px;
      width: 100%;
    }

    .register {
      margin-top: 12px;
      text-align: center;

      span {
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: #B71C1C;
        }
      }
    }

    .ca_box {
      // padding-top: 10px;
      margin-top: 10px;
      // border-top: 1px dashed rgb(160, 160, 160);
      text-align: center;

      .ca_login {
        display: inline-block;
        cursor: pointer;

        &:hover {
          color: #B71C1C;
        }
        .svg-icon {
                        font-size: 45px;
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
    }
  }
</style>
