<template>
  <div class="content">
    <el-table
      ref="SuperviseMultipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      class="mh-table"
      @select="selectionFun"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="55" v-if="showIndex"></el-table-column>
      <template v-for="(item, index) in tableTitle">
        <el-table-column :key="index" :prop="item.prop" :label="item.label">
          <template slot-scope="scope">
            <slot :name="`lineInsert_${item.prop}`" :row="scope.row">{{ scope.row[item.prop] }}</slot>
          </template>
          <template slot="header" slot-scope="scope">
            <slot :name="`headerInsert_${item.prop}`" :scope="scope">{{scope.column.label}}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SingleselectTable',
  components: {},
  props: {
    tableData: {
      type: Array,
      require: true
    },
    tableTitle: {
      type: Array,
      require: true
    },
    showIndex: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      totalCount: 0,
      queryParams: {
        pagination: {
          currentPage: 1,
          pageSize: 5
        },
        keyword: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 设置表格单选
    selectionFun(val) {
      this.$refs.SuperviseMultipleTable.clearSelection()
      if (val[val.length - 1]) {
        this.$refs.SuperviseMultipleTable.toggleRowSelection(
          val[val.length - 1],
          true
        )
      }
      this.multipleSelection = val[val.length - 1]
      this.$emit('select', this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  /deep/.el-table__header-wrapper .el-checkbox {
    //找到表头那一行，然后把里面的复选框隐藏掉
    display: none;
  }
}
</style>
