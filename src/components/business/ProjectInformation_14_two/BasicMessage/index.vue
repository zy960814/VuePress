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
        <el-col :span="11">
          <el-form-item label="工程类别" prop="projectCategory" class="redStar">
            <el-select v-model="form.projectCategory" clearable placeholder @change="selConstitute">
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
          <el-form-item label="工程主要构成" prop="projectConstituteCheckList" class="redStar">
            <el-checkbox-group v-model="form.projectConstituteCheckList" @change="selOther">
              <el-checkbox :label="item" v-for="(item,index) in projectConstituteArr" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showOtherInput">
        <el-col :span="24">
          <el-form-item label prop="otherConstitute" class="redStar">
            <el-input v-model="form.otherConstitute" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder="建议包含申请人、文保单位和事项名称关键字（抢救性修缮工程设计方案）"></el-input>
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
        <el-col :span="24">
          <el-form-item label="工程保护对象及范围" prop="protectScale">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.protectScale"
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
        <el-col :span="8">
          <el-form-item label="经费来源" prop="fundsSource_part1" class="redStar">
            <el-select v-model="form.fundsSource_part1" clearable placeholder @change="selFunds">
              <el-option
                v-for="item in fundsSourceArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16" v-if="fundsOther">
          <el-form-item label prop="fundsSource_part2" class="redStar">
            <el-input v-model="form.fundsSource_part2" placeholder="如果选择其他，请填写具体说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="方案编制时间" prop="palnTime" class="redStar">
            <el-date-picker
              v-model="form.palnTime"
              align="right"
              type="date"
              placeholder
              :picker-options="pickerOptions"
            ></el-date-picker>
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
      <el-row v-if="applyType==='n_reportCRB'">
        <el-col :span="11">
          <el-form-item label="申报主体" prop="sendOrganization">
            <el-input v-model="form.sendOrganization" placeholder="如由省级文物局转报，须填写原申报主体"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目实施安排" prop="projectArrange">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectArrange"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目实施保障条件" prop="projectEnsure">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectEnsure"
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
      radio: '1',
      nationalSecurityObject: null,
      fundsOther: false,
      showDesign: true,
      form: {
        projectCategory: '安防',
        projectConstituteCheckList: [],
        otherConstitute: '',
        projectName: '',
        planName: '',
        protectScale: '',
        projectEstimate: '',
        fundsSource: '',
        fundsSource_part1: '',
        fundsSource_part2: '',
        palnTime: '',
        planType: '1',
        sendOrganization: '',
        projectArrange: '',
        projectEnsure: '',
        otherIntroduction: ''
      },
      provinceArr_f: [
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
      cityArr: [
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
      areaArr: [
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
      projectCategoryArr: [
        {
          value: '1',
          label: '安防'
        },
        {
          value: '2',
          label: '消防'
        },
        {
          value: '3',
          label: '防雷'
        }
      ],
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
      fundsSourceArr: [
        {
          value: '1',
          label: '申请国拨'
        },
        {
          value: '2',
          label: '建设单位承担'
        },
        {
          value: '3',
          label: '自筹'
        },
        {
          value: '4',
          label: '其他'
        }
      ],
      projectConstituteArr: [
        '入侵报警系统',
        '视频监控系统',
        '出入口控制系统',
        '电子巡更与通讯系统',
        '防爆安全检查系统',
        '实体防护和人员防护',
        '其他'
      ],
      // 表单校验规则的选用方案
      ruleKey: 'default',
      showOtherInput: false,
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          projectCategory: [],
          projectConstituteCheckList: [],
          otherConstitute: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          planName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          protectScale: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          projectEstimate: [
            { validator: checkMoneyWanSave, trigger: 'change' }
          ],
          fundsSource_part1: [],
          fundsSource_part2: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          palnTime: [],
          planType: [],
          sendOrganization: [
            { max: 200, message: '长度最大 200个字符', trigger: 'blur' }
          ],
          projectArrange: [
            { max: 2000, message: '长度最大 2000个字符', trigger: 'blur' }
          ],
          projectEnsure: [
            { max: 2000, message: '长度最大 2000个字符', trigger: 'blur' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000个字符', trigger: 'blur' }
          ]
        },
        submit: {
          projectCategory: [
            { required: true, message: '请选择工程类别', trigger: 'change' }
          ],
          projectConstituteCheckList: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个工程主要构成',
              trigger: 'change'
            }
          ],
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          otherConstitute: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          planName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          protectScale: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          projectEstimate: [
            { required: true, message: ' ', trigger: 'change' },
            { validator: checkMoneyWanSubmit, trigger: 'change' }
          ],
          fundsSource_part1: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          fundsSource_part2: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          palnTime: [{ required: true, message: ' ', trigger: 'change' }],
          planType: [{ required: true, message: ' ', trigger: 'change' }],
          sendOrganization: [
            { max: 200, message: '长度最大 200个字符', trigger: 'blur' }
          ],
          projectArrange: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000个字符', trigger: 'blur' }
          ],
          projectEnsure: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000个字符', trigger: 'blur' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000个字符', trigger: 'blur' }
          ]
        }
      },
      nationalInput: true
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
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
      this.form.nationalSecurityName = this.nationalSecurityObject.name
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.nationalSecurityObject = val
    },
    selConstitute(val) {
      console.log(val)
      if (val === '安防') {
        this.form.projectConstituteCheckList = []
        this.projectConstituteArr = [
          '入侵报警系统',
          '视频监控系统',
          '出入口控制系统',
          '电子巡更与通讯系统',
          '防爆安全检查系统',
          '实体防护和人员防护',
          '其他'
        ]
      } else if (val === '消防') {
        this.form.projectConstituteCheckList = []
        this.projectConstituteArr = [
          '火灾报警系统',
          '给水系统',
          '消火栓系统',
          '自动灭火系统',
          '电气火灾防控系统',
          '通讯广播和应急疏散系统',
          '灭火设施设备',
          '其他'
        ]
      } else if (val === '防雷') {
        this.form.projectConstituteCheckList = []
        this.projectConstituteArr = [
          '接闪器',
          '引下线',
          '接地装置和其他辅助设备'
        ]
      }
    },
    selFunds(val) {
      if (val === '4') {
        this.fundsOther = true
      } else {
        this.fundsOther = false
      }
    },
    selOther(val) {
      console.log(val)
      if (val.indexOf('其他') > -1) {
        this.showOtherInput = true
      } else {
        this.showOtherInput = false
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
