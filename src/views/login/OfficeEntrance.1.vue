<template>
  <el-card class="box-card">
    <el-tabs v-model="activeIndex" tab-position="left" type="card">
      <el-tab-pane
          v-for="(item, index) in orgCategory"
          :label="item"
          :name="String(index)"
          :key="index">
      </el-tab-pane>
    </el-tabs>
    <div class="form">
      <h2 class="title">{{ orgCategory[Number(activeIndex)] }}</h2>
      <div style="margin: 15px 0">
        <el-radio v-model="loginType" label="1">网站密码登录</el-radio>
        <el-radio v-model="loginType" label="2">短信快捷登录</el-radio>
      </div>
      <template v-if="loginType === '1'">
        <el-input v-model="input" size="normal" placeholder="用户账号"></el-input>
        <el-input v-model="input" size="normal" placeholder="密码"></el-input>
      </template>
      <template v-else>
        <el-input v-model="input" size="normal" placeholder="手机号"></el-input>
        <div class="captcha">
          <el-input v-model="input" size="normal" placeholder="验证码"></el-input>
          <el-button type="primary" size="normal">发送</el-button>
        </div>
      </template>
      <div class="other_item">
        <el-checkbox v-model="checked">记住我</el-checkbox>
        <span class="forget_pwd">忘记密码？</span>
      </div>
      <drag-verify
          v-if="!validateFlag"
          :width="310"
          style="margin-top: 10px; width: 310px"
          text="拖动验证"
          success-text="验证成功"
          progress-bar-bg="#B71C1C"
          @pass-callback="validateFlag = true"
      ></drag-verify>
      <el-button v-else class="login_btn" type="primary" size="normal">登录</el-button>
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
    data() {
      return {
        orgCategory: [
          '国家文物局',
          '省级文物局',
          '文物进出境审核管理处',
          '评估机构',
          '评审专家',
          '海关'
        ],
        activeIndex: '0',
        loginType: '1',
        input: '',
        checked: '',
        validateFlag: false
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .box-card {
    width: 480px;
    border: none;

    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #B71C1C;
      border-color: #B71C1C;
    }

    /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #B71C1C;
    }

    /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
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

    /deep/.el-input__inner:focus {
      border-color: #409EFF;
    }

    /deep/.el-radio__input.is-checked .el-radio__inner {
      border-color: #B71C1C;
      background: #B71C1C;
    }

    /deep/.el-radio__inner:hover, /deep/.el-checkbox__inner:hover {
      border-color: #B71C1C;
    }

    /deep/.el-radio__input.is-checked + .el-radio__label {
      color: #B71C1C;
    }

    /deep/ .el-card__body {
      display: flex;
      justify-content: left;
      padding: 0;

      .el-tabs__header {
        width: 120px;
        border: none;
        background-color: #ECECEC;

        .el-tabs__nav {
          border: none;
        }

        .el-tabs__item {
          white-space: normal;
          word-wrap: break-word;
          font-weight: bold;
          height: 54px;
          line-height: 40px;
          padding: 7px 20px;
          border: none;
          color: #A7A7A5;

          &:nth-child(3) {
            line-height: 20px;
          }

          &:hover {
            color: #A7A7A5;
          }

          &.is-active {
            color: #FFF;
            background-color: #B71C1C;

            &:after {
              display: block;
              content: "";
              border: 8px solid transparent;
              border-right-color: #FFF;
              position: absolute;
              right: 0;
              top: 19px;
            }
          }
        }
      }
    }

    .form {
      flex: 1;
      padding: 20px;
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

      .ca_box {
        padding: 10px;
        margin-top: 10px;
        border-top: 1px dashed rgb(160, 160, 160);

        .ca_login {
          display: inline-block;
          cursor: pointer;

          &:hover {
            color: #B71C1C;
          }

          .svg-icon {
            font-size: 45px;
          }
        }
      }
    }
  }
</style>
