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
      <el-row style="margin-top:18px;">
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder="建议包含申请人、文保单位和事项名称关键字（原址保护）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="方案名称" prop="planName" class="redStar">
            <el-input v-model="form.planName" placeholder="请输入方案设计说明及图纸附件标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="方案编制方式" prop="planType" class="redStar">
            <el-radio-group v-model="form.planType" @change="getPlanType">
              <el-radio label="1">单位编制</el-radio>
              <el-radio label="2">个人编制</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <design-dialog ref="designDialog" v-if="showDesign" />
      <chargeperson-dialog ref="chargepersonDialog" />
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="设计人/单位" prop="designPerson" class="redStar">
            <el-input v-model="form.designPerson" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="11">
          <el-form-item label="报送单位" prop="sendOrganization">
            <el-input v-model="form.sendOrganization" placeholder="如由省级文物局转报，须填写原报送单位"></el-input>
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
import ChargepersonDialog from '@/components/business/ChargepersonDialog'
// import NationalsecurityDialog from '@/components/business/NationalsecurityDialog'
export default {
  name: 'BasicMessage',
  components: { DesignDialog, ChargepersonDialog },
  props: {
    applyType: {
      type: String
    }
  },
  data() {
    return {
      dialogVisible: false,
      nationalSecurityObject: null,
      showDesign: true,
      form: {
        projectName: '',
        planName: '',
        planType: '1',
        // designPerson: '',
        sendOrganization: '',
        otherIntroduction: ''
      },
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
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          planName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          // designPerson: [
          //   { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          // ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          projectName: [
            { required: true, message: '', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          planName: [
            { required: true, message: '', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          planType: [
            { required: true, message: '请选择方案编制方式', trigger: 'change' }
          ],
          // designPerson: [
          //   { required: true, message: '', trigger: 'change' },
          //   { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          // ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
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
    // confirm() {
    //   this.dialogVisible = false
    //   this.form.nationalSecurityName = this.nationalSecurityObject.name
    //   this.form.province = this.nationalSecurityObject.province
    // },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.nationalSecurityObject = val
    },
    getPlanType(value) {
      // console.log(value)
      if (value == '1') {
        this.showDesign = true
      } else if (value == '2') {
        this.showDesign = false
      }
    },
    // changeSecurity(type) {
    //   if (type === 0) {
    //     this.nationalInput = true
    //     this.provinceDisabled = true
    //   } else {
    //     this.nationalInput = false
    //     this.provinceDisabled = false
    //   }
    //   this.form.nationalSecurityName = ''
    //   this.form.province = ''
    // },
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
