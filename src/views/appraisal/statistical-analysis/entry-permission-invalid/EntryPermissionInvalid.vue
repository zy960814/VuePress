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
          prop="appraisal_name"
          fixed="left"
          width="200"
          align="center"
          label="进出境管理处">
      </el-table-column>
      <el-table-column
          prop="taoqi"
          align="center"
          label="陶器">
      </el-table-column>
      <el-table-column
          prop="ciqi"
          align="center"
          label="瓷器">
      </el-table-column>
      <el-table-column
          prop="boli"
          align="center"
          label="玻璃">
      </el-table-column>
      <el-table-column
          prop="tongqi"
          align="center"
          label="铜器">
      </el-table-column>
      <el-table-column
          prop="shiqi"
          align="center"
          label="石器">
      </el-table-column>
      <el-table-column
          prop="yuqi"
          align="center"
          label="玉器">
      </el-table-column>
      <el-table-column
          prop="zhuanwa"
          align="center"
          label="砖瓦">
      </el-table-column>
      <el-table-column
          prop="zhumu"
          align="center"
          label="竹木">
      </el-table-column>
      <el-table-column
          prop="sizhi"
          align="center"
          label="丝织">
      </el-table-column>
      <el-table-column
          prop="qiqi"
          align="center"
          label="漆器">
      </el-table-column>
      <el-table-column
          prop="guyajiao"
          align="center"
          label="骨牙角">
      </el-table-column>
      <el-table-column
          prop="tieqi"
          align="center"
          label="铁器">
      </el-table-column>
      <el-table-column
          prop="jinqi"
          label="金器">
      </el-table-column>
      <el-table-column
          prop="yinqi"
          align="center"
          label="银器">
      </el-table-column>
      <el-table-column
          prop="pige"
          align="center"
          label="皮革">
      </el-table-column>
      <el-table-column
          prop="zhizhi"
          align="center"
          label="纸质">
      </el-table-column>
      <el-table-column
          prop="qita"
          align="center"
          label="其他">
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
        queryReport(this.queryParams, 1).then(({data}) => this.tableData = data)
      }
    }
  }
</script>


<style lang="scss" scoped>
  /deep/ .el-date-editor.el-input__inner {
    width: 260px;
  }
</style>
