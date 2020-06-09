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
          <template #line_50="scope">
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
          <template #line_60="scope">
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
      basicInformationTitle: [
        { applyItemName: '申请事项名称' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocument: '申请文件' }
      ],
      // 基本信息
      basicMessageTitle: [
        { nationalSecurityName: '全国重点文物保护单位名称', province: '省份 ' },
        { relicCategory: '文物类型' },
        { manageUseCompany: '管理使用单位' },
        { companyLocation: '单位所在地' },
        { detailAddress: '详细地址' },
        { ministry: '上级主管部门', '': '' },
        { projectName: '项目名称' },
        { projectConstituteCheckList: '工程主要构成' },
        { protectScale: '工程保护对象及范围' },
        { projectEstimate: '工程概算' },
        { fundsSource: '经费来源' },
        { projectArrange: '项目实施安排' },
        { projectEnsure: '项目实施保障条件' },
        { designPerson: '设计人/单位' },
        { qualityType: '资质类型' },
        { level: '级别' },
        { otherIntroduction: '其他说明' }
      ],

      //申请材料
      applyMaterialTitle: [
        { CRBOpinion: '省文物局意见' },
        { proxyStatement: '设计委托书' },
        { taskStatement: '设计任务书' },
        { qualificationsStatement: '设计单位资质文件' },
        { designPlan: '设计方案' },
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
