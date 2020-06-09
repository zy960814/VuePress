<template>
  <div class="waitHandle">
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
    <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
      <el-select
        size="mini"
        clearable
        v-model="form.qualTypeCode1"
        placeholder="公开类型"
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
      border
      :header-cell-style="{background:'#f2f2f2',color:'#555'}"
      :height="contentHeight"
      style="width: 100%">
      <el-table-column min-width="55"  label="序号" type="index" :index="indexMethod" ></el-table-column>
      <el-table-column  min-width="150" prop="itemTitle" label="文号"></el-table-column>
      <el-table-column  min-width="150" prop="sendInst" label="拟稿单位"></el-table-column>
      <el-table-column  min-width="230" prop="openShape" label="标题"></el-table-column>
      <el-table-column  min-width="130" prop="qualTypeCode1" label="公开类型"></el-table-column>
      <el-table-column  min-width="130" prop="acceptDepartment" label="内容分类"></el-table-column>
      <el-table-column  min-width="130" prop="sponsor" label="形式代码"></el-table-column>
      <el-table-column  min-width="130" prop="annouceDate" label="签发时间"></el-table-column>
      <el-table-column  min-width="130" prop="remnant" label="公示时间"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">下载审批意见</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.pagination.currentPageNumber"
      :page-sizes="[10, 20]"
      :page-size="queryParams.pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import CollapseForm from '@/components/commons/CollapseForm'
import TableOptMenu from '@/components/commons/TableOptMenu'
// import {
//   searchWaitHandle,
//   assignJob,
//   superviseType,
//   saveDynamic,
//   findDynamic
// } from '@/api/national'
export default {
  name: 'WaithandleTable',
  components: {
    CollapseForm,
    TableOptMenu,
  },
  props: {
    selectMenuItem: {
      type: String,
      require: true
    },
    waitHandleTableOut: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      totalCount: 0,
      // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      tableData:[
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        },
        {
          itemTitle: '文物保函[2020]460号',
          sendInst: '文物保护与考古司 文物保护处',
          openShape: '国家文物局关于浏阳文庙保护范围和建设控制地带内保护利用设施建设项目设计方案意见的函',
          acceptDepartment: '文物局发文',
          qualTypeCode1: '主动公开',
          sponsor: '函',
          signDate: '2020-5-31',
          annouceDate: '2020-5-31 ',
          remnant: '2020-5-31'
        }
      ],
      // 资格类型
      qualificationLevelOption: [
        { qualRangeName: "主动公开", qualRangeCode: "1" },
        { qualRangeName: "依申请公开", qualRangeCode: "2" },
        { qualRangeName: "不公开", qualRangeCode: "3" },
      ],
      currentPageNumber: '',
      queryParams: {
        pagination:{
          currentPageNumber:1,
          pageSize:10
        }
      },
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 270
        ? 270
        : this.$store.getters.screenHeight
    },
    contentHeight: function() {
      return (
        'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 298 : 300) + 'px)'
      )
    },
  },
  created() {
    
  },
  mounted() {},
  methods: {
    // 搜索按钮
    searchFun() {
      this.searchWait()
    },

    //重置
    resetForm() {
    
    },
    // 个人待办选中查询
    searchHandle() {},
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchWait()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchWait()
    },
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
  }
}
</script>

<style lang="scss" scoped>
.textRight {
  float: right;
}
/deep/ .el-table th > .cell {
  text-align: center;
}
/deep/ .el-table .cell {
  text-align: center;
}

  .right /deep/ .el-dialog__footer {
    text-align: right!important;
  }
  .right {
    margin-top: 10px;
    text-align: right
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
  /deep/ .el-dialog--center .el-dialog__footer {
    text-align: right !important;
  }
  /deep/ .el-dialog__footer {
  text-align: right !important;
}

  // /deep/ .el-input__inner {
  //   width: 350px;
  // }
}
</style>