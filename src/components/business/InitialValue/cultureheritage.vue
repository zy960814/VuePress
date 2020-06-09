<template>
  <div  class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        中国世界文化遗产名录
      </div>
      <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
        <div slot="header" class="fl">
          <div class="row_1 clear-float">
            <el-input
              placeholder="请输入内容"
              v-model="form.keyWord"
              class="keyword mr-10 fl">
              <el-button slot="append" @click="searchFun">搜索</el-button>
            </el-input>
            <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
          </div>
        </div>
      </collapse-form>
      <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
        <el-date-picker
          size="mini"
          v-model="form.submitTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          style="vertical-align: middle;"
          class="mr-10">
        </el-date-picker>
      </table-opt-menu>
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{background:'#f2f2f2',color:'#555'}"
        style="width: 100%;"
        row-key="id"
        :height="contentHeight"
        border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column
          v-for="(column, index) in columns"
          :key="index"
          :width="column.width"
          :label="column.label"
          :prop="column.data"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNation.currentPage"
        :page-size="queryParams.pageNation.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total,  prev, pager, next, jumper, sizes"
        :total="totalCount"
        style="text-align: center;">
      </el-pagination>
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
      value: "",
      totalCount: 0,
      form: {},
      queryParams: {
        pageNation: {
          currentPage: 1,
          pageSize: 20
        }
      },
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
      tableData1: [],
      columns: [
        { label: '遗产地', data: 'organizationName', 'min-width': '150' },
        { label: '列入年份', data: 'legalRepresentative', 'min-width': '100' },
        { label: '省份', data: 'districtCode', 'min-width': '150' },
      ],
      tableData: [
        {
          address: '青海省西宁市城西区西关大街58号',
          batchNum: '第二批',
          districtCode: '青海省',
          gmtCreate: '2020-02-05 07:23:46',
          id: '4028318170143b4e0170143bc7cb0000',
          legalRepresentative: '祝君',
          organizationName: '青海省博物馆',
          telNo: '0971-6118691',
          zipCode: '810000'
        }
      ],
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
    contentHeight: function() {
      return (
        'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 260 : 300) + 'px)'
      )
    },
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
/deep/ .el-card__body {
  padding-bottom: 10px;
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
