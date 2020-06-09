<template>
  <div class="temp-entry">
    <el-card class="header_Table" shadow="never">
      <div slot="header">文物临时进境复出境查验
        <div class="clear-float header_buttonTable">
          <page-tabs ref="pageTabs" :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <appointment-table v-if="tabIndex === 1"/>
      <acceptance-table v-else-if="tabIndex === 2"/>
      <register-table v-else-if="tabIndex === 3"/>
      <inspection-table v-else-if="tabIndex === 4"/>
      <approval-table v-else-if="tabIndex === 5"/>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import AppointmentTable from './appointment/AppointmentTable'
  import AcceptanceTable from './acceptance/AcceptanceTable'
  import RegisterTable from './register/RegisterTable'
  import InspectionTable from './inspection/InspectionTable'
  import ApprovalTable from './approval/ApprovalTable'
  import {queryBizTodoCount} from '@/api/appraisal/common'

  export default {
    components: {
      PageTabs,
      AppointmentTable,
      AcceptanceTable,
      RegisterTable,
      InspectionTable,
      ApprovalTable
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            index: 'appointment',
            title: '预约',
            num: ''
          }, {
            index: 'accept',
            title: '受理',
            num: ''
          }, {
            index: 'register',
            title: '登记分办',
            num: ''
          }, {
            index: 'appraisal',
            title: '查验',
            num: ''
          }, {
            index: 'approval',
            title: '审批',
            num: ''
          }]
        },
        // 当前选定的页签索引
        tabIndex: 0
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
        this.queryTodoCount();
      },
      handleSelect(index) {
        this.$router.push(`/appraisal/repeat-exit?tab=${index}`);
      },
      // 查询页签数量
      queryTodoCount() {
        queryBizTodoCount({
          condition: {
            itemCode: '56020-c'
          }
        }).then(({data}) => {
          this.pageTabsData.tabs.forEach(item => item.num = data[item.index] || '');
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .temp-entry {

    /deep/ .el-card__body {
      padding: 0 20px 10px;
    }
  }
</style>
