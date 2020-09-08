<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <p style="margin:0 0 10px;line-height: 1;">{{title}}</p>
      <page-tabs
        v-if="pageTabsData.tabs.length>0"
        :pageTabsData="pageTabsData"
        @handle-select="handleSelect"
        style="padding:0 0px;border-top: 1px solid #e6ebf5;"
        :selectMenuItem="selectMenuItem"
      ></page-tabs>
    </div>
    <!-- 插槽名称对应切换的界面，后面改成_1、_2、_3...这种对应切换界面，body_1 、body_2、...-->
    <slot :name="`body_${selectMenuItem}`"></slot>
  </el-card>
</template>

<script>
import PageTabs from '@/components/commons/PageTabsA'
export default {
  name: 'RelicProtect',
  components: { PageTabs },
  props: {
    pageTabsData: {
      type: Object,
      require: true
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      // 选中的菜单项（基本信息/工程概况...）
      selectMenuItem: '1'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 文物进出境菜单
    handleSelect(key) {
      console.log(key)
      this.selectMenuItem = key
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
.box-card {
  /deep/.el-card__header {
    padding-bottom: 0px !important;
  }
}
</style>
