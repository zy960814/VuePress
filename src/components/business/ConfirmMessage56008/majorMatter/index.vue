<template>
  <div class="content">
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
    <apply-form-item data="项目信息">
      <vertical-table
        title="基本信息"
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="basicMessageTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="文本概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="textFactTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="图纸概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="drawingFactTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="说明概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="explainFactTitle"
        width="150px"
      ></vertical-table>
      <vertical-table
        title="基础资料汇编概况"
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="materialFactTitle"
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
        { applyItemName: '申请事项名称' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocument: '申请文件' }
      ],
      // 基本信息
      basicMessageTitle: [
        { nationalSecurityName: '文物保护单位名称', province: '省份 ' },
        { relicCategory: '文物类型' },
        { projectName: '项目名称' },
        { formationCompany: '编制单位', '': '' },
        { sendOrganization: '报送单位', '': '' },
        { funds: '经费金额', '': '' },
        { otherIntroduction: '其他说明' }
      ],
      //文本概况
      textFactTitle: [
        { generalRules: '总则' },
        { protestObject: '保护对象' },
        { worthAsscess: '价值评估' },
        { principleTarget: '保护规划原则与目标' },
        { researchPlainning: '考古与科学研究规划' },
        { environmentRenovate: '环境整治规划' },
        { showRules: '展示规划' },
        { infrastructurePlanning: '基础设施规划' },
        { managerPlanning: '管理规划' },
        { periodizationPlanning: '分期规划' },
        { protectFunds: '保护实施经费' },
        { appendix: '附则' }
      ],
      // 图纸概况
      drawingFactTitle: [{ drawingDescribe: '保护规划图纸' }],
      // 说明概况
      explainFactTitle: [
        { reserveRules: '保护区划管理规定' },
        { remainderPlan: '遗址本体保护规划' },
        { archaeologyWithResearch: '考古与科学研究规划' },
        { showUseRulse: '展示利用规划' },
        { securityPlan: '安全防灾规划' },
        { remainderProtectWithdevelopment: '遗址保护与地方社会发展协调规划' },
        { protectPlan: '保护管理规划' }
      ],
      // 基础资料汇编概况
      materialFactTitle: [
        { chronicle: '大记事' },
        { protectRange: '原保护范围及建设控制地带情况' },
        { archaeologyInvestigate: '考古调查简报' },
        { researchDocument: '相关研究文献目录' }
      ],
      //申请材料_08
      applyMaterialTitle: [
        { archaeologyPlan: '中华人民共和国考古发掘申请书' },
        { suggestion: '相关省级文物行政部门意见' },
        { other: '其他' }
      ]
    }
  },
  computed: {
    applyFormDataInner() {
      // console.log('qqqqqqqqq')
      // console.log(this.applyFormData)
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
