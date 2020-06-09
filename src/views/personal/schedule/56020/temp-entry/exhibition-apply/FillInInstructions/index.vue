<template>
  <div class="fill-in">
    <h2>填写说明</h2>
    <div class="header">
      <div class="title">一、批量上传说明</div>
      <div>
        <el-button @click="download" type="primary" size="mini" plain>模板下载</el-button>
      </div>
    </div>
    <div>
      <p>批量上传功能通过Excel表格批量添加文物或复仿制品信息。</p>
      <p>操作步骤如下：</p>
      <p>1、首先点击模板下载按钮，下载批量上传模板；</p>
      <p>2、然后按照模板格式在Excel中填写文物或复仿制品信息；</p>
      <p>3、填写完成后，点击批量上传按钮，选择Excel文件，进行批量上传；</p>
      <p>4、上传完成后，文物或复仿制品列表中会出现相应的信息，检查无误后，逐项添加照片。</p>
      <p>注意：</p>
      <p>1、如果文物或复仿制品数量太多，建议分批填写、上传；</p>
      <p>2、批量上传模板为固定格式，请勿修改，否则会导致上传失败。</p>
    </div>
    <div class="header">
      <div class="title">二、照片要求</div>
      <div style="margin-top: 6px">
        <el-link @click="showImg" type="primary" size="mini">照片示例</el-link>
      </div>
    </div>
    <div>
      <p>1、上传的文物或复仿制品照片应能清晰表现该文物或复仿制品的特征；</p>
      <p>2、单张照片不能超过2M，单个文物或复仿制品最多上传6张照片；</p>
      <p>3、照片格式支持bmp、jpg、jpeg、png。</p>
    </div>
    <el-divider></el-divider>
    <viewer :images="images" class="viewer" ref="viewer" @inited="inited">
      <img v-for="src in images" :src="src" :key="src" class="image" alt="">
    </viewer>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import viewer from 'v-viewer/src/component'

  export default {
    components: {
      viewer
    },
    props: {
      contentHeight: Number
    },
    data() {
      return {
        images: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585658097900&di=32338b250d4748eb596dae3e86d83206&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201310%2F19%2F235356fyjkkugokokczyo0.jpg'
        ]
      }
    },
    methods: {
      // 模板下载
      download() {

      },
      // 初始化
      inited(viewer) {
        this.$viewer = viewer
      },
      // 显示图片
      showImg() {
        this.$viewer.show();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image {
    display: none;
  }

  .el-divider--horizontal {
    margin: 0;
  }

  .fill-in {

    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 0 0 5px 0;
      margin: 0 0 10px 0;
      border-bottom: 1px solid $--border-color;
    }

    .header {
      display: flex;
      justify-content: space-between;
      background-color: #F2F2F2;
      padding: 10px 15px;

      .title {
        font-size: 16px;
        font-weight: bold;
        height: 28px;
        line-height: 28px;
      }
    }
  }
</style>
