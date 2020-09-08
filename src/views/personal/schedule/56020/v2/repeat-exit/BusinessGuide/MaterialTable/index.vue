<template>
  <el-table
    class="innerTable"
    size="medium"
    :data="materialTable"
    :span-method="arraySpanMethodDialog"
    border
    :fit="true"
    ref="table"
  >
    <el-table-column prop="materialName" label="材料名称" min-width="165;" :resizable="false"></el-table-column>
    <el-table-column label="材料填写样本" min-width="165;" :resizable="false">
      <template slot-scope="scope">
        <el-button
            type="primary"
            class="operativeButton"
            plain
            size="mini"
            v-if="scope.row.url"
            @click="download(scope.row.url)"
        >{{scope.row.materialPrototype}}</el-button>
        <span v-else>{{scope.row.materialPrototype}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="originWay" label="来源渠道" min-width="168;" :resizable="false"></el-table-column>
    <el-table-column prop="paperMaterial" label="纸质材料" min-width="168;" :resizable="false"></el-table-column>
    <el-table-column prop="paperNecessary" label="材料必要性" min-width="170;" :resizable="false"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "MaterialTable",
  props: {
    materialTable: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      // 表头样式
      tableRowClassName: {
        textAlign: "center",
        fontWeight: "700",
        color: "#000",
        fontSize: "14px",
        backgroundColor: "#ebe6db"
      }
    };
  },
  methods: {
    // 弹出框合并行
    arraySpanMethodDialog({ rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 4) {
        if (columnIndex === 0) {
          return [1, 5];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
