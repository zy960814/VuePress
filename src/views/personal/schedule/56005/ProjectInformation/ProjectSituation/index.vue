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
          <el-form-item label="工程概况说明" prop="projectSituationIntroduction">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectSituationIntroduction"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="建设的必要性" prop="buildNecessary">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.buildNecessary"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="编制依据" prop="compilationBasis">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.compilationBasis"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="线路选择" prop="lineChose">
            <el-input type="textarea" :rows="3" placeholder="描述不超过2000个汉字" v-model="form.lineChose"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文物保护技术措施" prop="technologyMeasure">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.technologyMeasure"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文物保护应急措施" prop="emergencyMeasure">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.emergencyMeasure"
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
        projectSituationIntroduction: '',
        buildNecessary: '',
        compilationBasis: '',
        lineChose: '',
        technologyMeasure: '',
        emergencyMeasure: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectSituationIntroduction: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          buildNecessary: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          compilationBasis: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          lineChose: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          technologyMeasure: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          emergencyMeasure: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ]
        },
        submit: {
          projectSituationIntroduction: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          buildNecessary: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          compilationBasis: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          lineChose: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          technologyMeasure: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
          ],
          emergencyMeasure: [
            { max: 2000, message: '描述不超过2000个汉字', trigger: 'change' }
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
