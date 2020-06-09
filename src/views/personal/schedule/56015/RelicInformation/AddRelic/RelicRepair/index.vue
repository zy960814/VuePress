<template>
  <div class="content">
    <apply-form-item data="文物修复信息">
      <el-form
        ref="form"
        :rules="rules[ruleKey]"
        :model="form"
        label-position="left"
        label-width="130px"
        :show-message="false"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="主要病害" prop="majorDisease" class="redStar">
              <el-input type="textarea" :rows="2" placeholder v-model="form.majorDisease"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="修复目标"
              prop="repairTarget"
              class="redStar"
              style="margin-bottom:0px;"
            >
              <el-input type="textarea" :rows="2" placeholder v-model="form.repairTarget"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </apply-form-item>
  </div>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'

export default {
  name: 'RelicRepair',
  components: { ApplyFormItem },
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
      form: {
        majorDisease: '',
        repairTarget: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          majorDisease: [
            { required: true, message: '', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          repairTarget: [
            { required: true, message: '', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
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
