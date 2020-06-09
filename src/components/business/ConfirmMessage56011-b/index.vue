<template>
  <div class="content">
    <apply-form-item data="基本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData.basicInformationTitle"
        :verticalTableTitle="basicInformationTitle"
        width="150px">
      </vertical-table>
    </apply-form-item>
    <apply-form-item data="变更信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData.basicMessageTitle"
        :verticalTableTitle="basicMessageTitle"
        width="150px">
      </vertical-table>
    </apply-form-item>
    <apply-form-item data="申请材料">
      <vertical-table
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormData.applyMaterialTitle"
        :verticalTableTitle="applyMaterialTitle"
        width="150px">
      </vertical-table>
    </apply-form-item>
    <apply-form-item data="申请单位从业信息" class="hxl_item">
      <bump-qualification :allData='allData'></bump-qualification>
    </apply-form-item>
  </div>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import VerticalTable from '@/components/commons/VerticalTable'
import BumpQualification from '@/views/personal/schedule/56011/culturalRelics/BumpQualification'
export default {
  name: 'ConfirmMessage',
  components: { ApplyFormItem, VerticalTable, BumpQualification },
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
    },
    allData:{
       type: Object,
      require: true
    }
  },
  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      basicInformationTitle: [
        { instName: '申请事项名称', },
        { creditCode: '申请文件标题' },
        { applyDocumentNum_part1: '申请文号', applyDocumentNum_part2: '',applyDocumentNum_part3: ''},
        { technologyDocument: '申请文件' },
        { economicType: '申请人', projectLevel: '经办人',  },
        { linkPhone: '联系方式' },
      ],
      basicMessageTitle: [
        { instName: '单位名称' },
        { creditCode: '单位地址'},
        { economicType: '法定代表人' },
        { money: '注册资金(万元)'},
        { linkPhone: '经济性质'},
        { break: '备注'}
      ],
      applyMaterialTitle: [
        { technologyDocument: '资质申请表签字盖章扫描件' },
        { technologyDocument0: '法定代表人任职文件加盖公章彩色扫描件' },
        // { protectPlan: '保护规划' },
        // { relicReport: '考古勘探或发掘报告' },
        // { other: '其他' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log(this.applyFormData,'this.applyFormData')
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
