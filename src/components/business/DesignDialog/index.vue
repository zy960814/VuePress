<template>
  <div class="ReplayDialog">
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
          <design-document
            :height_select="dialogHeight-211+'px'"
            :height_self="dialogHeight-173+'px'"
            @nationalSecurity="earnNationalSecurity"
            ref="designDocument"
          />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </span>
        </my-dialog>
        <el-col :span="24">
          <el-form-item label="方案编制单位" prop="designPerson" class="redStar">
            <div style="display:flex;justify-content:space-between;">
              <el-input
                v-model="form.designPerson"
                style="flex-grow:2;margin-right:10px;"
                :placeholder="titlePlaceholder"
                :disabled="designDocumentDisabled"
              ></el-input>
              <el-button type="primary" style="flex-grow:1;" @click="dialogVisible=true">选择</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="showSelect">
        <el-row>
          <el-col :span="11">
            <el-form-item label="资质类型" prop="qualityType">
              <el-select
                v-model="form.qualityType"
                clearable
                placeholder
                :disabled="designDocumentDisabled"
              >
                <el-option
                  v-for="item in qualityTypeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="级别" prop="level">
              <el-select
                v-model="form.level"
                clearable
                placeholder
                :disabled="designDocumentDisabled"
              >
                <el-option
                  v-for="item in levelArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务范围" prop="businessRange">
              <el-select
                v-model="form.businessRange"
                clearable
                placeholder
                :disabled="designDocumentDisabled"
              >
                <el-option
                  v-for="item in businessRangeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script>
import MyDialog from '@/components/commons/MyDialog'
import DesignDocument from '@/components/business/DesignDocument'
export default {
  name: 'DesignDialog',
  components: {
    MyDialog,
    DesignDocument
  },
  data() {
    return {
      dialogVisible: false,
      designDocumentDisabled: true,
      showSelect: true,
      // 携运人信息
      form: {
        designPerson: '',
        qualityType: '',
        level: '',
        businessRange: ''
      },
      qualityTypeArr: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      levelArr: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      businessRangeArr: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          designPerson: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
        },
        submit: {
          designPerson: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
        }
      },
      titlePlaceholder: ''
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
      // console.log(this.$refs.designDocument.$refs.selfDocument)
      if (this.$refs.designDocument.$refs.selfDocument) {
        Promise.resolve(
          this.$refs.designDocument.$refs.selfDocument.getFormData()
        ).then(val => {
          this.dialogVisible = false
          this.showSelect = false
          this.form.designPerson = val.designPerson
        })
      } else if (this.$refs.designDocument.$refs.selectDocument) {
        this.dialogVisible = false
        this.showSelect = true
        this.form.designPerson = this.designDocumentObject.designPerson
        this.form.qualityType = this.designDocumentObject.qualityType
        this.form.level = this.designDocumentObject.level
        this.form.businessRange = this.designDocumentObject.businessRange
      }
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.designDocumentObject = val
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
/deep/.ReplayDialog .el-card__body .el-form {
  padding: 0 0px !important;
}
</style>