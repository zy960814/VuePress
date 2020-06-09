<template>
  <apply-form-item data="地图标注">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="发掘地点经度" prop="longitude" class="redStar">
            <div style="display:flex;justify-content: flex-between;">
              <el-input v-model="form.longitude" placeholder style="flex:10"></el-input>
              <span style="flex:1;margin-left:8px;">度</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="发掘地点纬度" prop="latitude" class="redStar">
            <div style="display:flex;justify-content: flex-between;">
              <el-input v-model="form.latitude" placeholder style="flex:10"></el-input>
              <span style="flex:1;margin-left:8px;">度</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="地图标注" prop="magTag" class="redStar" style="margin-bottom:0px;">
            <el-image :src="src"></el-image>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import map from '@/assets/image/navigation-bar/map.png'
export default {
  name: 'ApplicantInformation',
  components: { ApplyFormItem },
  props: {},
  data() {
    return {
      src: map,
      form: {
        exploreLocation: '',
        attachedDrawing: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          longitude: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          latitude: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          longitude: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          latitude: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
          //   attachedDrawing: [{ required: true, message: ' ', trigger: 'change' }]
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
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
/deep/.el-dialog__body {
  padding: 0px 20px !important;
}
.radios {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
