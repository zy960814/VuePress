<template>
  <div class="content">
    <el-collapse v-model="activeNames" @change='activeNamesChange'>
      <el-collapse-item title="单位基本信息" name="1">
        <template slot="title">
          <span class="collapseSty">单位基本信息</span>
        </template>
        <Agency-information :status='status' :allData="allData" class="center" :redactFlag='false'></Agency-information>
      </el-collapse-item>
      <el-collapse-item title="单位资质信息" name="2">
        <template slot="title">
          <span class="collapseSty">单位资质信息</span>
        </template>
        <qualification-information :status='status' class="center" :allData="allData" :redactFlag='false'></qualification-information>
      </el-collapse-item>
      <el-collapse-item title="单位技术人员构成" name="3">
        <template slot="title">
          <span class="collapseSty">单位技术人员构成</span>
        </template>
        <technicist :status='status' :allData="allData" class="center" :redactFlag='false'></technicist>
      </el-collapse-item>
      <el-collapse-item title="文物保护工程业绩" name="4">
        <template slot="title">
          <span class="collapseSty">文物保护工程业绩</span>
        </template>
        <historic-reservation class="historic-reservation center" :status='status' :addProject='addProject' :allData="allData" :redactFlag='false'></historic-reservation>
      </el-collapse-item>
      <el-collapse-item title="获奖情况" name="5">
        <template slot="title">
          <span class="collapseSty">获奖情况</span>
        </template>
        <scholarship-prize :status='status' :Project="Project" class="center" :allData="allData" :redactFlag='false'></scholarship-prize>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import AgencyInformation from '@/components/business/EmploymentInformation/AgencyInformation'
import QualificationInformation from '@/components/business/EmploymentInformation/QualificationInformation'
import Technicist from '@/components/business/EmploymentInformation/Technicist'
import HistoricReservation from '@/components/business/EmploymentInformation/HistoricReservation'
import ScholarshipPrize from '@/components/business/EmploymentInformation/ScholarshipPrize'
// import ApplyFormItem from "@/components/commons/ApplyForm/ApplyFormItem";
// import MyDialog from "@/components/commons/MyDialog";
export default {
  components: {
    AgencyInformation,
    // ApplyFormItem,
    Technicist,
    HistoricReservation,
    ScholarshipPrize,
    QualificationInformation,
    // MyDialog
  },
  props: {
    allData:{
      type:Object
    }
  },
  data() {
    return {
      activeNames:'1',
      dialogFormVisibleType: false,
      // 切换按钮标题
      applyFormData: {},
      status: 1,
      disabled: true,
      Project: [],
      saveOrsubmit: "",
      statusValue: ""
    };
  },
  computed: {
    contentHeight: function() {
      return (
        "calc(100vh - " +
        (this.$store.getters.menuStyle === 1 ? 235 : 228) +
        "px)"
      );
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 220
        ? 220
        : this.$store.getters.screenHeight;
    }
  },
  watch: {
    allData(val){
        if(val){
          console.log(val);
          this.allData=val
        }
    }
  },
  created() {},
  mounted() {
    // this.getAllData(1);
  },
  destroyed() {},
  methods: {
    // 保存或提交
    // this.$refs.basicInformation.getFormData(type),
    // this.$refs.applyMaterial.getFormData(type)
    saveOrSubmit(value) {
      this.saveOrsubmit = value;
    },
    // 添加项目
    addProject(Project) {
      this.Project = Project;
    },
    //xxwh 信息维护点击
    xxwh() {
      //调接口成功后刷新页面
      // 调接口获取数据重置页面
      this.getAllData(2); // 改变状态接口成功后返回调用
    },
    retrunSubmit() {
      //撤销提交
      this.getAllData(3);
    },
    getAllData(status) {
      // 获取页面所有数据
      this.status = status;
    },
    // 根据状态隐藏对应的东西
    SwStatus() {
      switch (this.status) {
        case 1:
          return "填写中";
        case 2:
          return "填写中";
        case 3:
          return "填写中"; // 保存
        case 4:
          return "国家文物局审核中"; //提交完成
        case 5:
          return "国家文物局审核中"; // 省局文物局审核中
        case 6:
          return "国家文物局审核中"; //评估机构
        case 7:
          return "国家文物局审核中"; //文物
        case 8:
          return "数据库已更新"; //所有流程审核通过
        default:
          return "未知";
      }
    },
    activeNamesChange(value){
      this.activeNames=value
    },
  }
};
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
      padding: 0 18px;
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
 .el-collapse-item__content {
    padding-bottom: 18px;
  }
  .collapseSty {
    font-size: 13px;
    font-weight: 700;
    padding-left: 18px;
    color: $--color-primary;
  }
</style>
