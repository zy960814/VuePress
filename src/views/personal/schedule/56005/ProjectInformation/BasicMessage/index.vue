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
      <!-- <div style="margin-bottom: 10px;margin-top:10px;position:relative;height:20px;">
        <div class="radios">
          <el-radio v-model="radio" label="1" @change="changeSecurity(0)">全国重点文物保护单位</el-radio>
          <el-radio v-model="radio" label="2" @change="changeSecurity(1)">省级重点文物保护单位</el-radio>
        </div>
      </div>
      <el-row>
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
          <el-form-item label="名称" prop="nationalSecurityName" class="redStar">
            <el-input
              v-model="form.nationalSecurityName"
              style="width:255px;"
              placeholder
              :disabled="nationalInput"
            ></el-input>
            <el-button
              style="margin-left:10px;"
              type="primary"
              v-if="radio==='1'"
              @click="dialogVisible=true"
            >选择</el-button>
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
      <nationalsecurity-dialog ref="nationalsecurityDialog" style="margin-top:18px;" />
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder="建议包含申请人、文保单位和事项名称关键字（原址保护措施）"></el-input>
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
      <el-row>
        <el-col :span="11">
          <el-form-item label="申报主体" prop="sendOrganization">
            <el-input v-model="form.sendOrganization" placeholder="如由省级文物局转报，须填写原申报主体"></el-input>
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
export default {
  name: 'BasicMessage',
  components: { DesignDialog, NationalsecurityDialog },
  props: {},
  data() {
    return {
      // dialogVisible: false,
      // radio: '1',
      // nationalSecurityObject: null,
      form: {
        // nationalSecurityName: '',
        // province: '',
        projectName: '',
        designPerson: '',
        sendOrganization: '',
        otherIntroduction: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          designPerson: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
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
          designPerson: [
            { required: true, message: '', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        }
      }
      // nationalInput: true
      // provinceDisabled: true
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
    // // 选择按钮弹框确认
    // confirm() {
    //   this.dialogVisible = false
    //   this.form.nationalSecurityName = this.nationalSecurityObject.name
    //   this.form.province = this.nationalSecurityObject.province
    // },
    // // 选择获取国保单位名称
    // earnNationalSecurity(val) {
    //   this.nationalSecurityObject = val
    // },
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
