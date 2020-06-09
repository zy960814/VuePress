<template>
  <div class="content">
    <apply-form-item data="基本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="basicInformationTitle"
        width="150px"
      >
        <template #line_80="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
    <apply-form-item data="立项批复文件">
      <vertical-table
        title="立项批复文件"
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="immediatelyReplayTitle"
        width="150px"
      >
        <template #line_30="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_40="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
    <apply-form-item data="工程方案信息">
      <vertical-table
        title="工程方案"
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="basicMessageTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="项目概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="projectSituationTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="现场勘察报告概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="reportFactTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="施工图设计概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="designFactTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>

    <apply-form-item data="申请材料">
      <vertical-table
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="applyMaterialTitle"
        width="150px"
      >
        <template #line_00="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_10="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_20="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_30="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_40="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_50="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_60="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_70="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
  </div>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import VerticalTable from '@/components/commons/VerticalTable'
export default {
  name: 'ConfirmMessage',
  components: { ApplyFormItem, VerticalTable },
  props: {
    height: {
      type: String,
      default: '400px'
    },
    applyFormData: {
      type: Object,
      require: true
    },
    applyType: {
      type: String
    }
  },

  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      basicInformationTitle: [
        { nationalSecurityName: '全国重点文物保护单位名称', province: '省份 ' },
        { relicCategory: '文物类型' },
        // { companyLevel: '保护单位级别' },
        { isRevolutionRelic: '是否是革命文物' },
        { worldHeritage: '是否是世界遗产' },
        { applyItemName: '申请事项名称' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocument: '申请文件' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' }
      ],
      // 立项批复文件
      immediatelyReplayTitle: [
        { replayDocumentTitle: '立项批复文件标题' },
        { replayDocumentNo: '立项批复文号' },
        { replayTime: '立项批复时间' },
        { approvalResponse: '立项批复文件' },
        { approvalReport: '立项报告' }
      ],
      // 工程方案信息_p_approvalplan
      basicMessageTitle: [
        { projectCategory: '工程类别' },
        { projectName: '项目名称' },
        { planName: '方案名称' },
        { rangeScale: '建设范围及规模' },
        { projectEstimate: '工程概算', '': '' },
        { planType: '方案编制方式' },
        { designPerson: '方案编制单位' },
        { qualityType: '资质类型' },
        { level: '级别' },
        { businessRange: '业务范围' },
        { chargePerson: '方案编制负责人' },
        { chargeQualityType: '专业资格类型' },
        { qualityNum: '专业证书编号' },
        { otherIntroduction: '其他说明' }
      ],
      // 项目概况
      projectSituationTitle: [
        { projectIntroduction: '项目介绍' },
        { designTask: '设计任务' },
        { protectRange: '保护范围' }
      ],
      // 现场勘察报告概况
      reportFactTitle: [
        { repairSituation: '历次维修状况' },
        { worthEstimate: '文物价值评估' },
        { situationDescribe: '现状描述' },
        { damagedStatistics: '残损统计' },
        { resultAnalysis: '主要病害及成因分析' },
        { geographicalEnvironment: '地理环境与地形外貌' },
        { asscessConclusion: '安全评估结论' }
      ],
      // 施工图设计概况
      designFactTitle: [
        { designAccording: '设计依据' },
        { projectProperties: '工程性质' },
        { projectRange: '工程范围和规模' },
        { projectIntroduction: '工程做法说明及质量要求' }
      ],
      //申请材料_p_approvalplan
      applyMaterialTitle: [
        { designIntroduction: '方案设计说明及图纸' },
        // { departmentOpinion: '省级文物行政部门的意见' },
        { experimentReport: '相关的实验报告' },
        { explorationReport: '地勘报告' },
        { excavateReport: '考古勘探或发掘报告' },
        { assessReport: '评估报告' },
        // { approvalReport: '立项报告' },
        { other: '其他' }
      ]
    }
  },
  computed: {
    applyFormDataInner() {
      return this.applyFormData
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
</style>
