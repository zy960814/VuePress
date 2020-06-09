<template>
  <div class="content">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row style="margin-top:18px;">
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
        <el-col :span="24">
          <el-form-item label="方案名称" prop="planName" class="redStar">
            <el-input v-model="form.planName" placeholder="请输入方案设计说明及图纸附件标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="applyType==='n_protectPlan'||applyType==='p_protectPlan'">
        <el-col :span="24">
          <el-form-item label="保护区划" prop="reserve" class="redStar">
            <el-input type="textarea" :rows="2" placeholder="描述不超过2000个汉字" v-model="form.reserve"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
        <el-col :span="11">
          <el-form-item label="工程概算" prop="projectEstimate" class="redStar">
            <el-input placeholder="可精确到小数点后四位" v-model="form.projectEstimate">
              <template slot="append">万元</template>
            </el-input>
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
      <el-row
        v-if="applyType==='n_approvalplan'||applyType === 'rescue' ||applyType === 'financing' ||applyType==='n_protectPlan'"
      >
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
import ChargepersonDialog from '@/components/business/ChargepersonDialog'
// import NationalsecurityDialog from '@/components/business/NationalsecurityDialog'
import { checkMoneyWanSave, checkMoneyWanSubmit } from '@/utils/validator'
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
      radio: '1',
      nationalSecurityObject: null,
      showDesign: true,
      form: {
        projectCategory: '',
        projectName: '',
        planName: '',
        reserve: '',
        rangeScale: '',
        projectEstimate: '',
        planType: '1',
        sendOrganization: '',
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

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectCategory: [],
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          planName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          reserve: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          projectEstimate: [
            { validator: checkMoneyWanSave, trigger: 'change' }
          ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          rangeScale: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          projectName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          planName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          reserve: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          planType: [
            { required: true, message: '请选择方案编制方式', trigger: 'change' }
          ],
          projectEstimate: [
            { required: true, message: ' ', trigger: 'change' },
            { validator: checkMoneyWanSubmit, trigger: 'change' }
          ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          rangeScale: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        }
      }
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
    getPlanType(value) {
      // console.log(value)
      if (value == '1') {
        this.showDesign = true
      } else if (value == '2') {
        this.showDesign = false
      }
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
