<template>
  <div class="content">
    <apply-form-item data="实施情况">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="executeSituationTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>
    <apply-form-item data="实施结果">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="executeResultTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>
    <apply-form-item data="工作照片">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="workPhotoTitle"
        width="150px"
      >
        <template #line_00="scope">
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
      // 实施情况
      executeSituationTitle: [
        { enterTime: '时间', exploreArea: '发掘面积 ' },
        { funds: '经费量' },
        { recruitSituation: '用工情况' }
      ],
      // 实施结果
      executeResultTitle: [
        { mainHarvest: '主要收获' },
        { remainProtect: '遗址保护' },
        { archaeologyMaterial: '考古资料整理' },
        { specimenSafekeep: '标本保管' },
        { reportPublishPlan: '报告出版计划' }
      ],
      // 工作照片
      workPhotoTitle: [{ workPhoto: '工作照片' }]
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
