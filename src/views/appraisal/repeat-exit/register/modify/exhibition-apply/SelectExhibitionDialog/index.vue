<template>
  <div class="content">
    <h2>请选择文物临时进境展览</h2>
    <el-scrollbar :style="{height: (contentHeight - 138) + 'px'}">
      <el-form label-width="80px" label-position="left">
        <el-form-item>
          <div class="row_1">
            <el-input placeholder="展览名称" v-model="queryParams.condition.exhibitionName" class="keyword mr-10">
              <el-button @click="search(1)" slot="append">查询</el-button>
            </el-input>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form-item>
        <!--<el-form-item label="时间范围" prop="crName" class="half-width">
          <el-date-picker
              v-model="form.crName"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>-->
      </el-form>
      <single-select-table
          ref="table"
          :tableTitle="tableTitle"
          :tableData="tableData"
          @select="itemSelect">
      </single-select-table>
      <el-pagination
          @size-change="sizeChange"
          @current-change="search"
          :current-page="queryParams.pagination.currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
      ></el-pagination>
    </el-scrollbar>
  </div>
</template>

<script>
  import SingleSelectTable from '@/components/commons/SingleselectTable'
  import {querySelectableBExhibitionList} from '@/api/appraisal/repeat-exit'

  export default {
    components: {
      SingleSelectTable
    },
    props: {
      contentHeight: Number
    },
    data() {
      return {
        tableTitle: [{
          label: '序号',
          prop: 'num'
        }, {
          label: '流水号',
          prop: 'serialNum'
        }, {
          label: '展览名称',
          prop: 'exhibitionName'
        }, {
          label: '携运人',
          prop: 'carryPerson'
        }, {
          label: '携运数量',
          prop: 'carryAmount'
        }, {
          label: '展览时间',
          prop: 'termTime'
        }, {
          label: '展览地点',
          prop: 'exhibitionVenue'
        }],
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: null,
          condition: {
            itemId: '',
            exhibitionName: ''
          }
        },
        // 表格单选行选中的数据
        currentItem: null
      };
    },
    mounted() {
      this.queryParams.condition.itemId = this.$route.query.id;
      this.search();
    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        querySelectableBExhibitionList(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
        });
      },
      itemSelect(row) {
        this.currentItem = row || null;
      },
      resetForm() {
        this.queryParams.condition.exhibitionName = '';
        this.search();
      },
      getData() {
        return new Promise((resolve, reject) => {
          if (this.currentItem) {
            resolve(this.currentItem)
          } else {
            this.$store.dispatch('promptWarningMsg', '请选择文物临时进境展览');
            reject()
          }
        })
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

    /*.half-width {
      width: 48%;
    }*/

    /deep/ .el-scrollbar__view {
      padding-right: 15px;
    }

    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }

    .row_1 {
      text-align: center;

      .keyword {
        width: 480px;
      }
    }
  }

  .el-select {
    width: 100%;
  }
</style>
