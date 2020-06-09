<template>
  <div>
    <table-opt-menu :data="tableOptMenu" @item-click="itemClick" style="margin: 5px 0">
      <span style="font-size: 14px">统计区间：</span>
      <el-date-picker
          v-model="datePickerVal"
          @change="search"
          type="daterange"
          size="mini"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
      </el-date-picker>
    </table-opt-menu>
    <div style="text-align: center; line-height: 28px; margin: -33px 0 5px 0">
      <span class="hxl__subtitle" style="font-size: 14px">（{{ this.datePickerVal ? this.datePickerVal[0].format('yyyy年M月d日') + '-' + this.datePickerVal[1].format('yyyy年M月d日') : '全部统计数据' }}）</span>
    </div>
    <el-table :data="tableData" border stripe :height="tableHeight">
      <el-table-column
          prop="texture"
          align="center"
          label="文物质地">
      </el-table-column>
      <el-table-column
          prop="cj"
          align="center"
          label="文物出境（不含复出境）">
      </el-table-column>
      <el-table-column
          prop="lsjjfcj"
          align="center"
          label="文物临时进境复出境">
      </el-table-column>
      <el-table-column
          prop="lscj"
          align="center"
          label="文物临时出境">
      </el-table-column>
      <el-table-column
          prop="lscjfjj"
          align="center"
          label="文物临时出境复进境">
      </el-table-column>
      <el-table-column
          prop="jzcj"
          align="center"
          label="文物禁止出境">
      </el-table-column>
      <el-table-column
          prop="total"
          align="center"
          label="合计">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import {print} from '@/utils/common'

  export default {
    components: {
      TableOptMenu
    },
    props: {
      heightOffset: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        tableOptMenu: [{
          icon: 'el-icon-top-right',
          text: '导出',
          evt: 'export'
        }, {
          icon: 'el-icon-printer',
          text: '打印',
          evt: 'print'
        }],
        pickerOptions: {
          shortcuts: [{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datePickerVal: null,
        tableData: [{
          texture: '石器',
          cj: 61,
          lsjjfcj: 146,
          lscj: 2,
          lscjfjj: 99,
          jzcj: 4,
          total: 312
        }, {
          texture: '玉器',
          cj: 51,
          lsjjfcj: 46,
          lscj: 5,
          lscjfjj: 25,
          jzcj: 0,
          total: 127
        }, {
          texture: '砖瓦',
          cj: 6,
          lsjjfcj: 0,
          lscj: 0,
          lscjfjj: 7,
          jzcj: 0,
          total: 13
        }, {
          texture: '陶瓷',
          cj: 10,
          lsjjfcj: 103,
          lscj: 0,
          lscjfjj: 144,
          jzcj: 1,
          total: 258
        }],
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
    computed: {
      tableHeight: function () {
        return 'calc(100vh - ' + ((this.$store.getters.menuStyle === 1
          ? 170 : 211) + this.heightOffset) + 'px)'
      }
    },
    mounted() {

    },
    methods: {
      itemClick(evt) {
        switch (evt) {
          case 'print':
            print('printDOMElement');
            break;
          case 'export':
            break;
        }
      },
      search() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-date-editor.el-input__inner {
    width: 260px;
  }
</style>
