<template>
  <div>
    <table-opt-menu :data="tableOptMenu" @item-click="itemClick" style="margin: 5px 0">
      <el-select
          size="mini"
          clearable
          v-model="form.qualTypeCode1"
          placeholder="省份"
          @change="searchHandle"
          class="mr-10">
          <el-option
            v-for="(label,key)  in  qualificationLevelOption"
            :label="label.qualRangeName"
            :key="key"
            :value="label.qualRangeCode">
          </el-option>
      </el-select>
    </table-opt-menu>
    <el-table :data="tableData" border stripe :height="tableHeight" :showSummary='true' :spanMethod='objectSpanMethod'>
      <el-table-column 
          min-width="55"  
          label="序号" 
          type="index" 
          :index="indexMethod" >
      </el-table-column>
      <el-table-column
          prop="province"
          align="center"
          label="监管类型"
          width="100">
      </el-table-column>
      <el-table-column
        align="center"
        label="执法人员性质">
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="公务员">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="事业单位人员">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="高校老师">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="职级">
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="司级">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="处级">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="法律资格">
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="具有">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="不具有">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="学历">
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="本科">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="硕士研究生">
        </el-table-column>
        <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="博士研究生">
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
      //表头的序号
      indexMethod(index) {
        return ++index;
      },
      // 合并最后1行的合计
      objectSpanMethod({row, column, rowIndex, columnIndex}){
        console.log(row, column, rowIndex, columnIndex);
        if(columnIndex==1&&rowIndex==this.tableData.length){
            return{
              rowspan:0,
              colspan:1,
            }
        }
      }
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
