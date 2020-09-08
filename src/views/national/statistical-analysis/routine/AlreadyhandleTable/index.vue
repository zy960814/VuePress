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
          style="vertical-align: middle;"
          :picker-options="pickerOptions">
      </el-date-picker>
      <el-select
          size="mini"
          clearable
          v-model="form.qualTypeCode1"
          placeholder="国家文物局"
          @change="searchHandle"
          class="mr-10">
          <el-option
            v-for="(label,key)  in  qualificationLevelOption"
            :label="label.qualRangeName"
            :key="key"
            :value="label.qualRangeCode"
            style="vertical-align: middle;">
          </el-option>
      </el-select>
    </table-opt-menu>
    <div style="text-align: center; line-height: 28px; margin: -33px 0 5px 0">
      <span class="hxl__subtitle" style="font-size: 14px">（{{ this.datePickerVal ? this.datePickerVal[0].format('yyyy年M月d日') + '-' + this.datePickerVal[1].format('yyyy年M月d日') : '全部统计数据' }}）</span>
    </div>
    <el-table :data="tableData" border stripe :height="tableHeight">
      <el-table-column
          fixed="left"
          prop="belongCode"
          align="center"
          label="编码"
          width="80">
      </el-table-column>
      <el-table-column
          prop="apprName"
          align="center"
          label="事项类型"
          width="180">
      </el-table-column>
      <el-table-column
          prop="newApply"
          align="center"
          label="新申请事项"
          width="100">
      </el-table-column>
      <el-table-column
          align="center"
          label="未受理事项">
        <el-table-column
          prop="upd"
          align="center"
          label="材料补正">
        </el-table-column>
        <el-table-column
          prop="refuse"
          align="center"
          label="不予受理">
        </el-table-column>
        <el-table-column
          prop="needAccept"
          align="center"
          label="待受理审查">
        </el-table-column>
        <el-table-column
          prop="unaccpetback"
          align="center"
          label="未受理主动撤回">
        </el-table-column>
      </el-table-column>
      <el-table-column
          align="center"
          label="已受理事项">
        <el-table-column
          prop="endontime"
          align="center"
          label="承诺时限内办结">
        </el-table-column>
        <el-table-column
          prop="dealontime"
          align="center"
          label="未逾期未办结">
        </el-table-column>
        <el-table-column
          prop="endouttime"
          align="center"
          label="逾期办结">
        </el-table-column>
        <el-table-column
          prop="dealouttime"
          align="center"
          label="逾期未办结">
        </el-table-column>
        <el-table-column
          prop="accpetback"
          align="center"
          label="已受理主动撤回">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import {print} from '@/utils/common'

  export default {
    components: {
      TableOptMenu,
    },
    props: {
      heightOffset: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        qualificationLevelOption:[],
         // 表单数据
        form: {
          keyWordS: '', //下拉框
          keywords: '', //输入框
          handle: '', //个人待办
          superviseType: '' //监管类型
        },
        tableData:[
          {
            accpetback: 2,
            apprName: "馆藏一级文物的修复、复制、拓印许可",
            belongCode: "56015",
            dealontime: 12,
            dealouttime: 0,
            endontime: 16,
            endouttime: 0,
            needAccept: 0,
            newApply: 38,
            refuse: 12,
            unaccpetback: 1,
            upd: 0
          }, 
          {
            accpetback: 11,
            apprName: "考古发掘计划许可",
            belongCode: "56008",
            dealontime: 6,
            dealouttime: 0,
            endontime: 13,
            endouttime: 0,
            needAccept: 0,
            newApply: 24,
            refuse: 1,
            unaccpetback: 0,
            upd: 2
          },
          {
            accpetback: 24,
            apprName: "全国重点文物保护单位保护规划审批",
            belongCode: "56022",
            dealontime: 25,
            dealouttime: 0,
            endontime: 129,
            endouttime: 0,
            needAccept: 54,
            newApply: 101,
            refuse: 26,
            unaccpetback: 6,
            upd: 38
          }
        ],
        tableOptMenu: [
          {
            icon: 'el-icon-top-right',
            text: '导出',
            evt: 'export'
          }, 
          {
            icon: 'el-icon-printer',
            text: '打印',
            evt: 'print'
          }
        ],
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
          ? 220 : 211) + this.heightOffset) + 'px)'
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
      searchHandle() {
      },
      search() {

      },
      // 搜索按钮
      searchFun() {
        
      },

      //重置
      resetForm() {

      },
    }
  }
</script>


<style lang="scss" scoped>
  /deep/ .el-date-editor.el-input__inner {
    width: 260px;
  }
  .row_1 {
    display: inline-block;
    margin: 0 auto;

    .keyword {
      width: 540px;
    }
    /deep/ .el-date-editor.el-input__inner {
      width: 260px;
    }

    /deep/ .el-input-group__prepend {
      width: 128px;
      background-color: #fff;

      .el-input__inner {
        width: 131px;
      }
    }

    // /deep/ .el-input__inner {
    //   width: 350px;
    // }
  } 
</style>
