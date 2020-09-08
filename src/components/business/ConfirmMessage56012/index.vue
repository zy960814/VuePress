<template>
  <div class="content">
    <!-- <el-card shadow="never">
    <div slot="header">全国重点文物保护单位原址保护措施申请</div>
    <el-scrollbar :style="{height: height}">-->
    <apply-form-item data="基本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="basicInformationTitle"
        width="150px"
      >
        <template #line_20="scope">
          <span v-if="scope.colValue==='1'">是</span>
          <span v-if="scope.colValue==='2'">否</span>
          <span v-else>{{ }}</span>
        </template>
        <template #line_30="scope">
          <span v-if="scope.colValue==='1'">是</span>
          <span v-if="scope.colValue==='2'">否</span>
          <span v-else>{{ }}</span>
        </template>
        <template #line_70="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
    <!-- <apply-form-item data="申请文件信息">
          <vertical-table
            style="width:100%;"
            :verticalTableData="applyFormData"
            :verticalTableTitle="applyDocumentTitle"
            width="150px"
          >
            <template #line_01="scope">
              <el-link type="primary">{{scope.colValue}}</el-link>
            </template>
          </vertical-table>
    </apply-form-item>-->
    <apply-form-item data="项目信息">
      <vertical-table
        title="基本信息"
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="basicMessageTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="工程概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormData"
        :verticalTableTitle="projectSituationTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>
    <apply-form-item data="申请材料">
      <vertical-table
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormData"
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
      </vertical-table>
    </apply-form-item>
    <!-- </el-scrollbar>
    </el-card>-->
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
        { isRevolutionRelic: '是否是革命文物' },
        { worldHeritage: '是否是世界遗产' },
        { applyItemName: '申请事项名称' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocument: '申请文件' },
        { applyPerson: '申请人', handlePerson: '经办人' },
        { telNo: '联系方式', '': '' }
      ],
      basicMessageTitle: [
        { projectName: '项目名称' },
        { planName: '方案名称' },
        { planType: '方案编制方式' },
        { designPerson: '方案编制单位' },
        { qualityType: '资质类型' },
        { level: '级别' },
        { businessRange: '业务范围' },
        { chargePerson: '方案编制负责人' },
        { chargeQualityType: '专业资格类型' },
        { qualityNum: '专业证书编号' },
        { sendOrganization: '报送单位 ' },
        { otherIntroduction: '其他说明' }
      ],
      projectSituationTitle: [
        { projectSituationIntroduction: '工程概况说明' },
        { buildNecessary: '建设的必要性' },
        { compilationBasis: '编制依据' },
        { lineChose: '线路选择' },
        { technologyMeasure: '文物保护技术措施' },
        { emergencyMeasure: '文物保护应急措施' }
      ],
      applyMaterialTitle: [
        { technologyDocument: '技术文件' },
        { assessmentReport: '文物影响评估报告' },
        { protectPlan: '保护规划' },
        { relicReport: '考古勘探或发掘报告' },
        { other: '其他' }
      ]
    }
  },
  computed: {},
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
