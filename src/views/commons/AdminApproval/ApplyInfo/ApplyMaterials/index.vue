<template>
  <div>
    <sub-title data="申请材料"/>
    <vertical-table
        :verticalTableData="data"
        :verticalTableTitle="title"
        width="180px">
    </vertical-table>
  </div>
</template>

<script>
  import SubTitle from '@/components/commons/SubTitle'
  import VerticalTable from '@/components/commons/VerticalTable'

  export default {
    components: {
      SubTitle,
      VerticalTable
    },
    props: {
      data: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        title: [
          {technologyDocument: '技术文件'},
          {assessmentReport: '文物影响评估报告'},
          {protectPlan: '保护规划'},
          {relicReport: '考古勘探或发掘报告'},
          {other: '其他'}
        ],
      }
    }
  }
</script>

<style scoped>

</style>
