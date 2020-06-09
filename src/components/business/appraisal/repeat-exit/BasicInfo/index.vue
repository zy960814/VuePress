<template>
  <apply-form-item data="基本信息" class="hxl_item">
    <vertical-table
        :verticalTableData="data"
        :verticalTableTitle="titleList"
        width="150px">
      <!-- 是否有海关关单文件 -->
      <template v-if="showCustomsFile" #line_70>
        <el-link
            :underline="false"
            type="primary"
            @click="downloadFile">{{fileInfo.fileName}}
        </el-link>
      </template>
    </vertical-table>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import VerticalTable from '@/components/commons/VerticalTable'
  import API_PREFIX from '@/api/config'

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
      showCustomsFile() {
        return this.hasCustomsFile && this.$route.query.type === 'personal'
      },
      fileInfo: function () {
        return {...this.data.docType}[0] || {};
      }
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
      }, {
        customsOut: '出境海关',
        appraisalName: '审核机构'
      }];
      const extraTitleList = [];

      this.titleList = this.showCustomsFile
        ? [...basicTileList, ...extraTitleList, {xx: '海关文件'}]
        : [...basicTileList, ...extraTitleList];
    },
    methods: {
      downloadFile() {
        window.open(API_PREFIX.FILE_SERVICE + this.fileInfo.url);
      }
    }
  }
</script>
