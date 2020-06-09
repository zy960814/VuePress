<template>
  <div class="selfDocument">
    <el-scrollbar :style="{height: height_self}">
      <el-form
        :rules="rules['submit']"
        ref="form"
        :model="form"
        label-position="left"
        label-width="130px"
      >
        <el-row>
          <el-col :span="24" style="margin-top:10px;">
            <el-form-item label="名称" prop="nationalSecurityName" class="redStar">
              <el-input v-model="form.nationalSecurityName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="省份" prop="province" class="redStar">
              <el-select v-model="form.province" clearable placeholder>
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
        <el-row v-if="applyType==='56005'">
          <el-col :span="11">
            <el-form-item label="保护单位级别" prop="companyLevel" class="redStar">
              <el-select v-model="form.companyLevel" clearable placeholder>
                <el-option
                  v-for="item in companyLevelArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
    },
    applyType: {
      type: String
    }
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        nationalSecurityName: '',
        province: '',
        relicCategory: '',
        companyLevel: ''
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
      companyLevelArr: [
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
      relicCategoryArr: [
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
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          province: [],
          relicCategory: [],
          companyLevel: []
        },
        submit: {
          nationalSecurityName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          province: [{ required: true, message: ' ', trigger: 'change' }],
          relicCategory: [{ required: true, message: ' ', trigger: 'change' }],
          companyLevel: [{ required: true, message: ' ', trigger: 'change' }]
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
