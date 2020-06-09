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
  import {queryReport, exportReport} from '@/api/appraisal/statistical-analysis'
  import exportParams from './exportParams'
  import download from '@/utils/download'

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
        tableData: [],
        totalCount: 0,
        queryParams: {
          beginDate: '',
          endDate: ''
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
      this.search();
    },
    methods: {
      itemClick(evt) {
        switch (evt) {
          case 'print':
            print('printDOMElement');
            break;
          case 'export':
            var subtitle = document.querySelector('.hxl__subtitle').innerText;
            exportReport(exportParams(this.queryParams, subtitle)).then(({data}) => {
              download(data, document.querySelector('.hxl__title').innerText, 0);
            });
            break;
        }
      },
      search() {
        this.queryParams.beginDate = this.datePickerVal ? this.datePickerVal[0].format('yyyy-MM-dd 00:00:00') : '';
        this.queryParams.endDate = this.datePickerVal ? this.datePickerVal[1].format('yyyy-MM-dd 23:59:59') : '';
        queryReport(this.queryParams, 3).then(({data}) => this.tableData = data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-date-editor.el-input__inner {
    width: 260px;
  }
</style>
