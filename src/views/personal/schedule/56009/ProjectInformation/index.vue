<template>
  <apply-form-item data="项目信息">
    <!-- <el-form ref="form" :model="form" label-position="left" label-width="100px"> -->
    <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect" style="padding:0 18px;"></page-tabs>
    <basic-message v-show="selectMenuItem==='1'" ref="basicMessage"></basic-message>
    <text-fact v-show="selectMenuItem==='2'" ref="textFact"></text-fact>
    <drawing-fact v-show="selectMenuItem==='3'" ref="drawingFact"></drawing-fact>
    <explain-fact v-show="selectMenuItem==='4'" ref="explainFact"></explain-fact>
    <material-fact v-show="selectMenuItem==='5'" ref="materialFact"></material-fact>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import PageTabs from '@/components/commons/PageTabs'
import BasicMessage from './BasicMessage'
import TextFact from './TextFact'
import DrawingFact from './DrawingFact'
import ExplainFact from './ExplainFact'
import MaterialFact from './MaterialFact'
export default {
  name: 'BasicInformation',
  components: {
    PageTabs,
    ApplyFormItem,
    BasicMessage,
    DrawingFact,
    ExplainFact,
    MaterialFact,
    TextFact
  },
  data() {
    return {
      // 选中的菜单项（基本信息/文本概况...）
      selectMenuItem: '1',
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '基本信息',
            num: ''
          },
          {
            title: '文本概况',
            num: ''
          },
          {
            title: '图纸概况',
            num: ''
          },
          {
            title: '说明概况',
            num: ''
          },
          {
            title: '基础资料汇编概况',
            num: ''
          }
        ]
      },
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
    handleSelect(key) {
      console.log(key)
      this.selectMenuItem = key
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
