<template>
  <apply-form-item data="申请文件标题:考古发掘计划申请(一般事项)">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="进场时间" prop="enterTime" class="redStar">
            <el-date-picker
              v-model="form.enterTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="已布方发掘面积" prop="exploreArea" class="redStar">
            <el-input placeholder v-model="form.exploreArea">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="总用工数" prop="generalNum" class="redStar">
            <el-input v-model="form.generalNum" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="经费执行情况" prop="executeSituation">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.executeSituation"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="中期项目进展说明" prop="projectInstroduction">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述不超过2000个汉字"
              v-model="form.projectInstroduction"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="工作照片" prop="workPhoto" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '工作照片'}"
              :file-list="form.workPhoto"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'workPhoto')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'workPhoto')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
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
  name: 'BasicInformation',
  components: {
    ApplyFormItem
  },
  props: {
    applyType: {
      type: String
    }
  },
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
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        enterTime: '',
        exploreArea: '',
        generalNum: '',
        executeSituation: '',
        projectInstroduction: '',
        workPhoto: []
      },
      handlePersonArr: [
        {
          value: '0',
          label: '谢云流'
        },
        {
          value: '1',
          label: '李重茂'
        },
        {
          value: '2',
          label: '叶英'
        },
        {
          value: '3',
          label: '曲云'
        },
        {
          value: '4',
          label: '莫雨'
        }
      ],
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
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          enterTime: [],
          exploreArea: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          generalNum: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          executeSituation: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          projectInstroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
          // workPhoto: [
          //   { required: true, message: '', trigger: 'change' }
          // ]
        },
        submit: {
          enterTime: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ],
          exploreArea: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          generalNum: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          executeSituation: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          projectInstroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
          // workPhoto: [
          //   { required: true, message: '', trigger: 'change' }
          // ]
        }
      }
    }
  },
  mounted() {
    console.log(this.form)
  },
  methods: {
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log(file)

      /* if (this.fileItemClick) {
           this.fileItemClick = false;
           var loading = this.$loading({
             lock: true,
             text: '正在加载文件，请稍候...',
             spinner: 'el-icon-loading',
             background: 'rgba(0, 0, 0, 0.7)'
           });
           var vue = this;
           var x = new XMLHttpRequest();
           x.onreadystatechange = function () {
             if (x.readyState === 4) {
               loading.close();
               vue.fileItemClick = true;
             }
           };
           x.open("GET", file.url, true);
           x.responseType = 'blob';
           x.onload = function () {
             download(x.response, file.name);
           };
           x.send();
         } else {
           this.$message({
             showClose: true,
             message: '正在下载中，请稍候...'
           });
         }*/
    },
    // 文件列表移除某个文件前的回调
    beforeRemove(file) {
      return this.$confirm('确定要移除文件 ' + file.name + ' 吗？', {
        type: 'warning'
      })
    },
    // 文件列表移除了某个文件的回调
    handleRemove(file, fileList, name) {
      this.form[name] = fileList
    },
    // 文件上传成功的回调
    fileUploadSuccess(response, file, name) {
      if (response.code === 200) {
        // 清除文件必填项校验提示
        this.$refs.fileUpload.clearValidate()
        const { data } = response
        data.uid = file.uid
        data.name = data.fileName
        this.form[name].push(data)
      } else {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        })
      }
    },
    // 文件上传失败的回调
    fileUploadError() {
      this.$message({
        showClose: true,
        message: '文件上传失败。',
        type: 'error'
      })
    },
    beforeUpload(file) {
      const fileExt = file.name.replace(/.+\./, '')
      // 判断文件格式doc / docx / pdf
      if (['doc', 'docx', 'pdf'].indexOf(fileExt.toLowerCase()) === -1) {
        this.$alert('请上传后缀名为 doc、docx、pdf的文件', {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
        return false
      }
      // 判断文件大小
      if (file.size > 1 * 1024 * 1024 * 1024) {
        this.$alert(`上传的文件大小不能超过 800M`, {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
        return false
      }
      // this.disabled = this.fileList && this.fileList.length === this.limit
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
