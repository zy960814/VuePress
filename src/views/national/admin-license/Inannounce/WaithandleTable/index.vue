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
    <el-table
      :data="tableData"
      border
      :header-cell-style="{background:'#f2f2f2',color:'#555'}"
      :height="contentHeight"
      style="width: 100%">
      <el-table-column min-width="55"  label="序号" type="index" :index="indexMethod" ></el-table-column>
      <el-table-column  min-width="150" prop="sendInst" label="申报主体"></el-table-column>
      <el-table-column  min-width="150" prop="openShape" label="公开类型"></el-table-column>
      <el-table-column  min-width="150" prop="acceptDepartment" label="受理部门"></el-table-column>
      <el-table-column  min-width="150" prop="sponsor" label="拟稿人"></el-table-column>
      <el-table-column  min-width="150" prop="signDate" label="签发时间"></el-table-column>
      <el-table-column  min-width="150" prop="annouceDate" label="公示时间"></el-table-column>
      <el-table-column  min-width="150" prop="remnant" label="剩余公示时间"></el-table-column>
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
      // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      totalCount: 0,
      currentPageNumber: '',
      queryParams: {
        pagination:{
          currentPageNumber:1,
          pageSize:10
        }
      },
      tableData:[
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '3 天'
        },
         {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '2 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        },
        {
          itemTitle: '国家文物局关于中国共产党第一次全国代表大会宿舍旧址保护修缮项目的意见',
          sendInst: '上海市文物管理局',
          openShape: '主动公开',
          acceptDepartment: '革命文物司',
          sponsor: '陈起',
          signDate: '2020-5-31 21:03:56',
          annouceDate: '2020-5-31 21:04:00',
          remnant: '1 天'
        }
      ],
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 590
        ? 590
        : this.$store.getters.screenHeight
    },
    contentHeight: function() {
      return (
        'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 260 : 300) + 'px)'
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
      // this.form = {
      //   keyWordS: '',
      //   keywords: '',
      //   handle: '',
      //   superviseType: ''
      // }
      this.queryParams = {
        condition: {
          searchKey: '',
          keyWord: '',
          handle: '0',
          superviseType: ''
        },
        pagination: {
          currentPage: 1,
          pageSize: 10
        },
        sort: {
          column: '',
          dir: ''
        }
      }
      // console.log(this.queryParams)

      this.searchWait()
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
}
</style>
