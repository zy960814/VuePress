<template>
  <apply-form-item data="文物信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="文物名称" prop="relicName" class="redStar normal">
            <div style="display:flex;justify-content:space-between;">
              <el-input v-model="form.relicName" style="flex-grow:2;margin-right:10px;"></el-input>
              <el-button type="primary" style="flex-grow:1;">选择</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="总登记号" prop="generalNo" class="redStar">
            <el-input v-model="form.generalNo" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="具体年代" prop="specificYear" class="redStar">
            <el-input v-model="form.specificYear" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="文物类型" prop="relicType" class="redStar">
            <el-input v-model="form.relicType" placeholder></el-input>
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
          <el-form-item label="数量" prop="num" class="redStar">
            <el-input v-model="form.num" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="完残程度" prop="incomplete" class="redStar">
            <el-input v-model="form.incomplete" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="完残程度详细描述" prop="incompleteDetail" class="redStar">
            <el-input v-model="form.incompleteDetail" placeholder type="textarea" :rows="3"></el-input>
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
          <el-form-item label="收藏时间" prop="collectTime" class="redStar">
            <el-input v-model="form.collectTime" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="文物来源" prop="relicOrigin" class="redStar">
            <el-input v-model="form.relicOrigin" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import API_PREFIX from '@/api/config'
export default {
  name: 'ApplicantInformation',
  components: {
    ApplyFormItem
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        relicName: '',
        generalNo: '',
        specificYear: '',
        relicType: '',
        relicLevel: '',
        texture: '',
        size: '',
        num: '',
        incomplete: '',
        incompleteDetail: '',
        collectCompany: '',
        collectTime: '',
        relicOrigin: ''
      },

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          relicName: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          generalNo: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          specificYear: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicType: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicLevel: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          texture: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          size: [{ max: 60, message: '长度最大 60 个字符', trigger: 'blur' }],
          num: [{ max: 60, message: '长度最大 60 个字符', trigger: 'blur' }],
          incomplete: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          incompleteDetail: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          collectCompany: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          collectTime: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicOrigin: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          relicName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          generalNo: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          specificYear: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicType: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicLevel: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          texture: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          size: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          num: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          incomplete: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          incompleteDetail: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          collectCompany: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          collectTime: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicOrigin: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  mounted() {},
  methods: {
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
.labelZero {
  /deep/.el-form-item__content {
    margin-left: 0px !important;
  }
}
.el-divider--horizontal {
  margin: 18px 0;
}
.inpuWidthBox {
  width: 100%;
}
.inpuWidth {
  width: calc(100% - 40px) !important;
}
</style>
