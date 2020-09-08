<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        年度计划申请进度查询
      </div>
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
      <el-table :data="tableData" border stripe :height="tableHeight" :span-method="objectSpanMethod">
      <el-table-column
          fixed="left"
          prop="appr_inst_name"
          align="center"
          label="事项名称">
      </el-table-column>
      <el-table-column
          prop="dealStatus"
          align="center"
          label="申报类型">
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template>
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">申请</el-button>
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
     
    </el-card>
  </div>
</template>

<script>
import TableOptMenu from '@/components/commons/TableOptMenu'
// import WaithandleTable from './WaithandleTable'
// import AlreadyhandleTable from './AlreadyhandleTable'
// import { searchAlreadyHandle, searchWaitHandle } from '@/api/national'
export default {
  name: 'adminLaw',
  components: {
    TableOptMenu,
  },
  props: {},
  data() {
    return {
       // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      nowRow:{},
      rowArr:[],//记录是够有重复的下标
      rowSpanArr:[],//记录出现次数
      tableData: [],
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
    tableHeight: function () {
      return 'calc(100vh - ' + ((this.$store.getters.menuStyle === 1
          ? 170 : 211) + this.heightOffset) + 'px)'
    }
  },
  watch: {
    tableData(newVal){ // 处理表格数据 同样的名字合并
      console.log(newVal,11111);
      this.tableData=newVal;
      this.nowRow=this.tableData[0];
      if(newVal){
        let tempItem={
          name:'',
          idnex:0
        };
        newVal.forEach((item,index)=>{// 处理名字是否重复的表格
          if(item.appr_inst_name==tempItem.name){
            this.rowSpanArr[this.rowArr.indexOf(tempItem.index)]++;
          } else{
            tempItem.name=item.appr_inst_name;
            tempItem.index=index;
            this.rowArr.push(index);
            this.rowSpanArr.push(1)
          }
        });
        console.log(this.rowArr);
        console.log(this.rowSpanArr);
      }
    }
  },
  created() {},
  mounted() {
    this.tableData=[
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '安全防护年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '安全防护年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '安全防护年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '安全防护年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '革命文物保护年度计划',
        dealStatus: '不可移动文物保护项目',
      }, {
        appr_inst_name: '革命文物保护年度计划',
        dealStatus: '可移动文物保护项目',
      },
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
      {
        appr_inst_name: '文保修缮年度计划',
        dealStatus: '新申请事项',
      },
    ]
  },
  destroyed() {},
  methods: {
    handleEdit() {

    },
    findWorkOrder() {

    },
    search() {

    },
    add() {
       this.$router.push(`/personal/schedule/56022/n_protectPlan`)
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
    objectSpanMethod({row,col,rowIndex, columnIndex}) {

      if(columnIndex===0){
        console.log(rowIndex,columnIndex);
        let index=this.rowArr.indexOf(rowIndex)
        if(index!==-1){
          return{
            rowspan:this.rowSpanArr[index],
            colspan:1,
          }
        } else{
          return {
            rowspan:0,
            colspan:0,
          }
        }

      }
        // if (columnIndex === 0) {
        //   if (rowIndex  === 3) {
        //     return {
        //       rowspan: 1,
        //       colspan: 1
        //     };
        //   } else {
        //     return {
        //       rowspan: 2,
        //       colspan: 2
        //     };
        //   }
        // }
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
.content {
  /deep/.el-dialog__body {
    padding: 0 20px;
  }
  .headerTable {
    margin: 10px -20px;
    border-top: 1px solid #e6ebf5;
  }
  /deep/ .el-card .el-card__body {
    padding-top: 0px !important;
    padding-bottom: 10px!important;
  }
}
</style>
