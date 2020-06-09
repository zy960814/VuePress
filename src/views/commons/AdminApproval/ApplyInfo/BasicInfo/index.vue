<template>
  <div>
    <sub-title data="基本信息"/>
    <vertical-table
        :verticalTableData="data"
        :verticalTableTitle="title"
        width="180px"
    >
      <!--<template #line_50="scope">
        <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
        <el-link type="primary" v-else>{{ }}</el-link>
      </template>-->
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
          {nationalSecurityName: '全国重点文物保护单位名称', province: '省份'},
          {relicCategory: '文物类型'},
          {companyLevel: '保护单位级别'},
          {isRevolutionRelic: '是否是革命文物'},
          {worldHeritage: '是否是世界遗产'},
          {applyItemName: '申请事项名称'},
          {applyDocumentTitle: '申请文件标题'},
          {applyDocumentNo: '申请文件号', '': ''},
          {applyDocument: '申请文件'},
          {applyPerson: '申请人', handlePerson: '经办人 '},
          {telNo: '联系方式', '': ''}
        ],
      }
    }
  }
</script>

<style scoped>

</style>
