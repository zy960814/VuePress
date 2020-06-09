<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">查询检索
        <div class="clear-float header_buttonTable">
          <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <item-table v-if="selectMenuItem === '1'"/>
      <cultural-relic-table v-else-if="selectMenuItem === '2'"/>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import ItemTable from './ItemTable'
  import CulturalRelicTable from './CulturalRelicTable'

  export default {
    components: {
      PageTabs,
      ItemTable,
      CulturalRelicTable
    },
    data() {
      return {
        // 切换页签的数据
        pageTabsData: {
          tabs: [{
            title: '文物进出境事项',
            num: ''
          }, {
            title: '进出境文物',
            num: ''
          }]
        },
        // 页签选中项
        selectMenuItem: ''
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      //  选中项
      this.selectMenuItem = this.$route.query.selectMenuItem || '1';

    },
    destroyed() {
    },
    methods: {
      // 切换代办已办
      handleSelect(key) {
        // console.log(key, keyPath)
        this.selectMenuItem = key
        this.$router.push({query: {selectMenuItem: key}})
        // this.$route.query.selectMenuItem = key
      },

    }
  }
</script>

<style lang="scss" scoped>
  .content {
    /deep/ .el-dialog__body {
      padding: 0 20px;
    }

    /deep/ .el-card .el-card__body {
      padding-top: 0 !important;
      padding-bottom: 10px !important;
    }
  }
</style>
