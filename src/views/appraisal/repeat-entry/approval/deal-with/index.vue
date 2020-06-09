<template>
  <div class="deal-with">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物复进境审批</div>
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
            <basic-info :data="basicInfoData" :has-customs-file="true"/>
            <!-- 展览信息 -->
            <exhibition-info v-if="$route.query.type !== 'personal'" :data="exhibitionInfoData"/>
            <apply-form-item data="预约" class="hxl_item">
              <appointment-notice/>
            </apply-form-item>
            <apply-form-item data="受理" class="hxl_item">
              <acceptance-notice/>
            </apply-form-item>
            <apply-form-item data="文物或复仿制品信息审批" class="hxl_item">
              <table-opt-menu :data="tableOptMenu" style="margin-bottom: 6px">
                <el-button
                    type="primary"
                    icon="el-icon-zoom-in"
                    @click="inspection">审批</el-button>
              </table-opt-menu>
              <cultural-relic-table/>
            </apply-form-item>
          </div>
        </template>
      </apply-form>
    </el-card>
    <!-- 查验对话框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible">
      <approval-dialog :content-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
  </div>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import BasicInfo from '@/components/business/appraisal/repeat-entry/BasicInfo'
  import ExhibitionInfo from '@/components/business/appraisal/repeat-entry/ExhibitionInfo'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import ApplyForm from '@/components/commons/ApplyForm'
  import {
    getApplyEeDetail,
    getNoApprovalNum,
    batchApproval
  } from '@/api/appraisal/repeat-entry'
  import MyDialog from '@/components/commons/MyDialog'
  import ApprovalDialog from './ApprovalDialog'
  import AcceptanceNotice from './AcceptanceNotice'
  import AppointmentNotice from './AppointmentNotice'
  import CulturalRelicTable from '@/components/business/appraisal/temp-entry/CulturalRelicInfo/CulturalRelicTable'

  export default {
    components: {
      ApplyFormItem,
      BasicInfo,
      ExhibitionInfo,
      TableOptMenu,
      ApplyForm,
      MyDialog,
      ApprovalDialog,
      AcceptanceNotice,
      AppointmentNotice,
      CulturalRelicTable
    },
    data() {
      return {
        titleData: [],
        // 基本信息表格数据
        basicInfoData: {},
        // 展览信息表格数据
        exhibitionInfoData: {},
        tableOptMenu: [{
          icon: 'el-icon-top-right',
          text: '导出',
          evt: 'export'
        }],
        dialogVisible: false,
        dialogKey: 0
      }
    },
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 240 : 281) + 'px)'
      },
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 1130 ? 1130 : this.$store.getters.screenHeight;
      }
    },
    mounted() {
        this.titleData = ['基本信息', '展览信息', '预约', '受理', '文物或复仿制品信息审批'];
        getApplyEeDetail({itemId: this.$route.query.id}).then(({data}) => {
            data.exhibitionTime = data.termStart + ' 至 ' + data.termEnd;
            this.basicInfoData = data;
            this.exhibitionInfoData = data;
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
        getNoApprovalNum({itemId: this.$route.query.id}).then(({data}) => {
          if (Number(data) > 0) {
            this.$confirm(`您还有${data}个文物或复仿制品尚未审批，是否一键审批并提交？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.batchApproval();
            }).catch(() => {
            });
          } else {
            this.batchApproval();
          }
        });
      },
      // 查验
      inspection() {
        this.$store.dispatch('setTempEntryItemId', this.$route.query.id);
        this.dialogVisible = true;
      },
      // 批量审批
      batchApproval() {
        batchApproval({
          itemId: this.$route.query.id
        }).then(() => {
          this.$router.go(-1);
          this.$message({
            message: '提交成功',
            type: 'success'
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

  .deal-with {
    /deep/ .el-card__header {
      padding-bottom: 10px;
    }

    /deep/ .el-card__body {
      padding: 10px;
    }
  }
</style>
