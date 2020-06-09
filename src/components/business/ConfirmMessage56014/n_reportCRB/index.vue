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
        { applyDocumentNo: '申请文号', '': '' },
        { applyDocument: '申请文件' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' }
      ],
      //n_reportCRB 基本信息
      basicMessageTitle: [
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

      //申请材料_n_reportCRB
      applyMaterialTitle: [
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
        { CRBOpinion: '省级文物行政部门的意见' },
        { other: '其他' }
      ]
    }
  },
  computed: {
    applyFormDataInner() {
      this.addOther()
      return this.applyFormData
    }
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
