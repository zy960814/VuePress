<template>
  <div  class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        国家文物进出境审核管理处名单
      </div>
      <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
        <div slot="header" class="fl">
          <div class="row_1 clear-float">
            <el-input
                    placeholder="请输入名称"
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
      </table-opt-menu>
      <el-table
              :data="tableData"
              stripe
              :header-cell-style="{background:'#f2f2f2',color:'#555'}"
              :fit="true"
              row-key="id"
              :height="contentHeight"
              border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column
                v-for="(column, index) in columns"
                :key="index"
                :min-width="column.width"
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
        form: {


        },
        queryParams: {
          pageNation: {
            currentPage: 1,
            pageSize: 20
          }
        },
        tableData1: [],
        columns: [
          { label: '省份', data: 'districtCode', width: 15 },
          { label: '名称', data: 'organizationName', width: 25 },
          { label: '地址', data: 'batchNum', width: 40 },
          { label: '电话', data: 'districtCode', width: 20 }
        ],
        // tableData: [
        //   {
        //     address: '青海省西宁市城西区西关大街58号',
        //     batchNum: '第二批',
        //     districtCode: '青海省',
        //     gmtCreate: '2020-02-05 07:23:46',
        //     id: '4028318170143b4e0170143bc7cb0000',
        //     legalRepresentative: '祝君',
        //     organizationName: '青海省博物馆',
        //     telNo: '0971-6118691',
        //     zipCode: '810000'
        //   }
        // ],
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
