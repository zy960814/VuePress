<template>
  <div>
      <div style="height:50px">
        <p style="margin:5px">专家评审</p>
        <el-tag v-for="tag in multipleSelection" :key="tag.name" closable type="info" @close='tagClose(tag)'>{{tag.name}}</el-tag>
      </div>
      <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
      <!-- 添加到这里 -->
        <div slot="header" class="fl">
          <div class="row_1 clear-float">
            <el-input
              placeholder="申请文件标题"
              v-model="form.keyWord"
              class="keyword mr-10 fl">
              <el-button slot="append" @click="searchFun">搜索</el-button>
            </el-input>
          </div>
        </div>
      </collapse-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column min-width="55"  label="序号" type="index" :index="indexMethod" ></el-table-column>
        <el-table-column min-width="120" label="姓名" prop="name"> </el-table-column>
        <el-table-column min-width="120" label="来源" prop="applyFileNum"> </el-table-column>
        <el-table-column min-width="120" label="专业特长" prop="applyFileTitle"> </el-table-column>
        <el-table-column min-width="120" label="待办数量" prop="applyTitle"> </el-table-column>
        <el-table-column min-width="120" label="已办数量" prop="apprName"> </el-table-column>
        <el-table-column min-width="120" label="工作单位" prop="apprCode"> </el-table-column>
        <el-table-column min-width="120" label="联系电话" prop="networkNum"> </el-table-column>
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
export default {
  components: {
    CollapseForm,
  },
  data() {
    return {
      totalCount:100,
      searchHeight: 50,
      currentPageNumber: '',
      queryParams: {
        pagination:{
          currentPageNumber:1,
          pageSize:10
        }
      },
      headerDialogVisible: { flag: false },
      multipleSelection:[],
       // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      tableData: [
        { 
          name:'张三',
          applyFileNum: "鲁文旅呈〔2020〕67",
          applyFileTitle: "山东省文化",
          applyTitle: "山东省文化和旅游",
          apprCode: "56022-a",
          apprName: "保护规划方案",
          networkNum: "网审200415002号",
          id:'1'
        },
        { 
          name:'李四',
          applyFileNum: "鲁文旅呈〔2020〕67",
          applyFileTitle: "山东省文化和",
          applyTitle: "山东省文化和旅游厅",
          apprCode: "56022-a",
          apprName: "保护规划方案",
          networkNum: "网审200415002号",
          id:'2'
        },
        { 
          name:'王五',
          applyFileNum: "鲁文旅呈〔2020〕67",
          applyFileTitle: "山东省文化和",
          applyTitle: "山东省文化和旅游厅",
          apprCode: "56022-a",
          apprName: "保护规划方案",
          networkNum: "网审200415002号",
          id:'3'
        },
      ],
      flag:false,

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
      this.flag=!this.flag
      if(this.flag){
        this.tableData=[{ 
            name:'张三2',
            applyFileNum: "鲁文旅呈〔2020〕67",
            applyFileTitle: "山东省文化",
            applyTitle: "山东省文化和旅游",
            apprCode: "56022-a",
            apprName: "保护规划方案",
            networkNum: "网审200415002号",
            id:'4'
          },{ 
            name:'李四2',
            applyFileNum: "鲁文旅呈〔2020〕67",
            applyFileTitle: "山东省文化和",
            applyTitle: "山东省文化和旅游厅",
            apprCode: "56022-a",
            apprName: "保护规划方案",
            networkNum: "网审200415002号",
            id:'5'
          },{ 
            name:'王五2',
            applyFileNum: "鲁文旅呈〔2020〕67",
            applyFileTitle: "山东省文化和",
            applyTitle: "山东省文化和旅游厅",
            apprCode: "56022-a",
            apprName: "保护规划方案",
            networkNum: "网审200415002号",
            id:'6'
          },];
      }else{
        this.tableData=[{ 
          name:'张三',
          applyFileNum: "鲁文旅呈〔2020〕67",
          applyFileTitle: "山东省文化",
          applyTitle: "山东省文化和旅游",
          apprCode: "56022-a",
          apprName: "保护规划方案",
          networkNum: "网审200415002号",
          id:'1'
        },{ 
          name:'李四',
          applyFileNum: "鲁文旅呈〔2020〕67",
          applyFileTitle: "山东省文化和",
          applyTitle: "山东省文化和旅游厅",
          apprCode: "56022-a",
          apprName: "保护规划方案",
          networkNum: "网审200415002号",
          id:'2'
        },{ 
          name:'王五',
          applyFileNum: "鲁文旅呈〔2020〕67",
          applyFileTitle: "山东省文化和",
          applyTitle: "山东省文化和旅游厅",
          apprCode: "56022-a",
          apprName: "保护规划方案",
          networkNum: "网审200415002号",
          id:'3'
        },]; 
      }
      this.getDataCheck();
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
     // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchWait()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchWait()
    },
        // 表格排序按钮点击函数
    // { column, prop, order }-同elementui
    // dropCol-表头数组
    sort({ column, prop, order }) {
      console.log(column)
      this.queryParams.sort = { column: prop, dir: order }
      this.searchWait()
    },
    // 列宽拖动函数
    // newWidth, oldWidth, column, event-同elementui
    // dropCol-表头数组
    headerDrag(newWidth, oldWidth, column, event, dropCol, checkCol) {
      console.log(newWidth)
      console.log(oldWidth)
      console.log(column)
      console.log(event)
      console.log(dropCol)
      this.dropColInit = dropCol
      this.checkColInit = checkCol
      this.saveDynamicTable()
    },
    // 表头拖拽
    dropHeader(dropCol, checkCol) {
      this.dropColInit = dropCol
      this.checkColInit = checkCol
      this.saveDynamicTable()
    },
    // 表头显隐
    checkHeader(dropCol, checkCol) {
      this.dropColInit = dropCol
      this.checkColInit = checkCol
      this.saveDynamicTable()
    },
    // 查询待办表格数据
    searchWait() {
      // searchWaitHandle(this.queryParams).then(responseData => {
      //   this.waitHandleTable = responseData.data.data
      //   // console.log(this.waitHandleTable)
      //   this.totalCount = responseData.data.pagination.totalNum
      //   this.$emit('total', this.totalCount)
      // })
    },
    // 表格选中状态
    handleSelectionChange(val){
      this.multipleSelection=val;
      console.log(val)
    },
    // 取消表格选中状态
    tagClose(item){
      console.log(item);
       this.multipleSelection= this.multipleSelection.filter(i=> i!==item.id)//过滤掉删除的tag
       if ( this.multipleSelection.length>0) {
         
            this.$refs.multipleTable.toggleRowSelection(item);
         
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    // 获取数据时处理选中状态
    getDataCheck(){
      console.log(this.multipleSelection)
      if ( this.multipleSelection.length>0) {
         this.multipleSelection.forEach((item)=>{
          this.$refs.multipleTable.toggleRowSelection(item);
         })  
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    }
    
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 640
        ?  640
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

  /deep/ .el-scrollbar__wrap {
    overflow-x:hidden
  }
  .pr5 {
     margin-left: 10px;
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

