<template>
  <apply-form-item data="申请材料">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="文物借用协议"
            prop="borrowAgreement"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '文物借用协议'}"
              :file-list="form.borrowAgreement"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'borrowAgreement')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'borrowAgreement')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="借用文物的安全状况评估报告"
            prop="proxyStatement"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'proxyStatement')}"
              :data="{fieldCode: 'BAWJ', fieldName: '借用文物的安全状况评估报告'}"
              :file-list="form.proxyStatement"
              :multiple="false"
              :limit="1"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'proxyStatement')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="借用单位的自信其概况报告" prop="taskStatement" class="normal">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '借用单位的自信其概况报告'}"
              :file-list="form.taskStatement"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'taskStatement')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'taskStatement')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="借用单位的场馆设施条件评估报告"
            prop="projectEstimateBook"
            class="redStar"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '借用单位的场馆设施条件评估报告'}"
              :file-list="form.projectEstimateBook"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'projectEstimateBook')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'projectEstimateBook')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="其他" prop="reportAndPhoto" class="redStar normal">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '其他'}"
              :file-list="form.reportAndPhoto"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'reportAndPhoto')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'reportAndPhoto')}"
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
  name: 'ApplyMaterial',
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
        borrowAgreement: [],
        proxyStatement: [],
        taskStatement: [],
        projectEstimateBook: [],
        reportAndPhoto: []
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {},
        submit: {
          // borrowAgreement: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // proxyStatement: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // taskStatement: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // projectEstimateBook: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // reportAndPhoto: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ]
        }
      }
    }
  },
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
</style>
