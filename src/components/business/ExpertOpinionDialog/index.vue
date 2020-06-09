<template>
  <div>
    <el-card shadow="never">
      <div slot="header">专家意见</div>
        <el-scrollbar :style="{height: (dialogHeight - 100) + 'px'}">
          <vertical-table
            style="width:100%;"
            :verticalTableData="personInfo"
            :verticalTableTitle="thingVerticalTableTitle"
            width="150px">
          </vertical-table>
        </el-scrollbar>
    </el-card>
  </div>
</template>
<script>
import VerticalTable from '@/components/commons/VerticalTable'
// import TableOptMenu from '@/components/commons/TableOptMenu'
export default {
  components: {
    VerticalTable
    // TableOptMenu
  },
  data() {
    return {
      personInfo: {
        instName:'通过',
        creditCode:'未通过',
        redStar:'待评审',
        address:'已撤回',
      },
      thingVerticalTableTitle: [
        { instName: '白衫' },
        { creditCode: '项瑾斐' },
        { redStar: '李树' },
        { address: '中国古迹遗址保护协会' },
      ],
    }
  },
  methods: {
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 360
        ? 360
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
</style>

