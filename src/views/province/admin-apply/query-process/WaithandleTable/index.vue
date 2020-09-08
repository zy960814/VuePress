<template>
  <div class="waitHandle">
    <div class="headerTable"></div>
    <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
      <el-button
        type="primary"
        size="mini"
        class="mr-10"
        @click="add()">新建
      </el-button>
      <el-date-picker
        v-model="datePickerVal"
        @change="search"
        type="daterange"
        size="mini"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="vertical-align: middle;"
        :picker-options="pickerOptions">
      </el-date-picker>
    </table-opt-menu>
    <el-table :data="tableData" border stripe :height="contentHeight">
      <el-table-column min-width="55"  label="序号" type="index" :index="indexMethod" ></el-table-column>
      <el-table-column
          min-width="180"
          prop="organizationName"
          align="center"
          label="申请事项类型">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          align="center"
          label="申报类型">
      </el-table-column>
      <el-table-column 
          min-width="180"
          prop="applicant_name"
          align="center"
          label="申请文件标题">
      </el-table-column>
      <el-table-column 
          min-width="180"
          prop="batchNum"
          align="center"
          label="经办人">
      </el-table-column>
      <el-table-column 
          min-width="180"
          prop="telNo"
          align="center"
          label="申请时间">
      </el-table-column>
      <el-table-column 
          min-width="180"
          prop="currentStatus"
          align="center"
          label="办理状态">
      </el-table-column>
      <el-table-column 
          min-width="180"
          prop="zipCode"
          align="center"
          label="流水号">
      </el-table-column>
      <el-table-column label="操作" min-width="220" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" v-if="scope.row.currentStatus == '填写中'" @click = "findWorkOrder">修改</el-button>
          <el-button type="primary" plain size="mini" v-if="scope.row.currentStatus != '填写中'" @click = "findWorkOrder">查看</el-button>
          <el-button type="primary" plain size="mini" v-if="scope.row.currentStatus != '填写中'" @click = "findWorkOrder">撤回</el-button>
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
import TableOptMenu from '@/components/commons/TableOptMenu'
export default {
  name: 'WaithandleTable',
  components: {
    TableOptMenu,
  },
  props: {
    selectMenuItem: {
      type: String,
      require: true
    },
    waitHandleTableOut: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      tableData: [
        {
          address: '青海省西宁市城西区西关大街58号',
          batchNum: '施工三级',
          districtCode: '填写中',
          gmtCreate: '2020-02-05 07:23:46',
          organizationName: '龙泉观松古建筑工程有限公司',
          telNo: '0971-6118691',
          zipCode: '810000',
          currentStatus: '已提交'
        },
        {
          address: '青海省西宁市城西区西关大街58号',
          batchNum: '施工三级',
          districtCode: '待审核',
          gmtCreate: '2020-02-05 07:23:46',
          organizationName: '龙泉观松古建筑工程有限公司',
          telNo: '0971-6118691',
          zipCode: '810000',
          currentStatus: '填写中'
        }
      ],
      datePickerVal: null,
      currentPageNumber: '',
      queryParams: {
        pagination:{
          currentPageNumber:1,
          pageSize:10
        }
      },
      totalCount: 0,
      pickerOptions: {
          shortcuts: [{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
  computed: {
    contentHeight: function() {
      return (
        'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 215 : 300) + 'px)'
      )
    },
  },
  mounted() {},
  methods: {
    search() {

    },
    add() {
       this.$router.push(`/province/admin-apply`)
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
     //表头的序号
    indexMethod(index) {
      return ++index;
    },
    // 表头配置
    headerSetting() {
      this.headerDialogVisible.flag = true
    },
    // 搜索按钮
    searchFun() {
    },

    //重置
    resetForm() {
     
    },
    tableFillin(row) {
      console.log(row,'row')
      // console.log(this.queryParams)
      this.$router.push(`/national/admin-license/licensing-items/deal-with?applyCode=${row.applyCode}`)
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
  }
}
</script>

<style lang="scss" scoped>
  .textRight {
    float: right;
  }
  /deep/ .el-table th > .cell {
    text-align: center;
  }
  /deep/ .el-table .cell {
    text-align: center;
  }
  /deep/ .collapse-form {
    text-align: left !important;
  }
  .right /deep/ .el-dialog__footer {
    text-align: right!important;
  }
  .right {
    margin-top: 10px;
    text-align: right
  }
  .headerTable {
    margin: 10px -20px;
    border-top: 1px solid #e6ebf5;
  }
.row_1 {
  display: inline-block;
  margin: 0 auto;

  .keyword {
    width: 540px;
  }
  /deep/ .el-date-editor.el-input__inner {
    width: 260px;
  }

  /deep/ .el-input-group__prepend {
    width: 128px;
    background-color: #fff;

    .el-input__inner {
      width: 131px;
    }
  }

  // /deep/ .el-input__inner {
  //   width: 350px;
  // }
}
</style>
