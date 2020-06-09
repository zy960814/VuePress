<template>
  <apply-form-item data="项目信息">
    <!-- <el-form ref="form" :model="form" label-position="left" label-width="100px"> -->
    <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect" style="padding:0 18px;"></page-tabs>
    <basic-message v-show="selectMenuItem==='1'" ref="basicMessage"></basic-message>
    <project-situation v-show="selectMenuItem==='2'" ref="projectSituation"></project-situation>
    <!-- <el-row class="spilt" style="margin-top: 18px">
        <el-col :span="24">
          <el-form-item label="申请事项名称" prop="itemName" class="redStar">
            <el-input v-model="form.itemName" placeholder="项目名称须包含文保单位名称和事项名称关键字（原址保护措施）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 18px">
        <el-col :span="11">
          <el-form-item label="申请人" prop="applyPerson" class="redStar">
            <el-input v-model="form.applyPerson" placeholder="请填写申请人的单位名称或者个人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="经办人" prop="handlePerson" class="redStar">
            <el-input v-model="form.handlePerson" placeholder="请填写经办人的个人姓名"></el-input>
          </el-form-item>
        </el-col>
    </el-row>-->
    <!-- </el-form> -->
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import PageTabs from '@/components/commons/PageTabs'
import BasicMessage from './BasicMessage'
import ProjectSituation from './ProjectSituation'
export default {
  name: 'BasicInformation',
  components: {
    PageTabs,
    ApplyFormItem,
    BasicMessage,
    ProjectSituation
  },
  data() {
    return {
      // 选中的菜单项（基本信息/工程概况...）
      selectMenuItem: '1',
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '基本信息',
            num: ''
          },
          {
            title: '工程概况',
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
