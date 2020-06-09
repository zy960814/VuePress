<template>
  <div class="deal-with">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物出境鉴定</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertL_one>
          <span style="font-size: 12px">
            <i class="el-icon-time" style="margin-right: 3px"></i>本事项承诺办结时限为20个工作日（委托评估、专家评审时间除外）
          </span>
        </template>
        <template #titleInsertR_one>
          <el-button @click="submit" type="primary">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </template>
        <template #titleInsertR_two>
          <el-link @click="dialogVisible = true" type="primary" class="fr">流程跟踪</el-link>
        </template>
        <template #body>
          <div class="scrollBox" :style="{height: contentHeight}">
            <!-- 基本信息 -->
            <basic-info :data="basicInfoData"/>
            <apply-form-item data="预约" class="hxl_item">
              <appointment-notice :item-id="$route.query.id"/>
            </apply-form-item>
            <apply-form-item data="受理" class="hxl_item">
              <acceptance-notice :item-id="$route.query.id"/>
            </apply-form-item>
            <apply-form-item data="文物或复仿制品信息鉴定" class="hxl_item">
              <table-opt-menu :data="tableOptMenu" style="margin-bottom: 6px">
                <el-button
                    type="primary"
                    icon="el-icon-zoom-in"
                    @click="appraisal">鉴定
                </el-button>
              </table-opt-menu>
              <cultural-relic-table/>
            </apply-form-item>
          </div>
        </template>
      </apply-form>
    </el-card>
    <!-- 鉴定对话框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible">
      <appraisal-dialog :content-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
    <!-- 批量鉴定对话框 -->
    <my-dialog
        width="500px"
        height="250px"
        @open="appraisalDialogKey += 1"
        class="boxCard_dialog"
        :visible.sync="appraisalDialogVisible">
      <select-dialog :pageTabsData="{tabs: []}" title="批量鉴定操作">
        <template #body_1>
          <batch-appraisal-dialog ref="batchAppraisalDialog" :key="appraisalDialogKey"/>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchAppraisal">确定</el-button>
        <el-button @click="appraisalDialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import BasicInfo from '@/components/business/appraisal/exit/BasicInfo'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import ApplyForm from '@/components/commons/ApplyForm'
  import MyDialog from '@/components/commons/MyDialog'
  import AppraisalDialog from './AppraisalDialog'
  import AcceptanceNotice from '@/components/business/approval-process/AcceptanceNotice'
  import AppointmentNotice from '@/components/business/approval-process/AppointmentNotice'
  import {getNoInspectionNum, batchInspection} from '@/api/appraisal/temp-entry'
  import {getApplyApDetail} from '@/api/appraisal/exit'
  import CulturalRelicTable from '@/components/business/appraisal/temp-entry/CulturalRelicInfo/CulturalRelicTable'
  import SelectDialog from '@/components/commons/SelectDialog'
  import BatchAppraisalDialog from '@/views/appraisal/exit/appraisal/BatchAppraisalDialog'

  export default {
    components: {
      TableOptMenu,
      ApplyFormItem,
      BasicInfo,
      ApplyForm,
      MyDialog,
      AppraisalDialog,
      AcceptanceNotice,
      AppointmentNotice,
      CulturalRelicTable,
      SelectDialog,
      BatchAppraisalDialog
    },
    data() {
      return {
        titleData: ['基本信息', '预约', '受理', '文物或复仿制品信息鉴定'],
        // 基本信息表格数据
        basicInfoData: {},
        tableOptMenu: [{
          icon: 'el-icon-top-right',
          text: '导出',
          evt: 'export'
        }],
        dialogVisible: false,
        dialogKey: 0,
        appraisalDialogVisible: false,
        appraisalDialogKey: 0
      }
    },
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 240 : 281) + 'px)'
      },
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 1050 ? 1050 : this.$store.getters.screenHeight;
      }
    },
    mounted() {
      getApplyApDetail({itemId: this.$route.query.id}).then(({data}) => {
        this.basicInfoData = data;
      });
    },
    methods: {
      // 锚点点击事件
      itemClick(tab) {
        let nodes = document.querySelectorAll('.hxl_item');
        document.querySelector('.scrollBox').scrollTop = nodes[+tab.index].offsetTop - nodes[0].offsetTop;
      },
      // 提交数据
      submit() {
        getNoInspectionNum({
          itemId: this.$route.query.id
        }).then(({data}) => {
          if (Number(data) > 0) {
            this.appraisalDialogVisible = true;
          } else {
            this.batchAppraisal();
          }
        });
      },
      // 鉴定
      appraisal() {
        this.$store.dispatch('setTempEntryItemId', this.$route.query.id);
        this.dialogVisible = true;
      },
      // 批量鉴定
      batchAppraisal() {
        // 数据回显
        /*this.$confirm(`您的鉴定结果为：XXX个是文物，XXX个不是文物，XXX个允许出境，XXX个不允许出境，是否提交？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {*/
          batchInspection({
            itemId: this.$route.query.id,
            ...this.$refs.batchAppraisalDialog.getData()
          }).then(() => {
            this.$router.go(-1);
            this.$message({
              message: '提交成功',
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
  /deep/ .el-dialog__body {
    padding: 10px 20px 20px;
  }

  .deal-with {
    /deep/ .el-card__header {
      padding-bottom: 10px;
    }

    /deep/ .el-card__body {
      padding: 10px;
    }
  }
</style>
