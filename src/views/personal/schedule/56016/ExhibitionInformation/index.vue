<template>
  <apply-form-item data="文物出境展览信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="展览名称" prop="exhibitionName" class="redStar">
            <el-input v-model="form.exhibitionName" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="展览国别（地区）" prop="exhibitionCountry" class="redStar">
            <el-input v-model="form.exhibitionCountry" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="展览时间" prop="exhibitionTime" class="redStar">
            <div style="display:flex;">
              <el-date-picker
                v-model="form.exhibitionTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="flex:1;"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="总展览件数" prop="exhibitionNum" class="redStar">
            <el-input v-model="form.exhibitionNum" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label prop class="redStar"></el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="一级品件数" prop="fristNum" class="redStar">
            <el-input v-model="form.fristNum" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="境外合作机构" prop="abroadCooperation" class="redStar">
            <el-input v-model="form.abroadCooperation" placeholder="请填写申请人的详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import API_PREFIX from '@/api/config'
import { checkPositiveInt } from '@/utils/validator'
export default {
  name: 'ExhibitionInformation',
  components: {
    ApplyFormItem
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 携运人信息
      form: {
        exhibitionName: '',
        exhibitionCountry: '',
        exhibitionTime: '',
        exhibitionNum: '',
        fristNum: '',
        abroadCooperation: ''
      },

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          exhibitionName: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          exhibitionCountry: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          exhibitionTime: [
            {
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          exhibitionNum: [{ validator: checkPositiveInt, trigger: 'change' }],
          fristNum: [{ validator: checkPositiveInt, trigger: 'change' }],
          abroadCooperation: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          exhibitionName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          exhibitionCountry: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          exhibitionTime: [
            {
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          exhibitionNum: [
            { required: true, message: ' ', trigger: 'change' },
            { validator: checkPositiveInt, trigger: 'change' }
          ],
          fristNum: [
            { required: true, message: ' ', trigger: 'change' },
            { validator: checkPositiveInt, trigger: 'change' }
          ],
          abroadCooperation: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  mounted() {},
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
.labelZero {
  /deep/.el-form-item__content {
    margin-left: 0px !important;
  }
}
.el-divider--horizontal {
  margin: 18px 0;
}
.inpuWidthBox {
  width: 100%;
}
.inpuWidth {
  width: calc(100% - 40px) !important;
}
</style>
