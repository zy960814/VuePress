<template>
  <apply-form-item class="cr-info" data="文物或复仿制品信息">
    <div style="padding: 10px 18px">
      <div class="row_1">
        <div>
          <el-tooltip
              :disabled="addBtnEnabled"
              effect="dark"
              content="请先填写申请事项名称并保存"
              placement="top-start">
            <span style="margin-right: 10px">
              <el-button
                  :disabled="!addBtnEnabled"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="openViewDialog(null, 'add')">添加</el-button>
            </span>
          </el-tooltip>
          <el-tooltip
              :disabled="addBtnEnabled"
              effect="dark"
              content="请先填写申请事项名称并保存"
              placement="top-start">
            <span style="margin-right: 10px">
              <el-button
                  :disabled="!addBtnEnabled"
                  type="primary"
                  @click="dialogVisible = true">批量修改</el-button>
            </span>
          </el-tooltip>
          <el-button @click="handleBatchDel" type="danger">批量删除</el-button>
          <el-button type="success">批量上传</el-button>
        </div>
        <div style="margin-top: 6px">
          <el-link @click="fillInDialogVisible = true" type="primary">填写说明</el-link>
        </div>
      </div>
      <el-table ref="table" :data="tableData" border>
        <el-table-column
            type="selection"
            align="center"
            width="50">
        </el-table-column>
        <el-table-column label="序号" align="center" width="80">
          <template slot-scope="scope">
            {{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
            label="文物或复仿制品名称"
            width="180">
          <template slot-scope="scope">
            <el-link
                :underline="false"
                type="primary"
                @click="openViewDialog(scope.row, 'view')">{{ scope.row.crName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="realSize"
            label="尺寸">
        </el-table-column>
        <el-table-column
            prop="crTextureName"
            label="质地">
        </el-table-column>
        <el-table-column
            prop="crClass"
            label="类别">
        </el-table-column>
        <el-table-column
            prop="crLevelName"
            label="级别">
        </el-table-column>
        <el-table-column
            prop="crAge"
            label="年代">
        </el-table-column>
        <el-table-column
            prop="amount"
            label="数量">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注">
        </el-table-column>
        <el-table-column
            label="照片">
        </el-table-column>
        <el-table-column
            width="120"
            fixed="right"
            align="center"
            label="操作">
          <template slot-scope="scope">
            <table-button @button-click="openViewDialog(scope.row, 'modify')" button-name="修改"/>
            <table-button @button-click="handleDel(scope.row)" button-name="删除"/>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- 文物、复仿制品批量添加或修改对话框 -->
    <my-dialog width="1124px" :height="dialogHeight + 'px'"
               @open="dialogOpen" @close="search" :visible.sync="dialogVisible">
      <add-cultural-relic :content-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
    <!-- 填写说明对话框 -->
    <div class="fill-dialog">
      <my-dialog width="1124px" height="620px" :modal-append-to-body="true" :visible.sync="fillInDialogVisible">
        <fill-in-instructions/>
        <span slot="footer">
          <el-button @click="fillInDialogVisible = false">关闭</el-button>
        </span>
      </my-dialog>
    </div>
    <!-- 文物、复仿制品新增、修改、查看对话框 -->
    <my-dialog width="844px" :height="dialogHeight + 'px'"
               @open="viewDialogKey += 1" @close="search" :visible.sync="viewDialogVisible">
      <view-cultural-relic
          @edit-success = "viewDialogVisible = false"
          :content-height="dialogHeight"
          :opt="viewDialogOpt"
          :key="viewDialogKey"/>
    </my-dialog>
  </apply-form-item>
</template>

<script>
  import MyDialog from '@/components/commons/MyDialog'
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import AddCulturalRelic from './AddCulturalRelic'
  import {listCulturalRelic, delCulturalRelic} from '@/api/personal/schedule/56020/temp-entry'
  import TableButton from '@/components/commons/TableButton'
  import FillInInstructions from './FillInInstructions'
  import ViewCulturalRelic from './ViewCulturalRelic'

  export default {
    components: {
      MyDialog,
      ApplyFormItem,
      AddCulturalRelic,
      TableButton,
      FillInInstructions,
      ViewCulturalRelic
    },
    data() {
      return {
        dialogKey: 0,
        dialogVisible: false,
        tableData: [],
        totalCount: 0,
        queryParams: {
          condition: {
            itemId: ''
          },
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: {}
        },
        fillInDialogVisible: false,  // 填写说明对话框
        viewDialogVisible: false,  // 查看、修改对话框
        viewDialogKey: 0,
        viewDialogOpt: 'view',  // 操作类型：修改、查看
      }
    },
    computed: {
      // 添加按钮是否可以点击
      addBtnEnabled: function () {
        return this.$store.state._20.tempEntryItemId != null;
      },
      // 弹出框
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 904 ? 904 : this.$store.getters.screenHeight;
      }
    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        this.queryParams.condition.itemId = this.$store.state._20.tempEntryItemId;
        listCulturalRelic(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
        });
      },
      // 弹框打开事件
      dialogOpen() {
        this.$store.dispatch('setTempEntryApplyCurrItem', {
          id: null,
          listQuery: false,
          detailQuery: false
        });
        this.dialogKey++;
      },
      // 批量删除
      handleBatchDel() {
        if (this.$refs.table.selection.length > 0) {
          this.del(this.$refs.table.selection, '你确定要批量删除这些记录吗？');
        }
      },
      // 单条记录删除
      handleDel(row) {
        this.del([row], '你确定要删除这条记录吗？');
      },
      // 公共删除方法
      del(data, message) {
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = data.map(item => {
            return item.id
          });
          delCulturalRelic({
            itemId: this.$store.state._20.tempEntryItemId,
            ids: ids.join(",")
          }).then(({msg}) => {
            this.search(this.queryParams.pagination.currentPage);
            this.$message({
              message: msg,
              type: 'success'
            });
          });
        })
      },
      // 打开修改、查看对话框
      openViewDialog(row, optType) {
        row = row || {
            id: '',
            itemId: this.$store.state._20.tempEntryItemId
        };
        this.$store.dispatch('setTempEntryItemId', row.itemId);
        this.$store.dispatch('setTempEntryApplyCurrItem', {
          id: row.id,
          listQuery: false,
          detailQuery: false
        });
        this.viewDialogOpt = optType;
        this.viewDialogVisible = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }

  /deep/ .el-dialog__body {
    padding: 10px 20px 20px;
  }

  .fill-dialog {
    /deep/ .el-dialog__body {
      padding-bottom: 0;
    }

    /deep/ .el-dialog__footer {
      padding-bottom: 10px;
    }
  }

  .cr-info {

    .row_1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
  }
</style>
