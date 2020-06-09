<template>
  <div class="selfDocument">
    <el-scrollbar :style="{height: height_self}">
      <el-form
        ref="form"
        :rules="rules['submit']"
        :model="form"
        label-position="left"
        label-width="130px"
      >
        <el-row>
          <el-col :span="24" style="margin-top:10px;">
            <el-form-item label="方案编制单位" prop="designPerson" class="redStar">
              <el-input v-model="form.designPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="11">
            <el-form-item label="资质类型" prop="qualityType">
              <el-select v-model="form.qualityType" clearable placeholder>
                <el-option
                  v-for="item in qualityTypeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
        <!-- <el-row>
          <el-col :span="11">
            <el-form-item label="级别" prop="level">
              <el-select v-model="form.level" clearable placeholder>
                <el-option
                  v-for="item in levelArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import API_PREFIX from '@/api/config'
export default {
  name: 'SelfDocument',
  components: {},
  props: {
    height_self: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        designPerson: ''
        // qualityType: '',
        // level: ''
      },
      qualityTypeArr: [
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
      levelArr: [
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
          designPerson: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          designPerson: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
        }
      },
      flag: false
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
    getFormData() {
      this.$refs['form'].clearValidate()
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
.selfDocument {
  .row_1 {
    display: inline-block;
    margin: 0 auto;

    .keyword {
      width: 540px;
    }

    /deep/ .el-date-editor.el-input__inner {
      width: 260px;
    }

    /deep/ .el-input-group__prepend {
      width: 128px;
      background-color: #fff;

      .el-input__inner {
        width: 131px;
      }
    }
  }
  .header_button_one {
    vertical-align: middle;
    height: 50px;
    border-top: 1px solid #e6ebf5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
  }
  .header_button_two {
    vertical-align: middle;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
    border-bottom: 1px solid #e6ebf5;
  }
  .header_button_three {
    vertical-align: middle;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
  }
  h3 {
    margin: 30px 0 16px;
    font-size: 16px;
  }
  .titleDiv {
    width: 100%;
    font-weight: 700;
    background-color: white;
    font-size: 14px;
    border: 1px solid gray;
    border-bottom: none;
    line-height: 20px;
    padding: 5px;
    text-align: center;
  }
}
</style>
