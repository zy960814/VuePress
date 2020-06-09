<template>
  <div class="box">
      <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="132px"
      :show-message="false">
      <div v-if="this.form.radio == 1"> 
        <el-row>
          <el-col :span="24">
            <el-form-item label="展览与展品信息是否表达完善与准确" prop="improveAccurate" class="redStar">
              <el-input v-model="form.improveAccurate" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="展品是否支持展览主题" prop="exhibitionTheme" class="redStar">
              <el-input v-model="form.exhibitionTheme" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="文物保存状况是否适宜移动" prop="move">
              <el-input v-model="form.move" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="文物是否依法展出" prop="exhibit" class="redStar">
                <el-input v-model="form.exhibit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="价值评估意见" prop="valueAssessment">
              <el-input v-model="form.valueAssessment" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="本次出展文物的一般要求" prop="generalRequirements">
              <el-input v-model="form.generalRequirements" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="拟展场地是否已达到上述要求" prop="aboveRequirements">
              <el-input v-model="form.aboveRequirements" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="本次出展文物的特殊要求" prop="specialRequirements">
              <el-input v-model="form.specialRequirements" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="拟展场地是否满足上述要求" prop="meetRequirements">
              <el-input v-model="form.meetRequirements" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="展品保险估价是否合理" prop="whetherReasonable">
              <el-input v-model="form.whetherReasonable" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row><el-row>
          <el-col :span="24">
            <el-form-item label="展览费用是否合理" prop="reasonableExpense">
              <el-input v-model="form.aboveRequirements" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="本次出展文物的特殊要求" prop="specialRequirements">
              <el-input v-model="form.specialRequirements" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <el-form-item label="展览协议的审核与评估" prop="conclusion" class="redStar">
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
      </div>
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
        radio: '1'
      },
       // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '评估内容',
            num: ''
          },
          {
            title: '专家意见',
            num: ''
          }
        ]
      },
      // 三套表单校验规则
      rules: {
          projectName: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          controlRequest: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          datumPaper: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          explain: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          opinion: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          conclusion:[
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
      },
    }
  },
  methods: {
    // 切换代办已办
    handleSelect(key) {
      // console.log(key, keyPath)
      this.selectMenuItem = key
      this.$router.push({ query: { selectMenuItem: key } })
      // this.$route.query.selectMenuItem = key
    },
    
  }
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


