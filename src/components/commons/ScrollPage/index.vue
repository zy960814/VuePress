<template>
  <div class="dialogcard_scoll">
    <my-dialog
      :title="title"
      :visible.sync="dialogShow"
      :before-close="handleClose"
      width="1093px"
      height="500px"
      :center="true"
    >
      <div class="dialogcard_scoll">
        <div class="dialogcard_content">
          <slot name="content"></slot>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from "@/components/commons/MyDialog";
export default {
  name: "ScrollPage",
  components: { MyDialog },
  props: {
    // 控制对话框显隐
    dialogShow: {
      type: Boolean,
      require: true
    },
    title: {
      type: String
    }
  },
  methods: {
    closeDia() {
      this.$emit("dialog-update", false);
    },
    // 叉叉
    handleClose() {
      this.$emit("dialog-update", false);
      // done();
    }
  }
};
</script>

<style lang="scss" scoped>
// /deep/.el-dialog__wrapper {
//   position: fixed;
//   top: 0;
//   bottom: 0px;
//   right: 0;
//   left: 0;
//   overflow: hidden;
//   margin: 0;
// }
// 事项名称按钮弹出框样式
/deep/ .el-dialog {
  // margin-top: unset !important;
  // top: 50%;
  // transform: translateY(-50%);
  // -ms-transform: translateY(-66%);

  // // margin-bottom: 5vh;
  // width: 90%;
  // 弹出框头部样式
  .el-dialog__header {
    color: black;
    font-weight: 700;
    padding: 15px;
    margin: 0px 25px;
    border-bottom: 1px solid #ccc;
  }
  .el-dialog__body {
    padding-top: 10px;
  }
  // 小叉叉样式
  .el-dialog__headerbtn {
    top: 10px;
  }
  // 事项名称按钮弹出框卡片内容滚动样式3
  .dialogcard_scoll {
    height: 400px;
    // padding-bottom: 20px;
    overflow-y: auto;
    .dialogcard_content {
      // margin-top: 10px;
      // height: 2200px;
    }
  }
}
</style>