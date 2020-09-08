<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">查询检索
        <el-button
            type="primary"
            size="mini"
            style="position: absolute; top: 5px; right: 5px"
            @click="dialogVisible = true"
        >国家文物进出境管理处清单</el-button>
        <div class="clear-float header_buttonTable">
          <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <item-table v-if="selectMenuItem === '1'"/>
      <cultural-relic-table v-else-if="selectMenuItem === '2'"/>
    </el-card>
    <my-dialog
        width="1024px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        class="boxCard_dialog"
        :visible.sync="dialogVisible">
      <organ-list-dialog :dialog-height="dialogHeight" :key="dialogKey"/>
    </my-dialog>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import ItemTable from './ItemTable'
  import CulturalRelicTable from './CulturalRelicTable'
  import MyDialog from '@/components/commons/MyDialog'
  import OrganListDialog from './OrganListDialog'

  export default {
    components: {
      PageTabs,
      ItemTable,
      CulturalRelicTable,
      MyDialog,
      OrganListDialog
    },
    data() {
      return {
        // 切换页签的数据
        pageTabsData: {
          tabs: [{
            title: '进出境事项',
            num: ''
          }, {
            title: '进出境文物',
            num: ''
          }]
        },
        // 页签选中项
        selectMenuItem: '',
        dialogVisible: false,
        dialogKey: 0
      }
    },
    computed: {
      dialogHeight: function () {
        return this.$store.getters.screenHeight * 0.9;
      }
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
        this.selectMenuItem = key;
        this.$router.push({query: {selectMenuItem: key}})
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
