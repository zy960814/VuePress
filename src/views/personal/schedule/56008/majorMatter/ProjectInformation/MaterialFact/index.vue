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
          <el-form-item label="大记事" prop="chronicle">
            <el-input type="textarea" :rows="3" placeholder="描述不超过2000个汉字" v-model="form.chronicle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="原保护范围及建设控制地带情况" prop="protectRange" class="normal">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.protectRange"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="考古调查简报" prop="archaeologyInvestigate">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.archaeologyInvestigate"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="相关研究文献目录" prop="researchDocument">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.researchDocument"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ExplainFact',
  components: {},
  props: {},
  data() {
    return {
      form: {
        chronicle: '',
        protectRange: '',
        archaeologyInvestigate: '',
        researchDocument: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          chronicle: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protectRange: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          archaeologyInvestigate: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          researchDocument: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          chronicle: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protectRange: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          archaeologyInvestigate: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          researchDocument: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
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
