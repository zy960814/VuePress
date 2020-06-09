<template>
  <apply-form-item data="基本信息" class="hxl_item">
    <vertical-table
        :verticalTableData="data"
        :verticalTableTitle="titleList"
        width="150px">
    </vertical-table>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import VerticalTable from '@/components/commons/VerticalTable'

  export default {
    components: {
      ApplyFormItem,
      VerticalTable
    },
    props: {
      data: Object
    },
    data() {
      return {
        // 基本信息表格列标题
        titleList: [{
          itemName: '申请事项名称'
        }, {
          carryPerson: '携运人',
          nationalityName: '国籍'
        }, {
          certificateTypeName: '证件类型',
          certificateNum: '证件号码'
        }, {
          telNo: '联系方式'
        }, {
          address: '住所'
        }, {
          destination: '出境目的地'
        }, {
          customsOut: '出境海关',
          appraisalName: '审核机构'
        }]
      }
    }
  }
</script>
