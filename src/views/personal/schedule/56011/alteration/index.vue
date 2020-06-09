<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物保护工程(勘察设计甲级、施工一级、监理甲级)资质变更申请</div>
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
                <essential-information ref='essentialInformation'></essential-information>
              </apply-form-item>
            </div>
            <div class="linkHeight">
              <apply-form-item data="变更信息" class="hxl_item ">
                <change-information ref='changeInformation'></change-information>
              </apply-form-item>
            </div>
            <apply-form-item data="申请材料" class="hxl_item">
              <application-material :status='status' :allData="allData" ref='applicationMaterial'></application-material>
            </apply-form-item>
            <apply-form-item data="申请单位从业信息" class="hxl_item">
              <bump-qualification :status='status' :addProject='addProject'></bump-qualification>
            </apply-form-item>
          </div>
        </template>
      </apply-form>
    </el-card>
    <my-dialog width="500px" class="boxCard_dialog" :height='dialogHeight + "px"' center :visible.sync="dialogFormVisibleType"  :append-to-body="false">
      <el-card shadow="never">
        <div slot="header">承诺公告</div>
        <el-scrollbar :style="{height: (dialogHeight - 140) + 'px'}">
          <div class="explain">资质单位及经办人应保证提交至该平台中的信息及文件的真实性、有效性、合法性、准确性和完整性。如资质单位或经办人伪造相关信息、文件，或相关信息、文件存在误导性陈述或重大遗漏，录入信息及依据其作出的行政决定将被退回或作废；违反相关法规的，将按照相关法规要求进行处罚，并将作为负面信用信息予以记录。</div>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">同意</el-button>
        <el-button @click="dialogFormVisibleType = false">不同意</el-button>
      </span>
		</my-dialog>
  </div>
</template>

<script>
import EssentialInformation from './EssentialInformation'
import ApplicationMaterial from './ApplicationMaterial'
import BumpQualification from '../culturalRelics/BumpQualification'
import ChangeInformation from './ChangeInformation'
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import ApplyForm from '@/components/commons/ApplyForm'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    ChangeInformation,
    EssentialInformation,
    ApplicationMaterial,
    BumpQualification,
    ApplyForm,
    ApplyFormItem,
    // Technicist,
    MyDialog
  },
  props: {},
  data() {
    return {
      dialogFormVisibleType:false,
      // 切换按钮标题
      titleData: ['基本信息', '变更信息', '申报信息', '申请材料','申请单位从业信息'],
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
      return this.$store.getters.screenHeight > 220
        ? 220
        : this.$store.getters.screenHeight
    }
  },
  watch: {},
  created() {},
  mounted() {},
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
    // 选择按钮弹框确认
    confirm() {
      this.dialogFormVisibleType = false;
       let value=this.saveOrsubmit
       let flag=this.$refs.essentialInformation.validataForm();
       let flag1=this.$refs.changeInformation.validataForm();
       let flag2=this.$refs.applicationMaterial.validataForm();
       if(!flag || !flag1 || !flag2) {
        //  window.alert('请正确填写内容');
         return
         }
      if(value==='save'){
        // window.alert('调用保存接口  刷新页面状态');
      }
      if(value==='submit'){
        // window.alert('调用提交接口  刷新页面状态');
      }
    },
    // 保存或提交
    // this.$refs.basicInformation.getFormData(type),
    // this.$refs.applyMaterial.getFormData(type)
    saveOrSubmit(value) {
      this.saveOrsubmit = value;
      if(value=='save'){
        //直接调接口 
        return // 不要删
      }      
      this.confirm();
    },
    // 添加项目
    addProject(Project){
      this.Project=Project;
    },
    // 根据状态隐藏对应的东西
    // SwStatus(){
    //   console.log(this.status)
    //   switch(this.status){
    //     case 1 : return '填写中';
    //     case 2 : return '填写中'; 
    //     case 3 : return '填写中'; // 保存
    //     case 4 : return '国家文物局审核中'; //点击提交
    //     case 5 : return '国家文物局审核中'; // 省局文物局审核中
    //     case 6 : return '国家文物局审核中'; //评估机构
    //     case 7 : return '国家文物局审核中'; //文物
    //     case 8 : return '数据库已更新';//所有流程审核通过
    //     default:
    //       return '未知';
    //   }
    // },
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
