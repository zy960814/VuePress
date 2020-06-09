<template>
  <div class="work-statistics">
    <el-card class="header_Table" shadow="never">
      <div slot="header">个人工作情况统计
        <div class="clear-float header_buttonTable">
          <page-tabs ref="pageTabs" :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <table-opt-menu :data="tableOptMenu" @item-click="itemClick" style="margin: 5px 0">
      </table-opt-menu>
      <el-table :data="tableData" border stripe :height="tableHeight">
        <el-table-column
            prop="cj"
            align="center"
            label="序号">
        </el-table-column>
        <el-table-column
            prop="jzcj"
            align="center"
            label="事项类型">
        </el-table-column>
        <el-table-column
            prop="ffzpcj"
            align="center"
            label="待办事项">
          <el-table-column
              prop="ffzpcj"
              align="center"
              label="总数">
          </el-table-column>
          <el-table-column
              prop="ffzpcj"
              align="center"
              label="停留未超3天">
          </el-table-column>
          <el-table-column
              prop="ffzpcj"
              align="center"
              label="停留已超3天">
          </el-table-column>
        </el-table-column>
        <el-table-column
            prop="total"
            align="center"
            label="已办事项">
          <el-table-column
              prop="total"
              align="center"
              label="总数">
          </el-table-column>
          <el-table-column
              prop="total"
              align="center"
              label="参与评审">
          </el-table-column>
          <el-table-column
              prop="total"
              align="center"
              label="拒绝评审">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  // import {print} from '@/utils/common'

  export default {
    components: {
      PageTabs,
      TableOptMenu
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '行政审批',
            num: ''
          }, {
            title: '行业管理',
            num: ''
          }]
        },
        // 当前选定的页签索引
        tabIndex: 0,
        tableOptMenu: [{
          icon: 'el-icon-top-right',
          text: '导出',
          evt: 'export'
        }, {
          icon: 'el-icon-printer',
          text: '打印',
          evt: 'print'
        }],
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 5
          },
          keyword: ''
        }
      }
    },
    computed: {
      tableHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 220 : 261) + 'px)'
      }
    },
    watch: {
      $route(to) {
        this.renderPage(to.query.tab);
      }
    },
    mounted() {
      this.renderPage(this.$route.query.tab);
    },
    methods: {
      renderPage(tabIndex) {
        this.tabIndex = tabIndex ? Number(tabIndex) : 1;
        this.$refs.pageTabs.setIndex(String(this.tabIndex));
      },
      handleSelect(index) {
        this.$router.push(`/expert/work-statistics?tab=${index}`);
      },
      itemClick() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .work-statistics {

    /deep/ .el-card__body {
      padding: 0 20px 10px;
    }
  }
</style>
