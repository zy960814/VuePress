<template>
  <apply-form-item data="考古发掘项目基本信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="存档编号" prop="fileNo" class="redStar">
            <el-input v-model="form.fileNo" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="申请时间" prop="applyTime" class="redStar">
            <el-date-picker
              v-model="form.applyTime"
              align="right"
              type="date"
              placeholder="申请时间"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="主申请单位" prop="applyOrganization" class="redStar">
            <el-input v-model="form.applyOrganization" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="法定代表人" prop="legalRepresentative" class="redStar">
            <el-input v-model="form.legalRepresentative" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="单位地址" prop="companyAddress" class="redStar">
            <el-input v-model="form.companyAddress" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="配合申请单位"
            prop="applyCompany"
            class="redStar"
            style="margin-bottom:0px;"
          >
            <el-input v-model="form.applyCompany" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import {} from '@/utils/validator'
export default {
  name: 'ExploreInformation',
  components: {
    ApplyFormItem
  },
  props: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      form: {
        projectName: '',
        fileNo: '',
        applyTime: '',
        applyOrganization: '',
        legalRepresentative: '',
        companyAddress: '',
        applyCompany: ''
      },

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          fileNo: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          applyTime: [
            {
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          applyOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          legalRepresentative: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          companyAddress: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          applyCompany: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          fileNo: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          applyTime: [
            { required: true, message: ' ', trigger: 'blur' },
            {
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          applyOrganization: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          legalRepresentative: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          companyAddress: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          applyCompany: [
            { required: true, message: ' ', trigger: 'blur' },
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
/deep/.el-dialog__body {
  padding: 0px 20px !important;
}
.radios {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
