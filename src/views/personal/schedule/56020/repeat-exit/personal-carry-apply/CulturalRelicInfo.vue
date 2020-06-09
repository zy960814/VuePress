<template>
  <apply-form-item class="cr-info" data="文物或复仿制品信息">
    <div style="padding: 0 18px">
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
                  @click="dialogVisible = true"
              >添加</el-button>
            </span>
          </el-tooltip>
          <el-button @click="handleBatchDel" type="danger">批量移除</el-button>
        </div>
        <div style="margin-top: 6px">
          <el-link @click="fillInDialogVisible = true" type="primary">填写说明</el-link>
        </div>
      </div>
      <el-table ref="table" :data="tableData" border>
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="序号" align="center" width="80">
          <template
              slot-scope="scope"
          >{{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="crName" label="文物或复仿制品名称" width="180"></el-table-column>
        <el-table-column prop="realSize" label="尺寸"></el-table-column>
        <el-table-column prop="crTextureName" label="质地"></el-table-column>
        <el-table-column prop="crClass" label="类别"></el-table-column>
        <el-table-column prop="crLevelName" label="级别"></el-table-column>
        <el-table-column prop="crAge" label="年代"></el-table-column>
        <el-table-column prop="amount" label="数量"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="照片">
          <template slot-scope="scope">
            <el-link
                :underline="false"
                type="primary"
                @click="viewImg(scope.row)"
            >{{ scope.row.picNum }}
            </el-link>
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
    <!-- 文物、复仿制品添加对话框 -->
    <my-dialog
        width="1024px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :append-to-body="false"
        :visible.sync="dialogVisible">
      <select-cr-dialog
          ref="selectCrDialog"
          :content-height="dialogHeight"
          :key="dialogKey"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateSelectData">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 填写说明对话框 -->
    <div class="fill-dialog">
      <my-dialog
          width="1124px"
          height="620px"
          :visible.sync="fillInDialogVisible"
      >
        <fill-in-instructions/>
        <span slot="footer">
          <el-button @click="fillInDialogVisible = false">关闭</el-button>
        </span>
      </my-dialog>
    </div>
    <viewer :images="images" @inited="initViewer">
      <img v-for="(src, index) in images" :src="src" :key="index" style="display: none" alt/>
    </viewer>
  </apply-form-item>
</template>

<script>
  import MyDialog from '@/components/commons/MyDialog'
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import {listCulturalRelic, delCulturalRelic, getBizCroCrPics} from '@/api/personal/schedule/56020/temp-entry'
  import FillInInstructions from './FillInInstructions'
  import SelectCrDialog from './SelectCrDialog'
  import API_PREFIX from '@/api/config'
  import {saveAgainCexhibitionAll, saveAgainCBizCroCr} from '@/api/personal/schedule/56020/repeat-exit'

  import Vue from 'vue'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'

  Vue.use(Viewer);

  export default {
    components: {
      MyDialog,
      ApplyFormItem,
      FillInInstructions,
      SelectCrDialog
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
        fillInDialogVisible: false, // 填写说明对话框
        images: []
      }
    },
    computed: {
      // 添加按钮是否可以点击
      addBtnEnabled: function () {
        return this.$store.state._20.tempEntryItemId != null;
      },
      // 弹出框
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 904 ? 904 : this.$store.getters.screenHeight
      }
    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage)
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        this.queryParams.condition.itemId = this.$store.state._20.tempEntryItemId;
        listCulturalRelic(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum
        })
      },
      // 保存事项信息
      saveItemInfo() {
        saveAgainCexhibitionAll({
          itemId: this.$store.state._20.tempEntryItemId,
          tempId: this.x_itemId
        }).then(() => {
          this.search();
        })
      },
      // 弹框打开事件
      dialogOpen() {
        this.$store.dispatch('setTempEntryApplyCurrItem', {
          id: null,
          listQuery: false,
          detailQuery: false
        });
        this.dialogKey++
      },
      // 批量移除
      handleBatchDel() {
        if (this.$refs.table.selection.length > 0) {
          this.del(this.$refs.table.selection, '你确定要批量移除这些记录吗？')
        }
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
            ids: ids.join(',')
          }).then(({msg}) => {
            this.search(this.queryParams.pagination.currentPage);
            this.$message({
              message: msg,
              type: 'success'
            })
          })
        })
      },
      initViewer(viewer) {
        this.$viewer = viewer;
        this.$viewer.view();  // 此处解决组件首次加载不上图片的 BUG
      },
      viewImg(row) {
        getBizCroCrPics({
          id: row.id
        }).then(({data}) => {
          this.images = data.map(item => {
            return API_PREFIX.FILE_SERVICE + item.url
          });
          this.$viewer.view()
        })
      },
      // 更新新添加的文物信息
      updateSelectData() {
        const selectData = this.$refs.selectCrDialog.getSelectData();
        if (selectData) {
          saveAgainCBizCroCr({
            itemId: this.$store.state._20.tempEntryItemId,
            data: selectData
          }).then(() => {
            this.dialogVisible = false;
            this.search();
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }

  /deep/ .el-dialog__body {
    padding: 10px 20px 0;
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
