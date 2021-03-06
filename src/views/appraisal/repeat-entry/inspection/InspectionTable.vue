<!-- 查验 -->
<template>
  <div>
    <table-opt-menu @item-click="itemClick" style="margin-bottom: 5px"/>
    <dynamic-table
        :tableData="tableData"
        :fixButtonArr="fixButtonArr"
        :dialogShow.sync="headerDialogVisible"
        :search-height="0"
        v-if="dropColInit.length > 0 && checkCol.length > 0"
        @click-0="click_0"
        @click-1="click_1"
        @sort-change="sort"
        @header-dragend="headerDrag"
        @drop="saveDynamicCol"
        @check-header="saveDynamicCol"
        :checkColInit="checkCol"
        :dropColInit="dropColInit"
        minwidth="255px"
    />
    <el-pagination
        @size-change="sizeChange"
        @current-change="search"
        :current-page="queryParams.pagination.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import DynamicTable from '@/components/commons/DynamicTable'
  import {queryApplyEList,getNoInspectionNum, batchInspection} from '@/api/appraisal/repeat-entry'
  import {saveDynamicCol, queryDynamicCol} from '@/api/basic'

  export default {
    components: {
      TableOptMenu,
      DynamicTable
    },
    data() {
      return {
        // 列表类型, 常量
        tableType: 'cr_appraisal_e_3',
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: {
            applyTime: 'desc'
          },
          condition: {
            currentStatus: 'appraisal'
          }
        },
        originalCol: [{
          label: '序号',
          prop: 'num',
          width: 100,
          sortable: false, //是否显示排序图标
          insertFlagArr: {alertbutton: false}, // 表头自定义组件
          collapse: false //展开收起
        }, {
          label: '申请人',
          prop: 'applyAccountName',
          width: 300,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '携运人',
          prop: 'carryPerson',
          width: 200,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '剩余时间（工作日）',
          prop: 'xx',
          width: 200,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '预约时间',
          prop: 'appointmentTime',
          width: 200,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '申请时间',
          prop: 'applyTime',
          width: 200,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '进境目的',
          prop: 'xx',
          width: 170,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '进境海关',
          prop: 'customs',
          width: 170,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '携运数量',
          prop: 'carryAmount',
          width: 170,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '流水号',
          prop: 'serialNum',
          width: 170,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }],
        fixButtonArr: ['办理', '批量查验', '退回', '流程跟踪'], // 操作列按钮
        headerDialogVisible: {flag: false},  // 表头配置对话框是否显示
        // 表格表头属性
        checkCol: [],
        // 表格表头拖拽显隐后的属性
        dropColInit: []
      }
    },
    mounted() {
      this.queryCol();
      this.search();
    },
    methods: {
      queryCol() {
        queryDynamicCol(this.tableType).then(({data}) => {
          if (data.tableType !== '未定义') {
            this.checkCol = data.checkCol;
            this.dropColInit = data.dropColInit;
          } else {
            this.checkCol = [...this.originalCol];
            this.dropColInit = [...this.originalCol];
          }
        });
      },
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        queryApplyEList(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
        });
      },
      // 表格排序按钮点击函数
      // { column, prop, order }-同elementui
      // dropCol-表头数组
      sort({prop, order}) {
        if (order == null) {
          this.queryParams.sort = {applyTime: 'desc'};
        } else {
          const param = {};
          param[prop] = order === 'ascending' ? 'asc' : 'desc';
          this.queryParams.sort = param;
        }
        this.search();
      },
      // 列宽拖动函数
      // newWidth, oldWidth, column, event-同elementui
      // dropCol-表头数组
      headerDrag(newWidth, oldWidth, column, event, dropCol, checkCol) {
        this.saveDynamicCol(dropCol, checkCol);
      },
      // 保存动态列数据
      saveDynamicCol(dropCol, checkCol) {
        this.dropColInit = dropCol;
        this.checkColInit = checkCol;
        saveDynamicCol({
          tableType: this.tableType,
          checkCol: this.checkColInit,
          dropColInit: this.dropColInit
        });
      },
      itemClick(evt) {
        switch (evt) {
          case 'set-up':
            this.headerDialogVisible.flag = true;
            break;
        }
      },
      click_0(row) {
        const path = `/appraisal/repeat-entry/inspection/deal-with?id=${row.id}`;
        this.$router.push(path);
      },
      click_1(row) {
        getNoInspectionNum({
          itemId: row.id
        }).then(({data}) => {
          if (Number(data) > 0) {
            this.$confirm(`您还有${data}个文物或复仿制品尚未查验，是否一键查验并提交？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.batchInspection(row.id);
            }).catch(() => {
            });
          } else {
            this.batchInspection(row.id);
          }
        });
      },
      // 批量查验
      batchInspection(itemId) {
        batchInspection({
          itemId: itemId,
          isCr: '1',
          approvalFlag: '0'
        }).then(() => {
          this.search(this.queryParams.pagination.currentPage);
          this.$message({
            message: '批量查验成功',
            type: 'success'
          });
        });
      }
    }
  }
</script>
