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
          <el-form-item label="历次维修状况" prop="repairSituation">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.repairSituation"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文物价值评估" prop="worthEstimate">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.worthEstimate"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="现状描述" prop="situationDescribe">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.situationDescribe"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="残损统计" prop="damagedStatistics">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.damagedStatistics"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="主要病害及成因分析" prop="resultAnalysis">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.resultAnalysis"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="地理环境与地形外貌" prop="geographicalEnvironment">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.geographicalEnvironment"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="安全评估结论" prop="asscessConclusion">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.asscessConclusion"
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
        repairSituation: '',
        worthEstimate: '',
        situationDescribe: '',
        damagedStatistics: '',
        resultAnalysis: '',
        geographicalEnvironment: '',
        asscessConclusion: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          repairSituation: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          worthEstimate: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          situationDescribe: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          damagedStatistics: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          resultAnalysis: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          geographicalEnvironment: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          asscessConclusion: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          repairSituation: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          worthEstimate: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          situationDescribe: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          damagedStatistics: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          resultAnalysis: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          geographicalEnvironment: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          asscessConclusion: [
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
