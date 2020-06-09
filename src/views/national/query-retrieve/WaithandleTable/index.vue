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
          <el-button v-if="collapseEnabled" type="text" @click="toggle" class="fl">{{ collapseProps[activeIndex].text }}
            <i :class="collapseProps[activeIndex].icon"></i>
          </el-button>
        </div>
      </div>
    </collapse-form>
    <template v-if="collapseEnabled">
      <div v-show="activeIndex === 1">
        <el-form
          ref="form"
          :model="form"
          label-position="left"
          label-width="70px"
          :show-message="false">
          <el-row>
            <el-col :span="9" class="pr5">
              <el-form-item  label="主办人" prop="instName" placeholder="主办人">
                <el-input class="mr-10"  v-model="form.instName" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" class="pr5">
              <el-form-item label="主办处室" prop="instName" placeholder="主办处室">
                <el-input class="mr-10"  v-model="form.instName" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="text-algin:right">
              <el-form-item label="流水号" prop="instName" placeholder="流水号">
                <el-input class="mr-10"  v-model="form.instName" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" class="pr5">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="申请文件号" prop="applyDocumentNum_part1">
                    <el-input class="paddingZero" v-model="form.applyDocumentNum_part1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="labelZero" prop="applyDocumentNum_part2">
                    <div class="inpuWidthBox">
                      <span style="line-height:32px;margin-left:5px">〔</span>
                      <el-select
                        clearable
                        class="inpuWidth"
                        v-model="form.qualTypeCode1"
                        placeholder="请选择"
                        @change="searchHandle">
                        <el-option
                          v-for="(label,key)  in  qualRangeCode1"
                          :label="label.qualRangeName"
                          :key="key"
                          :value="label.qualRangeCode">
                        </el-option>
                      </el-select>
                      <span style="line-height:32px">〕</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="labelZero" prop="applyDocumentNum_part3">
                    <ul>
                      <li class="inpuWidth1">
                        <el-input style="float:left;" v-model="form.applyDocumentNum_part3"></el-input>
                      </li>
                      <li class="fl" style="line-height:32px;">号</li>
                    </ul>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="9">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="申请文件号" prop="applyDocumentNum_part1">
                    <el-input v-model="form.applyDocumentNum_part1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="labelZero" prop="applyDocumentNum_part2">
                    <div class="inpuWidthBox">
                      <span style="line-height:32px;margin-left:5px">〔</span>
                      <el-select
                        clearable
                        class="inpuWidth"
                        v-model="form.qualTypeCode1"
                        placeholder="请选择"
                        @change="searchHandle">
                        <el-option
                          v-for="(label,key)  in  qualRangeCode1"
                          :label="label.qualRangeName"
                          :key="key"
                          :value="label.qualRangeCode">
                        </el-option>
                      </el-select>
                      <span style="line-height:32px">〕</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="labelZero" prop="applyDocumentNum_part3">
                    <ul>
                      <li class="inpuWidth1">
                        <el-input style="float:left;" v-model="form.applyDocumentNum_part3"></el-input>
                      </li>
                      <li class="fl" style="line-height:32px;">号</li>
                    </ul>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
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
      @click-1="tableFillin1"
      minwidth="200px"
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
      :total="totalCount">
    </el-pagination>
    <!-- 流程跟踪 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight+'px'"
      center :visible.sync="dialogFormVisibleProcess"
      :append-to-body="true">
      <ProcessTraceDialog />
      <div class="right" style="margint-top:10px;">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleProcess = false">取消</el-button>
        </span>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from '@/components/commons/MyDialog'
import CollapseForm from '@/components/commons/CollapseForm'
import TableOptMenu from '@/components/commons/TableOptMenu'
import DynamicTable from '@/components/commons/DynamicTable'
import ProcessTraceDialog from '@/components/business/ProcessTraceDialog'
export default {
  name: 'WaithandleTable',
  components: {
    CollapseForm,
    DynamicTable,
    TableOptMenu,
    ProcessTraceDialog,
    MyDialog
  },
  props: {
    selectMenuItem: {
      type: String,
      require: true
    },
    waitHandleTableOut: {
      type: Array,
      require: true
    },
    collapseEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeIndex: 0,  // 当前选中项索引
      dialogFormVisibleProcess:false,
      name: '',
      // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      qualRangeCode1: [
        { qualRangeName: "2001", qualRangeCode: "1" },
        { qualRangeName: "2002", qualRangeCode: "2" },
      ],
      collapseProps: [
        { text: '展开', icon: 'el-icon-arrow-down' }, 
        { text: '收起', icon: 'el-icon-arrow-up'}
      ],
      waitHandleTable: [
        {
          address: "",
          applTime: "2020-05-22 11:40",
          corpName: "张丽",
          economicType: "有限责任公司",
          instName: "全国重点文物保护单位原址保护措施申请",
          inst_id: "c3a3dee0-21f9-47ec-8a65-bc4191e75a37",
          num: 1,
          perNum: null,
          proNum: '全国重点文物保护单位原址保护措施申请',
          processPoint: "prov_deal",
          qualRangeCode: null,
          qualRangeName: null,
          qualificationLevel: null,
          regMoney: 1
        }
      ],
      // 资格类型
      qualificationLevelOption: [
        { qualRangeName: "个人待办", qualRangeCode: "1" },
        { qualRangeName: "全局待办", qualRangeCode: "2" },
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
          label: '流水号',
          prop: 'networkNum',
          width: 150, //列宽
          sort: 'descending', //排序方式
          sortable: 'custom', //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '审批事项类型',
          prop: 'apprName',
          width: 150,
          sort: 'descending',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请文件标题',
          prop: 'applyTitle',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: true },
          collapse: false
        },
        {
          label: '申请文号',
          prop: 'qualificationLevel',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '发文标题',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '发文号',
          prop: 'proNum',
          width: 180,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '项目名称',
          prop: 'proNum',
          width: 180,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '省份',
          prop: 'proNum',
          width: 180,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请单位名称',
          prop: 'qualificationLevel',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请单位类型',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请时间',
          prop: 'qualificationLevel',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '主办人',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '主办处室',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '主办司室',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '封发时间',
          prop: 'perNum',
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
          label: '流水号',
          prop: 'networkNum',
          width: 150, //列宽
          sort: 'descending', //排序方式
          sortable: 'custom', //是否显示排序图标
          display: true, //是否显示此列
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '审批事项类型',
          prop: 'apprName',
          width: 150,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '发文标题',
          prop: 'proNum',
          width: 180,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请文件标题',
          prop: 'corpName',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        
        {
          label: '发文号',
          prop: 'qualificationLevel',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '项目名称',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '省份',
          prop: 'proNum',
          width: 180,
          sort: '',
          sortable: 'custom',
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请单位名称',
          prop: 'qualificationLevel',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请单位类型',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '申请时间',
          prop: 'qualificationLevel',
          width: 150,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '主办人',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '主办处室',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '主办司室',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '封发时间',
          prop: 'perNum',
          width: 200,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
      ],
      // 确认弹框
      dialogKey: 0,
      searchHeight: 55,
      headerDialogVisible: { flag: false },
      fixButtonArr: ['查看','流程跟踪','许可决定'], //固定列的按钮
      totalCount: 0,
      currentPageNumber: '',
      queryParams: {
        pagination:{
          currentPageNumber:1,
          pageSize:10
        }
      },
      personInfo: {},
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 590
        ? 590
        : this.$store.getters.screenHeight
    }
  },
  created() {
    
  },
  mounted() {},
  methods: {
    toggle() {  // 切换展开、收起
        this.activeIndex = (this.activeIndex + 1) % 2;
        this.$emit('toggle', this.activeIndex);
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
    },

    //重置
    resetForm() {
     
    },
    // 表格操作按钮,函数名为click-0、click-1依次类推
    // row-点击所对应的elementui的行对象
    // 填报
    // 如果是系统自动生成的任务，点击进入详情页（信息填报—系统自动生成任务）
    // 如果是监管人员创建的任务，点击进入详情页（信息填报—检查人员新建任务）
    tableFillin(row) {
      console.log(row,'row')
      // console.log(this.queryParams)
      // this.$router.push('/province/opinions-provincial/Opinions')
    },
    tableFillin1() {
      this.dialogFormVisibleProcess = true
    },
    // 自定义待办列表保存
    saveDynamicTable() {
      
    },
    // 表格排序按钮点击函数
    // { column, prop, order }-同elementui
    // dropCol-表头数组
    sort({ column, prop, order }) {
      console.log(column)
      this.queryParams.sort = { column: prop, dir: order }
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
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
    },
    // 个人待办选中查询
    searchHandle() {
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

  // /deep/ .el-input__inner {
  //   width: 350px;
  // }
}
 .pr5 {
   margin-right: 15px;
 }

 .inpuWidthBox {
    width: 100%;
  }
  .inpuWidth {
    width: calc(100% - 40px) !important;
  }
  .inpuWidth1 {
    width: calc(100% - 16px) !important;
  }
  .labelZero {
    /deep/.el-form-item__content {
      margin-left: 0px !important;
    }
  }
  /deep/.el-form-item--small.el-form-item {
    margin-bottom: 5px!important;
  }
</style>