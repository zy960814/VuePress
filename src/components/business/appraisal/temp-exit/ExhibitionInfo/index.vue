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
            @click="downloadFile">{{fileName}}</el-link>
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
    computed: {
        fileName: function () {
            var array = this.data.docType;
            var name = '';
            if(array !==undefined && array.length > 0){
                name = array[0].fileName
            }
            return name;
        },
        fileUrl: function () {
            var array = this.data.docType;
            var url = '';
            if(array !==undefined && array.length > 0){
                url = array[0].url
            }
            return url;
        }
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
          destination: '出境目的地'
        }, {
          dispatchFileNum: '批准文号'
        }, {
          docType: '批准文件'
        }]
      }
    },
    methods: {
      // 下载批准文件
      downloadFile() {
          window.open(API_PREFIX.FILE_SERVICE + this.fileUrl);
      }
    }
  }
</script>
