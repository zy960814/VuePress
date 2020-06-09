<template>
  <div class="alreadyHandle">
    <collapse-form
      @search-fun="searchFun"
      @reset-form="resetForm"
      @header-setting="headerSetting"
      @show-button="showFun"
    >
      <div slot="header" class="fl">
        <div class="row_1 clear-float">
          <!-- v-model="form.keyWord" -->
          <el-select
            size="mini"
            v-model="queryParams.condition.searchKey"
            class="selectOne"
            placeholder="关键字"
          >
            <el-option
              v-for="item in keyWordsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="queryParams.condition.keyWord"
            size="mini"
            placeholder="检查行为/监管对象/检查人员"
            style="width:300px;"
          ></el-input>
        </div>
      </div>
      <template #formInput>
        <el-select
          size="mini"
          class="selectTwo"
          v-model="queryParams.condition.handle"
          placeholder="个人待办"
          @change="searchHandle"
        >
          <el-option
            v-for="item in handleArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="vertical-align: middle;"
          ></el-option>
        </el-select>
        <el-select
          size="mini"
          class="selectThree"
          v-model="queryParams.condition.superviseType"
          placeholder="全部监管类型"
          @change="searchSupersiveType"
        >
          <el-option
            v-for="item in superviseTypeArr"
            :key="item.code"
            :label="item.name"
            :value="item.name"
            style="vertical-align: middle;"
          ></el-option>
        </el-select>
        <el-select
          size="mini"
          class="selectThree"
          v-model="queryParams.condition.status"
          placeholder="状态"
          @change="searchStatus"
        >
          <el-option
            v-for="item in statusArr"
            :key="item.code"
            :label="item.name"
            :value="item.name"
            style="vertical-align: middle;"
          ></el-option>
        </el-select>
      </template>
    </collapse-form>
    <!-- <el-row style="margin-top:10px;"> -->
    <dynamic-table
      :tableData="alreadyHandleTable"
      :fixButtonArr="fixButtonArr"
      :checkColInit="checkColInit"
      :dropColInit="dropColInit"
      :searchHeight="searchHeight"
      v-if="dropColInit.length>0&&checkColInit.length>0"
      :dialogShow.sync="headerDialogVisible"
      @click-0="tableConfirm"
      @click-1="tableAdjust"
      @sort-change="sort"
      @header-dragend="headerDrag"
      @drop="dropHeader"
      @check-header="checkHeader"
    >
      <template #lineInsert_itemName="scope">
        <el-link type="primary" @click="tableConfirm(scope.row)">{{ scope.row.itemName }}</el-link>
      </template>
    </dynamic-table>
    <!-- </el-row> -->
    <el-row type="flex" justify="center" style="margin-top:4px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagination.currentPageNumber"
        :page-sizes="[10, 20]"
        :page-size="queryParams.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </el-row>
    <my-dialog width="1024px" :height="dialogHeight+'px'" :visible.sync="dialogVisible">
      <task-detail :key="dialogKey" :height="dialogHeight-174+'px'" :personInfo="personInfo" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskConfirm">任务确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import CollapseForm from '@/components/commons/CollapseForm'
import MyDialog from '@/components/commons/MyDialog'
import TaskDetail from '../TaskDetail'
import DynamicTable from '@/components/commons/DynamicTable'
import {
  searchAlreadyHandle,
  waitDetail,
  assignJob,
  superviseType,
  saveDynamic,
  findDynamic
} from '@/api/national'
export default {
  name: 'WaithandleTable',
  components: {
    CollapseForm,
    MyDialog,
    TaskDetail,
    DynamicTable
  },
  props: {
    selectMenuItem: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      // 关键字下拉框
      keyWordsArr: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'checkActionName',
          label: '检查行为名称'
        },
        {
          value: 'superviseObject',
          label: '监管对象'
        },
        {
          value: 'checkPersonnel',
          label: '检察人员'
        }
      ],
      // 个人待办下拉框数据
      handleArr: [
        {
          value: '0',
          label: '个人待办'
        },
        {
          value: '1',
          label: '全处待办'
        },
        {
          value: '2',
          label: '全司待办'
        },
        {
          value: '3',
          label: '全局待办'
        }
      ],
      // 全部监管类型
      superviseTypeArr: [],
      // 状态下拉框数据
      statusArr: [],
      // 确认弹框
      dialogVisible: false,
      dialogKey: 0,
      //  false/false按钮对应页面高度变化
      searchHeight: 70,
      // // 代办表单组件数据
      // alreadyHandle: {
      //   timeRangeFlag: false,
      //   dealStatusFlag: false,
      //   applyTypeFlag: false,
      //   entryPurposeFlag: false,
      //   personalWaitHandleFlag: true,
      //   superviseTypeFlag: true
      // },
      // 代办表格数据
      alreadyHandleTable: [],
      // 已办表格表头属性(全部)--------往后台传从后台取
      checkColInit: [],
      // 已办表格表头拖拽显隐后的属性--------往后台传从后台取
      dropColInit: [],
      fixButtonArr: ['确认', '调整'], //固定列的按钮
      totalCount: 0,

      queryParams: {
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
      },
      // queryParams: {
      //   pagination: {
      //   currentPageNumber: 1,
      //   pageSize: 10,
      //   },
      //   sort: '',
      //   dir: ''
      // },

      // 当前查看详情的crId
      currentCrId: '',
      // 表头设置弹框
      // (用对象而不直接用boolean值是因为对话框封装成子组件的时候，点击头部小叉叉总是会报不能操作子组件属性值的错误，实属无奈之举，勿动)
      headerDialogVisible: { flag: false },
      // 任务详情
      personInfo: {}
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 815
        ? 815
        : this.$store.getters.screenHeight
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.dialogKey++
      }
    },
    dialogHeight() {
      this.dialogKey++
    }
  },
  created() {
    this.recordSearch()
    this.getsuperviseType()
    this.findDynamic()
    this.searchAlready()
  },
  mounted() {},
  methods: {
    // 跳转之后回显之前的搜索条件
    recordSearch() {
      if (this.$route.params.queryParams) {
        this.queryParams = this.$route.params.queryParams
      } else {
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
      }
    },
    // 表头配置
    headerSetting() {
      this.headerDialogVisible.flag = true
    },
    // 搜索按钮
    searchFun() {
      this.searchAlready()
    },
    // 点击false/false
    showFun(flag) {
      // 1-false，0-false
      if (flag === 1) {
        this.searchHeight = 0
      } else {
        this.searchHeight = -30
      }
    },
    //重置
    resetForm() {
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
      this.searchAlready()
    },
    // search(currentPage) {
    //   this.queryParams.pagination.currentPage = currentPage ? currentPage : 1
    // },
    // 表格操作按钮,函数名为click-0、click-1依次类推
    // row-点击所对应的elementui的行对象
    tableConfirm(row) {
      console.log(row.crId)

      this.currentCrId = row.crId
      this.dialogVisible = true
      this.alreadyHandledetail()
      // console.log(this.alreadyHandleTable[index].crId)
    },
    tableAdjust(row) {
      this.$router.push({
        name: 'taskAdjust',
        query: { crId: row.crId, selectMenuItem: this.selectMenuItem },
        params: { queryParams: this.queryParams }
      })
    },
    // 自定义待办列表保存
    saveDynamicTable() {
      // if (this.$route.query.selectMenuItem === '2') {
      //   this.tableType = 'superviseDone'
      // } else {
      //   this.tableType = 'superviseOrders'
      // }
      saveDynamic({
        tableType: 'superviseDone',
        checkCol: this.checkColInit,
        dropColInit: this.dropColInit
      }).then(data => {
        console.log(data)
      })
    },
    // 表格排序按钮点击函数
    // { column, prop, order }-同elementui
    // dropCol-表头数组
    sort({ column, prop, order }) {
      console.log(column)
      // console.log(prop)
      // console.log(order)
      this.queryParams.sort = { column: prop, dir: order }
      this.searchAlready()
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
      // this.dropColInit = {}
      // this.checkColInit = {}
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
    // 查询已办表格数据
    searchAlready() {
      console.log(this.queryParams)

      searchAlreadyHandle(this.queryParams).then(responseData => {
        // console.log(responseData)
        this.alreadyHandleTable = responseData.data.data
        this.totalCount = responseData.data.pagination.totalNum
        this.$emit('total', this.totalCount)
      })
    },
    // 查询详情数据
    alreadyHandledetail() {
      waitDetail(this.currentCrId).then(responseData => {
        this.personInfo = responseData.data.item
      })
    },
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchAlready()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchAlready()
    },
    // 任务确认
    taskConfirm() {
      this.assignJob()
      this.dialogVisible = false
    },
    // 任务下发接口
    assignJob() {
      assignJob({ item: this.personInfo }).then(responseData => {
        console.log(responseData)
      })
    },
    // 全部监管类型接口
    getsuperviseType() {
      superviseType('itemName').then(data => {
        this.superviseTypeArr = data.data
      })
    },
    // 个人待办选中查询
    searchHandle() {
      this.searchAlready()
    },
    // 全部监管类型选中查询
    searchSupersiveType() {
      this.searchAlready()
    },
    // 状态选中查询
    searchStatus() {
      this.searchWait()
    },
    // 自定义列表查询接口
    findDynamic() {
      findDynamic('superviseDone').then(data => {
        if (data.data.tableType !== '未定义') {
          this.checkColInit = data.data.checkCol
          this.dropColInit = data.data.dropColInit
        } else {
          this.checkColInit = [
            {
              label: '序号',
              prop: 'num',
              width: 100, //列宽
              sort: 'descending', //排序方式(鸡肋，因为记录了也不能在一开始初始化的时候多个列都排序，因为一次只能按照一列的规则来排序)
              sortable: false, //是否显示排序图标
              insertFlagArr: { alertbutton: false }, //表头自定义组件
              collapse: false //展开收起
            },
            {
              label: '流水号',
              prop: 'serialNum',
              width: 100, //列宽
              sort: 'descending', //排序方式
              sortable: 'custom', //是否显示排序图标
              insertFlagArr: { alertbutton: false }, //表头自定义组件
              collapse: false
            },
            {
              label: '监管类型',
              prop: 'itemName',
              width: 200,
              sort: 'descending',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '状态',
              prop: 'currentStatus',
              width: 70,
              sort: '',
              sortable: false,
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '监管对象',
              prop: 'superviseObject',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查行为名称',
              prop: 'checkActionName',
              width: 200,
              sort: '',
              sortable: false,
              insertFlagArr: { alertbutton: true },
              collapse: false
            },
            {
              label: '检查人员',
              prop: 'checkPersonnel',
              width: 100,
              sort: '',
              sortable: false,
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查时间',
              prop: 'checkDate',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查形式',
              prop: 'checkForm',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查结果',
              prop: 'checkResult',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            }
          ]
          this.dropColInit = [
            {
              label: '序号',
              prop: 'num',
              width: 100, //列宽
              sort: 'descending', //排序方式
              sortable: false, //是否显示排序图标
              insertFlagArr: { alertbutton: false }, //表头自定义组件
              collapse: false //展开收起
            },
            // {
            //   label: '流水号',
            //   prop: 'serialNum',
            //   width: 100, //列宽
            //   sort: 'descending', //排序方式
            //   sortable: 'custom', //是否显示排序图标
            //   display: true, //是否显示此列
            //   insertFlagArr: { alertbutton: false }, //表头自定义组件
            //   collapse: false
            // },
            {
              label: '监管类型',
              prop: 'itemName',
              width: 200,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '状态',
              prop: 'currentStatus',
              width: 70,
              sort: '',
              sortable: false,
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '监管对象',
              prop: 'superviseObject',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查行为名称',
              prop: 'checkActionName',
              width: 200,
              sort: '',
              sortable: false,
              insertFlagArr: { alertbutton: true },
              collapse: false
            },
            {
              label: '检查人员',
              prop: 'checkPersonnel',
              width: 100,
              sort: '',
              sortable: false,
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查时间',
              prop: 'checkDate',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查形式',
              prop: 'checkForm',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            },
            {
              label: '检查结果',
              prop: 'checkResult',
              width: 100,
              sort: '',
              sortable: 'custom',
              insertFlagArr: { alertbutton: false },
              collapse: false
            }
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table th > .cell {
  text-align: center;
}
/deep/ .el-table .cell {
  text-align: center;
}
.selectOne {
  width: 100px;
  margin-right: 8px;
}
.selectTwo {
  margin-left: 10px;
  vertical-align: middle;
  width: 100px;
}

.selectThree {
  margin-left: 10px;
  vertical-align: middle;
  width: 130px;
}
.row_1 {
  display: inline-block;
  margin: 0 auto;

  .keyword {
    width: 548px;
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

  /deep/ .el-input__inner {
    width: 350px;
  }
}
</style>