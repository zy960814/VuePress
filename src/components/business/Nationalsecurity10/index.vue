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
      <el-row>
        <el-col :span="11">
          <el-form-item label="省级文物保护单位名称" prop="nationalSecurityName" class="redStar">
            <el-input v-model="form.nationalSecurityName" placeholder="请选择全国重点文物保护单位"></el-input>
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
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="文物类型" prop="relicCategory" class="redStar">
            <el-select v-model="form.relicCategory" clearable placeholder>
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
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Nationalsecurity10',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      radio: '1',
      nationalSecurityObject: null,
      form: {
        nationalSecurityName: '',
        province: '',
        relicCategory: ''
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
      relicCategoryArr: [
        {
          value: '0',
          label: '青铜器'
        },
        {
          value: '1',
          label: '陶瓷'
        },
        {
          value: '2',
          label: '金丝楠木'
        },
        {
          value: '3',
          label: '梨花木'
        },
        {
          value: '4',
          label: '骨质'
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
            { required: true, message: '', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          province: [{ required: true, message: '', trigger: 'change' }],
          relicCategory: [{ required: true, message: '', trigger: 'change' }]
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
    // confirm() {
    //   this.dialogVisible = false
    //   this.form.nationalSecurityName = this.nationalSecurityObject.name
    // },
    // // 选择获取国保单位名称
    // earnNationalSecurity(val) {
    //   this.nationalSecurityObject = val
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
</style>
