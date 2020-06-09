<template>
  <div class="content">
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
    <el-table :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" width="50" type="index" :index="indexMethod" prop="date" ></el-table-column>
      <el-table-column label="登录" min-width="70" prop="name" ></el-table-column>
      <el-table-column label="用户名" min-width="70" prop="department" ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import CollapseForm from '@/components/commons/CollapseForm'
export default {
  components: {
    CollapseForm
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
      tableData:[
        {
          name: 'admin',
          department: '超级管理员',
        },
        {
          name: 'zhangsan',
          department: '张三',
        },
        {
          name: 'yez',
          department: 'lll',
        }
      ]
    }
  },
  methods: {
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
    // 搜索按钮
    searchFun() {
      // this.searchWait()
    },
    resetForm( ){

    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    handleSelectionChange(val) {
      console.log(val,'val')
      if (val.length > 1) {
          this.$refs.multipleTable.clearSelection();
          let array=val.pop();
          this.$refs.multipleTable.toggleRowSelection(array);
          this.chooseItem=array;
      } else {
          this.chooseItem=val;
      }
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 815
        ?  815
        : this.$store.getters.screenHeight;
    },
    contentHeight: function() {
      return (
        'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 170 : 300) + 'px)'
      )
    },
  },
}
</script>
<style lang="scss" scoped>
  .content /deep/ .el-checkbox__inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-x:hidden
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

