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
      <apply-form-item data="文物出境展览信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="exhibitionInformationTitle"
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
      // 文物出境展览信息
      exhibitionInformationTitle: [
        { exhibitionName: '展览名称', exhibitionCountry: '展览国别（地区）' },
        { exhibitionTime: '展览时间', exhibitionNum: '总展览件数' },
        { '': '', fristNum: '一级品件数' },
        { abroadCooperation: '境外合作机构', '': '' }
      ],
      //申请材料
      applyMaterialTitle: [
        { palnDesign: '文物出境展览申报表' },
        {
          proxyStatement: '馆方文物安全状况评估'
        },
        { taskStatement: '场馆考察报告（首次举办或三年未举办者）' },
        { projectEstimateBook: '展览邀请函' },
        { reportAndPhoto: '合作方介绍、资信证明' },
        { riskAssessment: '标准设施报告' },
        { materialList: '全部展品目录（当有外方文物参展时需提供）' },
        {
          inspectionReport:
            '藏品真实性及来源合法性证明（当有外方文物参展时需提供）'
        }
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
