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
          <nationalsecurity-document
            :height_select="dialogHeight-heightSelectCut+'px'"
            :height_self="dialogHeight-heightSelfCut+'px'"
            @nationalSecurity="earnNationalSecurity"
            ref="nationalsecurityDocument"
            :applyType="applyType"
            v-bind="$attrs"
          />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </span>
        </my-dialog>
        <el-col :span="11">
          <el-form-item
            :label="nationalSecurityNameStr"
            prop="nationalSecurityName"
            class="redStar normal"
          >
            <div style="display:flex;justify-content:space-between;">
              <el-input
                v-model="form.nationalSecurityName"
                :placeholder="titlePlaceholder"
                :disabled="nationalsecurityDocumentDisabled"
                style="flex-grow:2;margin-right:10px;"
              ></el-input>
              <el-button type="primary" @click="dialogVisible=true" style="flex-grow:1;">选择</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="省份" prop="province" class="redStar">
            <el-select
              v-model="form.province"
              clearable
              placeholder="所属省份"
              :disabled="nationalsecurityDocumentDisabled"
            >
              <el-option
                v-for="item in provinceArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row></el-row> -->
      <el-row>
        <el-col :span="11">
          <el-form-item label="文物类型" prop="relicCategory" class="redStar">
            <el-select
              v-model="form.relicCategory"
              clearable
              placeholder
              :disabled="nationalsecurityDocumentDisabled"
            >
              <el-option
                v-for="item in relicCategoryArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="applyType==='56005'">
        <el-col :span="11">
          <el-form-item label="保护单位级别" prop="companyLevel" class="redStar">
            <el-select
              v-model="form.companyLevel"
              clearable
              placeholder
              :disabled="nationalsecurityDocumentDisabled"
            >
              <el-option
                v-for="item in companyLevelArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MyDialog from '@/components/commons/MyDialog'
import NationalsecurityDocument from '@/components/business/NationalsecurityDocument'
export default {
  name: 'DesignDialog',
  components: {
    MyDialog,
    NationalsecurityDocument
  },
  props: {
    nationalSecurityNameStr: {
      type: String,
      default: '文物保护单位名称'
    },
    applyType: {
      type: String
    },
    heightSelectCut: {
      type: Number,
      default: 211
    },
    heightSelfCut: {
      type: Number,
      default: 173
    }
  },
  data() {
    return {
      dialogVisible: false,
      nationalsecurityDocumentDisabled: true,
      // 携运人信息
      form: {
        nationalSecurityName: '',
        province: '',
        relicCategory: '',
        companyLevel: ''
      },
      provinceArr: [
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
      companyLevelArr: [
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
      relicCategoryArr: [
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
          nationalSecurityName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          province: [],
          relicCategory: []
        },
        submit: {
          nationalSecurityName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          province: [{ required: true, message: ' ', trigger: 'change' }],
          relicCategory: [{ required: true, message: ' ', trigger: 'change' }],
          companyLevel: [{ required: true, message: ' ', trigger: 'change' }]
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
      if (this.$refs.nationalsecurityDocument.$refs.selfDocument) {
        Promise.resolve(
          this.$refs.nationalsecurityDocument.$refs.selfDocument.getFormData()
        ).then(val => {
          this.dialogVisible = false
          this.showSelect = false
          this.form.nationalSecurityName = val.nationalSecurityName
          this.form.province = val.province
          this.form.relicCategory = val.relicCategory
          this.form.companyLevel = val.companyLevel
        })
      } else if (this.$refs.nationalsecurityDocument.$refs.selectDocument) {
        this.dialogVisible = false
        this.form.nationalSecurityName = this.nationalsecurityDocumentObject.nationalSecurityName
        this.form.province = this.nationalsecurityDocumentObject.province
        this.form.relicCategory = this.nationalsecurityDocumentObject.relicCategory
        this.form.companyLevel = this.nationalsecurityDocumentObject.companyLevel
      }
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.nationalsecurityDocumentObject = val
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