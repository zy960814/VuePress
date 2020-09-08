<template>
  <div id="printDOMElement" class="entry-exit-cr">
    <!-- 打印、导出标题 -->
    <div class="hxl__title" style="display: none">{{ pageTabsData.tabs[tabIndex - 1] ? pageTabsData.tabs[tabIndex - 1].title : '' }}</div>
    <el-card class="header_Table" shadow="never">
      <div slot="header">进出境文物统计
        <div class="clear-float header_buttonTable">
          <page-tabs ref="pageTabs" :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <entry-exit-cr v-if="tabIndex === 1" :height-offset="50"/>
      <entry-exit-texture v-else-if="tabIndex === 2" :height-offset="50"/>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import EntryExitTexture from '@/views/appraisal/statistical-analysis/entry-exit-texture/EntryExitTexture'
  import EntryExitCr from '@/views/appraisal/statistical-analysis/entry-exit-cr/EntryExitCr'

  export default {
    components: {
      PageTabs,
      EntryExitTexture,
      EntryExitCr
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '数量',
            num: ''
          }, {
            title: '质地',
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
        this.$router.push(`/appraisal/statistical-analysis/v2/entry-exit-cr?tab=${index}`);
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
