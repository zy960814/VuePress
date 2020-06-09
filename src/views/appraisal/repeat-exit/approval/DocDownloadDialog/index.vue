<template>
  <div class="content">
    <h2>下载单证</h2>
    <el-scrollbar :style="{height: (contentHeight - 96) + 'px'}">
      <div style="padding: 0 15px">
        <div style="min-height: 402px">
          <el-table ref="table" :data="tableData" border>
            <el-table-column prop="croCertificateName" label="单证名称" min-width="200">
              <template slot-scope="scope">
                <span @click="downloadDoc(scope.row)" class="cert">{{ scope.row.croCertificateName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <table-button buttonName="下载" @button-click="downloadOFD(scope.row)"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import {getCertificateType} from '@/api/appraisal/temp-entry'
  import API_PREFIX from '@/api/config'
  import TableButton from '@/components/commons/TableButton'

  export default {
    components: {
      TableButton
    },
    props: {
      contentHeight: Number
    },
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      getCertificateType({
        itemId: this.$store.state._20.tempEntryItemId
      }).then(({data}) => this.tableData = data);
    },
    methods: {
      // 单证下载
      downloadDoc(row) {
        /**01 文物出境
         * 09 文物复出境展览证明
         */
        if ('01' == row.croCertificateCode) {
          let num = "1-"+this.tableData.length+"-1-"+this.tableData.length;
          window.open(`${API_PREFIX.APPRAISAL}/certificate/printCroPermitPDF/${this.$store.state._20.tempEntryItemId}/`+num);
        } else if('03' == row.croCertificateCode) {
          let num = "1-"+this.tableData.length+"-1-"+this.tableData.length;
          window.open(`${API_PREFIX.APPRAISAL}/certificate/printCroForbidPDF/${this.$store.state._20.tempEntryItemId}/`+num);
        } else {
          window.open(`${API_PREFIX.APPRAISAL}/certificate/printTempEntryCroPDF/${this.$store.state._20.tempEntryItemId}`);
        }
      },
      // OFD 文件下载
      downloadOFD(row) {
        if ('09' == row.croCertificateCode) {
            window.open(`${API_PREFIX.APPRAISAL}/certificate/downloadTempEntryCroOFD/${this.$store.state._20.tempEntryItemId}`);
        } else {
            window.open(`${API_PREFIX.APPRAISAL}/certificate/downloadCroPermitOFD/${this.$store.state._20.tempEntryItemId}`);
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  /deep/ .el-table__body .cert {
    color: $--color-primary;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .content {

    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 0 0 5px 0;
      margin: 0 0 10px 0;
      border-bottom: 1px solid $--border-color;
      color: #303133;
    }

    .el-main {
      padding: 0 15px;
    }
  }
</style>
