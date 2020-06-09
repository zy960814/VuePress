<template>
  <div class="table-box">
    <table class="table-body">
      <tr class="tr-body" v-for="(row, outerIndex) in dataArray" :key="outerIndex">
        <!-- flex: 0 0 x% 自适应布局，每一大列的宽度按百分比显示 -->
        <div
          class="td-box"
          :style="{flex: '0 0 ' + 100 / row.length + '%'}"
          v-for="(col, innerIndex) in row"
          :key="innerIndex"
        >
          <td class="td-key" v-bind="$attrs">{{ col.key }}</td>
          <td class="td-value">{{ col.value }}</td>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    dataArray: {
      type: Array,
      require: true
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  /*设置为collapse后，border-spacing就失效了*/
}
.table-box {
  .table-body {
    width: 100%;
    border: 1px solid #dfe6ec;
    .tr-body {
      display: flex;
      border-bottom: 1px solid #dfe6ec;
      &:last-child {
        border-bottom: 0;
      }
      .td-box {
        display: flex;
        border-left: 1px solid #dfe6ec;
        &:first-child {
          border-left: 0;
        }
        .td-key {
          // width: 104px;
          padding: 10px;
          line-height: 20px;
          text-align: center;
          background-color: #f2f2f2;
          border-right: 1px solid #dfe6ec;
        }
        .td-value {
          flex: 1 0;
          line-height: 20px;
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>