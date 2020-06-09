<template>
  <div class="content">
    <apply-form-item data="基本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="basicInformationTitle"
        width="150px"
      >
        <template #line_30="scope">
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
    }
  },

  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      basicInformationTitle: [
        { applyItemName: '申请事项名称' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocument: '申请文件' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' }
      ],
      //申请材料
      applyMaterialTitle: [
        { qualityApply: '中华人民共和国考古发掘团体资格申请书' },
        { agreeMaterial: '主管部门出具的关于同意申请的书面材料' },
        { exploreEquipment: '考古发掘机构及设备简况' },
        { protectEquipment: '文物保护机构及设备简况' }
      ]
    }
  },
  computed: {
    applyFormDataInner() {
      console.log('qqqqqqqqq')
      console.log(this.applyFormData)
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
