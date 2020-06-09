<template>
  <div class="box hxl_item">
    <apply-form-item :data="name">
      <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="132px"
      :show-message="false">
      <div class="boxtitle">
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否参与评审" prop="instName" class="redStar">
              <el-radio v-model="form.radio" label="1">参与评审</el-radio>
              <el-radio v-model="form.radio" label="2">拒绝评审</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-if="form.radio==='1'">
          <slot name="reviewContent"></slot>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="24">
            <el-form-item label="拒绝评审" prop="projectName" class="redStar">
              <el-input v-model="form.projectName" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
		</el-form>
    </apply-form-item>
  </div>
</template>
<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
export default {
  components: { ApplyFormItem },
  props:{
    name:{
      type:String,
      default:'1'
    },
  },
  watch: {
    name:(value)=>{
      if(value){
        this.name=value;
      }
    }
  },
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


