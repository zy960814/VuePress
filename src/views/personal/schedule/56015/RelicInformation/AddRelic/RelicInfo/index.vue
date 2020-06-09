<template>
  <div class="content">
    <apply-form-item data="文物基本信息">
      <el-form
        ref="form"
        :rules="rules[ruleKey]"
        :model="form"
        label-position="left"
        label-width="130px"
        :show-message="false"
      >
        <el-row>
          <my-dialog
            width="1024px"
            :height="dialogHeight+'px'"
            :visible.sync="dialogVisible"
            class="boxCard_dialog"
            append-to-body
          >
            <relic :height="dialogHeight-255+'px'" @nationalSecurity="earnNationalSecurity" />
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirm">确定</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </span>
          </my-dialog>
          <el-col :span="11">
            <el-form-item
              label="文物名称"
              prop="relicName"
              class="redStar"
              v-if="operateType === 'confirm'"
            >
              <el-input v-model="form.relicName" placeholder="请选择全国重点文物保护单位"></el-input>
            </el-form-item>
            <el-form-item label="文物名称" prop="relicName" class="redStar" v-else>
              <el-input v-model="form.relicName" style="width:217px;" placeholder="请选择全国重点文物保护单位"></el-input>
              <el-button style="margin-left:10px;" type="primary" @click="dialogVisible=true">选择</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="总登记号" prop="sumNo" class="redStar">
              <el-input v-model="form.sumNo" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="具体年代" prop="years" class="redStar">
              <el-input v-model="form.years" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="文物类型" prop="relicCategory" class="redStar">
              <el-input v-model="form.relicCategory" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="文物级别" prop="relicLevel" class="redStar">
              <el-input v-model="form.relicLevel" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="质地" prop="texture" class="redStar">
              <el-input v-model="form.texture" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="尺寸" prop="size" class="redStar">
              <el-input v-model="form.size" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="数量" prop="number" class="redStar">
              <el-input v-model="form.number" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="完残程度" prop="integrated" class="redStar">
              <el-input v-model="form.integrated" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="完残程度详细描述" prop="integratedDetail" class="redStar">
              <el-input type="textarea" :rows="2" placeholder v-model="form.integratedDetail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="收藏单位" prop="collectCompany" class="redStar">
              <el-input v-model="form.collectCompany" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              label="收藏时间"
              prop="collectTime"
              class="redStar"
              style="margin-bottom:0px;"
            >
              <el-input v-model="form.collectTime" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item
              label="文物来源"
              prop="relicSource"
              class="redStar"
              style="margin-bottom:0px;"
            >
              <el-input v-model="form.relicSource" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </apply-form-item>
  </div>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import MyDialog from '@/components/commons/MyDialog'
import Relic from '@/views/personal/schedule/Relic'
export default {
  name: 'RelicInfo',
  components: { ApplyFormItem, MyDialog, Relic },
  props: {
    relicDataItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      nationalSecurityObject: null,
      form: {
        relicName: '',
        sumNo: '',
        years: '',
        relicCategory: '',
        relicLevel: '',
        texture: '',
        size: '',
        number: '',
        integrated: '',
        integratedDetail: '',
        collectCompany: '',
        collectTime: '',
        relicSource: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          relicName: [
            { required: true, message: '', trigger: 'change' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'change' }
          ],
          sumNo: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          years: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicCategory: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicLevel: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          texture: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          size: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          integrated: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          integratedDetail: [
            { required: true, message: '', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          collectCompany: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          collectTime: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicSource: [
            { required: true, message: '', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        }
        // submit: {
        //   relicName: [
        //     { required: true, message: '', trigger: 'change' },
        //     { max: 100, message: '长度最大 100 个字符', trigger: 'change' }
        //   ],
        //   sumNo: [
        //     { required: true, message: '', trigger: 'change' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
        //   ],
        //   years: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   relicCategory: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   relicLevel: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   texture: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   size: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   num: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   integrated: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   integratedDetail: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 2000 个字符', trigger: 'blur' }
        //   ],
        //   collectCompany: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   collectTime: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ],
        //   relicSource: [
        //     { required: true, message: '', trigger: 'blur' },
        //     { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
        //   ]
        // }
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
  mounted() {
    this.filterData()
  },
  destroyed() {},
  methods: {
    // 筛选数组
    filterData() {
      Object.keys(this.form).forEach(item => {
        this.form[item] = this.relicDataItem[item]
      })
    },

    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
      this.form = this.nationalSecurityObject
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
