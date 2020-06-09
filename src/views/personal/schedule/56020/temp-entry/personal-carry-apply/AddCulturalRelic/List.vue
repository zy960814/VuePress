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
    <el-table
        ref="table"
        :data="tableData"
        border
        height="720px"
        @row-click="rowClick"
        :row-style="{height: '42px'}"
        :highlight-current-row="true">
      <el-table-column label="序号" min-width="50">
        <template slot-scope="scope">
          {{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="crName" label="名称" min-width="180"></el-table-column>
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
  import {listCulturalRelic} from '@/api/personal/schedule/56020/temp-entry'

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
        }
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
        listCulturalRelic(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
          // 设置选中行高亮
          this.$nextTick(() => {
            const index = this.tableData.findIndex(item => {
              return item.id === this.selectedItem.id
            });
            this.$refs.table.setCurrentRow(this.$refs.table.data[index]);
          });
        });
      },
      rowClick(row) {
        this.$store.dispatch('setTempEntryApplyCurrItem', {
          id: row.id,
          listQuery: false,
          detailQuery: true
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
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
