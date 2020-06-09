<template>
  <div id="printDOMElement" class="entry-exit-cr">
    <el-card class="header_Table" shadow="never">
      <div slot="header">文物进出境统计
        <div class="clear-float header_buttonTable">
          <page-tabs ref="pageTabs" :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <entry-permission-invalid v-if="tabIndex === 1" :height-offset="50"/>
      <temp-entry-aim v-else-if="tabIndex === 2" :height-offset="50"/>
      <entry-exit-texture v-else-if="tabIndex === 3" :height-offset="50"/>
      <entry-exit-approval v-else-if="tabIndex === 4" :height-offset="50"/>
      <entry-exit-cr v-else-if="tabIndex === 5" :height-offset="50"/>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import EntryPermissionInvalid from '@/views/appraisal/statistical-analysis/entry-permission-invalid/EntryPermissionInvalid'
  import TempEntryAim from '@/views/appraisal/statistical-analysis/temp-entry-aim/TempEntryAim'
  import EntryExitTexture from '@/views/appraisal/statistical-analysis/entry-exit-texture/EntryExitTexture'
  import EntryExitApproval from '@/views/appraisal/statistical-analysis/entry-exit-approval/EntryExitApproval'
  import EntryExitCr from '@/views/appraisal/statistical-analysis/entry-exit-cr/EntryExitCr'

  export default {
    components: {
      PageTabs,
      EntryPermissionInvalid,
      TempEntryAim,
      EntryExitTexture,
      EntryExitApproval,
      EntryExitCr
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '文物临时进境许可失效情况',
            num: ''
          }, {
            title: '文物临时进境目的情况',
            num: ''
          }, {
            title: '进出境文物质地情况',
            num: ''
          }, {
            title: '文物进出境审批情况',
            num: ''
          }, {
            title: '进出境文物情况',
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
        this.$router.push(`/national/statistical-analysis/entry-exit-cr?tab=${index}`);
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
