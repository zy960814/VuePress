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
          fixed="left"
          prop="appr_inst_name"
          align="center"
          label="进出境管理处"
          width="150">
      </el-table-column>
      <el-table-column
          align="center"
          label="文物出境">
        <el-table-column
            prop="wwcj_geren"
            align="center"
            label="个人携带">
        </el-table-column>
      </el-table-column>
      <el-table-column
          align="center"
          label="文物临时出境">
        <el-table-column
            prop="lscj_zhanlan"
            min-width="120"
            align="center"
            label="展览申请">
        </el-table-column>
      </el-table-column>
      <el-table-column
          align="center"
          label="文物临时进境">
        <el-table-column
            prop="lsjj_zhanlan"
            align="center"
            label="展览申请">
        </el-table-column>
        <el-table-column
            align="center"
            class-name="add_right_border"
            label="个人携带">
          <el-table-column
              prop="shoucang"
              align="center"
              label="收藏">
          </el-table-column>
          <el-table-column
              prop="paimai"
              align="center"
              label="拍卖">
          </el-table-column>
          <el-table-column
              prop="xiaoshou"
              align="center"
              label="销售">
          </el-table-column>
          <el-table-column
              prop="xiufu"
              align="center"
              label="修复">
          </el-table-column>
          <el-table-column
              prop="keyan"
              align="center"
              label="科研">
          </el-table-column>
          <el-table-column
              prop="zhanlan"
              align="center"
              label="展览">
          </el-table-column>
          <el-table-column
              prop="qita"
              align="center"
              class-name="add_right_border"
              label="其他">
          </el-table-column>
        </el-table-column>
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
        tableData: [],
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
