<template>
  <div>
    <el-card shadow="never">
      <div slot="header">表单修改痕迹</div>
        <el-scrollbar :style="{height: (dialogHeight - 100) + 'px'}">
          <el-table :data="replyFileTableData" style="width: 100%">
            <el-table-column label="序号" width="50" type="index" :index="indexMethod" prop="date" ></el-table-column>
            <el-table-column prop="networNum" label="栏目名称" align="center" min-width="100"></el-table-column>
            <el-table-column prop="applyTitle" label="栏目原值" align="center" min-width="100"></el-table-column>
            <el-table-column prop="openShape" label="栏目新值" align="center" min-width="100"></el-table-column>
            <el-table-column prop="updateDate" label="版本日期" align="center" min-width="100"></el-table-column>
            <el-table-column prop="networNum" label="操作人" align="center" min-width="100"></el-table-column>
          </el-table>
        </el-scrollbar>
    </el-card>
  </div>
</template>
<script>
// import TableOptMenu from '@/components/commons/TableOptMenu'
export default {
  components: {
    // TableOptMenu
  },
  data() {
    return {
      replyFileTableData:[
          {
            networNum:"公开形式",
            applyTitle:"主动公开",
            updateDate:"2019-09-15",
            openShape:"依申请公开",
            networName:"闫亚林"
          },
          {
            networNum:"办件结果",
            applyTitle:"批准",
            updateDate:"不批准",
            openShape:"2019-09-15",
            networName:"叶思茂"
          },
          {
            networNum:"网审176034号",
            applyTitle:"局章",
            updateDate:"不批准",
            openShape:"2019-09-15",
            networName:"叶思茂"
          },
      ],
    }
  },
  methods: {
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 560
        ?  560
        : this.$store.getters.screenHeight;
    },
  },
}
</script>
<style lang="scss" scoped>
 .buttonRgith {
   text-align: right;
   margin-bottom: 10px;
 }
 /deep/ .el-scrollbar__wrap {
   overflow-x: hidden;
 }
 
  // /deep/ .el-table--scrollable-x .el-table__body-wrapper{
  //   overflow-x: hidden;
  // }
</style>

