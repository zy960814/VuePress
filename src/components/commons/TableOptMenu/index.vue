<template>
  <div class="table_opt_menu">
    <div>
      <slot></slot>
    </div>
    <div>
      <el-tooltip
          v-for="(item, index) in data"
          effect="dark"
          :content="item.text"
          :key="index"
          placement="top-start">
        <el-button size="mini" @click="$emit('item-click', item.evt)" :icon="item.icon"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableOptMenu",
    props: {
      data: {
        type: Array,
        default: () => {
          return [{
            icon: 'el-icon-top-right',
            text: '导出',
            evt: 'export'
          }, {
            icon: 'el-icon-printer',
            text: '打印',
            evt: 'print'
          }, {
            icon: 'el-icon-refresh',
            text: '列表刷新',
            evt: 'refresh'
          }, {
            icon: 'el-icon-s-tools',
            text: '表头配置',
            evt: 'set-up'
          }]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table_opt_menu {
    display: flex;
    justify-content: space-between;
  }
</style>
