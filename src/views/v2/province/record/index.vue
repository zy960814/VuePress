<template>
  <div style="padding:10px">
    <select-dialog :pageTabsData="pageTabsData" title="文物保护工程备案进度查询">
      <template #body_1>省局,备案</template>
    </select-dialog>
  </div>
</template>

<script>
import SelectDialog from '@/components/commons/SelectDialog'
export default {
  name: 'record',
  components: { SelectDialog },
  data() {
    return {
      // 切换按钮数据
      pageTabsData: {
        tabs: []
      }
    }
  }
}
</script>
