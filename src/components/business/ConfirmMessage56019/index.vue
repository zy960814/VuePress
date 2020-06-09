<template>
  <el-card shadow="never">
    <div slot="header">一级藏品取样申请</div>
    <el-scrollbar :style="{height: height}">
      <apply-form-item data="申请人信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormData"
          :verticalTableTitle="applicantInformationTitle"
          width="150px"
        ></vertical-table>
      </apply-form-item>
      <apply-form-item data="申请文件">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="applyDocumentTitle"
          width="150px"
        >
          <template #line_20="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
        </vertical-table>
      </apply-form-item>
      <apply-form-item data="文物信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="relicInformationTitle"
          width="150px"
        ></vertical-table>
      </apply-form-item>
      <apply-form-item data="藏品取样信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="samplingInformationTitle"
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
    }
  },

  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      applicantInformationTitle: [
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' },
        { companyAddress: '单位地址' },
        { postCode: '邮政编码' }
      ],
      // 文物或标本信息
      applyDocumentTitle: [
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocument: '申请文件' }
      ],
      // 文物信息
      relicInformationTitle: [
        { relicName: '文物名称', sumNo: '总登记号' },
        { years: '具体年代', '': '' },
        { relicCategory: '文物类型', relicLevel: '文物级别' },
        { texture: '质地', size: '尺寸' },
        { number: '数量', '': '' },
        { integrated: '完残程度', '': '' },
        { integratedDetail: '完残程度详细描述' },
        { preservation: '保存状态', '': '' },
        { collectCompany: '收藏单位', '': '' },
        { collectTime: '入馆时间', relicSource: '文物来源' }
      ],
      // 藏品取样信息
      samplingInformationTitle: [
        { repairSituation: '价值评估' },
        { worthEstimate: '取样缘由及必要性分析' },
        { situationDescribe: '具体工艺与步骤' },
        { damagedStatistics: '风险评估与安全措施' },
        { resultAnalysis: '其他说明' }
      ],
      //申请材料
      applyMaterialTitle: [
        { palnDesign: '取样方案' },
        {
          proxyStatement: '文物图片'
        },
        { taskStatement: '其他' }
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
      return this.applyFormData
    }
  },
  watch: {},
  created() {},
  mounted() {
    console.log('33333333333')
    console.log(this.applyFormData)
  },
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
