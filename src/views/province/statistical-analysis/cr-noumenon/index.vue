<template>
  <div id="printDOMElement" class="cr-noumenon">
    <el-card class="header_Table" shadow="never">
      <div slot="header">文物本体统计
        <div class="clear-float header_buttonTable">
          <page-tabs ref="pageTabs" :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <cultural-protection-unit v-if="tabIndex === 1"/>
      <collection-precious-cr v-else-if="tabIndex === 2"/>
      <collection-unit v-else-if="tabIndex === 3"/>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import CulturalProtectionUnit from '@/views/national/statistical-analysis/cr-noumenon/CollectionUnit'
  import CollectionPreciousCr from '@/views/national/statistical-analysis/cr-noumenon/CollectionPreciousCr'
  import CollectionUnit from '@/views/national/statistical-analysis/cr-noumenon/CollectionUnit'

  export default {
    components: {
      PageTabs,
      CulturalProtectionUnit,
      CollectionPreciousCr,
      CollectionUnit
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '全国重点文物保护单位统计',
            num: ''
          }, {
            title: '国有馆藏珍贵文物统计',
            num: ''
          }, {
            title: '收藏单位情况统计',
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
        this.$router.push(`/province/statistical-analysis/cr-noumenon?tab=${index}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cr-noumenon {

    /deep/ .el-card__body {
      padding: 0 20px 10px;
    }
  }
</style>
