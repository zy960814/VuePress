<template>
  <div class="taskadjust">
    <el-card class="box-card" shadow="never">
      <div slot="header">
        行政执法监管任务信息填报
        <div class="header_button">
          <!-- <div style="width:10px;height:10px;background-color:red;" class="fl"></div> -->
          <ul class="clear-float">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="dialogTableVisible = true">填写说明</el-button>
            </li>
          </ul>
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
      <!-- 填写说明弹框 -->
      <my-dialog
        class="boxCard_dialog"
        width="1024px"
        :height="dialogHeight+'px'"
        :visible.sync="dialogTableVisible"
      >
        <el-card shadow="never">
          <div slot="header">全国重点文物保护单位原址保护措施审批</div>
          <el-scrollbar :style="{height: dialogContentHeight}">
            <el-table :data="tableData" border style="width: 100%;">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="name" label="字段名" width="180"></el-table-column>
              <el-table-column prop="introduction" label="字段说明"></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-card>
      </my-dialog>
      <!-- 检查人员弹框 -->
      <my-dialog
        class="boxCard_dialog"
        width="1024px"
        height="357px"
        :center="true"
        :visible.sync="dialogTableVisiblePerson"
      >
        <!-- 外部高度留163px -->
        <el-card shadow="never">
          <div slot="header">检查人员清单</div>
          <el-scrollbar style="height: 194px;">
            <el-table
              ref="multipleTablePerson"
              :data="personTableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="personelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="rank" label="职级"></el-table-column>
              <el-table-column prop="lawStaffType" label="执法人员性质"></el-table-column>
              <el-table-column prop="qualificationLegalProfession" label="是否具有法律职业资格"></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-card>
        <el-row class="clear-float">
          <div class="fr" style="margin-top:8px;">
            <el-button type="primary" @click="personConfirm">确定</el-button>
            <el-button @click="personCancel">取消</el-button>
          </div>
        </el-row>
      </my-dialog>
      <!-- :style="{height:cardHeight}" -->
      <div class="scrollBox" :style="{height: contentHeight}">
        <!-- <div style="padding: 10px 20px"> -->
        <!-- <h3 style="margin-top: 0">监管事项信息</h3> -->
        <!-- 垂直表格 -->
        <!-- <div class="superviseTitle">
            监管事项信息
            <div class="choseSupervise">
              <el-button type="primary" @click="dialogSuperviseThings=true">选择</el-button>
              <span style="color:red;font-size:12px;margin-left:10px;">请选择监管事项！</span>
            </div>
        </div>-->
        <apply-form-item data="监管事项信息">
          <div class="clear-float">
            <div class="fl" style="margin-bottom:3px;">
              <el-button
                type="primary"
                @click="dialogSuperviseThings=true"
                icon="el-icon-zoom-in"
              >选择</el-button>
            </div>
          </div>
          <vertical-table
            style="width:100%;margin-top:2px;"
            :verticalTableData="personInfo.item"
            :verticalTableTitle="thingVerticalTableTitle"
            width="150px"
          >
            <!-- <template #titleInsert>
                <el-button type="primary" @click="dialogSuperviseThings=true">选择</el-button>
            </template>-->
          </vertical-table>
        </apply-form-item>
        <!-- 监管事项弹框 -->
        <my-dialog
          width="1024px"
          class="boxCard_dialog"
          height="421px"
          :center="true"
          :visible.sync="dialogSuperviseThings"
        >
          <el-card shadow="never">
            <div slot="header">监管事项清单</div>
            <el-scrollbar style="height: 258px;">
              <singleselect-table
                :tableData="superviseThings"
                :tableTitle="superviseThingsTitle"
                @select="earnSelect"
              />
            </el-scrollbar>
          </el-card>
          <el-row class="clear-float">
            <div class="dialogbutton fr" style="margin-top:8px;">
              <el-button type="primary" @click="superviseConfirm">确定</el-button>
              <el-button @click="superviseCancel">取消</el-button>
            </div>
          </el-row>
        </my-dialog>
        <!-- <h3>监管对象信息</h3> -->
        <apply-form-item data="监管对象信息">
          <el-form
            :show-message="true"
            :model="personInfo.item"
            ref="ruleFormSupervise"
            style="padding: 0 18px;"
            label-position="left"
            label-width="110px"
            :rules="rulesName"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="监管对象" prop="superviseObject" class="redStar">
                  <el-input v-model="personInfo.item.superviseObject"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="监管对象唯一标识" prop="administrativeCpUiCode" class="redStar">
                        <el-input
                          v-model="personInfo.item.administrativeCpUiCode"
                          placeholder="1、如为法人时，填写统一社会信用代码；2、如为自然人时，填写身份证号。"
                        ></el-input>
                      </el-form-item>
                    </el-col>
            </el-row>-->
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="行政相对人" prop="administrativeCp" class="redStar">
                  <el-input v-model="personInfo.item.administrativeCp"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行政相对人性质" prop="administrativeCpNaName" class="redStar">
                  <el-select
                    v-model="personInfo.item.administrativeCpNaName"
                    placeholder
                    style="width: 100%"
                    @change="administrativeCpNaChange"
                  >
                    <el-option
                      v-for="item in administrativeCpNaArr"
                      :key="item.code"
                      :label="item.name"
                      :value="item.name"
                      style="vertical-align: middle;"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="行政相对人证件类型" prop="administrativeCpCeType" class="redStar">
                  <el-select
                    v-model="personInfo.item.administrativeCpCeType"
                    placeholder
                    style="width: 100%"
                    v-if="administrativeFlag==='公民'"
                    @change="administrativeCpCeTypeChange"
                  >
                    <el-option
                      v-for="item in administrativeCpCeTypeArr"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      style="vertical-align: middle;"
                    ></el-option>
                  </el-select>
                  <el-input
                    v-if="administrativeFlag==='法人'"
                    v-model="personInfo.item.administrativeCpCeType"
                    disabled
                  ></el-input>
                  <el-input
                    v-if="administrativeFlag==='其他组织'"
                    v-model="personInfo.item.administrativeCpCeType"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="行政相对人编码" prop="administrativeCpUiCode" class="redStar">
                  <el-input
                    v-model="personInfo.item.administrativeCpUiCode"
                    placeholder="如是公民时,填写居民身份证或者临时居民身份证号码;如是法人时,填写统一社会信用代码;如是其他组织时,填写其他法人或其他组织有效证件号码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="administrativeFlag==='法人'||administrativeFlag==='其他组织'">
              <el-col :span="12">
                <el-form-item label="注册地址" prop="addressRegistered">
                  <el-input v-model="personInfo.item.addressRegistered"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经营地址" prop="addressOperating">
                  <el-input v-model="personInfo.item.addressOperating"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </apply-form-item>
        <!-- <h3>检查人员信息*</h3> -->
        <apply-form-item data="检查人员信息">
          <el-form
            ref="ruleFormCheckPerson"
            :show-message="true"
            :rules="rulesName"
            :model="personInfo.item"
          >
            <el-form-item style="margin-bottom:0px;">
              <div class="clear-float" style="margin-bottom:3px;">
                <div class="fl">
                  <el-tooltip
                    :disabled="!checkPersonDisabled"
                    effect="dark"
                    content="请先选择监管事项信息"
                    placement="top-start"
                  >
                    <span style="margin-right:10px;" class="personButton">
                      <el-button
                        type="primary"
                        :disabled="checkPersonDisabled"
                        @click="addPerson"
                        icon="el-icon-circle-plus-outline"
                      >添加</el-button>
                    </span>
                  </el-tooltip>
                </div>
                <div class="titleMessage fr">提示：填写进行检查的人员名称，填报检查人员数不少于2人</div>
              </div>
              <!-- <div class="titleDiv person">
                  检查人员信息
                  <el-tooltip
                    :disabled="!checkPersonDisabled"
                    effect="dark"
                    content="请先选择监管事项信息"
                    placement="top-start"
                  >
                    <span style="margin-right:10px;" class="personButton">
                      <el-button
                        type="primary"
                        size="mini"
                        :disabled="checkPersonDisabled"
                        @click="addPerson"
                      >添加检查人员</el-button>
                    </span>
                  </el-tooltip>
                  <div class="titleMessage">提示：填写进行检查的人员名称，填报检查人员数不少于2人</div>
              </div>-->
              <el-table :data="personInfo.item.persions" border>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="rank" label="职级"></el-table-column>
                <el-table-column prop="lawStaffType" label="执法人员性质"></el-table-column>
                <el-table-column prop="qualificationLegalProfession" label="是否具有法律职业资格"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, personInfo.item.persions)"
                      type="primary"
                      class="operativeButton"
                      plain
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </apply-form-item>
        <!-- <h3>检查行为信息</h3>-->
        <apply-form-item data="检查行为信息">
          <el-form
            :model="personInfo.item"
            :show-message="true"
            :rules="rulesName"
            ref="ruleFormCheckAction"
            style="padding: 0 18px;"
            label-position="left"
            label-width="110px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="检查行为名称" prop="checkActionName" class="redStar">
                  <el-input
                    v-model="personInfo.item.checkActionName"
                    placeholder="填写实施此次检查行为的名称，如对XXX博物馆进行文物资源合理利用的检查。"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="检查行为编号" prop="checkActionCode" class="redStar">
                  <el-input
                    v-model="personInfo.item.checkActionCode"
                    placeholder="系统自动生成，无需填写"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="检查形式" prop="checkForm" class="redStar">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="请先选择监管事项信息"
                    placement="top-start"
                    :disabled="!checkFormDisabled"
                  >
                    <el-select
                      v-model="personInfo.item.checkForm"
                      placeholder
                      style="width: 100%"
                      @change="checkFormChange"
                      :disabled="checkFormDisabled"
                    >
                      <el-option
                        v-for="item in checkFormArr"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        style="vertical-align: middle;"
                      ></el-option>
                    </el-select>
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查类别" class="redStar">
                  <el-input v-model="personInfo.item.checkType" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="检查方式">
                  <el-select
                    v-model="personInfo.item.checkMode"
                    placeholder="请选择检查方式"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in checkModeArr"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      style="vertical-align: middle;"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查时间" prop="checkDate" class="redStar">
                  <el-date-picker
                    v-model="personInfo.item.checkDate"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    :clearable="true"
                    style="width:100%"
                    format="yyyy-MM-dd "
                    value-format="yyyy-MM-dd"
                    :default-value="new Date()"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="检查结果" prop="checkResult">
                  <el-select
                    v-model="personInfo.item.checkResult"
                    placeholder="请选择检查结果"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in checkResultArr"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                      style="vertical-align: middle;"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="margin-top: 10px" label="检查项" class="redStar">
              <el-table :fit="true" :data="personInfo.item.checkItemList" border>
                <el-table-column :resizable="false" type="index" label="序号"></el-table-column>
                <el-table-column :resizable="false" prop="checkItem" label="检查项名称"></el-table-column>
                <el-table-column :resizable="false" prop="checkResultName" label="结果">
                  <template slot-scope="scope">
                    <el-form-item
                      style="margin-top: 10px;margin-bottom:10px;"
                      :prop="'checkItemList.'+scope.$index+'.checkResultName'"
                      :rules="{ required: true, message: ' ', trigger: 'change' }"
                    >
                      <!-- 此处用scope.row.checkResult才能校验成功 -->
                      <el-select
                        :key="`result_${scope.$index}`"
                        v-model="scope.row.checkResultName"
                        placeholder="请选择结果"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in resultArr"
                          :key="item.code"
                          :label="item.name"
                          :value="item.name"
                          style="vertical-align: middle;"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </apply-form-item>
        <!-- </div> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import VerticalTable from '@/components/commons/VerticalTable'
import MyDialog from '@/components/commons/MyDialog'
import SingleselectTable from '@/components/commons/SingleselectTable'
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import {
  findRegulatoryLocal,
  superviseType,
  findPersionsPage,
  subJgJgxwCheckAction,
  saveReguJgJgxwCheckAction
} from '@/api/national'
import { checkIdCardNum, isNull } from '@/utils/validator'
export default {
  components: { MyDialog, VerticalTable, SingleselectTable, ApplyFormItem },
  data() {
    return {
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now()
        // },
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

      personInfo: {
        item: {
          serialVersionUID: '',
          crId: '',
          itemName: '',
          SuperviseObjectName: '',
          recordUniqueIdentity: '',
          planId: '',
          superviseItemImplementCode: '',
          superviseItemCheckIcode: '',
          checkActionName: '',
          checkActionCode: '',
          implementInstitution: '',
          implementInstitutionCode: '',
          entrustDept: '',
          entrustDeptCode: '',
          superviseObject: '',
          administrativeCp: '',
          administrativeCpNa: '',
          administrativeCpCeType: '',
          administrativeCpUiCode: '',
          addressRegistered: '',
          addressOperating: '',
          areaNumber: '',
          checkForm: '',
          checkType: '',
          checkMode: '',
          checkResult: '',
          checkDate: '',
          checkPersonnel: '',
          checkPersonnelCode: '',
          submittedDate: '',
          submittedPersonnel: '',
          cdTime: '',
          cdSource: '',
          cdBatch: '',
          cdOperation: '',
          // checkItemList: [
          //   { checkItem: '111', checkResult: '' },
          //   { checkItem: '111', checkResult: '' }
          // ],
          checkItemList: [],
          persions: []
        },
        flag: null
      },
      // 行政相对人编码校验规则
      administrativeCpCeTypeValidate: null,
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
      // 监管事项信息
      matterInfo: {},
      // 检查行为信息
      inspectInfo: {},
      // 当前查看详情的ic
      currentCrId: '',

      //行政相对人性质联动行政相对人证件类型
      administrativeFlag: '',
      // 检查形式禁用项
      checkFormDisabled: true,
      // 检查人员禁用项
      checkPersonDisabled: true,
      // 检查人员表格数据
      personTableData: [],

      // 行政相对人性质
      administrativeCpNaArr: [],
      // 行政相对人证件类型
      administrativeCpCeTypeArr: [],
      // 检查形式
      checkFormArr: [],
      // 检查方式
      checkModeArr: [],
      // 检查结果
      checkResultArr: [],
      // 结果
      resultArr: [],

      // 检查类别
      checkTypeArr: [],

      // // 结果
      // resultArr: [
      //   { name: '现成', code: '01' },
      //   { name: '现成', code: '02' }
      // ],
      // 添加检查人员弹框选中数组
      // multipleSelectionPerson: [],
      // 竖形表格标题数据(一个对象为一行的标题)
      thingVerticalTableTitle: [
        { itemName: '监管类型', superviseItemCheckIcode: '事项编码' },
        {
          implementInstitution: '实施机构',
          implementInstitutionCode: '实施机构编码'
        },
        { entrustDept: '受委托部门', entrustDeptCode: '受委托部门编号' }
      ],
      // 监管清单表头
      superviseThingsTitle: [
        {
          label: '事项名称',
          prop: 'itemName'
        },
        {
          label: '事项编码',
          prop: 'inventoryCode'
        }
      ],
      // 监管清单表单数据
      superviseThings: [],
      // 监管清单表格选中数据
      multipleSelectionSupersive: [],
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
        // {
        //   name: '监管对象唯一标识',
        //   introduction:
        //     '1、如为法人时，填写统一社会信用代码；2、如为自然人时，填写身份证号。'
        // },
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
            '填写实施此次检查行为的名称，如对XXX博物馆进行文物资源合理利用的检查。'
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
      dialogTableVisiblePerson: false,
      dialogSuperviseThings: false,
      // 校验通过标识符
      validFlag1: false,
      validFlag2: false,
      validFlag3: false
    }
  },
  computed: {
    dialogHeight1() {
      return this.$store.getters.screenHeight > 385
        ? 385
        : this.$store.getters.screenHeight
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    },
    dialogContentHeight() {
      return this.dialogHeight - 120 + 'px'
    },
    // dialogHeight2() {
    //   return this.$store.getters.screenHeight > 323
    //     ? 323
    //     : this.$store.getters.screenHeight
    // },

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
    }
  },
  watch: {},
  created() {
    this.findRegulatoryLocal()
    this.checkForm()
    this.checkResult()
    this.checkType()
    this.checkMode()
    this.administrativeCpNa()
    this.administrativeCpCeType()
    this.result()
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 检查人员删除
    deleteRow(index) {
      if (this.personInfo.item.persions.length > 0) {
        this.personInfo.item.persions.splice(index, 1)
      }
    },
    // 检查人员弹框表格选中
    toggleSelection(rows) {
      if (rows) {
        // 此处的判断不可省略，省略会报错
        if (this.personInfo.item.persions.length > 0) {
          this.$refs.multipleTablePerson.clearSelection()
        }
        rows.forEach(row => {
          this.$refs.multipleTablePerson.toggleRowSelection(row, true)
        })
      }
    },
    save() {
      // this.saveReguJgJgxwCheckAction()
      this.rulesName = this.rulesSave
      this.$nextTick(() => {
        this.$refs['ruleFormSupervise'].validate(valid => {
          this.validFlag1 = valid
        })
        this.$refs['ruleFormCheckPerson'].validate(valid => {
          this.validFlag2 = valid
        })
        this.$refs['ruleFormCheckAction'].validate(valid => {
          this.validFlag3 = valid
        })
        if (this.validFlag1 && this.validFlag2 && this.validFlag3) {
          this.saveReguJgJgxwCheckAction()
        } else {
          if (this.personInfo.item.persions.length < 2) {
            this.$store.dispatch('promptWarningMsg', '检查人员不能少于2人')
          }
          return
        }
      })
    },
    // 提交
    submit() {
      this.rulesName = this.rules
      this.$nextTick(() => {
        this.$refs['ruleFormSupervise'].validate(valid => {
          this.validFlag1 = valid
        })
        this.$refs['ruleFormCheckPerson'].validate(valid => {
          this.validFlag2 = valid
        })
        this.$refs['ruleFormCheckAction'].validate(valid => {
          this.validFlag3 = valid
        })
        if (this.validFlag1 && this.validFlag2 && this.validFlag3) {
          this.subJgJgxwCheckAction()
        } else {
          if (this.personInfo.item.persions.length < 2) {
            this.$store.dispatch('promptWarningMsg', '检查人员不能少于2人')
          }
          return
        }
      })
    },
    // TODO:需要带回显条件时再加
    back() {
      this.$router.push(
        `/national/industry-regulation/adminlaw-task?selectMenuItem=${this.$route.query.selectMenuItem}`
      )
    },
    // 监管事项清单确定
    superviseConfirm() {
      this.dialogSuperviseThings = false
      this.filterResize(this.multipleSelectionSupersive)
      // 监管事项清单有选中项则放开检查形式的下拉框为可选
      if (Object.keys(this.multipleSelectionSupersive).length > 0) {
        this.checkFormDisabled = false
        this.checkPersonDisabled = false
        this.findPersionsPage()
      } else {
        this.checkFormDisabled = true
        this.checkPersonDisabled = true
      }
    },
    // 监管事项清单取消
    superviseCancel() {
      this.dialogSuperviseThings = false
    },
    // 获取监管事项清单选中项
    earnSelect(val) {
      this.multipleSelectionSupersive = val
    },
    // 添加检查人员按钮
    addPerson() {
      this.dialogTableVisiblePerson = true
      this.toggleSelection(this.personInfo.item.persions)
    },
    // 添加检察人员弹框确定
    personConfirm() {
      this.dialogTableVisiblePerson = false
      this.personInfo.item.persions = this.multipleSelectionPerson
    },
    // 添加检察人员弹框取消
    personCancel() {
      this.dialogTableVisiblePerson = false
    },
    // 添加检察人员表格选中变化
    personelectionChange(val) {
      this.multipleSelectionPerson = val
    },
    // 检查形式下拉框联动检查项
    checkFormChange(val) {
      if (val === '01') {
        this.personInfo.item.checkItemList = this.multipleSelectionSupersive.checkDaily
      } else if (val === '02') {
        this.personInfo.item.checkItemList = this.multipleSelectionSupersive.checkSpecial
      }

      // for (let i = 0; i < this.personInfo.item.checkItemList.length; i++) {
      //   this.$set(this.rules, `result_${i}`, [
      //     { required: true, message: '请选择结果', trigger: 'change' }
      //   ])
      // }
    },
    //
    administrativeCpNaChange(val) {
      if (val === '公民') {
        this.personInfo.item.administrativeCpCeType = ''
      } else if (val === '法人') {
        this.personInfo.item.administrativeCpCeType = '统一社会信用代码'
      } else if (val === '其他组织') {
        this.personInfo.item.administrativeCpCeType =
          '其他法人或其他组织有效证件号码'
      }
      this.administrativeFlag = val
    },
    // 行政相对人证件类型选择身份证时校验行政相对人编码
    administrativeCpCeTypeChange(val) {
      console.log(val)
      // 居民身份证-111,临时居民身份证-112
      val === '111' || val === '112'
        ? this.$set(this.rules, 'administrativeCpUiCode', [
            {
              validator: checkIdCardNum,
              trigger: 'change'
            },
            { max: 18, message: '长度最多18字符', trigger: 'change' }
          ])
        : this.$set(this.rules, 'administrativeCpUiCode', [
            { validator: isNull, trigger: 'blur' },
            { max: 18, message: '长度最多18字符', trigger: 'change' }
          ])
    },
    // 过滤重新生成的数组
    filterResize(data) {
      for (let key in data) {
        if (this.personInfo.item.hasOwnProperty(key)) {
          this.personInfo.item[key] = data[key]
        }
      }
    },
    // 查询监管事项清单接口
    findRegulatoryLocal() {
      findRegulatoryLocal().then(responseData => {
        this.superviseThings = responseData.data
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

    // 行政相对人性质下拉框接口
    administrativeCpNa() {
      superviseType('administrativeCpNa').then(responseData => {
        this.administrativeCpNaArr = responseData.data
      })
    },
    // 行政相对人证件类型下拉框接口
    administrativeCpCeType() {
      superviseType('administrativeCpCeType').then(responseData => {
        this.administrativeCpCeTypeArr = responseData.data
        console.log('行政相对人证件类型下拉框接口')
        console.log(this.administrativeCpCeTypeArr)
      })
    },
    // 结果下拉框接口
    result() {
      superviseType('checkResultList').then(responseData => {
        this.resultArr = responseData.data
      })
    },
    // 分页查询-满足监管事项检查人员接口
    findPersionsPage() {
      findPersionsPage(
        { currentPageNumber: 1, pageSize: 100, sort: '', dir: '' },
        this.multipleSelectionSupersive.superviseItemImplementCode
      ).then(responseData => {
        this.personTableData = responseData.data.data
      })
    },
    // 填报人员事项提交接口
    subJgJgxwCheckAction() {
      // 行政相对人性质
      this.addCode(
        this.administrativeCpNaArr,
        this.personInfo.item.administrativeCpNaName,
        'administrativeCpNa'
      )
      // 行政相对人证件类型TODO:做完了保存提交时候找下拉框的name部分-----------------------
      if (this.administrativeFlag === '公民') {
        this.addName(
          this.administrativeCpCeTypeArr,
          this.personInfo.item.administrativeCpCeType,
          'administrativeCpCeTypeName'
        )
      }
      // 检查形式
      this.addName(
        this.checkFormArr,
        this.personInfo.item.checkForm,
        'checkFormName'
      )
      // 检查方式
      this.addName(
        this.checkModeArr,
        this.personInfo.item.checkMode,
        'checkModeName'
      )
      // 检查结果
      this.addName(
        this.checkResultArr,
        this.personInfo.item.checkResult,
        'checkResultName'
      )
      // 结果
      this.addNameCheckItemList()
      subJgJgxwCheckAction(this.personInfo).then(responseData => {
        if (responseData.code === 200) {
          // this.$router.push(
          //   `/national/industry-regulation/adminlaw-task?selectMenuItem=${this.$route.query.selectMenuItem}`
          // )
          this.back()
        }
      })
    },
    //  // 行政相对人性质
    //   administrativeCpNaArr: [],
    //   // 行政相对人证件类型
    //   administrativeCpCeTypeArr: [],
    //   // 检查形式
    //   checkFormArr: [],
    //   // 检查方式
    //   checkModeArr: [],
    //   // 检查结果
    //   checkResultArr: [],
    //   // 结果
    //   resultArr: [],
    // 填报人员新建事项本地保存接口
    saveReguJgJgxwCheckAction() {
      // 行政相对人性质
      this.addCode(
        this.administrativeCpNaArr,
        this.personInfo.item.administrativeCpNaName,
        'administrativeCpNa'
      )
      // 行政相对人证件类型-------------------------
      if (this.administrativeFlag === '公民') {
        this.addName(
          this.administrativeCpCeTypeArr,
          this.personInfo.item.administrativeCpCeType,
          'administrativeCpCeTypeName'
        )
      }
      // 检查形式
      this.addName(
        this.checkFormArr,
        this.personInfo.item.checkForm,
        'checkFormName'
      )
      // 检查方式
      this.addName(
        this.checkModeArr,
        this.personInfo.item.checkMode,
        'checkModeName'
      )
      // 检查结果
      this.addName(
        this.checkResultArr,
        this.personInfo.item.checkResult,
        'checkResultName'
      )
      // 结果
      this.addNameCheckItemList()
      saveReguJgJgxwCheckAction(this.personInfo).then(responseData => {
        if (responseData.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    // 给提交和保存的数据添加下拉框数据对应的name
    addName(arr, code, name) {
      if (code) {
        let item = arr.find(item => {
          return item.code === code
        })
        this.personInfo.item[name] = item.name
      }
    },
    // 给提交和保存的数据添加下拉框数据对应的code
    addCode(arr, name, keyName) {
      let item = arr.find(item => {
        return item.name === name
      })
      this.personInfo.item[keyName] = item.code
    },
    // 给提交和保存的数据添加下拉框数据对应的name-表格数据检查项中的结果
    addNameCheckItemList() {
      this.personInfo.item.checkItemList.forEach(itemOuter => {
        let arrayItem = this.resultArr.find(item => {
          return item.name === itemOuter.checkResultName
        })
        itemOuter.checkResult = arrayItem.code
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
  // /deep/.el-card__header {
  //   padding: 10px 0 0;
  // }
  .header_button {
    margin-top: 10px;
    vertical-align: middle;
    // background-color: #ccc;
    height: 50px;
    // #e6ebf5
    border-top: 1px solid #e6ebf5;
    // border-bottom: 1px solid #e6ebf5;
    display: flex;
    justify-content: space-between;
    // justify-content: flex-end;
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
  // .person {
  //   position: relative;
  //   padding: 15px;
  //   .titleMessage {
  //     position: absolute;
  //     bottom: 0;
  //     left: 50%;
  //     transform: translateX(-50%);
  //     color: red;
  //     font-size: 12px;
  //   }
  //   .personButton {
  //     position: absolute;
  //     top: 50%;
  //     transform: translateY(-50%);
  //     // line-height: 8px;
  //     right: 5px;
  //   }
  // }
  .titleMessage {
    color: red;
    font-size: 12px;
  }
  .dialogbutton {
    margin-top: 10px;
  }

  // ----------------------------------
  // .tablesty {
  //   width: 100%;
  //   table-layout: fixed;
  //   margin: auto;
  //   border: 1px solid grey;
  //   text-align: center;
  // }
  // .basics {
  //   font-size: 14px;
  //   font-weight: bold;
  //   padding: 10px;
  //   text-align: center;
  // }
  // .detailboldfont {
  //   width: 150px;
  //   text-align: center;
  //   padding-left: 5px;
  //   height: 30px;
  //   font-size: 12px !important;
  //   // background-color: rgb(242, 242, 242);
  //   line-height: 20px;
  // }
  // .detailboldfont-1 {
  //   text-align: left;
  //   padding: 5px;
  //   font-size: 12px;
  //   line-height: 20px;
  // }
  .text-a {
    line-height: 35px;
  }
  .disable {
    padding: 5px 0;
    padding-left: 5px;
    background-color: #eee;
    border: 1px solid;
    margin-bottom: 5px;
  }
}
</style>
