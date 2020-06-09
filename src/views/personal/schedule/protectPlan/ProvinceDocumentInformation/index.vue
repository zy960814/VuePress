<template>
  <apply-form-item data="省文件信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="8">
              <el-form-item label="省文件号" prop="applyDocumentNum_part1">
                <el-input v-model="form.applyDocumentNum_part1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="labelZero" prop="applyDocumentNum_part2">
                <div class="inpuWidthBox">
                  <span style="line-height:32px;margin-left:5px">〔</span>
                  <el-date-picker
                    class="inpuWidth"
                    format="yyyy"
                    value-format="yyyy"
                    v-model="form.applyDocumentNum_part2"
                    type="year"
                    placeholder="选择年"
                  ></el-date-picker>
                  <span style="line-height:32px">〕</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="labelZero" prop="applyDocumentNum_part3">
                <ul>
                  <li class="fl">
                    <el-input v-model="form.applyDocumentNum_part3"></el-input>
                  </li>
                  <li class="fl" style="line-height:32px;">号</li>
                </ul>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="省文件标题" prop="applyDocumentTitle">
            <el-input v-model="form.applyDocumentTitle" placeholder="建议包含项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="省文件" prop="applyDocument" style="margin-bottom:0;">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '省文件'}"
              :file-list="form.applyDocument"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'applyDocument')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'applyDocument')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
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

import { checkFiveNumSave, checkFiveNumSubmit } from '@/utils/validator'
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
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        applyDocumentNo: '',
        applyDocumentNum_part1: '',
        applyDocumentNum_part2: '',
        applyDocumentNum_part3: '',
        applyDocumentTitle: '',
        applyDocument: []
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
          applyDocumentNum_part1: [
            { max: 10, message: '长度最大 10 个字符', trigger: 'change' }
          ],
          applyDocumentNum_part2: [
            // {
            //   required: true,
            //   message: '请选择日期',
            //   trigger: 'change'
            // }
          ],
          applyDocumentNum_part3: [
            { validator: checkFiveNumSave, trigger: 'change' }
          ],
          applyDocumentTitle: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
          // applyDocument: [
          //   { required: true, message: '请上传备案文件', trigger: 'change' }
          // ]
        },
        submit: {
          applyDocumentNum_part1: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 10, message: '长度最大 10 个字符', trigger: 'change' }
          ],
          applyDocumentNum_part2: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ],
          applyDocumentNum_part3: [
            { validator: checkFiveNumSubmit, trigger: 'change' },
            { required: true, message: ' ', trigger: 'change' }
          ],
          applyDocumentTitle: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
          // applyDocument: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
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
