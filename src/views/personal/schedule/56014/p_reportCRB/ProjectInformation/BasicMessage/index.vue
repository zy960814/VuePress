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
        style="margin-top:10px;"
        :nationalSecurityNameStr="'全国重点文物保护单位名称'"
      />
      <!-- <div style="margin-bottom: 10px;position:relative;height:20px;">
        <div class="radios">
          <el-radio
            v-model="radio"
            label="1"
            @change="()=>{nationalInput = true,form.nationalSecurityName=''}"
          >全国重点文物保护单位</el-radio>
          <el-radio
            v-model="radio"
            label="2"
            @change="()=>{nationalInput = false,form.nationalSecurityName=''}"
          >其他</el-radio>
        </div>
      </div>-->
      <!-- <el-row>
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
          <el-form-item label="全国重点文物保护单位" prop="nationalSecurityName" class="redStar">
            <el-input
              v-model="form.nationalSecurityName"
              style="width:255px;"
              placeholder="请选择全国重点文物保护单位"
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
            <el-select v-model="form.province" clearable placeholder="所属省份">
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
        <el-col :span="24">
          <el-form-item label="管理使用单位" prop="manageUseCompany" class="redStar">
            <el-input v-model="form.manageUseCompany" placeholder="请填写全国重点文物保护单位的管理使用单位名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="单位所在地" prop="companyLocation_part1" class="redStar">
            <el-select v-model="form.companyLocation_part1" clearable placeholder="请选择省份">
              <el-option
                v-for="item in provinceArr_f"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label prop="companyLocation_part2" class="redStar">
            <el-select v-model="form.companyLocation_part2" clearable placeholder="请选择地市">
              <el-option
                v-for="item in cityArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label prop="companyLocation_part3" class="redStar">
            <el-select v-model="form.companyLocation_part3" clearable placeholder="请选择区县">
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
          <el-form-item label="详细地址" prop="detailAddress" class="redStar">
            <el-input v-model="form.detailAddress" placeholder="请填写管理使用单位的详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="上级主管部门" prop="ministry" class="redStar">
            <el-input v-model="form.ministry" placeholder="请填写管理使用单位的上级主管部门，没有写“无”"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder="请填写项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工程类别" prop="projectCategory" class="redStar">
            <el-select v-model="form.projectCategory" clearable placeholder="请选择工程类别">
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
            <el-checkbox-group v-model="form.projectConstituteCheckList">
              <el-checkbox label="火灾报警系统"></el-checkbox>
              <el-checkbox label="给水系统"></el-checkbox>
              <el-checkbox label="消火栓系统"></el-checkbox>
              <el-checkbox label="自动灭火系统"></el-checkbox>
              <el-checkbox label="电气火灾防控系统"></el-checkbox>
              <el-checkbox label="通讯广播和应急疏散系统"></el-checkbox>
              <el-checkbox label="灭火设施设备"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程保护对象及范围" prop="protectScale">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写工程保护对象及范围，不超过1000个汉字"
              v-model="form.protectScale"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工程概算" prop="projectEstimate" class="redStar">
            <el-input placeholder="数字精确到小数点后2位，单位(万元)" v-model="form.projectEstimate">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="经费来源" prop="fundsSource_part1" class="redStar">
            <el-select v-model="form.fundsSource_part1" clearable placeholder="请选择经费来源">
              <el-option
                v-for="item in fundsSourceArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label prop="fundsSource_part2" class="redStar">
            <el-input v-model="form.fundsSource_part2" placeholder="如果选择其他，请填写具体说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目实施安排" prop="projectArrange">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写该项目的实施安排，不超过1000个汉字"
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
              placeholder="请填写该项目的实施保障条件，不超过1000个汉字"
              v-model="form.projectEnsure"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <design-dialog ref="designDialog" />
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="设计人" prop="designPerson" class="redStar">
            <el-input v-model="form.designPerson" placeholder="请选择或填写设计单位名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="申报主体" prop="sendOrganization">
            <el-input v-model="form.sendOrganization" placeholder="请填写申报主体名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="其他说明" prop="otherIntroduction" style="margin-bottom:0px;">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写该项目的其他说明，不超过1000个汉字"
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
        manageUseCompany: '',
        companyLocation: '',
        companyLocation_part1: '',
        companyLocation_part2: '',
        companyLocation_part3: '',
        detailAddress: '',
        ministry: '',
        projectName: '',
        projectCategory: '',
        projectConstituteCheckList: [],
        protectScale: '',
        projectEstimate: '',
        fundsSource: '',
        fundsSource_part1: '',
        fundsSource_part2: '',
        projectArrange: '',
        projectEnsure: '',
        designPerson: '',
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
            { required: true, message: ' ', trigger: 'change' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'change' }
          ],
          province: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          manageUseCompany: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          companyLocation_part1: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          companyLocation_part2: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          companyLocation_part3: [
            { required: true, message: '请选择区县', trigger: 'change' }
          ],
          detailAddress: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          ministry: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
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
          protectScale: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 1000, message: '长度最大 1000 个字符', trigger: 'blur' }
          ],
          projectEstimate: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          fundsSource_part1: [
            { required: true, message: '请选择经济来源', trigger: 'change' }
          ],
          fundsSource_part2: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          designPerson: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          nationalSecurityName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'change' }
          ],
          province: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          manageUseCompany: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          companyLocation_part1: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          companyLocation_part2: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          companyLocation_part3: [
            { required: true, message: '请选择区县', trigger: 'change' }
          ],
          detailAddress: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          ministry: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
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
          protectScale: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 1000, message: '长度最大 1000 个字符', trigger: 'blur' }
          ],
          projectEstimate: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          fundsSource_part1: [
            { required: true, message: '请选择经济来源', trigger: 'change' }
          ],
          fundsSource_part2: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          designPerson: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
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
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
      this.form.nationalSecurityName = this.nationalSecurityObject.name
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
