<template>
  <apply-form-item data="工程方案信息">
    <!-- <el-form ref="form" :model="form" label-position="left" label-width="100px"> -->
    <!-- <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect" style="padding:0 18px;"></page-tabs> -->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="工程方案" name="1">
        <template slot="title">
          <span class="collapseSty">工程方案</span>
        </template>
        <basic-message ref="basicMessage" v-bind="$attrs"></basic-message>
      </el-collapse-item>
      <el-collapse-item title="项目概况" name="2">
        <template slot="title">
          <span class="collapseSty">项目概况</span>
        </template>
        <project-situation ref="projectSituation"></project-situation>
      </el-collapse-item>
      <el-collapse-item title="现场勘察报告概况" name="3">
        <template slot="title">
          <span class="collapseSty">现场勘察报告概况</span>
        </template>
        <report-fact ref="reportFact"></report-fact>
      </el-collapse-item>
      <el-collapse-item title="施工图设计概况" name="4">
        <template slot="title">
          <span class="collapseSty">施工图设计概况</span>
        </template>
        <design-fact ref="designFact"></design-fact>
      </el-collapse-item>
    </el-collapse>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
// import PageTabs from '@/components/commons/PageTabs'
import BasicMessage from './BasicMessage'
import ProjectSituation from './ProjectSituation'
import ReportFact from './ReportFact'
import DesignFact from './DesignFact'
export default {
  name: 'BasicInformation',
  components: {
    ApplyFormItem,
    BasicMessage,
    ProjectSituation,
    ReportFact,
    DesignFact
  },
  // props: {
  //   applyType: {
  //     type: String
  //   }
  // },
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
      //       title: '项目概况',
      //       num: ''
      //     },
      //     {
      //       title: '现场勘察报告概况',
      //       num: ''
      //     },
      //     {
      //       title: '施工图设计概况',
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
.collapseSty {
  font-size: 13px;
  font-weight: 700;
  padding-left: 18px;
  color: $--color-primary;
}
</style>
