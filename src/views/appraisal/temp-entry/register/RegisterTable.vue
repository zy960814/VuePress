<!-- 登记分办 -->
<template>
  <div>
    <table-opt-menu @item-click="itemClick" style="margin-bottom: 5px"/>
    <dynamic-table
        :tableData="tableData"
        :fixButtonArr="fixButtonArr"
        :dialogShow.sync="headerDialogVisible"
        :search-height="0"
        v-if="dropColInit.length > 0 && checkCol.length > 0"
        @sort-change="sort"
        @header-dragend="headerDrag"
        @drop="saveDynamicCol"
        @check-header="saveDynamicCol"
        :checkColInit="checkCol"
        :dropColInit="dropColInit"
        minwidth="315px">
      <template #operateInsert="scope">
        <table-button buttonName="修改" @button-click="modify(scope.scope.row)"/>
        <table-button buttonName="登记" @button-click="register(scope.scope.row)"/>
        <table-button buttonName="分办" @button-click="arrange(scope.scope.row)"/>
        <table-button
            v-if="scope.scope.row.isExhibition === '个人'"
            buttonName="上传海关关单"
            @button-click="uploadDoc(scope.scope.row)"/>
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
    <!-- 登记对话框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible">
      <register-dialog :content-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
    <!-- 分办对话框 -->
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
    <!-- 上传海关关单 -->
    <my-dialog
        width="375px"
        height="255px"
        class="boxCard_dialog"
        @open="customsDialogKey += 1"
        :visible.sync="customsDialogVisible">
      <upload-customs-file-dialog :item-id="customsFileItemId" :key="customsDialogKey"/>
    </my-dialog>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import DynamicTable from '@/components/commons/DynamicTable_f'
  import {queryApplyBList, registerAll, branch} from '@/api/appraisal/temp-entry'
  import {saveDynamicCol, queryDynamicCol} from '@/api/basic'
  import MyDialog from '@/components/commons/MyDialog'
  import RegisterDialog from './RegisterDialog'
  import ArrangeDialog from './ArrangeDialog'
  import TableButton from '@/components/commons/TableButton'
  import UploadCustomsFileDialog from './UploadCustomsFileDialog'

  export default {
    components: {
      TableOptMenu,
      DynamicTable,
      MyDialog,
      RegisterDialog,
      ArrangeDialog,
      TableButton,
      UploadCustomsFileDialog
    },
    data() {
      return {
        // 列表类型, 常量
        tableType: 'cr_appraisal_b_2',
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
            currentStatus: 'register'
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
          label: '申请事项名称',
          prop: 'itemName',
          width: 150,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
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
          prop: 'xxx',
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
          prop: 'crEntryAimName',
          width: 270,
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
        }, {
          label: '类型',
          prop: 'isExhibition',
          width: 170,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }],
        fixButtonArr: [], // 操作列按钮
        headerDialogVisible: {flag: false},  // 表头配置对话框是否显示
        // 表格表头属性
        checkCol: [],
        // 表格表头拖拽显隐后的属性
        dropColInit: [],
        dialogVisible: false,
        dialogKey: 0,
        arrangeDialogVisible: false,
        arrangeDialogKey: 0,
        customsDialogVisible: false,
        customsDialogKey: 0,
        customsFileItemId: ''
      }
    },
    computed: {
      // 弹出框
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 904 ? 904 : this.$store.getters.screenHeight;
      },
      arrangeDialogHeight: function () {
        return this.$store.getters.screenHeight > 654 ? 654 : this.$store.getters.screenHeight;
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
        queryApplyBList(this.queryParams).then(({data}) => {
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
      // 修改
      modify(row) {
        const path = row.isExhibition === '展览'
          ? `/appraisal/temp-entry/register/modify/exhibition-apply?id=${row.id}`
          : `/appraisal/temp-entry/register/modify/personal-carry-apply?id=${row.id}`;
        this.$router.push(path);
      },
      // 登记
      register(row) {
        this.$store.dispatch('setTempEntryItemId', row.id);
        this.dialogVisible = true;
      },
      // 分办
      arrange(row) {
        registerAll({
          itemId: row.id,
          operate: '0'  // 查询是否全部登记
        }).then(({data}) => {
          if (data > 0) {
            this.$confirm(`您还有${data}个文物或复仿制品尚未登记，是否一键登记并分办？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              registerAll({
                itemId: row.id,
                operate: '1'  // 全部登记
              }).then(() => {
                this.$message({
                  message: '一键登记成功',
                  type: 'success'
                });
                this.$store.dispatch('setTempEntryItemId', row.id);
                this.arrangeDialogVisible = true;
              });
            }).catch(() => {
            });
          } else {
            this.$store.dispatch('setTempEntryItemId', row.id);
            this.arrangeDialogVisible = true;
          }
        });
      },
      // 上传海关关单
      uploadDoc(row) {
        this.customsFileItemId = row.id;
        this.customsDialogVisible = true;
      },
      // 流程跟踪
      processTracking(row) {
        console.log(row);
      },
      // 确认分办
      confirmBranch() {
        this.$refs.arrange.branch().then(formData => {
          branch(formData).then(() => {
            this.search();
            this.arrangeDialogVisible = false;
            this.$message({
              message: '分办成功',
              type: 'success'
            });
          });
        });
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
