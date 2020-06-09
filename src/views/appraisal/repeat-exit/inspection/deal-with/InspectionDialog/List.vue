<template>
  <div class="relic-list">
    <div style="display: flex; margin-bottom: 10px">
      <el-input
          v-model="queryParams.condition.crName"
          placeholder="文物或复仿制品名称"
          style="flex: 1"></el-input>
      <el-button
          type="primary"
          @click="search(1)"
          style="margin-left: 10px">搜索
      </el-button>
    </div>
    <!-- :highlight-current-row="true" -->
    <el-table
        ref="table"
        :data="tableData"
        border
        height="904px"
        @row-click="rowClick"
        :row-style="{height: '34px'}"
        :row-class-name="tableRowClassName"
        @current-change="currentChange">
      <el-table-column label="序号" min-width="50">
        <template slot-scope="scope">
          {{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="crName" label="名称" min-width="180"></el-table-column>
      <el-table-column prop="crName" label="状态" min-width="65">
        <template slot-scope="scope">{{ scope.row.isInspect === '1' ? '已查验' : '未查验' }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="search"
        :current-page="queryParams.pagination.currentPage"
        :page-size="queryParams.pagination.pageSize"
        small
        layout="prev, pager, next"
        :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
  import {queryBizCrInspectList} from '@/api/appraisal/exit'

  export default {
    data() {
      return {
        tableData: [],
        totalCount: 0,
        queryParams: {
          condition: {
            itemId: '',
            crName: ''
          },
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: {}
        },
        currentRowIndex: -1
      };
    },
    computed: {
      // 当前选中项
      selectedItem: function () {
        return this.$store.state._20.tempEntryApplyCurrItem;
      }
    },
    watch: {
      selectedItem: {
        handler: function (val) {
          if (val.listQuery) {
            this.search();
          }
        },
        deep: true
      }
    },
    mounted() {
      this.search();
    },
    methods: {
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        this.queryParams.condition.itemId = this.$store.state._20.tempEntryItemId;
        queryBizCrInspectList(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
          if (this.tableData.length > 0) {
            this.$store.dispatch('setTempEntryApplyCurrItem', {
              id: this.tableData[0].id,
              listQuery: false,
              detailQuery: true
            });
            // 设置选中行高亮
            this.$nextTick(() => {
              const index = this.tableData.findIndex(item => {
                return item.id === this.selectedItem.id
              });
              this.$refs.table.setCurrentRow(this.$refs.table.data[index]);
            });
          }
        });
      },
      rowClick(row) {
        this.$store.dispatch('setTempEntryApplyCurrItem', {
          id: row.id,
          listQuery: false,
          detailQuery: true
        });
      },
      tableRowClassName({row, rowIndex}) {
        let rowClass = row.isInspect === '1' ? 'success-row' : 'warning-row';
        if (rowIndex === this.currentRowIndex) {
          rowClass += ' current_row';
        }
        return rowClass;
      },
      // 查验下一条
      cyNext(row) {
        const index = this.tableData.findIndex(item => {return item.id === row.id});
        this.tableData[index].isInspect = row.isInspect;
        const nextIndex = index + 1;
        if (nextIndex < this.tableData.length
          && nextIndex < this.queryParams.pagination.pageSize) {  // 索引小于 pageSize 选中项下移
          this.$store.dispatch('setTempEntryApplyCurrItem', {
            id: this.tableData[nextIndex].id,
            listQuery: false,
            detailQuery: true
          });
          this.$refs.table.setCurrentRow(this.$refs.table.data[nextIndex]);
        }
      },
      currentChange(currentRow) {
        if (currentRow) {
          this.currentRowIndex = this.tableData.findIndex(item => {return item.id === currentRow.id});
        }
      }
    }
  };
</script>

<style lang="scss" scoped>

  /deep/ .el-table__row.warning-row {
    background: #FFE6E6;
  }

  /deep/ .el-table__row.success-row {
    background: #CBFBE2;
  }

  /deep/ .el-table__row.current_row {
    font-weight: bold;
    font-size: 14px;
  }

  /deep/ .el-table__header {
    line-height: 37px;
  }

  .relicLeft {
    text-align: center;
  }

  .pag {
    width: 100%;
  }

  .el-pagination {
    white-space: nowrap;
    padding: 8px 5px 0;
    color: #303133;
    font-weight: bold;
  }
</style>
