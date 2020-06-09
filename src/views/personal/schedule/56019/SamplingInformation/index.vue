<template>
  <apply-form-item data="藏品取样信息">
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
          <el-form-item label="价值评估" prop="repairSituation" class="redStar">
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
          <el-form-item label="取样缘由及必要性分析" prop="worthEstimate" class="redStar">
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
          <el-form-item label="具体工艺与步骤" prop="situationDescribe">
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
          <el-form-item label="风险评估与安全措施" prop="damagedStatistics">
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
          <el-form-item label="其他说明" prop="resultAnalysis">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.resultAnalysis"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
export default {
  name: 'SamplingInformation',
  components: { ApplyFormItem },
  props: {},
  data() {
    return {
      form: {
        repairSituation: '',
        worthEstimate: '',
        situationDescribe: '',
        damagedStatistics: '',
        resultAnalysis: ''
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
          ]
        },
        submit: {
          repairSituation: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          worthEstimate: [
            { required: true, message: ' ', trigger: 'change' },
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
