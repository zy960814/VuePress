<template>
  <div class="content">
    <el-form
      ref="form"
      :rules="rules['submit']"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="年份" prop="year" class="redStar">
            <el-input v-model="form.year"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="工程对象" prop="projectSubject" class="redStar">
            <el-input v-model="form.projectSubject"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="维修或考古发掘内容" prop="relicExplore" class="redStar">
            <el-input v-model="form.relicExplore"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="经费补助(万元)" prop="fundsSubsidy" class="redStar">
            <el-input placeholder="请输入工程经费总结算" v-model="form.fundsSubsidy">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import API_PREFIX from '@/api/config'
import {} from '@/utils/validator'
export default {
  name: 'DetailInformation',
  components: {},
  props: {
    projectForm: {
      type: Object
    },
    applyType: {
      type: String
    }
  },
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
      dialogVisible: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        year: '',
        projectSubject: '',
        relicExplore: '',
        fundsSubsidy: ''
      },

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        submit: {
          year: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          projectSubject: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicExplore: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          fundsSubsidy: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  created() {
    this.form = this.projectForm
  },
  watch: {
    projectForm: function(val) {
      this.form = val
    }
  },
  mounted() {},
  computed: {
    height_self() {
      return this.$store.getters.screenHeight > 1200
        ? `1067 px`
        : `${this.$store.getters.screenHeight - 133}px`
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  methods: {
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getFormData() {
      this.$refs['form'].clearValidate()
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
.table {
  vertical-align: middle;
  margin-bottom: 5px;
  .tableTitle {
    float: left;
    color: $--color-primary;
    font-size: 14px;
    font-weight: 700;
  }
  .tableButton {
    float: right;
  }
}
</style>
