<template>
  <div class="content">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
      :show-message="false"
    >
      <el-row style="margin-top: 28px">
        <el-col :span="24">
          <el-form-item label="项目介绍" prop="projectIntroduction">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectIntroduction"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="设计任务" prop="designTask">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.designTask"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保护范围" prop="protectRange">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.protectRange"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProjectSituation',
  components: {},
  props: {},
  data() {
    return {
      form: {
        projectIntroduction: '',
        designTask: '',
        protectRange: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectIntroduction: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          designTask: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          protectRange: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          projectIntroduction: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          designTask: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          protectRange: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getFormData(type) {
      this.$refs['form'].clearValidate()
      this.ruleKey = type
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              resolve({ ...this.form })
            } else {
              reject()
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
