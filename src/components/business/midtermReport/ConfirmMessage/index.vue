<template>
  <div class="content">
    <apply-form-item data="基本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="basicInformationTitle"
        width="150px"
      >
        <template #line_40="scope">
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
        { enterTime: '进场时间', exploreArea: '已布方发掘面积 ' },
        { generalNum: '总用工数' },
        { executeSituation: '经费执行情况' },
        { projectInstroduction: '中期项目进展说明' },
        { workPhoto: '工作照片' }
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
