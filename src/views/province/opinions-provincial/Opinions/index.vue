<template>
<!-- 省局文物局审核中 -->
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">资质单位从业信息</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertL_one>
          <span style="font-size:14px;">当前状态：{{SwStatus()}}</span>
        </template>
        <template #titleInsertR_one>
          <!-- <el-button @click="xxwh()" type="primary">信息维护</el-button> -->
          <el-button @click="findWorkOrder" type="primary">一键下载</el-button>
          <el-button @click="saveOrSubmit('submit')" type="primary">提交</el-button>
          <!-- <el-button v-if="status == 4" @click="retrunSubmit">撤回提交</el-button> -->
          <el-button @click="$router.go(-1)">返回</el-button>
        </template>
        <template #body>
          <div class="scrollBox" :style="{height: contentHeight}">
            <div class="tempBox">
              <apply-form-item data="单位机构信息" class="hxl_item " >
                <Agency-information :sxg='sxg' :status='status' :allData="allData" class="center" ref="agencyInformation"/>
              </apply-form-item>
            </div>
            <apply-form-item data="单位资质信息" class="hxl_item">
              <qualification-information :sxg='sxg' :status='status' class="center" :allData="allData"></qualification-information>
            </apply-form-item>
            <apply-form-item data="单位技术人员构成" class="hxl_item">
              <technicist :sxg='sxg' :status='status' :allData="allData" class="center"></technicist>
            </apply-form-item>
            <apply-form-item data="独立承担且已完成的文物保护工程业绩" class="hxl_item">
              <historic-reservation :sxg='sxg' class="historic-reservation center" :status='status' :addProject='addProject' :allData="allData"></historic-reservation>
            </apply-form-item>
            <apply-form-item data="获奖情况" class="hxl_item">
              <scholarship-prize :sxg='sxg' :status='status' :Project="Project" class="center" :allData="allData"></scholarship-prize>
            </apply-form-item>
            <apply-form-item data="省级文物行政部门意见" class="hxl_item" style="margin-top:10px;" v-if="status == 5 || status == 6 || status == 7">
              <provincial-bureau :status='status' :allData="allData" ref="provincialBureau" :selectMenuItem='selectMenuItem'></provincial-bureau>
            </apply-form-item>
          </div>
        </template>
      </apply-form>
    </el-card>
    <my-dialog width="500px" class="boxCard_dialog" :height='dialogHeight + "px"' center :visible.sync="dialogFormVisibleType"  :append-to-body="false">
      <el-card shadow="never">
        <div slot="header">选择接收人</div>
        <el-scrollbar :style="{height: (dialogHeight - 140) + 'px'}">
          <el-radio v-model="radio" label="1">国家文物局</el-radio>
          <el-radio v-model="radio" label="2">文保工程资质单位</el-radio>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisibleType = false">取消</el-button>
      </span>
		</my-dialog>
    <my-dialog 
      width="500px" 
      class="boxCard_dialog" 
      :height='dialogHeight + "px"' 
      center 
      :visible.sync="dialogFormVisible"  
      :append-to-body="false">

    </my-dialog>
  </div>
</template>

<script>
import AgencyInformation from '@/components/business/EmploymentInformation/AgencyInformation'
import QualificationInformation from '@/components/business/EmploymentInformation/QualificationInformation'
import Technicist from '@/components/business/EmploymentInformation/Technicist'
import HistoricReservation from '@/components/business/EmploymentInformation/HistoricReservation'
import ScholarshipPrize from '@/components/business/EmploymentInformation/ScholarshipPrize'
import ProvincialBureau from './ProvincialBureau'
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import ApplyForm from '@/components/commons/ApplyForm'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    AgencyInformation,
    ApplyForm,
    ApplyFormItem,
    Technicist,
    HistoricReservation,
    ScholarshipPrize,
    QualificationInformation,
    ProvincialBureau,
    MyDialog
  },
  props: {},
  data() {
    return {
      sxg:'ProvincialBureau',
      radio: '1',
      dialogFormVisible:false,
      dialogFormVisibleType:false,
      // 切换按钮标题
      titleData: ['单位机构信息', '单位资质信息', '单位技术人员构成','独立承担且已完成的文物保护工程业绩','获奖情况','省文物局意见'],
      applyFormData: {},
      status: 6,
      disabled:true,
      Project:[],
      saveOrsubmit:'',
      allData:{
        AgencyInformation:{ // 单位机构信息 数据
          form: {
            address: "",
            areaCode: "",
            checkStatus: "",
            corpIdCard: "",
            corpName: "",
            creditCode: "",
            docType: {},
            colorPic: [],
            idcardPositivePic: [],
            idcardReversePic: [],
            economicType: "",
            email: "",
            instName: "",
            linkPhone: "",
            mngInst: "",
            regMoney: "",
            remark:'',
          },
        },
        HistoricReservation:{//独立承担且已完成的文物保护工程业绩
          tableData:[],
          remark:'',
        },
        ProvincialBureau:{//省文物局意见
          form:{
             opinionContent: '',
             isIllegal: '0',
            remark:'',
          }
        },
        QualificationInformation:{//单位资质信息
          tableData:[],
           remark:'',
        },
        ScholarshipPrize:{//获奖情况
          tableData: [],
           remark:'',
        },
        Technicist:{//单位技术人员构
          tableData: [],
           remark:'',
        }
      },
      statusValue:'',
      selectMenuItem:"2"
    }
  },
  computed: {
    contentHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 235 : 228) +
        'px)'
      )
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 170 ? 170 : this.$store.getters.screenHeight
    },
  },
  watch: {},
  created() {
  },
  mounted() {
    this.getAllData(5)
  },
  destroyed() {},
  methods: {
    // 一件下载
    findWorkOrder() {

    },
    // 单位机构信息标记状态改变: 1已核, 2存疑
    organStatusChange(value) {
      console.log(value,'value')
    },
    // 锚点点击事件
    itemClick(tab) {
      let nodes = document.querySelectorAll('.hxl_item')
      document.querySelector('.scrollBox').scrollTop =
        nodes[+tab.index].offsetTop - nodes[0].offsetTop
    },
    // 选择按钮弹框确认
    confirm() {
      this.dialogFormVisibleType = false;
       let value=this.saveOrsubmit
       let flag=this.$refs.provincialBureau.validataForm();
       if(!flag) {
         window.alert('请正确填写内容');
         return
         }
      if(value==='save'){
        this.getAllData(3);
      }
      if(value==='submit'){
        // this.$router.push('/province/opinions-provincial')
        this.getAllData(4);
      }
    },
    saveOrSubmit(value) {
      this.saveOrsubmit=value;
      this.dialogFormVisibleType = true;
    },
    // 添加项目
    addProject(Project){
      this.Project=Project;
    },
    //xxwh 信息维护点击
    xxwh(){
      //调接口成功后刷新页面
      // 调接口获取数据重置页面
      this.getAllData(2); // 改变状态接口成功后返回调用
    
    },
    retrunSubmit(){//撤销提交
      this.getAllData(3)
    },
    getAllData(status){ // 获取页面所有数据 //这里就掉你查询单钱页面接口的地方
      this.status=status;
      this.selectMenuItem='1' //根据查询的数据判断是代办还是已办
      this.allDaa={
        AgencyInformation:{ // 单位机构信息 数据
         form:{
            instName:'1111',
            creditCode:'111111',
            redStar:'111111111',
            address:'1111',
            economicType:'1111',
            regMoney:'1111',
            mngInst:'111',
            linkPhone:'1111',
            email:'111',
            corpName:'1111',
            corpIdCard:'11111',
            itemName1:'111',
            corpIdCard1:'1111',
            itemName2:'1111'
         }
        },
        HistoricReservation:{//独立承担且已完成的文物保护工程业绩
          tableData:[
                    {
                      approvalDepart: "国家文物局",
                      approvalNo: "文物保函【2015】1号",
                      checkStatus: null,
                      docType: {},
                      finishFlag: "1",
                      finishTime: "",
                      id: "8a8086a170f610870171e97c30280313",
                      isDesign: null,
                      itemCode: "1",
                      itemType: null,
                      organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
                      projectCategory: null,
                      projectLevel: null,
                      projectName: "颐和园围墙修缮工程",
                      protectDepart: "颐和园",
                      protectionDepartLevel: "1",
                      startTime: ""
                    },
                    {
                      approvalDepart: "国家文物局",
                      approvalNo: "文物保函【2015】1号",
                      checkStatus: null,
                      docType: {},
                      finishFlag: "0",
                      finishTime: "",
                      id: "8a8086a170f610870171e97c30280313",
                      isDesign: null,
                      itemCode: "1",
                      itemType: null,
                      organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
                      projectCategory: null,
                      projectLevel: null,
                      projectName: "颐和园围墙修缮工程",
                      protectDepart: "颐和园",
                      protectionDepartLevel: "1",
                      startTime: ""
                    }
          ],
          remark:'',
        },
        ProvincialBureau:{//省文物局意见
          form: {
            opinionContent:'1',
            isIllegal:'2',
            economicType:'3',
            technologyDocument:[],
            economicPeople:'5',
            economicPeoplePhone:'6',
            technologyDocument1:[]
          },
        },
        QualificationInformation:{//单位资质信息
            tableData: [
                    {
                      approvalDepartment: "国家文物局",
                      approvalSymbol: "文物保函【2015】1号",
                      checkStatus: null,
                      docType: {},
                      finishFlag: "1",
                      levelCode: "1",
                      organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
                      quaEndTime: "2020-05-29",
                      quaStartTime: "2020-05-03",
                      qualificationInfoId: "8a8086a170f610870171e97c303b0314",
                      qualificationLevel: "勘察设计甲级",
                      qualRangeName:'111' 
                    },
                    {
                      approvalDepartment: "国家文物局",
                      approvalSymbol: "文物保函【2015】1号",
                      checkStatus: null,
                      docType: {},
                      finishFlag: "0",
                      levelCode: "4",
                      organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
                      quaEndTime: "2020-05-21",
                      quaStartTime: "2020-05-04",
                      qualificationInfoId: "8a8086a170f610870171e97c30400318",
                      qualificationLevel: "勘察设计乙级",
                      qualRangeName:'111'
                    }
            ],
            remark:'',
        },
        ScholarshipPrize:{//获奖情况
          tableData: [
            {
              awardsInfo: null,
              awardsName: "优秀奖",
              awardsYear: "2020",
              checkStatus: null,
              docType: {},
              finishFlag: "1",
              id: "8a8086a170f610870171e97c30210310",
              organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
              ratingDepart: "中国古迹遗址保护协会",
              editFlag:false,
            },
            {
              awardsInfo: null,
              awardsName: "优秀奖",
              awardsYear: "2020",
              checkStatus: null,
              docType: {},
              finishFlag: "0",
              id: "8a8086a170f610870171e97c30210310",
              organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
              ratingDepart: "中国古迹遗址保护协会",
              editFlag:true,
            },
          ],
          remark:'',
        },
        Technicist:{//单位技术人员构成
          tableData: [
            {
              business: "责任设计师:文物保护规划,古建筑",
              certificateNo: "ZRSJ20150053;",
              checkStatus: null,
              dateBirth: null,
              docType: {},
              finishFlag: "1",
              id: "8a8086a170f610870171e97c30240311",
              instName: "北京诗琴园林设计有限公司（测试11）",
              name: "毕毅",
              newInstId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
              organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
              otherFlag: null,
              perRangeCode: "责任设计师:1,责任设计师:2",
              perTypeCode: "1",
              qualificationType: "责任设计师",
              rehireAfterRetirement: "0",
              userId: "71DC4522-13B9-4D6D-9C26-56496FE4357E"
            },
            {
              business: "考古",
              certificateNo: "设计师",
              checkStatus: null,
              dateBirth: "2020",
              docType: {},
              finishFlag: "0",
              id: "8a8086a170f610870171e97c30250312",
              instName: "北京诗琴园林设计有限公司（测试11）",
              name: "李丽",
              newInstId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
              organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
              otherFlag: null,
              perRangeCode: null,
              perTypeCode: null,
              qualificationType: "其他技术骨干",
              rehireAfterRetirement: null,
              userId: null
            }
          ],
          remark:'',
        }
      }
    },
    // 根据状态隐藏对应的东西
    SwStatus(){
      switch(this.status){
        case 1 : return '填写中';
        case 2 : return '填写中'; 
        case 3 : return '填写中'; // 保存
        case 4 : return '国家文物局审核中'; //提交完成
        case 5 : return '国家文物局审核中'; // 省局文物局审核中
        case 6 : return '国家文物局审核中'; //评估机构
        case 7 : return '国家文物局审核中'; //文物
        case 8 : return '数据库已更新';//所有流程审核通过
        default:
          return '未知';
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  /deep/ .el-card__header {
    padding: 10px 12px;
    .title_link {
      line-height: 23px;
    }
  }

  /deep/ .el-card__body {
    padding: 12px;
    padding-top: 0px;

    .opt_btn {
      text-align: right;
    }

    .scrollBox {
      overflow-y: auto;
      padding-right: 1px;
    }
    // /deep/.el-form {
    //   padding: 0 18px;
    // }
    // .center {
    //   padding:  0 18px;
    // }
    /deep/.el-select,
    /deep/.el-date-editor.el-input,
    /deep/ .el-date-editor--daterange.el-input__inner {
      width: 100%;
    }

    /deep/.spilt .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    /deep/ .el-upload__tip {
      margin-left: 10px;
      font-size: 14px;
    }
    /deep/.el-textarea__inner {
      border: 1px solid gray;
    }
    /deep/.el-dialog__body {
      padding: 0px 20px !important;
    }
  }
}
  .explain {
    text-indent: 2em;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /deep/ .el-dialog--center .el-dialog__footer {
    text-align: right;
  }
</style>
