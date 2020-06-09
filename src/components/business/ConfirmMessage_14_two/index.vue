<template>
  <el-card shadow="never">
    <div slot="header">全国重点文物保护单位安全防护工程项目申请</div>
    <el-scrollbar :style="{height: height}">
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
      <apply-form-item data="工程设计方案信息">
        <vertical-table
          title="基本信息"
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="basicMessageTitle"
          width="150px"
        >
          <template #line_10="scope">
            <span v-for="(item,index) in scope.colValue" :key="index">
              <span v-if="index!=scope.colValue.length-1">{{item}}、</span>
              <span v-else>{{item}}</span>
            </span>
          </template>
        </vertical-table>
      </apply-form-item>
      <apply-form-item data="申请材料">
        <vertical-table
          style="width:100%;"
          borderTitle="none"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="applyMaterialTitle_n_reportCRB"
          width="150px"
          v-if="applyType==='n_reportCRB'"
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
          <template #line_80="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_90="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_100="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_110="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
        </vertical-table>
        <vertical-table
          style="width:100%;"
          borderTitle="none"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="applyMaterialTitle_p_reportCRB"
          width="150px"
          v-if="applyType==='p_reportCRB'"
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
          <template #line_80="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_90="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_100="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
        </vertical-table>
      </apply-form-item>
    </el-scrollbar>
  </el-card>
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
        { companyLevel: '保护单位级别' },
        { isRevolutionRelic: '是否是革命文物' },
        { worldHeritage: '是否是世界遗产' },
        { applyItemName: '申请事项名称' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocument: '申请文件' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' }
      ],
      //n_reportCRB 基本信息
      basicMessageTitle_n_reportCRB: [
        { projectCategory: '工程类别', '': '' },
        { projectConstituteCheckList: '工程主要构成' },
        { projectName: '项目名称' },
        { planName: '方案名称' },
        { protectScale: '工程保护对象及范围' },
        { projectEstimate: '工程概算', '': '' },
        { fundsSource: '经费来源' },
        { projectName: '项目名称' },
        { palnTime: '方案编制时间', '': '' },
        { planType: '方案编制方式' },
        { designPerson: '方案编制单位' },
        { qualityType: '资质类型' },
        { level: '级别' },
        { businessRange: '业务范围' },
        { chargePerson: '方案编制负责人' },
        { chargeQualityType: '专业资格类型' },
        { qualityNum: '专业证书编号' },
        { sendOrganization: '申报主体' },
        { projectArrange: '项目实施安排' },
        { projectEnsure: '项目实施保障条件' },
        { otherIntroduction: '其他说明' }
      ],
      //p_reportCRB 基本信息
      basicMessageTitle_p_reportCRB: [
        { projectCategory: '工程类别', '': '' },
        { projectConstituteCheckList: '工程主要构成' },
        { projectName: '项目名称' },
        { planName: '方案名称' },
        { protectScale: '工程保护对象及范围' },
        { projectEstimate: '工程概算', '': '' },
        { fundsSource: '经费来源' },
        { projectName: '项目名称' },
        { palnTime: '方案编制时间', '': '' },
        { planType: '方案编制方式' },
        { designPerson: '方案编制单位' },
        { qualityType: '资质类型' },
        { level: '级别' },
        { businessRange: '业务范围' },
        { chargePerson: '方案编制负责人' },
        { chargeQualityType: '专业资格类型' },
        { qualityNum: '专业证书编号' },
        { projectArrange: '项目实施安排' },
        { projectEnsure: '项目实施保障条件' },
        { otherIntroduction: '其他说明' }
      ],

      //申请材料_n_reportCRB
      applyMaterialTitle_n_reportCRB: [
        { palnDesign: '方案设计说明及图纸' },
        { proxyStatement: '设计委托书' },
        { taskStatement: '设计任务书' },
        { projectEstimateBook: '工程概算书' },
        { reportAndPhoto: '现场勘察报告和现状照片' },
        { riskAssessment: '风险评估报告' },
        { materialList: '主要设备材料清单' },
        { inspectionReport: '主要设备材料的检验报告或认证证书' },
        { rulesPromise: '人员培训细则、售后服务承诺和工程验收细则' },
        { CRBOpinion: '省级文物行政部门的意见' },
        { reviewDocument: '评审文件（复审方案在此上传）' },
        { other: '其他' }
      ],
      //申请材料_p_reportCRB
      applyMaterialTitle_p_reportCRB: [
        { palnDesign: '方案设计说明及图纸' },
        { proxyStatement: '设计委托书' },
        { taskStatement: '设计任务书' },
        { projectEstimateBook: '工程概算书' },
        { reportAndPhoto: '现场勘察报告和现状照片' },
        { riskAssessment: '风险评估报告' },
        { materialList: '主要设备材料清单' },
        { inspectionReport: '主要设备材料的检验报告或认证证书' },
        { rulesPromise: '人员培训细则、售后服务承诺和工程验收细则' },
        { reviewDocument: '评审文件（复审方案在此上传）' },
        { other: '其他' }
      ]
      // applyFormData: {
      //   applyItemName: '周口店遗址修复工程',
      //   applyPerson: '王大锤',
      //   handlePerson: '李复',
      //   telNo: '123800877345',
      //   applyDocumentNo: 'al_12398294',
      //   applyDocumentTitle: '元朝平底瓷碗',
      //   applyDocument: '北京市文物局申请文件.docx',
      //   nationalSecurityName: '北京市文物局',
      //   province: '河北省',
      //   projectName: '周口店遗址项目',
      //   designPerson: '周埕',
      //   sendOrganization: '河北省文物局',
      //   otherIntroduction: '',
      //   projectSituationIntroduction: '文物二期处理进行中',
      //   buildNecessary: '必要',
      //   compilationBasis: '文物二期修复细则',
      //   lineChose: '三线',
      //   technologyMeasure: '数字扫描',
      //   emergencyMeasure: '封',
      //   technologyDocument: '北京市文物局申请文件.docx',
      //   assessmentReport: '北京市文物局申请文件.docx',
      //   protectPlan: '北京市文物局申请文件.docx',
      //   relicReport: '北京市文物局申请文件.docx',
      //   other: '北京市文物局申请文件.docx'
      // }
    }
  },
  computed: {
    applyFormDataInner() {
      this.addOther()
      return this.applyFormData
    },
    basicMessageTitle() {
      let basicMessageTitle = []
      if (this.applyType === 'n_reportCRB') {
        basicMessageTitle = this.basicMessageTitle_n_reportCRB
      } else if (this.applyType === 'p_reportCRB') {
        basicMessageTitle = this.basicMessageTitle_p_reportCRB
      }
      return basicMessageTitle
    }
    // applyMaterialTitle() {
    //   let applyMaterialTitle = []
    //   if (this.applyType === 'n_reportCRB') {
    //     applyMaterialTitle = this.applyMaterialTitle_n_approvalplan
    //   } else if (this.applyType === 'p_reportCRB') {
    //     applyMaterialTitle = this.applyMaterialTitle_p_approvalplan
    //   }
    //   return applyMaterialTitle
    // }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 给工程主要构成/经费来源的其他进行拼接
    addOther() {
      if (this.applyFormData.projectConstituteCheckList.indexOf('其他') > -1) {
        this.applyFormData.projectConstituteCheckList.splice(
          this.applyFormData.projectConstituteCheckList.findIndex(item => {
            return item === '其他'
          }),
          1,
          `其他[${this.applyFormData.otherConstitute}]`
        )
      }
      if (this.applyFormData.fundsSource_part1 === '4') {
        this.applyFormData.fundsSource = `其他[${this.applyFormData.fundsSource_part2}]`
      }
    }
  }
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
