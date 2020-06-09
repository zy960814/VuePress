<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        全国文物保护工程资质单位数据库
      </div>
      <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
        <div slot="header" class="fl">
          <el-select v-model="value" style="float:left;margin-right:10px;">
            <el-option label="关键字" value="keyWord"></el-option>
            <el-option label="名称" value="keyWord1"></el-option>
            <el-option label="法定代表人" value="name"></el-option>
          </el-select>
          <div class="row_1 clear-float">
            <el-input
              placeholder="请输入名称/法定代表人"
              v-model="form.keyWord"
              class="keyword mr-10 fl">
              <el-button slot="append" @click="searchFun">搜索</el-button>
            </el-input>
            <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
          </div>
        </div>
      </collapse-form>
      <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
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
            :value="label.qualRangeCode"
            style="vertical-align: middle;">
          </el-option>
        </el-select>
        <el-select
          size="mini"
          clearable
          v-model="form.qualTypeCode1"
          placeholder="主题类型"
          @change="searchHandle"
          class="mr-10">
          <el-option
            v-for="(label,key)  in  ArrNum"
            :label="label.label"
            :key="key"
            :value="label.value"
            style="vertical-align: middle;">
          </el-option>
        </el-select>
        <el-select
          size="mini"
          clearable
          v-model="form.qualTypeCode1"
          placeholder="资质状态"
          @change="searchHandle"
          class="mr-10">
          <el-option
            v-for="(label,key)  in  ArrNum"
            :label="label.label"
            :key="key"
            :value="label.value"
            style="vertical-align: middle;">
          </el-option>
        </el-select>
      </table-opt-menu>
      <el-table
        :data="tableData"
        stripe
        border
        :header-cell-style="{background:'#f2f2f2',color:'#555'}"
        :height="contentHeight"
        style="width: 100%"
        id="search-result-table"
        :key="Math.random()">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="name" align="center" min-width="180px" label="单位名称">
          <template slot-scope="scope">
            <a
              class="bulueClass"
              href="javascript:"
              @click="showBureaDetail(scope.row)"
            >{{scope.row.organizationName}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="districtCode" align="center" label="省份"></el-table-column>
        <el-table-column align="center" label="资格信息">
          <el-table-column align="center" prop="qualTypeCode" label="设计" width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.pcrunitQualicationTypeCodes.indexOf('1') > -1">
                <i class="el-icon-check" style="font-size: 12px"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="build" label="施工" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.pcrunitQualicationTypeCodes.indexOf('2') > -1">
                <i class="el-icon-check" style="font-size: 12px"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="supervisor" label="监理" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.pcrunitQualicationTypeCodes.indexOf('3') > -1">
                <i class="el-icon-check" style="font-size: 12px"></i>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="corpName" min-width="100px" label="法定代表人"></el-table-column>
        <el-table-column align="center" prop="address" min-width="140px" label="地址"></el-table-column>
        <el-table-column
          align="center"
          prop="registeredCapital"
          min-width="80px"
          label="注册资金(万元)"
        ></el-table-column>
        <el-table-column align="center" prop="organizationNature" min-width="80px" label="单位性质"></el-table-column>
        <el-table-column align="center" prop="updTime" min-width="100px" label="数据更新时间"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNation.currentPage"
        :page-size="queryParams.pageNation.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total,  prev, pager, next, jumper, sizes"
        :total="totalCount"
        style="text-align: center;"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import CollapseForm from '@/components/commons/CollapseForm'
import TableOptMenu from '@/components/commons/TableOptMenu'
export default {
  name: 'dataBasiChildren',
  components: {
    CollapseForm,
    TableOptMenu
  },
  data() {
    return {
      num: 1,
      value1: '',
      input3: '',
      titles: '',
      label: '全国文物保护工程资质单位数据库',
      show: false,
      vloading: true,
      title: '添加全国文物保护工程资质单位数据库',
      centerDialogVisible: false,
      centerDialogVisible1: false,
      totalCount: 200,
      checkedkey: [],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      queryParams: {
        pageNation: {
          currentPage: 1,
          pageSize: 20
        }
      },
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      tableData1: [],
      tableData: [
        {
          address: '',
          creditId: '                  ',
          districtCode: '安徽省',
          gmtCreate: '2020-02-26 08:43:40',
          id: '8280818370809e6e017080aa77ff09be',
          legalRepresentative: '程忠平',
          mngDepartment: '',
          organizationId: '8280818370809e6e017080aa77b009bd',
          organizationName: '安徽徽州文物工程勘察设计有限公司',
          organizationNature: '',
          pcrunitQualicationTypeCodes: '3',
          pcrunitQualicationTypeNames: '监理甲级',
          registeredCapital: '',
          remark: '',
          serialNum: 'ZZ00000125',
          telNo: '12345678'
        }
      ],
      // 资格类型
      qualificationLevelOption: [
        { qualRangeName: "勘察设计甲级", qualRangeCode: "1" },
        { qualRangeName: "勘察设计乙级", qualRangeCode: "4" },
        { qualRangeName: "勘察设计丙级", qualRangeCode: "5" },
        { qualRangeName: "施工一级", qualRangeCode: "2" },
        { qualRangeName: "施工二级", qualRangeCode: "6" },
        { qualRangeName: "施工三级", qualRangeCode: "7" },
        { qualRangeName: "监理甲级", qualRangeCode: "3" },
        { qualRangeName: "监理乙级", qualRangeCode: "8" },
        { qualRangeName: "监理丙级", qualRangeCode: "9" }
      ],
       ArrNum: [
        { value: '1', label: '0~3'},
        { value: '2', label: '3~5'},
        { value: '3', label: '5~8'},
        { value: '4', label: '8~11'},
        { value: '5', label: '11~14'}
      ],
      value: ''
    }
  },
 methods: {
    // 搜索按钮
    searchFun() {
      this.searchWait()
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    // 查询待办表格数据
    searchWait() {

    },
    resetForm() {

    },
    // 
    searchHandle() {
      this.searchWait()
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
  mounted() {},
  updated() {},
  computed: {
    dialogContentHeight() {
      return 560 + 'px'
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 500
        ? 500
        : this.$store.getters.screenHeight
    },
    contentHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 245 : 286) +
        'px)'
      )
    },
    objHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 120 : 160) +
        'px)'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .m-left .el-form-item--small .el-form-item__content {
  margin: 0 !important;
}
/deep/ .el-card .is-never-shadow {
  overflow: hidden !important;
}
/deep/.el-pagination__jump {
  margin-left: 0px;
}
.headerCard {
  overflow-y: scroll;
}
.flex {
  display: flex;
}
.p-5 {
  padding-left: 5px;
}
.pr5 {
  padding-right: 5px;
  line-height: 5px;
}
.inpuWidth {
  min-width: 93px !important;
  max-width: 93px !important;
  // margin:0 5px!important;
}
.widthslect {
  width: 205px;
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
