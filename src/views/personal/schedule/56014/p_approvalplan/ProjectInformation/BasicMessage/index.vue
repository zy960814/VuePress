<template>
  <div class="content">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <nationalsecurity-dialog
        ref="nationalsecurityDialog"
        style="margin-top:18px;"
        :noTabs="true"
        :nationalSecurityNameStr="'全国重点文物保护单位名称'"
      />
      <!-- <el-row style="margin-top:18px;">
        <my-dialog
          width="1024px"
          :height="dialogHeight+'px'"
          :visible.sync="dialogVisible"
          class="boxCard_dialog"
        >
          <relic-protect :height="dialogHeight-255+'px'" @nationalSecurity="earnNationalSecurity" />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </span>
        </my-dialog>
        <el-col :span="11">
          <el-form-item label="全国重点文物保护单位名称" prop="nationalSecurityName" class="redStar normal">
            <el-input
              v-model="form.nationalSecurityName"
              style="width:255px;"
              placeholder
              :disabled="nationalInput"
            ></el-input>
            <el-button style="margin-left:10px;" type="primary" @click="dialogVisible=true">选择</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="省份" prop="province" class="redStar">
            <el-select
              v-model="form.province"
              clearable
              placeholder="所属省份"
              :disabled="provinceDisabled"
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
      </el-row>-->
      <el-row>
        <el-col :span="11">
          <el-form-item label="工程类别" prop="projectCategory" class="redStar">
            <el-select v-model="form.projectCategory" clearable placeholder>
              <el-option
                v-for="item in projectCategoryArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder="建议包含申请人、文保单位和事项名称关键字（修缮工程设计方案）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="工程概算" prop="projectEstimate" class="redStar">
            <el-input placeholder="可精确到小数点后四位" v-model="form.projectEstimate">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <design-dialog ref="designDialog" />
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="设计人/单位" prop="designPerson" class="redStar">
            <el-input v-model="form.designPerson" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="报送单位" prop="sendOrganization">
            <el-input v-model="form.sendOrganization" placeholder="如由省级文物局转报，须填写原报送单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="建设范围及规模" prop="rangeScale">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.rangeScale"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="其他说明" prop="otherIntroduction" style="margin-bottom:0px;">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.otherIntroduction"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import DesignDialog from '@/components/business/DesignDialog'
import NationalsecurityDialog from '@/components/business/NationalsecurityDialog'
import { checkMoneyWanSave, checkMoneyWanSubmit } from '@/utils/validator'
export default {
  name: 'BasicMessage',
  components: { NationalsecurityDialog, DesignDialog },
  props: {},
  data() {
    return {
      dialogVisible: false,
      radio: '1',
      nationalSecurityObject: null,
      form: {
        nationalSecurityName: '',
        province: '',
        projectCategory: '',
        projectName: '',
        rangeScale: '',
        projectEstimate: '',
        designPerson: '',
        // sendOrganization: '',
        otherIntroduction: ''
      },
      projectCategoryArr: [
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
      provinceArr: [
        {
          value: '0',
          label: '北京'
        },
        {
          value: '1',
          label: '安徽'
        },
        {
          value: '2',
          label: '江西'
        },
        {
          value: '3',
          label: '江苏'
        },
        {
          value: '4',
          label: '西藏'
        }
      ],

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          nationalSecurityName: [],
          province: [],
          projectCategory: [],
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          projectEstimate: [
            { validator: checkMoneyWanSave, trigger: 'change' }
          ],
          designPerson: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          // sendOrganization: [
          //   { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          // ],
          rangeScale: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          nationalSecurityName: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          province: [{ required: true, message: ' ', trigger: 'change' }],
          projectCategory: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          projectName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          projectEstimate: [
            { required: true, message: ' ', trigger: 'change' },
            { validator: checkMoneyWanSubmit, trigger: 'change' }
          ],
          designPerson: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          // sendOrganization: [
          //   { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          // ],
          rangeScale: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        }
      },
      nationalInput: true,
      provinceDisabled: true
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
      this.form.nationalSecurityName = this.nationalSecurityObject.name
      this.form.province = this.nationalSecurityObject.province
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.nationalSecurityObject = val
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
/deep/.el-dialog__body {
  padding: 0px 20px !important;
}
.radios {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
// /deep/.el-input-group__append {
//   color: gray;
//   background-color: #f5f7fa;
//   border-color: gray;

//   &:hover {
//     background: #f5f7fa;
//     border-color: gray;
//   }
// }
</style>
