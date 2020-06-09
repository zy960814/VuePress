<template>
  <div class="replayDocument">
    <select-dialog :pageTabsData="pageTabsData" title="方案编制单位">
      <template #body_1>
        <select-document
          :height_select="height_select"
          ref="selectDocument"
          @nationalSecurity="earnNationalSecurity"
        />
      </template>
      <template #body_2>
        <self-document :height_self="height_self" ref="selfDocument" />
      </template>
    </select-dialog>
  </div>
</template>

<script>
import SelectDialog from '@/components/commons/SelectDialog'
import SelfDocument from './SelfDocument'
import SelectDocument from './SelectDocument'
export default {
  name: 'ReplayDocument',
  components: { SelectDialog, SelfDocument, SelectDocument },
  props: {
    height_select: {
      type: String,
      default: '400px'
    },
    height_self: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '选择方案编制单位',
            num: ''
          },
          {
            title: '填写方案编制单位',
            num: ''
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.$emit('nationalSecurity', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
