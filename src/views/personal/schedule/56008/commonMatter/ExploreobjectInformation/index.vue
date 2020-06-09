<template>
  <apply-form-item data="考古发掘对象信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="考古发掘对象名称" prop="exploreObjectName" class="redStar">
            <el-input v-model="form.exploreObjectName" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="考古发掘对象所在地" prop="province" class="redStar">
            <el-select v-model="form.province" clearable placeholder="选择省">
              <el-option
                v-for="item in provinceArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="labelZero" prop="city">
            <el-select v-model="form.city" clearable placeholder="选择市">
              <el-option
                v-for="item in cityArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="labelZero" prop="area">
            <el-select v-model="form.area" clearable placeholder="选择区">
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
            <el-input v-model="form.detailAddress" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" :rows="3" placeholder="描述不超过2000个汉字" v-model="form.remarks"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="遗址或墓葬时代" prop="epoch" class="redStar">
            <el-input v-model="form.epoch" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="历年发掘情况" prop="exploreSituation" class="redStar">
            <el-input type="textarea" v-model="form.exploreSituation" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文物保护单位级别" prop="relicProtectLevel" class="redStar">
            <el-input v-model="form.relicProtectLevel" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            style="margin-bottom:0px;"
            label="考古发掘报告、简报整理出版情况"
            prop="publishSituation"
            class="redStar normal"
          >
            <el-input type="textarea" v-model="form.publishSituation" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import {} from '@/utils/validator'
export default {
  name: 'ExploreInformation',
  components: {
    ApplyFormItem
  },
  props: {},
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
      provinceArr: [
        {
          value: '0',
          label: '安徽'
        },
        {
          value: '1',
          label: '西藏'
        },
        {
          value: '2',
          label: '云南'
        },
        {
          value: '3',
          label: '广州'
        },
        {
          value: '4',
          label: '新疆'
        }
      ],
      cityArr: [
        {
          value: '0',
          label: '北京市'
        },
        {
          value: '1',
          label: '天津市'
        },
        {
          value: '2',
          label: '上容市'
        },
        {
          value: '3',
          label: '瓜州市'
        },
        {
          value: '4',
          label: '飞羽市'
        }
      ],
      areaArr: [
        {
          value: '0',
          label: '西城区'
        },
        {
          value: '1',
          label: '东城区'
        },
        {
          value: '2',
          label: '顺义区'
        },
        {
          value: '3',
          label: '昌平区'
        },
        {
          value: '4',
          label: '朝阳区'
        }
      ],
      form: {
        exploreObjectName: '',
        province: '',
        city: '',
        area: '',
        detailAddress: '',
        remarks: '',
        epoch: '',
        exploreSituation: '',
        relicProtectLevel: '',
        publishSituation: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          exploreObjectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          detailAddress: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          remarks: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          epoch: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          exploreSituation: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          relicProtectLevel: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          publishSituation: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ]
        },

        submit: {
          exploreObjectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          detailAddress: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          province: [{ required: true, message: ' ', trigger: 'blur' }],
          city: [{ required: true, message: ' ', trigger: 'blur' }],
          area: [{ required: true, message: ' ', trigger: 'blur' }],
          remarks: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          epoch: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          exploreSituation: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          relicProtectLevel: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          publishSituation: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ]
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
