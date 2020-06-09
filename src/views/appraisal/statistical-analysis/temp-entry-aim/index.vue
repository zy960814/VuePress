<template>
  <div id="printDOMElement" class="content">
    <el-card shadow="never">
      <div slot="header" class="hxl__title">文物临时进境目的情况</div>
      <temp-entry-aim/>
    </el-card>
  </div>
</template>

<script>
  import TempEntryAim from './TempEntryAim'

  export default {
    components: {
      TempEntryAim
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
