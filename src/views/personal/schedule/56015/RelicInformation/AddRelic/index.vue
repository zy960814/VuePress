<template>
  <el-card shadow="never">
    <div slot="header">{{title}}</div>
    <el-scrollbar :style="{height: height}">
      <relic-info ref="relicInfo" :relicDataItem="relicDataItem" />
      <relic-repair ref="relicRepair" :relicDataItem="relicDataItem" />
      <apply-material ref="applyMaterial" :relicDataItem="relicDataItem" />
    </el-scrollbar>
  </el-card>
</template>

<script>
import RelicInfo from './RelicInfo'
import RelicRepair from './RelicRepair'
import ApplyMaterial from './ApplyMaterial'
export default {
  name: 'AddRelic',
  components: { RelicInfo, RelicRepair, ApplyMaterial },
  props: {
    height: {
      type: String,
      default: '400px'
    },
    tableOperate: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      title: '',
      relicData: [
        {
          relicName: '莲鹤方壶',
          sumNo: '202004231847',
          years: '春秋中期',
          relicCategory: '青铜器',
          relicLevel: '二级',
          texture: '青铜',
          size: '高近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '郑公大墓',
          majorDisease: '锈蚀',
          repairTarget: '恢复光泽'
        },
        {
          relicName: '狸猫纹漆食盘',
          sumNo: '202004231854',
          years: '春秋中期',
          relicCategory: '器具',
          relicLevel: '一级',
          texture: '木',
          size: '高近126厘米',
          number: '2',
          integrated: '完',
          integratedDetail: '底部稍有残缺',
          collectCompany: '北京故宫博物院',
          collectTime: '1950年8月',
          relicSource: '郑公大墓',
          majorDisease: '锈蚀',
          repairTarget: '恢复光泽'
        },
        {
          relicName: '古滇国贮贝器',
          sumNo: '202004231858',
          years: '春秋中期',
          relicCategory: '青铜器',
          relicLevel: '二级',
          texture: '青铜',
          size: '高近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          collectCompany: '北京故宫博物院',
          collectTime: '1950年8月',
          relicSource: '郑公大墓',
          majorDisease: '锈蚀',
          repairTarget: '恢复光泽'
        }
      ]
    }
  },
  computed: {
    // 假数据-后期直接调接口获取
    relicDataItem() {
      let relicItem = {}
      if (this.tableOperate.operateType === 'edit') {
        relicItem = this.relicData.find(item => {
          return item.sumNo === this.tableOperate.id
        })
      }
      console.log(relicItem)
      return relicItem
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getTitle()
  },
  destroyed() {},
  methods: {
    getTitle() {
      if (this.tableOperate.operateType === 'add') {
        this.title = '添加文物信息'
      } else if (this.tableOperate.operateType === 'edit') {
        this.title = '编辑文物信息'
      } else if (this.tableOperate.operateType === 'confirm') {
        this.title = '文物信息确认'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
</style>
