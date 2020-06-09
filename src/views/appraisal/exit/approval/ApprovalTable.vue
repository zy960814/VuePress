<!-- 审批 -->
<template>
  <div>
    <table-opt-menu @item-click="itemClick" style="margin-bottom: 5px"/>
    <dynamic-table
        :tableData="tableData"
        :dialogShow.sync="headerDialogVisible"
        :search-height="0"
        v-if="dropColInit.length > 0 && checkCol.length > 0"
        @sort-change="sort"
        @header-dragend="headerDrag"
        @drop="saveDynamicCol"
        @check-header="saveDynamicCol"
        :checkColInit="checkCol"
        :dropColInit="dropColInit"
        minwidth="320px"
    >
      <template #operateInsert="scope">
        <table-button buttonName="办理" @button-click="handle(scope.scope.row)"/>
        <table-button buttonName="重新分办" @button-click="againBranch(scope.scope.row)"/>
        <table-button
            buttonName="办结"
            :disabled="scope.scope.row.isApprovalFinish !== 1"
            @button-click="complete(scope.scope.row)"/>
        <table-button buttonName="下载单证" @button-click="downloadDoc(scope.scope.row)"/>
        <table-button buttonName="流程跟踪" @button-click="processTracking(scope.scope.row)"/>
      </template>
    </dynamic-table>
    <el-pagination
        @size-change="sizeChange"
        @current-change="search"
        :current-page="queryParams.pagination.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
    ></el-pagination>
    <!-- 重新分办对话框 -->
    <my-dialog
        class="arrange_dialog"
        width="1124px"
        :height="arrangeDialogHeight + 'px'"
        @open="arrangeDialogKey += 1"
        :visible.sync="arrangeDialogVisible">
      <arrange-dialog ref="arrange" :content-height="arrangeDialogHeight" :key="arrangeDialogKey"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmBranch">确认</el-button>
        <el-button @click="arrangeDialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 下载单证对话框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible">
      <doc-download-dialog :content-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import DynamicTable from '@/components/commons/DynamicTable_f'
  import TableButton from '@/components/commons/TableButton'
  import {queryApplyAList} from '@/api/appraisal/exit'
  import {againBranch, tieUp} from '@/api/appraisal/temp-entry'
  import {saveDynamicCol, queryDynamicCol} from '@/api/basic'
  import MyDialog from '@/components/commons/MyDialog'
  import ArrangeDialog from './ArrangeDialog'
  import DocDownloadDialog from './DocDownloadDialog'

  export default {
    components: {
      TableOptMenu,
      DynamicTable,
      TableButton,
      MyDialog,
      ArrangeDialog,
      DocDownloadDialog
    },
    data() {
      return {
        // 列表类型, 常量
        tableType: 'cr_appraisal_a_4',
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
            currentStatus: 'approval'
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
          label: '单证类型',
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
        headerDialogVisible: {flag: false},  // 表头配置对话框是否显示
        // 表格表头属性
        checkCol: [],
        // 表格表头拖拽显隐后的属性
        dropColInit: [],
        arrangeDialogVisible: false,
        arrangeDialogKey: 0,
        dialogVisible: false,
        dialogKey: 0,
      }
    },
    computed: {
      arrangeDialogHeight: function () {
        return this.$store.getters.screenHeight > 654 ? 654 : this.$store.getters.screenHeight;
      },
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 654 ? 654 : this.$store.getters.screenHeight;
      },
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
      // 办理
      handle(row) {
        this.$router.push(`/appraisal/exit/approval/deal-with?id=${row.id}`);
      },
      // 重新分办
      againBranch(row) {
        this.$store.dispatch('setTempEntryItemId', row.id);
        this.arrangeDialogVisible = true;
      },
      // 确认重新分办
      confirmBranch() {
        this.$refs.arrange.branch().then(formData => {
          againBranch(formData).then(() => {
            this.search();
            this.arrangeDialogVisible = false;
            this.$message({
              message: '重新分办成功',
              type: 'success'
            });
          });
        });
      },
      // 办结
      complete(row) {
        tieUp({
          itemId: row.id
        }).then(() => {
          this.search(this.queryParams.pagination.currentPage);
          this.$message({
            message: '办结成功',
            type: 'success'
          });
        });
      },
      // 下载单证
      downloadDoc(row) {
        this.$store.dispatch('setTempEntryItemId', row.id);
        this.dialogVisible = true;
      },
      // 流程跟踪
      processTracking(row) {
        console.log('流程跟踪', row);
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 10px 20px 20px;
  }

  .arrange_dialog /deep/ .el-dialog__footer {
    padding: 0 35px 20px;
  }
</style>
