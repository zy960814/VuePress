<template>
  <apply-form-item data="其他说明">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
      validate-on-rule-blur
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            style="margin-bottom:0px;"
            label="其他说明"
            prop="otherInstroduction"
            class="redStar normal"
          >
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.otherInstroduction"
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
  name: 'ApplyMaterial',
  components: {
    ApplyFormItem
  },

  data() {
    return {
      // 携运人信息
      form: {
        otherInstroduction: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          otherInstroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          otherInstroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  mounted() {},
  computed: {},

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
.cr-info {
  .row_1 {
    margin-bottom: 6px;
  }
}
</style>
