<template>
  <apply-form-item data="实施结果">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
      :show-message="false"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="主要收获" prop="mainHarvest">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.mainHarvest"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="遗址保护" prop="remainProtect">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.remainProtect"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="考古资料整理" prop="archaeologyMaterial">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.archaeologyMaterial"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="标本保管" prop="specimenSafekeep">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.specimenSafekeep"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="报告出版计划" prop="reportPublishPlan" style="margin-bottom:0px;">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.reportPublishPlan"
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
        mainHarvest: '',
        remainProtect: '',
        archaeologyMaterial: '',
        specimenSafekeep: '',
        reportPublishPlan: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          mainHarvest: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          remainProtect: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          archaeologyMaterial: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          specimenSafekeep: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          reportPublishPlan: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          mainHarvest: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          remainProtect: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          archaeologyMaterial: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          specimenSafekeep: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          reportPublishPlan: [
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
