<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header" class="ao">考古项目管理</div>
      <waithandle-table />
    </el-card>
  </div>
</template>

<script>
import WaithandleTable from './WaithandleTable'
export default {
  name: 'archaeologyProject',
  components: {
    WaithandleTable
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  /deep/.el-dialog__body {
    padding: 0 20px;
  }
  /deep/ .el-card .el-card__body {
    padding-top: 0px !important;
    padding-bottom: 10px !important;
  }
}
</style>
