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
    <!-- 批量鉴定对话框 -->
    <my-dialog
        width="500px"
        height="250px"
        @open="dialogKey += 1"
        class="boxCard_dialog"
        :visible.sync="dialogVisible">
      <select-dialog :pageTabsData="{tabs: []}" title="批量鉴定操作">
        <template #body_1>
          <batch-appraisal-dialog ref="batchAppraisalDialog" :key="dialogKey"/>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchAppraisal">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import DynamicTable from '@/components/commons/DynamicTable'
  import {queryApplyAList} from '@/api/appraisal/exit'
  import {saveDynamicCol, queryDynamicCol} from '@/api/basic'
  import {getNoInspectionNum, batchInspection} from '@/api/appraisal/temp-entry'
  import MyDialog from '@/components/commons/MyDialog'
  import SelectDialog from '@/components/commons/SelectDialog'
  import BatchAppraisalDialog from './BatchAppraisalDialog'

  export default {
    components: {
      TableOptMenu,
      DynamicTable,
      MyDialog,
      SelectDialog,
      BatchAppraisalDialog
    },
    data() {
      return {
        // 列表类型, 常量
        tableType: 'cr_appraisal_a_3',
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
          label: '出境目的地',
          prop: 'destination',
          width: 270,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '出境海关',
          prop: 'customsOut',
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
        fixButtonArr: ['办理', '批量鉴定', '退回', '流程跟踪'], // 操作列按钮
        headerDialogVisible: {flag: false},  // 表头配置对话框是否显示
        // 表格表头属性
        checkCol: [],
        // 表格表头拖拽显隐后的属性
        dropColInit: [],
        // 批量鉴定对话框显示控制
        dialogVisible: false,
        dialogKey: 0,
        // 记录当前选择的批量查验的事项ID
        currentItemId: null
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
        queryApplyAList(this.queryParams).then(({data}) => {
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
        this.$router.push(`/appraisal/exit/appraisal/deal-with?id=${row.id}`);
      },
      // 批量鉴定点击事件
      click_1(row) {
        getNoInspectionNum({
          itemId: row.id
        }).then(({data}) => {
          if (Number(data) > 0) {
            this.currentItemId = row.id;
            this.dialogVisible = true;
          } else {
            this.batchAppraisal();
          }
        });
      },
      // 批量鉴定
      batchAppraisal() {
        /*this.$confirm(`您的鉴定结果为：XXX个是文物，XXX个不是文物，XXX个允许出境，XXX个不允许出境，是否提交？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {*/
          batchInspection({
            itemId: this.currentItemId,
            ...this.$refs.batchAppraisalDialog.getData()
          }).then(() => {
            this.search(this.queryParams.pagination.currentPage);
            this.$message({
              message: '批量鉴定成功',
              type: 'success'
            });
          });
        /*}).catch(() => {
        });*/
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__footer {
    padding: 10px 20px;
  }
</style>
