<template>
  <div><!-- 最外层需要一个 DIV 包裹一下, 否则图片查看器定位不到组件 -->
    <el-upload
        v-viewer="{movable: true}"
        class="showView"
        :class="{disabled: disabled}"
        :action="action"
        :data="data"
        :with-credentials="true"
        list-type="picture-card"
        :before-upload="beforeUpload"
        :on-success="success"
        :on-error="fileUploadError"
        :file-list="fileList"
        :limit="limit">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <label class="el-upload-list__item-status-label" v-if="file.uid === masterImgUid">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <span class="el-upload-list__item-actions">
          <!-- 20系统, 包含设为主图功能 -->
          <span v-if="type === 20 && !itemDisabled" @click="setMasterImg(file)" title="设置主图">
            <i class="el-icon-circle-check"></i>
          </span>
          <!-- 查看 -->
          <span @click="viewImg(file)" title="查看">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- 删除 -->
          <span v-if="!itemDisabled" @click="deleteImg(file)" title="删除">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'

  Vue.use(Viewer);

  export default {
    name: "PictureUpload",
    props: {
      action: String,
      limit: {
        type: Number,
        default: -1
      },
      type: {
        type: Number,
        default: -1
      },
      maxFileSize: {
        type: Number,
        default: 2
      },
      data: Object
    },
    data() {
      return {
        fileList: [],
        fileListData: [],
        masterImgUid: '',
        disabled: false,
        itemDisabled: false
      }
    },
    watch: {
      fileList(fileList) {
        if (this.limit > 0) {
          this.disabled = fileList && fileList.length === this.limit;
        }
        if (fileList && fileList.length === 1 && this.type === 20) {
          this.masterImgUid = fileList[0].uid;
        }
      }
    },
    methods: {
      // 获取当前操作图片的索引
      getImgIndex(file) {
        return this.fileList.findIndex(item => {
          return file.uid === item.uid;
        });
      },
      // 设为主图
      setMasterImg(file) {
        this.masterImgUid = file.uid;
      },
      // 查看图片
      viewImg(file) {
        const index = this.getImgIndex(file);
        const viewer = this.$el.querySelector('.showView').$viewer;
        viewer.view(index);
      },
      // 删除图片
      deleteImg(file) {
        this.$confirm('确定要移除此图片吗？', {
          type: 'warning'
        }).then(() => {
          const index = this.getImgIndex(file);
          this.fileList.splice(index, 1);
          this.fileListData.splice(index, 1);
        }).catch(() => {
        });
      },
      beforeUpload(file) {
        const fileExt = file.name.replace(/.+\./, '');
        // 判断文件格式
        if (['jpg', 'jpeg', 'png', 'bmp'].indexOf(fileExt.toLowerCase()) === -1) {
          this.$alert('请上传后缀名为 jpg、jpeg、png 或 bmp 的图片', {
            confirmButtonText: '我知道了',
            type: 'warning'
          });
          return false;
        }
        // 判断文件大小
        if (file.size > this.maxFileSize * 1024 * 1024) {
          this.$alert(`上传的图片大小不能超过 ${this.maxFileSize}M`, {
            confirmButtonText: '我知道了',
            type: 'warning'
          });
          return false;
        }
        this.$store.dispatch('loadingCountIncrease');  // 添加加载动画
        this.disabled = this.fileList && this.fileList.length === this.limit;
      },
      // 文件上传成功
      success(response, file, fileList) {
        this.$store.dispatch('loadingCountReduce');  // 移除加载动画
        this.fileList = fileList;
        this.fileListData.push(response.data);
      },
      // 文件上传失败
      fileUploadError() {
        this.$store.dispatch('loadingCountReduce');  // 移除加载动画
      },
      // 获取上传的图片信息
      getData() {
        const index = this.getImgIndex({uid: this.masterImgUid});
        for (let i = 0; i < this.fileListData.length; i++) {
          this.fileListData[i].isMain = index === i ? 1 : 0;
        }
        return {
          fileList: this.fileList,
          fileListData: this.fileListData
        }
      },
      // 设置数据
      setData(data) {
        this.fileListData = [...data];
        this.fileList = data.map(item => {
          return {
            uid: item.id,
            url: item.url
          }
        });
        if (this.type === 20) {
          this.fileListData.forEach(item => {
            if (item.isMain === 1) {
              this.masterImgUid = item.id;
            }
          });
        }
      },
      // 设置组件是否锁定、禁用
      setDisabled(disabled) {
        this.disabled = disabled;
        this.itemDisabled = disabled;
      },
      // 组件重置
      reset() {
        this.fileList = [];
        this.fileListData = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-upload-list__item div {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /deep/ .el-upload-list__item-status-label {
    display: block !important;
  }

  /deep/ .disabled .el-upload--picture-card {
    display: none;
  }
</style>
