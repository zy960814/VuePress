<template>
  <div class="messageAudit">
    <el-card class="box-card" shadow="never">
      <div slot="header">
        行政执法监管任务信息审核
        <div class="header_button">
          <!-- <div style="width:10px;height:10px;background-color:red;" class="fl"></div> -->
          <!-- <ul class="clear-float">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="dialogTableVisible = true">填写说明</el-button>
            </li>
          </ul>-->
          <ul class="clear-float">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="save">保存</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="submit">提交</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button @click="back">返回</el-button>
            </li>
          </ul>
        </div>
      </div>

      <!-- :style="{height:cardHeight}" -->
      <div class="scrollBox" :style="{height: contentHeight}">
        <!-- <h3 style="margin-top: 0">监管事项信息</h3> -->
        <!-- 垂直表格 -->
        <apply-form-item data="监管事项信息">
          <vertical-table
            style="width:100%;"
            :verticalTableData="personInfo"
            :verticalTableTitle="thingVerticalTableTitle"
            tdLineHeight="30px"
            width="150px"
          >
            <!-- TODO: 看后端的数据类型再改吧-->
            <template v-slot:[statusbuttonblotname[k]] v-for="(item,k) in statusbuttonblotname">
              <status-button class="fr" :initStatus="0" @getStatus="getStatus($event,k)" :key="k"></status-button>
            </template>
            <!-- <template #line_01>
                <el-select v-model="valueStatus" clearable placeholder class="selectStatus fr">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
            </template>-->
          </vertical-table>
        </apply-form-item>
        <!-- <h3>监管对象信息</h3> -->
        <!-- 垂直表格 -->
        <apply-form-item data="监管对象信息">
          <vertical-table
            style="width:100%;"
            :verticalTableData="personInfo"
            :verticalTableTitle="objectVerticalTableTitle"
            width="150px"
            tabelWidth="400px"
          ></vertical-table>
        </apply-form-item>
        <!-- <h3>检查人员信息*</h3> -->
        <apply-form-item data="检查人员信息">
          <el-form ref="ruleFormCheckPerson" :show-message="true">
            <el-form-item style="margin-top: 0px;margin-bottom:0px;">
              <!-- <div class="titleDiv person">检查人员信息</div> -->
              <el-table :data="personInfo.persions" border>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="rank" label="职级"></el-table-column>
                <el-table-column prop="lawStaffType" label="执法人员性质"></el-table-column>
                <el-table-column prop="qualificationLegalProfession" label="是否具有法律职业资格"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <!-- <status-button
                      :initStatus="0"
                      @getStatus="getStatus($event,k,scope.$index)"
                      :key="k"
                    ></status-button>-->
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, personInfo.persions)"
                      type="primary"
                      class="operativeButton"
                      plain
                      size="mini"
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </apply-form-item>
        <!-- <h3>检查行为信息</h3>-->
        <apply-form-item data="检查行为信息">
          <vertical-table
            style="width:100%;"
            :verticalTableData="personInfo"
            :verticalTableTitle="checkActionTableTitle"
            width="150px"
            tabelWidth="400px"
          ></vertical-table>
          <div class="titleDiv" style="border-top:none;">检查项</div>
          <el-table :fit="true" :data="personInfo.checkItemList" border>
            <el-table-column :resizable="false" type="index" label="序号"></el-table-column>
            <el-table-column :resizable="false" prop="checkItem" label="检查项名称"></el-table-column>
            <el-table-column :resizable="false" prop="checkResultName" label="结果">
              <!-- <template slot-scope="scope">
                  <el-form-item
                    :prop="'checkItemList.'+scope.$index+'.checkResult'"
                    :rules="{ required: true, message: '请选择结果', trigger: 'change' }"
                  >
                    <el-select
                      :key="`result_${scope.$index}`"
                      v-model="scope.row.checkResult"
                      placeholder="请选择结果"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in resultArr"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        style="vertical-align: middle;"
                      ></el-option>
                    </el-select>
                  </el-form-item>
              </template>-->
            </el-table-column>
          </el-table>
        </apply-form-item>
        <el-row>
          <apply-form-item data="数据审核意见">
            <!-- <div class="titleDiv person" style="margin-top: 10px;">数据审核意见</div> -->
            <!-- <apply-form
                :data="titleData"
                :widthL="widthL"
                @tab-click="itemClick"
                style="padding-top:10px;"
              >
                <template #title_insert>
                  <common-language @language="language" />
                </template>
                <template #body>
                  <div v-if="applyFormFlag==='上报'">{{applyFormFlag}}：{{commonLanguage}}</div>
                  <div v-if="applyFormFlag==='退回'">{{applyFormFlag}}：{{commonLanguage}}</div>
                </template>
            </apply-form>-->
            <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
            <el-form
              :model="personInfo.item"
              :show-message="true"
              :rules="rulesName"
              ref="ruleFormCheckAction"
              style="margin: 0 0;margin-top: 18px;"
              label-position="left"
              label-width="110px"
            >
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item style="margin-bottom:5px">
                    <common-language @language="language" class="data_audit" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="办理意见" prop="checkActionName" class="redStar">
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="commonLanguage"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </apply-form-item>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import PageTabs from '@/components/commons/PageTabs'
import VerticalTable from '@/components/commons/VerticalTable'
import StatusButton from '@/components/commons/StatusButton'
import CommonLanguage from '@/components/commons/CommonLanguage'
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'

import {
  waitDetail,
  findPersionsPage,
  superviseType,
  saveTask,
  subJgJgxwCheckAction
} from '@/api/national'
import { checkIdCardNum, isNull } from '@/utils/validator'
export default {
  components: {
    VerticalTable,
    StatusButton,
    CommonLanguage,
    PageTabs,
    ApplyFormItem
  },
  data() {
    return {
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '上报',
            num: ''
          },
          {
            title: '退回',
            num: ''
          }
        ]
      },
      commonLanguage: '',
      // 切换按钮标题
      titleData: ['退回', '上报'],

      //每项的状态数组
      statusArr: [],
      widthL: '50%',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      rules: {
        superviseObject: [
          { validator: isNull, trigger: 'change' },
          { max: 200, message: '长度最多200字符', trigger: 'change' }
        ],
        // administrativeCpUiCode: [
        //   { required: true, message: '请输入监管对象唯一标识', trigger: 'blur' }
        // ],
        administrativeCp: [
          { validator: isNull, trigger: 'change' },
          { max: 200, message: '长度最多200字符', trigger: 'change' }
        ],
        administrativeCpNa: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        administrativeCpCeType: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        administrativeCpUiCode: null,

        checkActionName: [
          { validator: isNull, trigger: 'change' },
          { max: 500, message: '长度最多100字符', trigger: 'change' }
        ],
        checkForm: [{ required: true, message: ' ', trigger: 'change' }],
        // checkType: [
        //   { required: true, message: '请选择检查类别', trigger: 'change' }
        // ],
        checkDate: [
          {
            required: true,
            message: ' ',
            trigger: 'change'
          }
        ],
        checkResult: [{ required: true, message: ' ', trigger: 'change' }]
      },
      rulesSave: {
        superviseObject: [
          { validator: isNull, trigger: 'change' },
          { max: 200, message: '长度最多200字符', trigger: 'change' }
        ],
        // administrativeCpUiCode: [
        //   { required: true, message: '请输入监管对象唯一标识', trigger: 'blur' }
        // ],
        administrativeCp: [
          { validator: isNull, trigger: 'change' },
          { max: 200, message: '长度最多200字符', trigger: 'change' }
        ],
        administrativeCpNa: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        administrativeCpCeType: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        administrativeCpUiCode: [
          { validator: isNull, trigger: 'blur' },
          { max: 18, message: '长度最多18字符', trigger: 'change' }
        ],

        checkActionName: [
          { validator: isNull, trigger: 'change' },
          { max: 500, message: '长度最多100字符', trigger: 'change' }
        ],
        checkForm: [{ required: true, message: ' ', trigger: 'change' }],
        // checkType: [
        //   { required: true, message: '请选择检查类别', trigger: 'change' }
        // ],
        checkDate: [
          {
            required: true,
            message: ' ',
            trigger: 'change'
          }
        ],
        checkResult: [{ required: true, message: ' ', trigger: 'change' }]
      },
      rulesName: null,
      // 监管对象信息
      // personInfo: {
      //   behaviorName: '',
      //   behaviorCode: '',
      //   type: '',
      //   category: '',
      //   way: '双随机、一公开',
      //   time: new Date(),
      //   checkResult: '',
      //   persions: [
      //     {
      //       index: 1,
      //       name: '刘大明',
      //       rank: '处长',
      //       lawStaffType: '公务员',
      //       qualificationLegalProfession: '是'
      //     },
      //     {
      //       index: 2,
      //       name: '陈培军',
      //       rank: '调研员',
      //       lawStaffType: '公务员',
      //       qualificationLegalProfession: '是'
      //     }
      //   ],
      //   checkItem: [
      //     {
      //       name:
      //         '管理使用单位履行安全责任情况，安全设施设备建设和日常运行维护情况，安全制度建设和日常安全管理工作情况，应急预案、演练和应急处置情况。',
      //       result: ''
      //     }
      //   ]
      // },
      // 监管对象信息
      personInfo: {},
      // 监管事项信息
      matterInfo: {},
      // 检查行为信息
      inspectInfo: {},
      // 检查人员禁用项
      checkPersonDisabled: true,
      // 检查人员表格数据
      personTableData: [],
      // 检查方式
      checkModeArr: [],
      // 检查形式
      checkFormArr: [],
      // 检查结果
      checkResultArr: [],
      // 检查类别
      checkTypeArr: [],
      // 结果
      resultArr: [],
      // 添加检查人员弹框选中数组
      // multipleSelectionPerson: [],
      // 当前查看详情的crId
      currentCrId: '',
      // 检查项表格数据与检查形式联动时
      checkItemTable1: [],
      // 检查项表格数据与检查形式联动时
      checkItemTable2: [],
      // 竖形表格标题数据(一个对象为一行的标题)
      thingVerticalTableTitle: [
        { itemName: '监管类型', superviseItemCheckIcode: '事项编码' },
        {
          implementInstitution: '实施机构',
          implementInstitutionCode: '实施机构编码'
        },
        { entrustDept: '受委托部门', entrustDeptCode: '受委托部门编号' }
      ],
      // TODO:这个页面加name的都改了
      objectVerticalTableTitle: [
        {
          superviseObject: '监管对象'
          // administrativeCpUiCode: '监管对象唯一标识'
        },
        {
          administrativeCp: '行政相对人',
          administrativeCpNaName: '行政相对人性质'
        },
        {
          administrativeCpCeTypeName: '行政相对人证件类型',
          administrativeCpUiCode: '行政相对人编码'
        },
        { addressRegistered: '注册地址', addressOperating: '经营地址' }
      ],
      checkActionTableTitle: [
        {
          checkActionName: '检查行为名称',
          checkActionCode: '检查行为编号'
        },
        {
          checkFormName: '检查形式',
          checkType: '检查类别'
        },
        {
          checkModeName: '检查方式',
          checkDate: '检查时间'
        },
        { checkResultName: '检查结果' }
      ],
      // 填写说明弹框数据
      tableData: [
        {
          name: '监管类型',
          introduction: '已选择监管事项对应的事项名称，选择监管事项后自动带入。'
        },
        {
          name: '事项编码',
          introduction: '已选择监管事项对应的事项编码，选择监管事项后自动带入。'
        },
        {
          name: '实施机构',
          introduction:
            '已选择监管事项对应的具体实施监管的机构名称，选择监管事项后自动带入'
        },
        {
          name: '实施机构编码',
          introduction:
            '已选择监管事项对应的实施机构的统一社会信用代码，选择监管事项后自动带入。'
        },
        {
          name: '受委托部门',
          introduction:
            '已选择监管事项对应的受委托部门的名称，选择监管事项后自动带入。'
        },
        {
          name: '监管对象',
          introduction: '填写监管对象的名称。'
        },
        {
          name: '监管对象唯一标识',
          introduction:
            '1、如为法人时，填写统一社会信用代码；2、如为自然人时，填写身份证号。'
        },
        {
          name: '行政相对人',
          introduction: '填写行政相对人的名称。'
        },
        {
          name: '行政相对人性质',
          introduction: '行政相对人性质具体分为：1.公民；2.法人；3.其他组织。'
        },
        {
          name: '行政相对人证件类型',
          introduction: '根据行政相对人的性质，选择不同的证件类型。'
        },
        {
          name: '行政相对人编码',
          introduction:
            '如是公民时，填写居民身份证或者临时居民身份证号码；如是法人时，填写统一社会信用代码；如是其他组织时，填写其他法人或其他组织有效证件号码。'
        },
        {
          name: '注册地址',
          introduction: '行政相对人为法人或其他组织时，填写单位注册地址。'
        },
        {
          name: '经营地址',
          introduction: '行政相对人为法人或其他组织时，填写单位经营地址。'
        },
        {
          name: '检查人员',
          introduction: '填写进行检查的人员名称，填报检查人员数不少于2人。'
        },
        {
          name: '检查行为名称',
          introduction:
            '填写实施此次检查行为的名称，如对XXX公司进行矿产资源合理利用的检查。'
        },
        {
          name: '检查行为编号',
          introduction:
            '已选择监管事项对应的受委托部门的统一社会信用代码，选择监管事项后自动带入。'
        },
        {
          name: '检查形式',
          introduction:
            '检查形式分为1.日常检查；2.专项检查，根据实际情况选择检查形式。'
        },
        {
          name: '检查类别',
          introduction: '根据实际情况，选择检查类别。'
        },
        {
          name: '检查方式',
          introduction: '据实际情况，选择检查方式。'
        },
        {
          name: '检查时间',
          introduction: '填写检查日期。'
        },
        {
          name: '检查结果',
          introduction: '根据实际情况，选择检查结果。'
        },
        {
          name: '行政检查文书号',
          introduction: '系统自动生成，无需填写。'
        },
        {
          name: '检查项',
          introduction:
            '检查项为已选择监管事项对应的检查项内容；检查结果从合格、不合格、未检查、合理缺项中选择。'
        }
      ],
      dialogTableVisible: false,
      dialogTableVisiblePerson: false
    }
  },
  computed: {
    dialogHeight3() {
      return this.$store.getters.screenHeight > 585
        ? 585
        : this.$store.getters.screenHeight
    },
    dialogHeight2() {
      return this.$store.getters.screenHeight > 323
        ? 323
        : this.$store.getters.screenHeight
    },
    contentHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 185 : 228) +
        'px)'
      )
    },
    // 检查人员
    personCardHeight() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 420 : 461) +
        'px' +
        ')'
      )
    },
    statusbuttonblotname() {
      let slotname
      let slotnameArr = []
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          slotname = `line_${i}${j}`
          slotnameArr.push(slotname)
        }
      }
      return slotnameArr
    }
  },
  watch: {},
  created() {
    this.waitHandledetail()
    this.checkForm()
    this.checkResult()
    this.checkType()
    this.checkMode()
    this.result()
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 上报退回
    handleSelect(key) {
      console.log(key)
      this.commonLanguage = ''
      // this.$route.query.selectMenuItem = key
    },
    // 常用语下拉框
    language(value) {
      // alert(value)
      this.commonLanguage = value
    },
    getStatus(status, i) {
      this.statusArr[i] = status
    },
    save() {
      this.rulesName = this.rulesSave
      this.$nextTick(() => {
        this.$refs['ruleFormCheckAction'].validate(valid => {
          if (valid) {
            this.saveTask()
          } else {
            if (this.personInfo.persions.length < 2) {
              this.$store.dispatch('promptWarningMsg', '检查人员不能少于2人')
            }
            return
          }
        })
      })
    },
    submit() {
      this.rulesName = this.rules
      this.$nextTick(() => {
        this.$refs['ruleFormCheckAction'].validate(valid => {
          if (valid) {
            this.subJgJgxwCheckAction()
          } else {
            if (this.personInfo.persions.length < 2) {
              this.$store.dispatch('promptWarningMsg', '检查人员不能少于2人')
            }
            return
          }
        })
      })
    },
    // 行政相对人证件类型选择身份证时校验行政相对人编码
    administrativeCpCeTypeChange(val) {
      val === '居民身份证' || val === '临时居民身份证'
        ? this.$set(this.rules, 'administrativeCpUiCode', [
            {
              validator: checkIdCardNum,
              trigger: 'blur'
            },
            { max: 18, message: '长度最多18字符', trigger: 'change' }
          ])
        : this.$set(this.rules, 'administrativeCpUiCode', [
            { validator: isNull, trigger: 'blur' },
            { max: 18, message: '长度最多18字符', trigger: 'change' }
          ])
    },
    back() {
      this.$router.push({
        name: 'adminlawaudit',
        query: { selectMenuItem: this.$route.query.selectMenuItem },
        params: { queryParams: this.$route.params.queryParams }
      })
      // this.$router.push(
      //   `/national/industry-regulation/adminlaw-task?selectMenuItem=${this.$route.query.selectMenuItem}`
      // )
    },
    // 检查形式下拉框联动检查项(因为校验的时候用form上绑定的personInfo对应的props,所以只能取出来之后再重新放回personInfo)
    checkFormChange(val) {
      // this.checkItemTable1 = this.personInfo.checkItemList.filter(item => {
      //   return item.checkForm === '01'
      // })
      // this.checkItemTable2 = this.personInfo.checkItemList.filter(item => {
      //   return item.checkForm === '02'
      // })
      if (val === '01') {
        this.personInfo.checkItemList = this.checkItemTable1
      } else if (val === '02') {
        this.personInfo.checkItemList = this.checkItemTable2
      }
    },
    // 检查形式初始值时对应检查项
    checkFormInit() {
      this.checkItemTable1 = this.personInfo.checkItemList.filter(item => {
        return item.checkForm === '01'
      })
      this.checkItemTable2 = this.personInfo.checkItemList.filter(item => {
        return item.checkForm === '02'
      })
      this.personInfo.checkItemList = []
      if (this.personInfo.checkForm === '01') {
        this.personInfo.checkItemList = this.checkItemTable1
      } else if (this.personInfo.checkForm === '02') {
        this.personInfo.checkItemList = this.checkItemTable2
      }
    },
    // 查询详情数据
    waitHandledetail() {
      this.currentCrId = this.$route.query.crId
      waitDetail(this.currentCrId).then(responseData => {
        this.personInfo = responseData.data.item
        console.log(this.personInfo)

        this.findPersionsPage()
        this.checkFormInit()
      })
    },
    // 检查人员删除
    deleteRow(index) {
      if (this.personInfo.persions.length > 0) {
        this.personInfo.persions.splice(index, 1)
      }
    },

    toggleSelection(rows) {
      if (rows) {
        // if (this.personInfo.persions.length > 0) {
        this.$refs.multipleTablePerson.clearSelection()
        // }
        rows.forEach(row => {
          this.$refs.multipleTablePerson.toggleRowSelection(row, true)
        })
      }
    },
    // 添加检查人员按钮
    addPerson() {
      this.dialogTableVisiblePerson = true
      // 这部分处理是因为只能用表格数据的数组才能选中,用this.personInfo.persions不行
      let checkItemArr = this.personTableData.filter(itemOuter => {
        return this.personInfo.persions.some(itemInner => {
          return itemInner.name === itemOuter.name
        })
      })

      this.$nextTick(() => {
        this.toggleSelection(checkItemArr)
      })
    },
    // 添加检察人员弹框确定
    personConfirm() {
      this.dialogTableVisiblePerson = false
      this.personInfo.persions = this.multipleSelectionPerson
    },
    // 添加检察人员弹框取消
    personCancel() {
      this.dialogTableVisiblePerson = false
    },
    // 添加检察人员表格选中变化
    personelectionChange(val) {
      this.multipleSelectionPerson = val
    },
    // 分页查询-满足监管事项检查人员接口
    findPersionsPage() {
      findPersionsPage(
        { currentPageNumber: 1, pageSize: 100, sort: '', dir: '' },
        this.personInfo.superviseItemImplementCode
      ).then(responseData => {
        this.personTableData = responseData.data.data
      })
    },
    // 检查形式下拉框接口
    checkForm() {
      superviseType('checkForm').then(responseData => {
        this.checkFormArr = responseData.data
      })
    },
    // 检查结果下拉框接口
    checkResult() {
      superviseType('checkResult').then(responseData => {
        this.checkResultArr = responseData.data
      })
    },
    // 检查类别下拉框接口
    checkType() {
      superviseType('checkType').then(responseData => {
        this.checkTypeArr = responseData.data
      })
    },
    // 检查方式下拉框接口
    checkMode() {
      superviseType('checkMode').then(responseData => {
        this.checkModeArr = responseData.data
      })
    },

    // 结果下拉框接口
    result() {
      superviseType('checkResultList').then(responseData => {
        this.resultArr = responseData.data
      })
    },
    // 保存
    saveTask() {
      // 接口需要拼接的地方，后台不处理再说
      // let nameArr = []
      // let idNumberArr = []
      // this.personInfo.persions.forEach(item => {
      //   nameArr.push(item.name)
      //   idNumberArr.push(item.idNumber)
      // })
      // let nameStr = nameArr.join(';')
      // let idNumberStr = idNumberArr.join(';')
      // this.$set(this.personInfo, 'checkPersonnel', nameStr)
      // this.$set(this.personInfo, 'checkPersonnelCode', idNumberStr)
      // // this.personInfo.checkItemList = this.checkItemTable
      let personInfoOuter = {
        item: this.personInfo,
        flag: null
      }

      saveTask(personInfoOuter).then(responseData => {
        if (responseData.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    // 填报人员事项提交
    subJgJgxwCheckAction() {
      // this.personInfo.checkItemList = this.checkItemTable
      let personInfoOuter = {
        item: this.personInfo,
        flag: null
      }
      subJgJgxwCheckAction(personInfoOuter).then(responseData => {
        if (responseData.code === 200) {
          this.back()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
.titleColor {
  color: $--color-primary;
}
.box-card {
  .header_button {
    margin-top: 10px;
    vertical-align: middle;
    height: 50px;
    border-top: 1px solid #e6ebf5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
  }
  /deep/.el-card__body {
    padding: 12px;
  }

  h3 {
    margin: 30px 0 16px;
    font-size: 16px;
  }
  // .ten {
  //   margin-left: 32px;
  //   color: $--color-primary;
  // }
  .person {
    position: relative;
    // padding: 15px;
    .titleMessage {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      color: red;
      font-size: 12px;
    }
    .personButton {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      // line-height: 8px;
      right: 5px;
    }
  }

  .selectStatus {
    width: 60px;
  }
  /deep/.statusButton.el-button:active {
    color: white;
    border-color: white;
    outline: none;
  }
  .applyForm {
    border: 1px solid gray;
    height: 100px;
  }
  /deep/.data_audit {
    color: gray;
  }
}
</style>
