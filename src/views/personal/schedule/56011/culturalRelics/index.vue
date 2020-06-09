<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物保护工程（勘察设计甲级、施工一级、监理甲级）资质申请</div>
      <apply-form :data="titleData" @tab-click="itemClick" widthOneL="50%">
        <template #titleInsertL_one>
          <span style="font-size:14px;">本事项承诺办结时限为30个工作日(不包括专业论证审查和公示时间)</span>
        </template>
        <template #titleInsertR_one>
          <el-button @click="saveOrSubmit('save')"  type="primary">保存</el-button>
          <el-button @click="saveOrSubmit('submit')" type="primary">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </template>
        <template #titleInsertR_two>
          <el-link @click="$emit('link-text-click')" type="primary" class="fr title_link">办事指南</el-link>
        </template>
        <template #body>
          <div class="scrollBox" :style="{height: contentHeight}">
            <div class="linkHeight">
              <apply-form-item data="基本信息" class="hxl_item " >
                <essential-information ref="essentialInformation"></essential-information>
              </apply-form-item>
            </div>
            <div class="linkHeight">
              <apply-form-item data="申报信息" class="hxl_item">
                <application-information ref="applicationInformation"></application-information>
              </apply-form-item>
            </div>
            <apply-form-item data="申请材料" class="hxl_item">
              <application-material :status='status' :allData="allData" ref="applicationMaterial"></application-material>
            </apply-form-item>
            <apply-form-item data="申请单位从业信息" class="hxl_item">
              <bump-qualification :status='status' :addProject='addProject' :allData='allData'></bump-qualification>
            </apply-form-item>
          </div>
        </template>
      </apply-form>
    </el-card>
    <!-- 提交弹框 -->
    <my-dialog
      width="1024px"
      class="boxCard_dialog"
      :height="dialogHeight+'px'"
      :visible.sync="dialogVisible">
      <el-card shadow="never">
        <div slot="header">全国重点文物保护单位原址保护措施申请</div>
        <el-scrollbar :style="{height: dialogHeight-138+'px'}">
          <!-- <div style="margin-bottom:10px;"> -->
          <confirm-message :key="Math.random()" :applyFormData="applyFormData" :allData='allData' />
          <!-- </div> -->
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import EssentialInformation from '../culturalRelics/EssentialInformation'
import ApplicationInformation from '../culturalRelics/ApplicationInformation'
import ApplicationMaterial from '../culturalRelics/ApplicationMaterial'
import BumpQualification from '../culturalRelics/BumpQualification'
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import ApplyForm from '@/components/commons/ApplyForm'
import MyDialog from '@/components/commons/MyDialog'
import ConfirmMessage from '@/components/business/ConfirmMessage56011'
export default {
  components: {
    EssentialInformation,
    ApplicationInformation,
    ApplicationMaterial,
    BumpQualification,
    ApplyForm,
    ApplyFormItem,
    ConfirmMessage,
    MyDialog
  },
  props: {},
  data() {
    return {
      dialogVisible:false,
      // 切换按钮标题
      titleData: ['基本信息', '申报信息', '申请材料','申请单位从业信息'],
      applyFormData: {},
      status: 2,
      disabled:true,
      Project:[],
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
          },
        },
        ChinaAssociation:{//中国古迹遗址保护协会意见
          form: {
            opinionContent: '',
            isIllegal: '',
          },
        },
        CulturalRelics:{//文保司文物处意见
          form:{
            opinionContent: '',
            isIllegal: '',
          }
        },
        HistoricReservation:{//独立承担且已完成的文物保护工程业绩
          tableData:[],
        },
        ProvincialBureau:{//省文物局意见
          form:{
             opinionContent: '',
             isIllegal: '0',
          }
        },
        QualificationInformation:{//单位资质信息
          tableData:[]
        },
        ScholarshipPrize:{//获奖情况
          tableData: []
        },
        Technicist:{//单位技术人员构
          tableData: []
        }
      },
      statusValue:'',
      saveOrsubmit:'',
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
      return this.$store.getters.screenHeight > 600
        ? 600
        : this.$store.getters.screenHeight
    }
  },
  watch: {},
  created() {
    this.getAllData();
  },
  mounted() {

  },
  destroyed() {},
  methods: {
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
    
    // 保存或提交
    saveOrSubmit(value) {
      this.saveOrsubmit = value;
      this.confirm();
      // this.applyFormData = JSON.parse(JSON.stringify())
    },
    // 选择按钮弹框确认
    confirm() {
       let value=this.saveOrsubmit
       console.log(value,'value','1111')
       let flag=this.$refs.applicationMaterial.validataForm();
       let flag1=this.$refs.essentialInformation.validataForm();
       let flag2=this.$refs.applicationInformation.validataForm();
       if(!flag || !flag1 || !flag2) {
        //  window.alert('请正确填写内容');
         return
         }
      if(value==='save'){
        // window.alert('调用保存接口  刷新页面状态');
      }
      if(value==='submit' && flag && flag1 && flag2){//提交且表单数据都正常
        this.dialogVisible = true;//显示提交弹框
        console.log(this.$refs.essentialInformation.form);
        this.applyFormData={
          basicInformationTitle:{
              instName: '申请事项名称',
              creditCode: '申请文件标题',
              applyDocumentNum_part1: '申请文号',
              technologyDocument: '申请文件',
              economicType: '申请人',
              projectLevel: '经办人',
              linkPhone: '联系方式',
            ...this.$refs.essentialInformation.form,
          },
          basicMessageTitle:{
             radio: '申请资质类型',
             provinceList: '申请资质业务范围' ,otherCheckbox: '',
             nationalSecurityName: '备注',
            ...this.$refs.applicationMaterial.form,
          },
          applyMaterialTitle: {
            technologyDocument: '资质申请表签字盖章扫描件',
            technologyDocument0: '法定代表人任职文件加盖公章彩色扫描件',
            ...this.$refs.applicationInformation.form,
          },
        }
        // window.alert('调用提交接口  刷新页面状态');
      }
    },
    // 添加项目
    addProject(Project){
      this.Project=Project;

    },
    // 获取从业维护信息的数据
    getAllData(){
       this.allData={
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
            technologyDocument:'4',
            economicPeople:'5',
            economicPeoplePhone:'6',
            technologyDocument1:'7'
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
        },
        ChinaAssociation:{ 
         form:{
            opinionContent:"111",
            isIllegal:'1111',
            technologyDocument:[],
            remark:''
         }
        }
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
    /deep/.el-form {
      padding: 0 18px;
    }
    .center {
      padding:  0 18px;
    }
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
  .linkHeight /deep/ .applyFormItem {
    padding-bottom: 0px!important;
  }
</style>
