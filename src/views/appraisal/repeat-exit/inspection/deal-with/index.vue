<template>
  <div class="deal-with">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物临时进境复出境查验</div>
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
            <!-- 展览信息 -->
            <exhibition-info v-if="$route.query.type !== 'personal'" :data="exhibitionInfoData"/>
            <apply-form-item data="预约" class="hxl_item">
              <appointment-notice :item-id="$route.query.id"/>
            </apply-form-item>
            <apply-form-item data="受理" class="hxl_item">
              <acceptance-notice :item-id="$route.query.id"/>
            </apply-form-item>
            <apply-form-item data="文物或复仿制品信息查验" class="hxl_item">
              <table-opt-menu :data="tableOptMenu" style="margin-bottom: 6px">
                <el-button
                    type="primary"
                    icon="el-icon-zoom-in"
                    @click="inspection">查验
                </el-button>
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
      <inspection-dialog :content-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
  </div>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import BasicInfo from '@/components/business/appraisal/repeat-exit/BasicInfo'
  import ExhibitionInfo from '@/components/business/appraisal/temp-entry/ExhibitionInfo'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import ApplyForm from '@/components/commons/ApplyForm'
  import {getApplyCeDetail, getApplyCpDetail} from '@/api/appraisal/repeat-exit'
  import MyDialog from '@/components/commons/MyDialog'
  import InspectionDialog from './InspectionDialog'
  import AcceptanceNotice from '@/components/business/approval-process/AcceptanceNotice'
  import AppointmentNotice from '@/components/business/approval-process/AppointmentNotice'
  import {getNoInspectionNum, batchInspection} from '@/api/appraisal/temp-entry'
  import CulturalRelicTable from '@/components/business/appraisal/temp-entry/CulturalRelicInfo/CulturalRelicTable'

  export default {
    components: {
      TableOptMenu,
      ApplyFormItem,
      BasicInfo,
      ExhibitionInfo,
      ApplyForm,
      MyDialog,
      InspectionDialog,
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
        return this.$store.getters.screenHeight > 1050 ? 1050 : this.$store.getters.screenHeight;
      }
    },
    mounted() {
      const itemType = this.$route.query.type || 'exhibition';
      switch (itemType) {
        case 'exhibition':  // 临时进境展览事项查询
          this.titleData = ['基本信息', '展览信息', '预约', '受理', '文物或复仿制品信息查验'];
          getApplyCeDetail({itemId: this.$route.query.id}).then(({data}) => {
            data.exhibitionTime = data.termStart + ' 至 ' + data.termEnd;
            this.basicInfoData = data;
            this.exhibitionInfoData = data;
          });
          break;
        case 'personal':  // 临时进境个人携带查询
          this.titleData = ['基本信息', '预约', '受理', '文物或复仿制品信息查验'];
          getApplyCpDetail({itemId: this.$route.query.id}).then(({data}) => {
            this.basicInfoData = data;
          });
          break
      }
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
            this.$confirm(`您还有${data}个文物或复仿制品尚未查验，是否一键查验并提交？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.batchInspection();
            }).catch(() => {
            });
          } else {
            this.batchInspection();
          }
        });
      },
      // 查验
      inspection() {
        this.$store.dispatch('setTempEntryItemId', this.$route.query.id);
        this.dialogVisible = true;
      },
      // 批量查验
      batchInspection() {
        batchInspection({
          itemId: this.$route.query.id,
          isCr: '1',
          approvalFlag: '0'
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
