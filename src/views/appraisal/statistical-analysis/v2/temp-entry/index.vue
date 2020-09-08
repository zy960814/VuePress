<template>
  <div id="printDOMElement" class="entry-exit-cr">
    <!-- 打印、导出标题 -->
    <div class="hxl__title" style="display: none">{{ pageTabsData.tabs[tabIndex - 1] ? pageTabsData.tabs[tabIndex - 1].title : '' }}</div>
    <el-card class="header_Table" shadow="never">
      <div slot="header">文物临时进境统计
        <div class="clear-float header_buttonTable">
          <page-tabs ref="pageTabs" :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <entry-permission-invalid v-if="tabIndex === 1" :height-offset="50"/>
      <temp-entry-aim v-else-if="tabIndex === 2" :height-offset="50"/>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import EntryPermissionInvalid from '@/views/appraisal/statistical-analysis/entry-permission-invalid/EntryPermissionInvalid'
  import TempEntryAim from '@/views/appraisal/statistical-analysis/temp-entry-aim/TempEntryAim'

  export default {
    components: {
      PageTabs,
      EntryPermissionInvalid,
      TempEntryAim
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '许可失效情况',
            num: ''
          }, {
            title: '进境目的',
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
      },
      handleSelect(index) {
        this.$router.push(`/appraisal/statistical-analysis/v2/temp-entry?tab=${index}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .entry-exit-cr {

    /deep/ .el-card__body {
      padding: 0 20px 10px;
    }
  }
</style>
