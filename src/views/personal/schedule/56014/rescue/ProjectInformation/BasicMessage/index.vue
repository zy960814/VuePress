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
        :nationalSecurityNameStr="'全国重点文物保护单位名称'"
      />
      <!-- <div style="margin-bottom: 10px;margin-top:10px;position:relative;height:20px;">
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
          <el-form-item label="保护工程类型" prop="protectProjectCheckList" class="redStar">
            <el-checkbox-group v-model="form.protectProjectCheckList">
              <el-checkbox label="抢险加固工程"></el-checkbox>
              <el-checkbox label="修缮工程"></el-checkbox>
              <el-checkbox label="迁建工程"></el-checkbox>
              <el-checkbox label="其他保护性设施建设工程"></el-checkbox>
              <el-checkbox label="环境整治工程"></el-checkbox>
              <el-checkbox label="展示利用工程"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder="项目名称须包含文保单位名称和事项名称关键字（原址保护措施）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工程概算" prop="projectEstimate">
            <el-input placeholder="数字精确到小数点后2位，单位(万元)" v-model="form.projectEstimate">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <design-dialog ref="designDialog" />
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="设计人" prop="designPerson" class="redStar">
            <el-input v-model="form.designPerson" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="11">
          <el-form-item label="申报主体" prop="sendOrganization">
            <el-input v-model="form.sendOrganization" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="其他说明" prop="otherIntroduction" style="margin-bottom:0px;">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写该项目的其他说明，不超过500个汉字"
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
        protectProjectCheckList: [],
        projectName: '',
        projectEstimate: '',
        designPerson: '',
        sendOrganization: '',
        otherIntroduction: ''
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
          protectProjectCheckList: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个保护工程类型',
              trigger: 'change'
            }
          ],
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
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
          protectProjectCheckList: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个保护工程类型',
              trigger: 'change'
            }
          ],
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
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
</style>
