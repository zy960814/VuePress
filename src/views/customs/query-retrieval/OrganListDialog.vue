<template>
  <div class="content">
    <select-dialog :pageTabsData="pageTabsData" title="国家文物进出境审核管理处名单">
      <template #body_1>
        <div style="text-align: center; margin: 10px 0">
          <el-input
              placeholder="请输入名称"
              v-model="queryParams.condition.keyword"
              class="keyword mr-10">
            <el-button type="primary" slot="append" @click="search(1)">搜索</el-button>
          </el-input>
          <el-button type="primary" plain @click="queryParams.condition.keyword = ''">重置</el-button>
        </div>
        <el-table ref="table" :data="tableData" border :height="(dialogHeight - 175) + 'px'">
          <el-table-column label="序号" min-width="50">
            <template slot-scope="scope">
              {{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="省份"></el-table-column>
          <el-table-column label="名称">
          </el-table-column>
          <el-table-column label="地址">
          </el-table-column>
          <el-table-column prop="remark" label="办公电话"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChange"
            @current-change="search"
            :current-page="queryParams.pagination.currentPage"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
      </template>
    </select-dialog>
  </div>
</template>

<script>
  import SelectDialog from '@/components/commons/SelectDialog'

  export default {
    components: {
      SelectDialog
    },
    props: {
      dialogHeight: Number
    },
    data() {
      return {
        pageTabsData: {
          tabs: []
        },
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          condition: {
            keyword: ''
          }
        }
      }
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    mounted() {
    },
    destroyed() {

    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;

        const data = 'responseData';

        this.tableData = data.data;
        this.totalCount = data.pagination.totalNum;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {

    .keyword {
      width: 480px
    }
  }
</style>
