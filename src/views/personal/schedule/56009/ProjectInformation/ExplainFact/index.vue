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
          <el-form-item label="保护区划管理规定" prop="reserveRules">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.reserveRules"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="遗址本体保护规划" prop="remainderPlan">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.remainderPlan"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="考古与科学研究规划" prop="archaeologyWithResearch">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.archaeologyWithResearch"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 28px">
        <el-col :span="24">
          <el-form-item label="展示利用规划" prop="showUseRulse">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.showUseRulse"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="安全防灾规划" prop="securityPlan">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.securityPlan"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="遗址保护与地方社会发展协调规划"
            prop="remainderProtectWithdevelopment"
            class="normal"
          >
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.remainderProtectWithdevelopment"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保护管理规划" prop="protectPlan">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.protectPlan"
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
        reserveRules: '',
        remainderPlan: '',
        archaeologyWithResearch: '',
        showUseRulse: '',
        securityPlan: '',
        remainderProtectWithdevelopment: '',
        protectPlan: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          reserveRules: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          remainderPlan: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          archaeologyWithResearch: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          showUseRulse: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          securityPlan: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          remainderProtectWithdevelopment: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protectPlan: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          reserveRules: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          remainderPlan: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          archaeologyWithResearch: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          showUseRulse: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          securityPlan: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          remainderProtectWithdevelopment: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protectPlan: [
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
