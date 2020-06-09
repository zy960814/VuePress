<template>
    <div>
    <!-- 查看界面 -->
        <el-row v-if="showText" style="height: calc((100vh - 230px) - -15px);overflow-x:hidden">
            <ApplyFormItem data="基础信息"></ApplyFormItem>
            <table class="tablesty" style="border-collapse: collapse;" border="1px" cellspacing="0" cellpadding="0" >
                <tr>
                    <td class="detailboldfont">用户账号</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                    <td class="detailboldfont" width="160px">单位名称</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">统一社会信用代码</td>
                    <td class="detailboldfont-1" colspan="7"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">所在地区</td>
                    <td class="detailboldfont-1" colspan="7"> 123</td>    
                </tr>
                <tr>
                    <td class="detailboldfont">单位地址</td>
                    <td class="detailboldfont-1" colspan="7"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">经济性质</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                    <td class="detailboldfont">主管部门</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">营业执照</td>
                    <td class="detailboldfont-1" colspan="7" style="text-align: center">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="url"
                            :preview-src-list="srcList">
                        </el-image>
                    </td>
                </tr>
            </table>
            <el-row style="height: 10px"></el-row>
            <ApplyFormItem data="法人信息"></ApplyFormItem>
            <table class="tablesty" style="border-collapse: collapse;" border="1px" cellspacing="0" cellpadding="0" >
                <tr>
                    <td class="detailboldfont" colspan="1">法人代表</td>
                    <td class="detailboldfont-1" colspan="9"> 123</td>
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
                    <td class="detailboldfont" colspan="1">身份证扫描件</td>
                    <td class="detailboldfont-1" colspan="4" style="text-align: center">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="url"
                            :preview-src-list="srcList">
                        </el-image>
                    </td>
                    <td class="detailboldfont-1" colspan="5" style="text-align: center">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="url"
                            :preview-src-list="srcList">
                        </el-image>
                    </td>
                </tr>
                <tr>
                    <td class="detailboldfont" colspan="1">手机号码</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                    <td class="detailboldfont" colspan="1">电子邮箱</td>
                    <td class="detailboldfont-1" colspan="5"> 123</td>
                </tr>
            </table>
            <el-row style="height: 10px"></el-row>
            <ApplyFormItem data="经办人信息"></ApplyFormItem>
            <table class="tablesty" style="border-collapse: collapse;" border="1px" cellspacing="0" cellpadding="0" >
                <tr style="padding:0px">
                    <td colspan="10" style="padding:0px">
                        <el-table
                            :data="tableData"
                            class="mh-table"
                            width="500px"
                            :header-cell-style="{background:'#f2f2f2',color:'#555',padding:'12px 0'}"
                            border
                            style="width: 100%;">
                            <el-table-column prop="date" label="经办人" ></el-table-column>
                            <el-table-column prop="name" label="证件号码"></el-table-column>
                            <el-table-column prop="address" label="电话"></el-table-column>
                            <el-table-column prop="address" label="邮箱"></el-table-column>
                        </el-table>
                    </td>
                </tr>
            </table>
        </el-row>
    <!-- 修改界面 -->
        <div style="height: calc((100vh - 230px) - 15px);overflow-x:hidden">
            <el-scrollbar>
                <legalpersonChilder></legalpersonChilder>
            </el-scrollbar>
        </div>
  <el-dialog  :visible.sync="dialogTableVisible" width="80%">
        <el-card shadow="never" :body-style="{
          padding:'0','padding-top':'5px'
        }">
            <div style="text-align: center;font-size: 15px;font-weight:bold">添加经办人</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk="true" style="
            margin: 0 5.5vh;margin-top: 18px;" label-position="left" label-width="110px" class="demo-ruleForm">
            <el-row>
                <el-col :span="15">
                    <el-form-item label="经办人" prop="name">
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
                <el-col :span="15">
                    <el-form-item label="电子邮箱" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="text-align: left;">
                <el-col>
                    <el-radio v-model="radio1" label="1">身份证</el-radio>
                    <el-radio v-model="radio1" label="2">其他证件</el-radio>
                </el-col>
              </el-row>
              <el-row style="border-bottom: 1px solid #303133;margin: 10px 0"></el-row>
              <el-row v-if="radio1 == '1'">
                <el-col :span="12">
                    <el-form-item  label="身份证号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="1">
                    <el-form-item label="身份证有效期" prop="name">
                       <el-date-picker
                        style="width: 100%"
                        v-model="ruleForm.name"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label-width="10px" prop="name">
                        <el-checkbox v-model="ruleForm.lable">永久</el-checkbox>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="radio1 == '1'">
                  <el-col :span="12">
                      <el-form-item label="身份证扫描件" prop="name">
                          <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                           >
                            <el-button size="small" type="primary">上传证件正面扫描件</el-button>
                            <div slot="tip" class="el-upload__tip">支持扩展名：.jpg .png .bmp</div>
                          </el-upload>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label-width="1" prop="name">
                          <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                           >
                            <el-button size="small" type="primary">上传证件反面扫描件</el-button>
                            <div slot="tip" class="el-upload__tip">支持扩展名：.jpg .png .bmp</div>
                          </el-upload>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row v-if="radio1 == '2'">
                <el-col :span="5">
                    <el-form-item  label="证件类型" prop="name">
                        <el-select v-model="ruleForm.name" placeholder="请输身份证类型" style="width: 100%">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="radio1 == '2'">
                  <el-col :span="12">
                      <el-form-item  label="证件号码" prop="name">
                          <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row v-if="radio1 == '2'">
                  <el-col :span="12">
                      <el-form-item label="上传证件扫描件" prop="name">
                          <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                           >
                            <el-button size="small" type="primary">上传证件扫描件</el-button>
                            <div slot="tip" class="el-upload__tip">支持扩展名：.jpg .png .bmp</div>
                          </el-upload>
                      </el-form-item>
                  </el-col>
              </el-row>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
  </el-dialog>
</div>
</template>
<script type="text/javascript">
import ApplyFormItem from "@/components/commons/ApplyForm/ApplyFormItem";
import legalpersonChilder from './legalpersonChilder'
export default {
  props: {
    showText: {
      default: true
    }
  },
  components: {
    ApplyFormItem,
    legalpersonChilder
  },
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      radio1: "1",
      radio: "1",
      dialogTableVisible: false,
      ruleForm: {
        name: "",
        lable: "1",
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
    deleteRow(index, rows) {
      console.log(index, rows, 123);
      rows.splice(index, 1);
    },
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
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    //   this.$router.push({ path: "/personal/account-settings?show=1" });
    // }
  }
};
</script>
<style type="text/css"  scoped>
.el-radio >>> .el-radio__label {
  font-size: 12px !important;
}
.el-button--mini {
  border-radius: 6px;
}
.demo-ruleForm /deep/ .el-form-item__label {
  font-size: 12px;
  color: #303133;
}
.mh-table {
  border: none !important;
  border-bottom: none !important;
}
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
  font-size: 12px !important;
  line-height: 20px;
}
.scrollbarBox{
    height: 100%;
    overflow-y: auto;
    overflow: hidden
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