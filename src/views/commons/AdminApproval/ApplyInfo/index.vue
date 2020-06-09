<template>
  <apply-form-item data="申请信息">
    <el-button @click="() => {}" type="primary">一键下载</el-button>
    <el-button @click="() => {}" type="primary">打印</el-button>
    <basic-info :data="{}"/>
    <project-info :basic-data="{}" :ext-data="{}"/>
    <apply-materials :data="{}"/>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import BasicInfo from './BasicInfo'
  import ProjectInfo from './ProjectInfo'
  import ApplyMaterials from './ApplyMaterials'

  export default {
    components: {
      ApplyFormItem,
      BasicInfo,
      ProjectInfo,
      ApplyMaterials
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
