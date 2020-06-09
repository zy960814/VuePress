<template>
  <div class="replayDialog">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <my-dialog
          width="1024px"
          :height="dialogHeight+'px'"
          :visible.sync="dialogVisible"
          class="boxCard_dialog"
        >
          <replay-document
            :height_select="dialogHeight-211+'px'"
            :height_self="dialogHeight-173+'px'"
            @nationalSecurity="earnNationalSecurity"
            ref="replayDocument"
          />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </span>
        </my-dialog>
        <el-col :span="24">
          <el-form-item label="立项批复文件标题" prop="replayDocumentTitle" class="redStar">
            <div style="display:flex;justify-content:space-between;">
              <el-input
                v-model="form.replayDocumentTitle"
                style="flex-grow:2;margin-right:10px;"
                :placeholder="titlePlaceholder"
                :disabled="replayDocumentDisabled"
              ></el-input>
              <el-button type="primary" style="flex-grow:1;" @click="dialogVisible=true">选择</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="立项批复文号" prop="replayDocumentNo" class="redStar">
            <el-input
              v-model="form.replayDocumentNo"
              placeholder
              :disabled="replayDocumentDisabled"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item ref="fileUpload" label="立项批复时间" prop="replayTime" class="redStar">
            <el-date-picker
              v-model="form.replayTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="立项批复文件" prop="approvalResponse" class="redStar">
            <el-link type="primary">{{form.approvalResponse}}</el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MyDialog from '@/components/commons/MyDialog'
import ReplayDocument from '@/components/business/ReplayDocument'
export default {
  name: 'ReplayDialog',
  components: {
    MyDialog,
    ReplayDocument
  },
  data() {
    return {
      dialogVisible: false,
      replayDocumentDisabled: true,
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 携运人信息
      form: {
        replayDocumentTitle: '',
        replayDocumentNo: '',
        approvalResponse: '',
        replayTime: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          replayDocumentTitle: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          replayDocumentNo: [
            { max: 50, message: '长度最大 50 个字符', trigger: 'change' }
          ]
        },
        submit: {
          replayDocumentTitle: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          replayDocumentNo: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 50, message: '长度最大 50 个字符', trigger: 'change' }
          ],
          replayTime: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ]
          // approvalResponse: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ]
        }
      },
      titlePlaceholder: '请选择或填写国家文物局关于本项目立项的批复文件标题'
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  methods: {
    // 选择按钮弹框确认
    confirm() {
      if (this.$refs.replayDocument.$refs.selfDocument) {
        Promise.resolve(
          this.$refs.replayDocument.$refs.selfDocument.getFormData()
        ).then(val => {
          this.dialogVisible = false
          this.form.replayDocumentTitle = val.replayDocumentTitle
          this.form.replayDocumentNo = val.replayDocumentNo
          this.form.replayTime = val.replayTime
          this.form.approvalResponse = val.approvalResponse[0]
        })
      } else if (this.$refs.replayDocument.$refs.selectDocument) {
        this.dialogVisible = false
        this.form.replayDocumentTitle = this.replayDocumentObject.replayDocumentTitle
        this.form.replayDocumentNo = this.replayDocumentObject.replayDocumentNo
        this.form.approvalResponse = this.replayDocumentObject.approvalResponse
        this.form.replayTime = this.replayDocumentObject.replayTime
      }
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.replayDocumentObject = val
    },
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
              this.form.applyDocumentNo = `${this.form.applyDocumentNum_part1}${this.form.applyDocumentNum_part2}${this.form.applyDocumentNum_part3}`
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
/deep/.replayDialog .el-card__body .el-form {
  padding: 0 0px !important;
}
</style>