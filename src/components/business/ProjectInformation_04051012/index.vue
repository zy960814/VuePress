<template>
  <apply-form-item data="项目信息">
    <!-- <el-form ref="form" :model="form" label-position="left" label-width="100px"> -->
    <!-- <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect" style="padding:0 18px;"></page-tabs> -->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="工程方案" name="1">
        <template slot="title">
          <span class="collapseSty">工程方案</span>
        </template>
        <basic-message ref="basicMessage" v-bind="$attrs"></basic-message>
      </el-collapse-item>
      <el-collapse-item title="工程概况" name="2">
        <template slot="title">
          <span class="collapseSty">工程概况</span>
        </template>
        <project-situation ref="projectSituation"></project-situation>
      </el-collapse-item>
    </el-collapse>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
// import PageTabs from '@/components/commons/PageTabs'
import BasicMessage from './BasicMessage'
import ProjectSituation from './ProjectSituation'
export default {
  name: 'BasicInformation',
  components: {
    // PageTabs,
    ApplyFormItem,
    BasicMessage,
    ProjectSituation
  },
  data() {
    return {
      // 选中的菜单项（基本信息/工程概况...）
      // selectMenuItem: '1',
      activeNames: ['1'],
      // 切换按钮数据
      // pageTabsData: {
      //   tabs: [
      //     {
      //       title: '工程方案',
      //       num: ''
      //     },
      //     {
      //       title: '工程概况',
      //       num: ''
      //     }
      //   ]
      // },
      // 项目信息
      form: {
        itemName: '',
        applyPerson: '',
        handlePerson: '',
        telNo: '',
        applyDocumentNum: '',
        applyDocumentTitle: '',
        docType: []
      }
    }
  },
  mounted() {},
  methods: {
    // 文物进出境菜单
    // handleSelect(key) {
    //   console.log(key)
    //   this.selectMenuItem = key
    // }
  }
}
</script>

<style lang="scss" scoped>
.el-collapse-item__content {
  padding-bottom: 18px;
}
.collapseSty {
  font-size: 13px;
  font-weight: 700;
  padding-left: 18px;
  color: $--color-primary;
}
</style>
