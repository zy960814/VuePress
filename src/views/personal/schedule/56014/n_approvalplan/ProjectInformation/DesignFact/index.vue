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
          <el-form-item label="设计依据" prop="designAccording">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.designAccording"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程性质" prop="projectProperties">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectProperties"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程范围和规模" prop="projectRange">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectRange"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程做法说明及质量要求" prop="projectIntroduction">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectIntroduction"
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
        designAccording: '',
        projectProperties: '',
        projectRange: '',
        projectIntroduction: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          designAccording: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectProperties: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectRange: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectIntroduction: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          designAccording: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectProperties: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectRange: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectIntroduction: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
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
