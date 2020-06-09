<template>
    <div>
        <el-row v-if="showText" style="height: calc(100vh - 200px);overflow:auto">
            <table  class="tablesty" style="border-collapse: collapse" border="1px" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="detailboldfont">用户账号</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                     <td class="detailboldfont">姓名</td>
                    <td class="detailboldfont-1" colspan="5"> 123</td>
                </tr>
                <tr>
                </tr>
                <tr>
                    <td class="detailboldfont">证件类型</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                    <td class="detailboldfont">证件号码</td>
                    <td class="detailboldfont-1" colspan="2"> 123</td>
                    <td class="detailboldfont">有效期</td>
                    <td class="detailboldfont-1" colspan="2"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">所在单位</td>
                    <td class="detailboldfont-1" colspan="9"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">电话</td>
                    <td class="detailboldfont-1" colspan="3"> 123</td>
                    <td class="detailboldfont">电子邮箱</td>
                    <td class="detailboldfont-1" colspan="5"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">手机号码</td>
                    <td class="detailboldfont-1" colspan="9"> 123</td>
                </tr>
                <tr>
                    <td class="detailboldfont">地址或房间号</td>
                    <td class="detailboldfont-1" colspan="9"> 123</td>
                </tr>
            </table>
        </el-row>
        <el-row v-if="!showText">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk="false" style="
                margin: 0 5.5vh;margin-top: 20px;" label-position="left" label-width="90px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户账号">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11" :offset="1">
                        <el-form-item label="姓名">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="证件类型">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="证件号码">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6" :offset="1">
                        <el-form-item label="有效期">
                            <el-input v-model="ruleForm.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item class="column" label="所在单位" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="电话" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="区号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label-width="1px" prop="name">
                      <el-input v-model="ruleForm.name" placeholder="电话号码"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="1">
                          <el-form-item label-width="1px" prop="name">
                      <el-input v-model="ruleForm.name" placeholder="分机号"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item class="column" label="电子邮箱" prop="name">
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
                              <el-input v-model="ruleForm.name" placeholder="验证码"></el-input>
                            </el-form-item>
                    </el-col>
                    <el-col :span="1" :offset="1">
                            <el-button @click="resetForm('ruleForm')">发送验证码</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="地址或房间号" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
    </div>
</template>
<script type="text/javascript">
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
export default {
    props:{
        'showText':{
            default:true
        }
     },
    components: {
     ApplyFormItem
    },
    data(){
        return {
            ruleForm: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            rules: {
          name: [
            { required: true, message: ' ', trigger: 'change' },
              ],
              region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
              ],
              date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
              ],
              date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
              ],
              type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ],
              resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'change' }
              ]
            },
            // showText:false,
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            ],
            tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
        }
    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({path:'/personal/account-settings?show=1'})
            alert('submit!');

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.push({path:'/personal/account-settings?show=1'})
      }
    }
}
</script>
<style type="text/css"  scoped>
.demo-ruleForm /deep/ .el-form-item__label {
  font-size: 12px;
  color: #303133;
}
.basics {
    font-size: 12px;
    font-weight:bold;
    padding: 10px 0;
}
.detailboldfont {
    width: 150px;
    text-align: center;
    padding-left:5px;
    height:30px;
    font-size: 12px!important;
}
.detailboldfont-1 {
    text-align: left;
    padding:5px;
    font-size: 12px;
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