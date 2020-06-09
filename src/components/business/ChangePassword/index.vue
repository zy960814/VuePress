<template>
  <div>
    <el-row>
      <el-col :span="6">
        <span style="color: #fff">'</span>
      </el-col>
      <el-col :span="12">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="输入原密码" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
              </el-form-item>
              <el-form-item label="输入新密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(' '));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(' '));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error(' '));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
          { validator: validatePass, required: true, trigger: 'change' }
          ],
          checkPass: [
          { validator: validatePass2,required: true,  trigger: 'change' }
          ],
          age: [
          { message:"  ",required: true,  trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {
           if(this.ruleForm.checkPass !== this.ruleForm.pass){
            this.$confirm('您输入的新密码和确认新密码输入不一致, 请重新输入?', '', {
              confirmButtonText: '确定',
              showCancelButton:false,
              type: 'error'
            }).then(() => {

            }).catch(() => {
            });
          }
        }
      });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>