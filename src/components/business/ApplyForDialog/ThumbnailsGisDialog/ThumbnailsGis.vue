<template>
  <div>
    <el-table :data="replyFileTableData" style="width: 100%">
      <el-table-column prop="networNum" label="批文编号" align="center" min-width="100"></el-table-column>
      <el-table-column prop="applyTitle" label="批文名称" align="center" min-width="100">
        <template slot-scope="scope">
          <span style="cursor:pointer;color: #2894FF" @click="downFile(scope.row.url)">{{scope.row.applyTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="批复日期" align="center" min-width="100">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.updateDate?moment(scope.row.updateDate).format('YYYY-MM-DD'):''}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="openShape" label="公开类型" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{isText(scope.row.openShape)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="networNum" label="数据来源" align="center" min-width="100">
        <template>
          <span>{{'国家文物局综合行政管理平台行政审批'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.pagination.currentPageNumber"
      :page-sizes="[10, 20]"
      :page-size="queryParams.pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
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
      totalCount: 0,
      queryParams: {
        pagination: {
            currentPage: 1,
            pageSize: 10
          },
      },
      Url: 'http://202.41.241.235/#/statelocation?showTowLine=1&showToolBox=1',
       //批复文件的table
      replyFileTableData:[
          {
            networNum:"网审190903009号",
            applyTitle:"河南省文物局关于再次上报洛阳红瞰国际建设项目涉及邙山陵墓群建设控制地带设计方案的请示",
            updateDate:"2019-09-15",
            openShape:"依申请公开",
            // networNum:"主动公开"
          },
          {
            networNum:"网审180124005号",
            applyTitle:"关于小浪底南岸灌区工程涉及邙山陵墓群及孝义兵工厂旧址保护范围和建设控制地带选址的请示（邙山陵墓群 ）",
            updateDate:"",
            openShape:"主动公开",
            // networNum:"主动公开"
          },
          {
            networNum:"网审176034号",
            applyTitle:"关于上报华润新能源洛阳偃师邙山风电场项目涉及邙山陵墓群设计方案的请示",
            updateDate:"",
            openShape:"主动公开",
            // networNum:"主动公开"
          },
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
    downFile(url) {
      console.log(url,'url')
        // window.open(apis.api_file_urlNew + url);
    },
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchWait()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchWait()
    },
    isText(params) {
      if (params == "1") {
          return "主动公开";
      } else if (params == "2") {
          return "依申请公开";
      } else {
          return "";
      }
    },
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 640
        ?  640
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

