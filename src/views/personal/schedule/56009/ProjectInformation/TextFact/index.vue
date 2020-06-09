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
          <el-form-item label="总则" prop="generalRules">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.generalRules"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保护对象" prop="protestObject">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.protestObject"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="价值评估" prop="worthAsscess">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.worthAsscess"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保护规划原则与目标" prop="principleTarget">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.principleTarget"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="考古与科学研究规划" prop="researchPlainning">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.researchPlainning"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="环境整治规则" prop="environmentRenovate">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.environmentRenovate"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="展示规则" prop="showRules">
            <el-input type="textarea" :rows="3" placeholder="描述不超过2000个汉字" v-model="form.showRules"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="基础设施规划" prop="infrastructurePlanning">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.infrastructurePlanning"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="管理规划" prop="managerPlanning">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.managerPlanning"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="分期规划" prop="periodizationPlanning">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.periodizationPlanning"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保护实施经费" prop="protectFunds">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.protectFunds"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附则" prop="appendix">
            <el-input type="textarea" :rows="3" placeholder="描述不超过2000个汉字" v-model="form.appendix"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TextFact',
  components: {},
  props: {},
  data() {
    return {
      form: {
        generalRules: '',
        protestObject: '',
        worthAsscess: '',
        principleTarget: '',
        researchPlainning: '',
        environmentRenovate: '',
        showRules: '',
        infrastructurePlanning: '',
        managerPlanning: '',
        periodizationPlanning: '',
        protectFunds: '',
        appendix: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          generalRules: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protestObject: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          worthAsscess: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          principleTarget: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          researchPlainning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          environmentRenovate: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          showRules: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          infrastructurePlanning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          managerPlanning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          periodizationPlanning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protectFunds: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          appendix: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          generalRules: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protestObject: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          worthAsscess: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          principleTarget: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          researchPlainning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          environmentRenovate: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          showRules: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          infrastructurePlanning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          managerPlanning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          periodizationPlanning: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          protectFunds: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          appendix: [
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
