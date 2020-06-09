<template>
  <div class="content">
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
            <el-input v-model="form.projectName" placeholder="建议包含申请人、文物或标本名称和事项名称关键字（境外鉴定）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="申请目的及缘由" prop="applyPurposeResult" class="redStar">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.applyPurposeResult"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="境外检测机构名称" prop="jwjcjgmc" class="redStar">
            <el-input v-model="form.jwjcjgmc" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="境外检测机构所在地" prop="jcjglocation_part1" class="redStar">
            <el-select v-model="form.jcjglocation_part1" clearable placeholder="请选择国家">
              <el-option
                v-for="item in nationalArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label prop="jcjglocation_part2" class="redStar">
            <el-select v-model="form.jcjglocation_part2" clearable placeholder="请选择地区">
              <el-option
                v-for="item in areaArr"
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
          <el-form-item label prop="detailAddress" class="redStar">
            <el-input v-model="form.detailAddress" placeholder="请填写境外检测机构的详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="境外检测机构概况" prop="jwjcjggk" class="redStar">
            <el-input type="textarea" :rows="2" placeholder="描述不超过2000个汉字" v-model="form.jwjcjggk"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="经费来源" prop="fundsSource_part1" class="redStar">
            <el-select
              v-model="form.fundsSource_part1"
              @change="changeFundsSource"
              clearable
              placeholder="请选择经费来源"
            >
              <el-option
                v-for="item in fundsSourceArr"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label prop="fundsSource_part2" class="redStar" v-if="showfundsSourceInput">
            <el-input v-model="form.fundsSource_part2" placeholder="如果选择其他，请填写具体说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="经费金额" prop="funds" class="redStar">
            <el-input placeholder="可精确到小数点后四位" v-model="form.funds">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="编制单位" prop="bzdw" class="redStar">
            <el-input v-model="form.bzdw" style="width:255px;" placeholder></el-input>
            <el-button style="margin-left:10px;" type="primary">选择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="报送单位" prop="bsdw">
            <el-input v-model="form.bsdw" placeholder="如由省级文物局转报，须填写原报送单位"></el-input>
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
import { checkMoneyWanSave, checkMoneyWanSubmit } from '@/utils/validator'
export default {
  name: 'BasicMessage',
  props: {},
  data() {
    return {
      dialogVisible: false,
      nationalSecurityObject: null,
      showfundsSourceInput: false,
      fundsSourceArr: [
        {
          value: '0',
          label: '国家文物局'
        },
        {
          value: '1',
          label: '省级文物局'
        },
        {
          value: '2',
          label: '其他'
        }
      ],
      nationalArr: [
        {
          value: '0',
          label: '美国'
        },
        {
          value: '1',
          label: '马其顿'
        },
        {
          value: '2',
          label: '荷兰'
        },
        {
          value: '3',
          label: '挪威'
        },
        {
          value: '4',
          label: '叙利亚'
        }
      ],
      areaArr: [
        {
          value: '0',
          label: '纽约'
        },
        {
          value: '1',
          label: '斯科普里'
        },
        {
          value: '2',
          label: '海牙'
        },
        {
          value: '3',
          label: '希尔克奈尔'
        },
        {
          value: '4',
          label: '大马士革'
        }
      ],
      form: {
        projectName: '',
        applyPurposeResult: '',
        jwjcjgmc: '',
        jcjglocation: '',
        jcjglocation_part1: '',
        jcjglocation_part2: '',
        detailAddress: '',
        jwjcjggk: '',
        fundsSource: '',
        fundsSource_part1: '',
        fundsSource_part2: '',
        funds: '',
        bzdw: '',
        bsdw: '',
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
          applyPurposeResult: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          jwjcjgmc: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          jcjglocation_part1: [],
          jcjglocation_part2: [],
          detailAddress: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          jwjcjggk: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          fundsSource_part1: [],
          fundsSource_part2: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          funds: [{ validator: checkMoneyWanSave, trigger: 'change' }],
          bzdw: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          bsdw: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          projectName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          applyPurposeResult: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          jwjcjgmc: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          jcjglocation_part1: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          jcjglocation_part2: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          detailAddress: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          jwjcjggk: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          fundsSource_part1: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          fundsSource_part2: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          funds: [{ validator: checkMoneyWanSubmit, trigger: 'change' }],
          bzdw: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          bsdw: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
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
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
      this.form.nationalSecurityName = this.nationalSecurityObject.name
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.nationalSecurityObject = val
    },
    // 经费来源选择“其他”的时候出现input框
    changeFundsSource(val) {
      console.log(val)

      if (val.label === '其他') {
        this.showfundsSourceInput = true
      } else {
        this.showfundsSourceInput = false
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
