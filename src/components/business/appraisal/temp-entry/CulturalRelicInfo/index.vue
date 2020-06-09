<template>
  <apply-form-item data="文物或复仿制品信息" class="hxl_item">
    <cultural-relic-table/>
  </apply-form-item>
</template>

<script>
  import CulturalRelicTable from './CulturalRelicTable'
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'

  export default {
    components: {
      ApplyFormItem,
      CulturalRelicTable
    }
  }
</script>
