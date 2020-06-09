<template>
  <apply-form-item data="保护规划方案信息">
    <!-- <el-form ref="form" :model="form" label-position="left" label-width="100px"> -->
    <!-- <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect" style="padding:0 18px;"></page-tabs> -->
    <basic-message ref="basicMessage"></basic-message>
    <!-- <project-situation v-if="selectMenuItem==='2'" ref="projectSituation"></project-situation>
    <report-fact v-if="selectMenuItem==='3'" ref="reportFact"></report-fact>
    <design-fact v-if="selectMenuItem==='4'" ref="designFact"></design-fact>-->
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import BasicMessage from './BasicMessage'
export default {
  name: 'BasicInformation',
  components: {
    ApplyFormItem,
    BasicMessage
  },
  data() {
    return {
      // 选中的菜单项（基本信息/工程概况...）
      // selectMenuItem: '1',
      // // 切换按钮数据
      // pageTabsData: {
      //   tabs: [
      //     {
      //       title: '基本信息',
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
</style>
