<template>
  <div class="waitHandle">
    <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
      <div slot="header" class="fl">
        <el-date-picker
          v-model="form.submitTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          class="mr-10"
          style="width:300px;float:left">
        </el-date-picker>
        <div class="row_1 clear-float">
          <el-input
            placeholder="申请文件标题"
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
        placeholder="省别"
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
        placeholder="停留时间"
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
        placeholder="审批类型"
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
    <dynamic-table
      :tableData="waitHandleTable"
      :fixButtonArr="fixButtonArr"
      :checkColInit="checkColInit"
      :dropColInit="dropColInit"
      :searchHeight="searchHeight"
      v-if="dropColInit.length>0&&checkColInit.length>0"
      :dialogShow.sync="headerDialogVisible"
      @click-0="tableFillin"
      @sort-change="sort"
      @header-dragend="headerDrag"
      @drop="dropHeader"
      @check-header="checkHeader">
      <!-- <template #lineInsert_checkDate="scope">{{scope.row[checkDate]|dateFormat}}</template> -->
      <template #lineInsert_itemName="scope">
        <el-link type="primary" @click="tableFillin(scope.row)">{{ scope.row.itemName }}</el-link>
      </template>
    </dynamic-table>
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
import DynamicTable from '@/components/commons/DynamicTable'
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
    DynamicTable,
    TableOptMenu
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
      waitHandleTable: [
       { 
          num: "1",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56004",
          apprName: "原址保护措施专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "2",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56005",
          apprName: "保护范围涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "3",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56007",
          apprName: "考古工作计划专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "4",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56008-a",
          apprName: "考古工作计划专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "5",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56008-b",
          apprName: "省保单位迁拆专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "6",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56009",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "7",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56010",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "7",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56011-a",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "8",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56011-b",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "10",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56012",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "11",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56014-a",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "12",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56014-b",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "13",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56014-c",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
        { 
          num: "14",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56014-d",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },

        { 
          num: "15",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56014-3-a",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "16",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56014-3-b",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "17",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56015-a",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "18",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56015-b",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "19",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56015-c",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "20",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56016",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "21",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56017",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "22",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56019",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "23",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56022-a",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "24",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "56022-b",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "25",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "safety",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },{ 
          num: "26",
          applyTitle: "山东省文化和旅游厅（山东省文物局）关于呈报《曲阜三孔世界文化遗产管理规划》的请示",
          applyCode: "fixPlan",
          apprName: "建控地带涉建专家评审意见表",
          networkNum: "网审200415002号",
          province: "山东省",
          startTime: "2020-04-27 13:53",
          state: "4",
        },
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
      // 停留时间
      ArrNum: [
        { value: '1', label: '0~3'},
        { value: '2', label: '3~5'},
        { value: '3', label: '5~8'},
        { value: '4', label: '8~11'},
        { value: '5', label: '11~14'}
      ],
      checkColInit: [
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
          label: '审批类型',
          prop: 'apprName',
          width: 130, //列宽
          sort: 'descending', //排序方式
          sortable: 'custom', //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '申请文件标题',
          prop: 'applyTitle',
          width: 200,
          sort: 'descending',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '状态',
          prop: 'state',
          width: 130,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '省别',
          prop: 'province',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '收到时间',
          prop: 'startTime',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '停留时间',
          prop: 'dealDay',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '流水号',
          prop: 'networkNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
      ],
      dropColInit: [
        {
          label: '序号',
          prop: 'num',
          width: 100, //列宽
          sort: 'descending', //排序方式
          sortable: false, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false //展开收起
        },
        {
          label: '审批类型',
          prop: 'apprName',
          width: 130, //列宽
          sort: 'descending', //排序方式
          sortable: 'custom', //是否显示排序图标
          display: true, //是否显示此列
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '申请文件标题',
          prop: 'applyTitle',
          width: 200,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '状态',
          prop: 'state',
          width: 130,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '省别',
          prop: 'province',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '收到时间',
          prop: 'startTime',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '停留时间',
          prop: 'dealDay',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '流水号',
          prop: 'networkNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
      ],
      // 确认弹框
      dialogKey: 0,
      //  false/false按钮对应页面高度变化
      searchHeight: 50,
      // // 代办表单组件数据
      // waitHandle: {
      //   timeRangeFlag: false,
      //   dealStatusFlag: false,
      //   applyTypeFlag: false,
      //   entryPurposeFlag: false,
      //   personalWaitHandleFlag: true,
      //   superviseTypeFlag: true
      // },
      // 代办表格数据
      // waitHandleTable: [],
      // 已办表格表头属性(全部)--------往后台传从后台取
      // checkColInit: [],
      // 已办表格表头拖拽显隐后的属性--------往后台传从后台取
      // dropColInit: [],
      fixButtonArr: ['审核'], //固定列的按钮
      totalCount: 0,

      queryParams: {},

      // 表头设置弹框
      // (用对象而不直接用boolean值是因为对话框封装成子组件的时候，点击头部小叉叉总是会报不能操作子组件属性值的错误，实属无奈之举，勿动)
      headerDialogVisible: { flag: false },
      // 任务详情
      personInfo: {},
      // 表格拖拽记录传参(已办-'superviseDone',待办-'superviseOrders')
      tableType: ''
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
    this.searchWait()
  },
  mounted() {},
  methods: {
    close() {},
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
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    // 表头配置
    headerSetting() {
      this.headerDialogVisible.flag = true
    },
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
    // 表格操作按钮,函数名为click-0、click-1依次类推
    // row-点击所对应的elementui的行对象
    // 填报
    // 如果是系统自动生成的任务，点击进入详情页（信息填报—系统自动生成任务）
    // 如果是监管人员创建的任务，点击进入详情页（信息填报—检查人员新建任务）
    tableFillin(row) {
      console.log(row,'row')
      // console.log(this.queryParams)
      this.$router.push({
        path:'/assessment/scheme-appraisal/Check',
        query:{
          applyCode:row.applyCode
        }
      })
    },
    // 自定义待办列表保存
    saveDynamicTable() {
      // saveDynamic({
      //   tableType: 'superviseOrders',
      //   checkCol: this.checkColInit,
      //   dropColInit: this.dropColInit
      // }).then(data => {
      //   console.log(data)
      // })
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

    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchWait()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchWait()
    },

    // 任务下发接口
    assignJob() {
      // console.log({ item: this.personInfo })
      // assignJob({ item: this.personInfo }).then(responseData => {
      //   if (responseData.code === 200) {
      //     this.$message({
      //       message: '任务下发成功',
      //       type: 'success'
      //     })
      //     this.searchWait()
      //   }
      // })
    },
    // 全部监管类型接口
    getsuperviseType() {
      // superviseType('itemName').then(data => {
      //   // console.log(data)
      //   this.superviseTypeArr = data.data
      // })
    },
    // 个人待办选中查询
    searchHandle() {
      this.searchWait()
    },
    // 全部监管类型选中查询
    searchSupersiveType() {
      this.searchWait()
    },
    // 状态选中查询
    searchStatus() {
      this.searchWait()
    },
    // 自定义列表查询接口
    findDynamic() {
      // findDynamic('superviseOrders').then(data => {
      //   if (data.data.tableType !== '未定义') {
      //     this.checkColInit = data.data.checkCol
      //     this.dropColInit = data.data.dropColInit
      //   } else {
      //     this.checkColInit = [
      //       {
      //         label: '序号',
      //         prop: 'num',
      //         width: 100, //列宽
      //         sort: 'descending', //排序方式(鸡肋，因为记录了也不能在一开始初始化的时候多个列都排序，因为一次只能按照一列的规则来排序)
      //         sortable: false, //是否显示排序图标
      //         insertFlagArr: { alertbutton: false }, //表头自定义组件
      //         collapse: false //展开收起
      //       },
      //       {
      //         label: '流水号',
      //         prop: 'serialNum',
      //         width: 100, //列宽
      //         sort: 'descending', //排序方式
      //         sortable: 'custom', //是否显示排序图标
      //         insertFlagArr: { alertbutton: false }, //表头自定义组件
      //         collapse: false
      //       },
      //       {
      //         label: '监管类型',
      //         prop: 'itemName',
      //         width: 200,
      //         sort: 'descending',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '状态',
      //         prop: 'currentStatus',
      //         width: 70,
      //         sort: '',
      //         sortable: false,
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '监管对象',
      //         prop: 'superviseObject',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查行为名称',
      //         prop: 'checkActionName',
      //         width: 200,
      //         sort: '',
      //         sortable: false,
      //         insertFlagArr: { alertbutton: true },
      //         collapse: false
      //       },
      //       {
      //         label: '检查人员',
      //         prop: 'checkPersonnel',
      //         width: 100,
      //         sort: '',
      //         sortable: false,
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查时间',
      //         prop: 'checkDate',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查形式',
      //         prop: 'checkForm',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查结果',
      //         prop: 'checkResult',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       }
      //     ]
      //     this.dropColInit = [
      //       {
      //         label: '序号',
      //         prop: 'num',
      //         width: 100, //列宽
      //         sort: 'descending', //排序方式
      //         sortable: false, //是否显示排序图标
      //         insertFlagArr: { alertbutton: false }, //表头自定义组件
      //         collapse: false //展开收起
      //       },
      //       // {
      //       //   label: '流水号',
      //       //   prop: 'serialNum',
      //       //   width: 100, //列宽
      //       //   sort: 'descending', //排序方式
      //       //   sortable: 'custom', //是否显示排序图标
      //       //   display: true, //是否显示此列
      //       //   insertFlagArr: { alertbutton: false }, //表头自定义组件
      //       //   collapse: false
      //       // },
      //       {
      //         label: '监管类型',
      //         prop: 'itemName',
      //         width: 200,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '状态',
      //         prop: 'currentStatus',
      //         width: 70,
      //         sort: '',
      //         sortable: false,
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '监管对象',
      //         prop: 'superviseObject',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查行为名称',
      //         prop: 'checkActionName',
      //         width: 200,
      //         sort: '',
      //         sortable: false,
      //         insertFlagArr: { alertbutton: true },
      //         collapse: false
      //       },
      //       {
      //         label: '检查人员',
      //         prop: 'checkPersonnel',
      //         width: 100,
      //         sort: '',
      //         sortable: false,
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查时间',
      //         prop: 'checkDate',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查形式',
      //         prop: 'checkForm',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       },
      //       {
      //         label: '检查结果',
      //         prop: 'checkResult',
      //         width: 100,
      //         sort: '',
      //         sortable: 'custom',
      //         insertFlagArr: { alertbutton: false },
      //         collapse: false
      //       }
      //     ]
      //   }
      //   // console.log(this.checkColInit)
      //   // console.log(this.dropColInit)
      // })
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