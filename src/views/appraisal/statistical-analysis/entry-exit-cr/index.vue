<template>
  <div id="printDOMElement" class="content">
    <el-card shadow="never">
      <div slot="header" class="hxl__title">审核管理处进出境文物情况统计</div>
      <entry-exit-cr/>
    </el-card>
  </div>
</template>

<script>
  import EntryExitCr from './EntryExitCr'

  export default {
    components: {
      EntryExitCr
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
