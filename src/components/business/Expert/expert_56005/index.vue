<template>
  <div class="box">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="132px"
      :show-message="false">
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案名称" prop="projectName" class="redStar">
              <el-input v-model="form.projectName" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="建控要求" prop="controlRequest" class="redStar">
              <el-input v-model="form.controlRequest" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="相关资料图纸" prop="datumPaper">
              <el-input v-model="form.datumPaper" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设计说明" prop="opinion" class="redStar">
                <el-input v-model="form.opinion"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="评审意见" prop="conclusion" class="redStar">
                <el-input v-model="form.conclusion" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <el-form-item label="评审结论" prop="conclusion" class="redStar">
              <el-select v-model="form.conclusion" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item  label="备注" prop="Remark">
              <el-input type="textarea" v-model="form.Remark" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
		</el-form>
  </div>
</template>
<script>
// import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
export default {
  components: {  },
  data() {
    return {
      options: [
        { value: '1', label: '通过' },
        { value: '2', label: '不通过' }
      ],
      form: {
        radio: '1',
        projectName: '',
        controlRequest: '',
        datumPaper: '',
        explain: '',
        opinion: '',
        conclusion:''
      },
      // 三套表单校验规则
      rules: {
          projectName: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          controlRequest: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          datumPaper: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          explain: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          opinion: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          conclusion:[
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
      },
    }
  },
}
</script>
<style  lang="scss" scoped>
  /deep/.el-select,
  /deep/.el-date-editor.el-input,
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
  .pr5 {
      margin-left: 16.7px;
  }
  /deep/ .el-form-item__label {
    white-space: break-spaces;
  }
  .boxtitle{
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 10px;
    /deep/ .el-form-item--small.el-form-item {
      margin-bottom: 0px;
    }
  }
</style>


