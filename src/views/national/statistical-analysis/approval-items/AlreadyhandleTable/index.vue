<template>
  <div>
    <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
      <div slot="header" class="fl">
        <div class="row_1">
          <el-input
            placeholder="关键字"
            v-model="form.keyWord"
            class="keyword mr-10 fl">
            <el-button slot="append" @click="searchFun">搜索</el-button>
          </el-input>
          <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
        </div>
      </div>
    </collapse-form>
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
          placeholder="地区"
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
    <el-table :data="tableData" border stripe :height="tableHeight">
      <el-table-column
          fixed="left"
          prop="province"
          align="center"
          label="省份"
          min-width="100">
      </el-table-column>
      <el-table-column
          prop="applicant_name"
          align="center"
          label="收藏单位名称"
          width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="馆藏一级文物的修复、复制、拓印许可">
        <el-table-column
          prop="apply56015"
          align="center"
          label="申请数">
        </el-table-column>
        <el-table-column
          prop="end56015"
          align="center"
          label="办结数">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        width="220"
        label="文物出境展览许可">
        <el-table-column
          prop="apply56016"
          align="center"
          width="110"
          label="申请数">
        </el-table-column>
        <el-table-column
          prop="end56016"
          align="center"
          width="110"
          label="办结数">
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        width="220"
        label="非国有文物收藏单位和其他单位借用国有馆藏一级文物许可">
        <el-table-column
          prop="apply56017"
          align="center"
          width="110"
          label="申请数">
        </el-table-column>
        <el-table-column
          prop="end56017"
          align="center"
          width="110"
          label="办结数">
        </el-table-column>
      </el-table-column>
      <el-table-column
          prop="lsjj_zhanlan"
          align="center"
          label="博物馆一级藏品取样分析许可">
          <el-table-column
            prop="apply56019"
            align="center"
            label="申请数">
          </el-table-column>
          <el-table-column
            prop="end56019"
            align="center"
            label="办结数">
          </el-table-column>
      </el-table-column>
      <el-table-column
        prop="total"
        align="center"
        label="合计">
        <el-table-column
          prop="applytotal"
          align="center"
          label="申请数">
        </el-table-column>
        <el-table-column
          prop="endtotal"
          align="center"
          label="办结数">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CollapseForm from '@/components/commons/CollapseForm'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import {print} from '@/utils/common'

  export default {
    components: {
      TableOptMenu,
      CollapseForm
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
            applicant_name: "柏林寺",
            apply56015: 0,
            apply56016: 0,
            apply56017: 0,
            apply56019: 0,
            applytotal: 1,
            end56015: 0,
            end56016: 0,
            end56017: 0,
            end56019: 0,
            endtotal: 2,
            province: "北京市",
            province_code: "11"
          },
          {
            applicant_name: "北京鼓楼、钟楼",
            apply56015: 0,
            apply56016: 0,
            apply56017: 0,
            apply56019: 0,
            applytotal: 1,
            end56015: 0,
            end56016: 0,
            end56017: 0,
            end56019: 0,
            endtotal: 2,
            province: "北京市",
            province_code: "11"
          },
          {
            applicant_name: "北京宋庆龄故居",
            apply56015: 0,
            apply56016: 0,
            apply56017: 0,
            apply56019: 0,
            applytotal: 1,
            end56015: 0,
            end56016: 0,
            end56017: 0,
            end56019: 0,
            endtotal: 2,
            province: "北京市",
            province_code: "11"
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
          ? 260 : 211) + this.heightOffset) + 'px)'
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
