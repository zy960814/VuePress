<template>
    <div style="height: calc(100vh - 230px);overflow-x:hidden">
        <table v-if="showText"  class="tablesty" style="border-collapse: collapse;" border="1px" cellspacing="0" cellpadding="0">
            <tr>
                <td class="detailboldfont" colspan="1">用户账号</td>
                <td class="detailboldfont-1" colspan="3"> 123</td>
                <td class="detailboldfont" colspan="1">个人姓名</td>
                <td class="detailboldfont-1" colspan="5"> 123</td>
            </tr>
            <tr>
            </tr>
            <tr>
                <td class="detailboldfont" colspan="1">证件类型</td>
                <td class="detailboldfont-1" colspan="3"> 123</td>
                <td class="detailboldfont" colspan="1">证件号码</td>
                <td class="detailboldfont-1" colspan="2"> 123</td>
                <td class="detailboldfont" colspan="1">有效期</td>
                <td class="detailboldfont-1" colspan="2"> 123</td>
            </tr>
            <tr>
                <td class="detailboldfont" colspan="1">所在地区</td>
                <td class="detailboldfont-1" colspan="9"> 123</td>
            </tr>
            <tr>
                <td class="detailboldfont" colspan="1">通信地址</td>
                <td class="detailboldfont-1" colspan="9"> 123</td>
            </tr>

            <tr>
                <td class="detailboldfont" colspan="1">手机号码</td>
                <td class="detailboldfont-1" colspan="9"> 123</td>
            </tr>
            <tr>
                <td class="detailboldfont" colspan="1">电子邮箱</td>
                <td class="detailboldfont-1" colspan="9"> 123</td>
            </tr>
        </table>
        <el-row v-if="!showText" >
          <personalChilder></personalChilder>
            <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk="true" style="margin: 0 5.5vh;margin-top: 10px;" label-position="left" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="证件类型" prop="name">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="证件号码" prop="name">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6" :offset="1">
                        <el-form-item label="有效期" prop="name">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户账号" prop="name">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11" :offset="1">
                        <el-form-item label="个人姓名" prop="name">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所在地区" prop="name">
                            <el-select v-model="ruleForm.name" placeholder="请输入省份" style="width: 100%">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item  prop="name" label-width="1px">
                            <el-select v-model="ruleForm.name" placeholder="请输入市" style="width: 100%">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item  prop="name" label-width="1px">
                            <el-select v-model="ruleForm.name" placeholder="请输入地区" style="width: 100%">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="通信地址" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-form-item label-width="1px" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入验证码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" :offset="1" >
                            <el-button @click="getCode()" :disabled="!show">
                                {{show == true?'发送验证码':count+'S后发送'}}
                            </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="电子邮箱" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form> -->
            <!-- <el-row style="text-align: right;margin-top: 20px">
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-row> -->
        </el-row>
    </div>
</template>
<script type="text/javascript">
import personalChilder from './personalChilder'
// import ApplyFormItem from "@/components/commons/ApplyForm/ApplyFormItem";
export default {
  props: {
    showText: {
      default: true
    }
  },
  components: {
    personalChilder,
    // ApplyFormItem
  },
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: " ", trigger: "change" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "change" }]
      },
      // showText:false,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({ path: "/personal/account-settings?show=1" });
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push({ path: "/personal/account-settings?show=1" });
    }
  }
};
</script>
<style type="text/css"  scoped>
.basics {
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
}
.detailboldfont {
  width: 150px;
  text-align: center;
  padding-left: 5px;
  height: 30px;
  background-color: rgb(242, 242, 242);
  font-size: 12px !important;
  line-height: 20px;
}
.detailboldfont-1 {
  text-align: left;
  padding: 5px;
  font-size: 12px;
  line-height: 20px;
}
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
</style>
