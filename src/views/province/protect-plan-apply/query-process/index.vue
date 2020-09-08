<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        保护规划申请进度查询
      </div>
      <waithandle-table />
     
    </el-card>
  </div>
</template>

<script>
// import PageTabs from '@/components/commons/PageTabs'
import WaithandleTable from './WaithandleTable'
// import AlreadyhandleTable from './AlreadyhandleTable'
// import { searchAlreadyHandle, searchWaitHandle } from '@/api/national'
export default {
  name: 'adminLaw',
  components: {
    WaithandleTable,
  },
  props: {},
  data() {
    return {
      
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {

  },
  destroyed() {},
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.content {
  /deep/.el-dialog__body {
    padding: 0 20px;
  }

  /deep/ .el-card .el-card__body {
    padding-top: 0px !important;
    padding-bottom: 10px!important;
  }
}
</style>
