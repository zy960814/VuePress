<template>
  <div id="printDOMElement" class="content">
    <el-card shadow="never">
      <div slot="header" class="hxl__title">临时进境文物失效和延期情况统计</div>
      <table-opt-menu :data="tableOptMenu" @item-click="itemClick" style="margin: 5px 0">
      </table-opt-menu>
      <el-table :data="tableData" border stripe :height="tableHeight">
        <el-table-column
            prop="appr_inst_name"
            align="center"
            label="国家文物进出境审核管理处">
        </el-table-column>
        <el-table-column
            align="center"
            label="临时进境文物逾期数量">
          <el-table-column
              prop="wwcj_geren"
              align="center"
              label="批次">
          </el-table-column>
          <el-table-column
              align="center"
              label="件数">
            <template slot-scope="scope">
              <el-link
                  :underline="false"
                  type="primary"
                  @click="openDialog(scope.row, 'dialogVisible')">{{ scope.row.wwcj_geren }}
              </el-link>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            align="center"
            label="临时进境文物延期数量">
          <el-table-column
              prop="lscj_zhanlan"
              align="center"
              label="批次">
          </el-table-column>
          <el-table-column
              align="center"
              label="件数">
            <template slot-scope="scope">
              <el-link
                  :underline="false"
                  type="primary"
                  @click="openDialog(scope.row, 'delayDialogVisible')">{{ scope.row.lscj_zhanlan }}
              </el-link>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 逾期弹出框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        class="boxCard_dialog"
        :visible.sync="dialogVisible">
      <select-dialog :pageTabsData="pageTabsData" title="临时进境文物逾期统计">
        <template #body_1>
          <el-scrollbar :style="{height: height_self}">
            <overdue-dialog/>
          </el-scrollbar>
        </template>
      </select-dialog>
      <!--<span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>-->
    </my-dialog>
    <!-- 延期弹出框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        class="boxCard_dialog"
        :visible.sync="delayDialogVisible">
      <select-dialog :pageTabsData="pageTabsData" title="临时进境文物延期统计">
        <template #body_1>
          <el-scrollbar :style="{height: height_self}">
            <delay-dialog/>
          </el-scrollbar>
        </template>
      </select-dialog>
    </my-dialog>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import {print} from '@/utils/common'
  import MyDialog from '@/components/commons/MyDialog'
  import OverdueDialog from './OverdueDialog'
  import SelectDialog from '@/components/commons/SelectDialog'
  import DelayDialog from './DelayDialog'

  export default {
    components: {
      TableOptMenu,
      MyDialog,
      OverdueDialog,
      SelectDialog,
      DelayDialog
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: []
        },
        tableOptMenu: [{
          icon: 'el-icon-top-right',
          text: '导出',
          evt: 'export'
        }, {
          icon: 'el-icon-printer',
          text: '打印',
          evt: 'print'
        }],
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
        datePickerVal: null,
        tableData: [{
          appr_inst_name: '国家文物进出境审核北京管理处',
          wwcj_geren: 10,
          lscj_zhanlan: 6
        }, {
          appr_inst_name: '国家文物进出境审核天津管理处',
          wwcj_geren: 10,
          lscj_zhanlan: 6
        }],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 5
          },
          keyword: ''
        },
        dialogKey: 0,
        dialogVisible: false,
        delayDialogVisible: false
      }
    },
    computed: {
      tableHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 170 : 211) + 'px)'
      },
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 1130 ? 1130 : this.$store.getters.screenHeight;
      },
      height_self() {
        return this.$store.getters.screenHeight > 1200
          ? `1067 px`
          : `${this.$store.getters.screenHeight - 133}px`
      },
    },
    mounted() {

    },
    methods: {
      itemClick(evt) {
        switch (evt) {
          case 'print':
            print('printDOMElement');
            break;
          case 'export':
            break;
        }
      },
      search() {

      },
      openDialog(row, dialogFlag) {
        this.$data[dialogFlag] = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    /deep/ .el-card__header {
      padding-bottom: 10px;
    }

    /deep/ .el-dialog__body {
      padding: 0 20px;
    }

    /deep/ .el-card .el-card__body {
      padding-top: 0 !important;
      padding-bottom: 10px !important;
    }

    /deep/ .el-date-editor.el-input__inner {
      width: 260px;
    }
  }
</style>
