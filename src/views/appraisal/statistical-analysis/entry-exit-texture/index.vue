<template>
  <div id="printDOMElement" class="content">
    <el-card shadow="never">
      <div slot="header" class="hxl__title">进出境文物质地情况</div>
      <entry-exit-texture/>
    </el-card>
  </div>
</template>

<script>
  import EntryExitTexture from './EntryExitTexture'

  export default {
    components: {
      EntryExitTexture
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
