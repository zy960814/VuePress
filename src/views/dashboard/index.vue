<template>
  <div class="demo">
    <h1>主题颜色按钮</h1>
    <el-row class="row">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主题色按钮</el-button>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>朴素主题色按钮</el-button>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>圆角主题色按钮</el-button>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
    </el-row>
    <h2 class="primary">主题色：$--color-primary: #2264A0（主题颜色用户可以通过取色器自定义~~~）</h2>
    <h2 class="success">成功色：$--color-success: #13CE66</h2>
    <h2 class="warning">警告色：$--color-warning: #FFBA00</h2>
    <h2 class="danger">危险色：$--color-danger: #ff4949</h2>
    <h2>断点续传组件引用</h2>
    <simple-uploader
        :targetUrl="targetUrl"
        :testChunks="testChunks"
        :single="single"
        :chunkSize="chunkSize"
        :singleFile="singleFile"
        :mergeSaveFile="mergeSaveFile"
    ></simple-uploader>
    <el-row class="row">
      <el-button @click="promptErrorMsg" type="primary">错误提示</el-button>
      <el-button @click="promptWarningMsg" type="primary">警告提示</el-button>
    </el-row>
    <el-row class="row">
      <el-button @click="testLogin" type="primary">登录</el-button>
      <el-input v-model="ticket"/>
      <el-button @click="check" type="primary">校验</el-button>
    </el-row>
  </div>
</template>

<script>
  import SimpleUploader from '@/components/commons/SimpleUploader';
  import request from '@/utils/request'
  import axios from 'axios'

  export default {
    components: {
      'simple-uploader': SimpleUploader
    },
    name: "index",
    data() {
      return {
        //分块上传的请求地址
        targetUrl: "",
        testChunks: true,
        single: false,
        chunkSize: 10 * 1024 * 1024,
        singleFile: false,
        ticket: ''
      }
    },
    methods: {
      mergeSaveFile(param) {
        //临时文件的保存操作
        console.log(param);
      },
      promptErrorMsg() {
        this.$store.dispatch('promptErrorMsg', '弹出错误提示');
      },
      promptWarningMsg() {
        this.$store.dispatch('promptWarningMsg', '弹出警告提示');
      },
      testLogin() {
        request({
          url: `http://localhost:9998/province/hi`,
          method: 'get',
        })
          .then(obj => {
            console.log(obj)
            // if (obj.status === 401) {
            //   window.location.href = "http://sso.ncha.gov.cn:8082/cas/login?service=http://client.ncha.gov.cn:8080/getCookie"
            // }
          })
      },
      check() {
        axios.get(`http://client.ncha.gov.cn:8080/getCookie?ticket=${this.ticket}`).then(response => {
          console.log(response);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  .demo {

    h1 {
      color: $--color-primary;
    }

    .row {
      margin: 10px 0;
    }

    .primary {
      color: $--color-primary;
      margin: 50px 0;
    }

    .success {
      color: $--color-success;
    }

    .warning {
      color: $--color-warning;
    }

    .danger {
      color: $--color-danger;
    }

  }
</style>
