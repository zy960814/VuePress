<template>
  <div id="printDOMElement" class="content">
    <el-card shadow="never">
      <div slot="header" class="hxl__title">文物临时进境许可失效情况</div>
      <entry-permission-invalid/>
    </el-card>
  </div>
</template>

<script>
  import EntryPermissionInvalid from './EntryPermissionInvalid'

  export default {
    components: {
      EntryPermissionInvalid
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    /deep/ .el-card__header {
      padding-bottom: 10px;
    }

    /deep/ .el-dialog__body {
      padding: 0 20px;
    }

    /deep/ .el-card .el-card__body {
      padding-top: 0 !important;
      padding-bottom: 10px !important;
    }
  }
</style>
