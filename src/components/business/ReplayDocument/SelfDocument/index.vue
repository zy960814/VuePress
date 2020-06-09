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
            <el-form-item label="立项批复文件标题" prop="replayDocumentTitle" class="redStar">
              <el-input v-model="form.replayDocumentTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="立项批复文号" prop="replayDocumentNo" class="redStar">
              <el-input v-model="form.replayDocumentNo" placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item ref="fileUpload" label="立项批复时间" prop="replayTime" class="redStar">
              <el-date-picker
                v-model="form.replayTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item ref="fileUpload" label="立项批复文件" prop="approvalResponse" class="redStar">
              <el-upload
                :action="fileUploadUrl"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :data="{fieldCode: 'BAWJ', fieldName: '立项批复文件'}"
                :file-list="form.approvalResponse"
                :multiple="false"
                :limit="1"
                :before-upload="beforeUpload"
                :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'approvalResponse')}"
                :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'approvalResponse')}"
                :on-error="fileUploadError"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
              </el-upload>
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
    }
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        replayDocumentTitle: '',
        replayDocumentNo: '',
        approvalResponse: [],
        replayTime: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          replayDocumentTitle: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          replayDocumentNo: [
            { max: 50, message: '长度最大 50 个字符', trigger: 'change' }
          ]
        },
        submit: {
          replayDocumentTitle: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          replayDocumentNo: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 50, message: '长度最大 50 个字符', trigger: 'change' }
          ],
          replayTime: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ]
          // approvalResponse: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ]
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
    // singleSelect(val) {
    //   this.$refs.multipleTable.$refs.SuperviseMultipleTable.clearSelection()
    //   this.$emit('singleSelect', val)
    // },
    // 获取国保单位选中项
    earnSelect(val) {
      //   console.log(val)
      //   this.checked = false
      this.$emit('nationalSecurity', val)
    },
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log('文件预览，下载', file)

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
      console.log(file)

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
