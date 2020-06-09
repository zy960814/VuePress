<template>
  <apply-form-item data="立项批复文件">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="批复文件标题" prop="replayDocumentTitle" class="redStar">
            <el-input
              v-model="form.replayDocumentTitle"
              style="width:90%"
              placeholder="请选择或填写国家文物局关于本项目立项的批复文件标题"
            ></el-input>
            <el-button style="margin-left:10px;" type="primary">选择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="批复文号" prop="replayDocumentNo" class="redStar">
            <el-input v-model="form.replayDocumentNo" placeholder="请输入国家文物局关于本项目立项的批复文号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            style="margin-bottom:0px;"
            ref="fileUpload"
            label="立项批复文件"
            prop="approvalResponse"
            class="redStar"
          >
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
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>-->
      <replay-dialog ref="replayDialog" />
      <el-row>
        <el-col :span="24">
          <el-form-item
            style="margin-bottom:0px;"
            ref="fileUpload"
            label="立项报告"
            prop="approvalReport"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '立项报告'}"
              :file-list="form.approvalReport"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'approvalReport')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'approvalReport')}"
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
import ReplayDialog from '@/components/business/ReplayDialog'
export default {
  name: 'BasicInformation',
  components: {
    ApplyFormItem,
    ReplayDialog
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        replayDocumentTitle: '',
        replayDocumentNo: '',
        approvalResponse: []
      },

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          replayDocumentTitle: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          replayDocumentNo: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          replayDocumentTitle: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          replayDocumentNo: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
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
    getFormData(type) {
      this.$refs['form'].clearValidate()
      this.ruleKey = type
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.form.applyDocumentNo = `${this.form.applyDocumentNum_part1}${this.form.applyDocumentNum_part2}${this.form.applyDocumentNum_part3}`
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

.inpuWidthBox {
  width: 100%;
}
.inpuWidth {
  width: calc(100% - 40px) !important;
}
</style>
