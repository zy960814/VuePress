<template>
  <apply-form-item data="申请人信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="考古发掘项目负责人" prop="projectCharge" class="redStar">
            <el-input v-model="form.projectCharge" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系方式" prop="telNo" class="redStar" style="margin-bottom:0px;">
            <el-input v-model="form.telNo" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import { checkMobileSave, checkMobileSubmit } from '@/utils/validator'
export default {
  name: 'ApplicantInformation',
  components: { ApplyFormItem },
  props: {},
  data() {
    return {
      form: {
        projectCharge: '',
        telNo: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectCharge: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          telNo: [{ validator: checkMobileSave, trigger: 'change' }]
        },
        submit: {
          projectCharge: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          telNo: [
            { validator: checkMobileSubmit, trigger: 'change' },
            { required: true, message: ' ', trigger: 'change' }
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
/deep/.el-dialog__body {
  padding: 0px 20px !important;
}
.radios {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
