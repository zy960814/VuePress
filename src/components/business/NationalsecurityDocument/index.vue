<template>
  <div class="replayDocument">
    <select-dialog
      :pageTabsData="dialogType===1?pageTabsData1:pageTabsData2"
      title="文物保护单位"
      v-if="!noTabs"
    >
      <template #body_1>
        <select-document
          :height_select="height_select"
          ref="selectDocument"
          @nationalSecurity="earnNationalSecurity"
        />
      </template>
      <template #body_2>
        <self-document :height_self="height_self" ref="selfDocument" v-bind="$attrs" />
      </template>
    </select-dialog>
    <select-dialog :pageTabsData="pageTabsData3" title="全国重点文物保护单位" v-if="noTabs">
      <template #body_1>
        <select-document
          :height_select="height_select"
          ref="selectDocument"
          @nationalSecurity="earnNationalSecurity"
        />
      </template>
    </select-dialog>
  </div>
</template>

<script>
import SelectDialog from '@/components/commons/SelectDialog'
import SelfDocument from './SelfDocument'
import SelectDocument from './SelectDocument'
export default {
  name: 'NationalsecurityDocument',
  components: { SelectDialog, SelfDocument, SelectDocument },
  props: {
    height_select: {
      type: String,
      default: '400px'
    },
    height_self: {
      type: String,
      default: '400px'
    },
    noTabs: {
      type: Boolean,
      default: false
    },
    // 两套标题的选参
    dialogType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 切换按钮数据
      pageTabsData1: {
        tabs: [
          {
            title: '全国重点文物保护单位',
            num: ''
          },
          {
            title: '省级重点文物保护单位',
            num: ''
          }
        ]
      },
      // 切换按钮数据
      pageTabsData2: {
        tabs: [
          {
            title: '全国重点文物保护单位',
            num: ''
          },
          {
            title: '其他',
            num: ''
          }
        ]
      },
      // 切换按钮数据
      pageTabsData3: {
        tabs: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log(this.noTabs)
  },
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
