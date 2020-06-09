<template>
  <apply-form-item data="基本信息" class="hxl_item">
    <vertical-table
        :verticalTableData="data"
        :verticalTableTitle="titleList"
        width="150px">
      <template #line_51>
        <!-- 展览申请 和 个人携带申请 的进境时间字段后端设计不一样, 兼容后端处理 -->
        {{ data['entryDate'] | dateFormat('yyyy-MM-dd') }}
      </template>
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
      data: Object,
      hasCustomsFile: {
        type: Boolean,
        default: false
      }
    },
    computed: {

    },
    data() {
      return {
        // 基本信息表格列标题
        titleList: []
      }
    },
    mounted() {
      const basicTileList = [{
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
      }];
      const extraTitleList =   [{
          customs: '进境海关',
          entryDate: '进境时间'
        }, {
          appraisalName: '审核机构'
        }];
      this.titleList = [...basicTileList, ...extraTitleList];
    },
    methods: {
      downloadFile() {

      }
    }
  }
</script>
