<template>
  <div id="printDOMElement" class="content">
    <el-card shadow="never">
      <div slot="header" class="hxl__title">审核管理处审批数量情况统计</div>
      <entry-exit-approval/>
    </el-card>
  </div>
</template>

<script>
  import EntryExitApproval from './EntryExitApproval'

  export default {
    components: {
      EntryExitApproval
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
