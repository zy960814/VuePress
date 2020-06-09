<template>
  <div class="table-box">
    <table class="table-body" border="0" cellspacing="0" cellpadding="0">
      <tr v-if="title">
        <td :style="{borderTop:borderTitle}" class="td-title">
          {{title}}
          <div class="titleButton">
            <slot name="titleInsert"></slot>
          </div>
        </td>
      </tr>
      <tr class="tr-body" v-for="(row, outerIndex) in dataArray" :key="outerIndex">
        <!-- flex: 0 0 x% 自适应布局，每一大列的宽度按百分比显示 -->
        <div
          class="td-box"
          :style="{flex: '0 0 ' + 100 / row.length + '%','-ms-flex':'0 0 ' + 100 / row.length + '%'}"
          v-for="(col, innerIndex) in row"
          :key="innerIndex"
        >
          <!-- 为了防止打印边框消失所以给最后一条边框设置成td的边框而不用table的边框 -->
          <template v-if="outerIndex===dataArray.length-1">
            <td
              class="td-key last-tdkey"
              v-bind="$attrs"
              :style="{lineHeight:tdLineHeight,borderBottom: lastBorder}"
            >{{ col.key }}</td>
            <td
              class="td-value last-tdkey"
              :style="{lineHeight:tdLineHeight,borderBottom: lastBorder}"
            >
              <slot :name="`line_${outerIndex}${innerIndex}`" :colValue="col.value">{{ col.value }}</slot>
            </td>
          </template>
          <template v-else>
            <td class="td-key" v-bind="$attrs" :style="{lineHeight:tdLineHeight}">{{ col.key }}</td>
            <td class="td-value" :style="{lineHeight:tdLineHeight}">
              <slot :name="`line_${outerIndex}${innerIndex}`" :colValue="col.value">{{ col.value }}</slot>
            </td>
          </template>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    // 表格数据
    verticalTableData: {
      type: Object,
      require: true
    },
    // 表格标题数据（数组包含对象形式，一共对象为一行）
    verticalTableTitle: {
      type: Array,
      require: true
    },
    title: {
      type: String
    },
    tdLineHeight: {
      type: String,
      default: '20px'
    },
    borderTitle: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      // 表格的数据
      // dataArray: []
      lastBorder: '0.5px solid gray'
    }
  },
  // watch: {
  //   verticalTableData: {
  //     handler() {
  //       this.renderData()
  //     },
  //     immediate: true
  //   }
  // },
  computed: {
    dataArray() {
      if (!this.verticalTableData) {
        return
      }
      let table = [] // 大表格
      let tmpRow = [] // 临时数组，表示 row，一行数据

      this.verticalTableTitle.forEach(currentValue => {
        for (let key in currentValue) {
          tmpRow.push({
            key: currentValue[key],
            value: this.verticalTableData[key]
          })
        }
        table.push(tmpRow)
        tmpRow = []
      })
      return table
    }
  },
  mounted() {
    // this.renderData()
    console.log(this.dataArray,'dataArray')
  },
  methods: {
    // 竖形表格数据处理函数
    // renderData() {
    //   if (!this.verticalTableData) {
    //     return
    //   }
    //   let table = [] // 大表格
    //   let tmpRow = [] // 临时数组，表示 row，一行数据
    //   this.verticalTableTitle.forEach(currentValue => {
    //     for (let key in currentValue) {
    //       tmpRow.push({
    //         key: currentValue[key],
    //         value: this.verticalTableData[key]
    //       })
    //     }
    //     table.push(tmpRow)
    //     tmpRow = []
    //   })
    //   console.log('222222222222')
    //   return table
    //   // this.dataArray = table
    // }
  }
}
</script>

<style lang="scss" scoped>
// 打印时边框随机消失，看情况用td或者table的边框来设置表格的边框吧
// 这样设置边框是为了防止打印时表格的边框消失了(包括上面的template的设置都是为了防止打印边框消失)
.table-box table {
  border-right: 0.5px solid gray;
  border-collapse: collapse;
}

.table-box table td {
  border: 0.5px solid gray;
  border-right: none;
  border-bottom: none;
}

.table-box {
  .table-body {
    width: 100%;
    font-size: 12px;

    .tr-body {
      display: flex;

      &:last-child {
        border-bottom: 0;
      }

      .td-box {
        display: flex;
        &:first-child {
          border-left: 0;
        }

        .td-value {
          flex: 1 0;
          // 下面为兼容ie
          float: left;
          // line-height: 20px;
          padding: 11px 20px;
        }
      }
    }
  }
}
.td-key {
  padding: 11px;
  text-align: center;
  background-color: #f2f2f2;
  position: relative;
  // 下面为兼容ie
  float: left;
}
.last-tdkey {
  border-bottom: 0.5px solid gray;
}
// .col-key {
//   line-height: 10px;
//   height: 10px;
//   // position: absolute;
//   // top: 50%;
//   // transform: translateY(-50%);
// }
.td-title {
  padding: 10px;
  // line-height: 20px;
  text-align: center;
  // background-color: #f2f2f2;
  font-weight: 700;
  background-color: white;
  font-size: 14px;
  position: relative;
}
.titleButton {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
