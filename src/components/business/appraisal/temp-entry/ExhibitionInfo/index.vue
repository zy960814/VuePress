<template>
  <apply-form-item data="展览信息" class="hxl_item">
    <vertical-table
        :verticalTableData="data"
        :verticalTableTitle="titleList"
        width="150px">
      <template #line_70>
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
      data: Object
    },
    data() {
      return {
        // 展览信息表格列标题
        titleList: [{
          exhibitionName: '展览名称',
          exhibitionTime: '展览时间'
        }, {
          declarationUnit: '申报单位',
          msgUnit: '主管单位'
        }, {
          organizer: '承办单位',
          operator: '负责人'
        }, {
          overseasUnit: '境外机构'
        }, {
          exhibitionVenue: '展览地点'
        }, {
          relicsOrigin: '展品来源地'
        }, {
          recordNumber: '备案文号'
        }, {
          docType: '备案文件'
        }]
      }
    },
    computed: {
      fileInfo: function () {
        return {...this.data.docType}[0] || {};
      }
    },
    methods: {
      // 下载备案文件
      downloadFile() {
        window.open(API_PREFIX.FILE_SERVICE + this.fileInfo.url);
      }
    }
  }
</script>
