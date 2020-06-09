<template>
  <div class="center">
    <el-card shadow="never">
      <div slot="header">流程跟踪</div>
        <el-scrollbar :style="{height: (dialogHeight - 145) + 'px'}">
          <el-row class="buttonIcon">
            <el-tooltip class="item" effect="dark" content="导出" placement="top-start">
              <el-button size="mini" icon="el-icon-top-right" style="vertical-align: middle;"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="打印" placement="top-start">
              <el-button size="mini" icon="el-icon-printer" style="vertical-align: middle;"></el-button>
            </el-tooltip>
          </el-row>
          <el-table :data="tableData" style="width: 100%" >
            <el-table-column label="序号" width="50" type="index" :index="indexMethod" prop="date" ></el-table-column>
            <el-table-column label="姓名" min-width="70" prop="name" ></el-table-column>
            <el-table-column label="部门" min-width="70" prop="department" ></el-table-column>
            <el-table-column label="操作记录" min-width="80" prop="record" ></el-table-column>
            <el-table-column label="办理意见" min-width="80" prop="blyj" ></el-table-column>
            <el-table-column label="接收时间" min-width="80" prop="jssj"></el-table-column>
            <el-table-column label="发送时间" min-width="80" prop="fssj" ></el-table-column>
            <el-table-column label="停留时间" min-width="80" prop="tlsj" ></el-table-column>
            <el-table-column label="办结期限剩余天数" min-width="120" prop="bjqxsyts" ></el-table-column>
            <el-table-column label="催办信息" min-width="180" prop="cbxx"></el-table-column>
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
      tableData:[
        {
          name: '文书室',
          department: '省局',
          record: '已发送',
          blyj: '不通过',
          jssj: '12：20',
          fssj: '3:10',
          tlsj: '12：40',
          bjqxsyts: '1',
          cbxx: '着急'
        }
      ]
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
      return this.$store.getters.screenHeight > 600
        ?  600
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
  /deep/ .el-dialog--center {
    text-align: right!important;
  }
  .buttonIcon { 
    top: 0px;
    text-align: right;
    margin-bottom: 10px;
  }
  // /deep/ .el-table--scrollable-x .el-table__body-wrapper{
  //   overflow-x: hidden;
  // }
</style>

