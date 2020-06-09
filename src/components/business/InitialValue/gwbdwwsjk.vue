<template>
  <div  class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        外国被盗文物数据库
      </div>
      <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
        <div slot="header" class="fl">
          <el-select v-model="value" style="float:left;margin-right:10px;">
            <el-option label="关键字" value="keyWord"></el-option>
            <el-option label="名称" value="keyWord1"></el-option>
            <el-option label="通报国" value="name"></el-option>
          </el-select>
          <div class="row_1 clear-float">
            <el-input
                    placeholder="请输入关键字"
                    v-model="form.keyWord"
                    class="keyword mr-10 fl">
              <el-button slot="append" @click="searchFun">搜索</el-button>
            </el-input>
            <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
          </div>
        </div>
      </collapse-form>
      <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
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
        form: {},
        queryParams: {
          pageNation: {
            currentPage: 1,
            pageSize: 20
          }
        },
        // 资格类型
        qualificationLevelOption: [
        ],
        ArrNum: [
        ],
        tableData: [

        ],
        tableData1: [],
        columns: [
          { label: '批次', data: 'organizationName', width: 8 },
          { label: '名称', data: 'districtCode', width: 14 },
          { label: '通报国', data: 'batchNum', width: 8 },
          { label: '通报时间', data: 'batchNum', width: 8 },
          { label: '通报文物数量', data: 'batchNum', width: 8 },
          { label: '文物类别', data: 'batchNum', width: 10 },
          { label: '珍贵文物（件/套）', data: 'batchNum', width: 8 },
          { label: '年代', data: 'batchNum', width: 8 },
          { label: '失窃日期', data: 'batchNum', width: 8 },
          { label: '备注', data: 'batchNum', width: 20 }
        ]
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
