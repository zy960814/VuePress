<template>
  <div class="waitHandle">
    <div class="textRight">
      <el-radio v-model="radio" label="1">被催办事项</el-radio>
      <el-radio v-model="radio" label="2">已催办事项</el-radio>
    </div>
    <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
      <div slot="header" class="fl">
        <div class="row_1">
          <el-input
            placeholder="事项名称/催办人"
            v-model="form.keyWord"
            class="keyword mr-10 fl">
            <el-button slot="append" @click="searchFun">搜索</el-button>
          </el-input>
        </div>
      </div>
    </collapse-form>
    <el-table :data="tableData" border style="width: 100%" :height="contentHeight" :cell-style="yellowBg">
      <el-table-column width="50" prop="name" label="标记"  ></el-table-column>
      <el-table-column width="50" label="序号"  type="index" :index="indexMethod"></el-table-column>
      <el-table-column min-width="150" prop="economicType" label="事项名称"  ></el-table-column>
      <el-table-column min-width="150" prop="time" label="剩余时间/停留时间"  ></el-table-column>
      <el-table-column min-width="150" prop="corpName" label="催办人"  ></el-table-column>
      <el-table-column min-width="150" prop="instName" label="通知内容"  ></el-table-column>
      <el-table-column min-width="150" prop="applTime" label="催办日期"  ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="primary" size="small">办理</el-button>
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
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import CollapseForm from '@/components/commons/CollapseForm'
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
  },
  data() {
    return {
      radio: '1',
      // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      tableData: [
        {
          name: '未读',
          time: '2020-6-5',
          applTime: "2020-05-22",
          corpName: "张丽",
          economicType: "有限责任公司",
          instName: "全国重点文物保护单位原址保护措施申请",
        },
        {
          name: '已读',
          time: '2020-6-5',
          applTime: "2020-05-22",
          corpName: "张丽",
          economicType: "有限责任公司",
          instName: "全国重点文物保护单位原址保护措施申请",
        }
      ],
      totalCount: 0,
      queryParams: {
        pagination: {
          currentPageNumber: 1,
        }
      },
    }
  },
  computed: {
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
    // 办理
    editClick() {

    },
    //  rowIndex是第几行，columnIndex是第几列
    yellowBg ({row, columnIndex}) {
      if (row.name === '未读' && columnIndex === 0) {
        return {
          background: 'red',color:'#fff'
        }
      }else if(row.name === '已读' && columnIndex === 0) {
        return {
          background: 'green',color:'#fff'
        }
      }
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
   
    // 搜索按钮
    searchFun() {
      this.searchWait()
    },
   
    //重置
    resetForm() {
    
    },
    tableFillin(row) {
      console.log(row,'row')
      // console.log(this.queryParams)
      this.$router.push('/province/opinions-provincial/Opinions')
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
  margin-top: 10px;
}
/deep/ .el-table th > .cell {
  text-align: center;
}
/deep/ .el-table .cell {
  text-align: center;
}
/deep/ .collapse-form {
    text-align: left !important;
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