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
            label="方案设计说明及图纸"
            prop="designIntroduction"
            class="redStar"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '方案设计说明及图纸'}"
              :file-list="form.designIntroduction"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'designIntroduction')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'designIntroduction')}"
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
            label="省级文物行政部门的意见"
            prop="departmentOpinion"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '省级文物行政部门的意见'}"
              :file-list="form.departmentOpinion"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'departmentOpinion')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'departmentOpinion')}"
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
          <el-form-item ref="fileUpload" label="相关的实验报告" prop="experimentReport">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'experimentReport')}"
              :data="{fieldCode: 'BAWJ', fieldName: '相关的实验报告'}"
              :file-list="form.experimentReport"
              :multiple="false"
              :limit="1"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'experimentReport')}"
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
          <el-form-item ref="fileUpload" label="地勘报告" prop="explorationReport">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '地勘报告'}"
              :file-list="form.explorationReport"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'explorationReport')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'explorationReport')}"
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
          <el-form-item ref="fileUpload" label="考古勘探或发掘报告" prop="excavateReport">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '考古勘探或发掘报告'}"
              :file-list="form.excavateReport"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'excavateReport')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'excavateReport')}"
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
          <el-form-item ref="fileUpload" label="评估报告" prop="assessReport">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '评估报告'}"
              :file-list="form.assessReport"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'assessReport')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'assessReport')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="立项批复" prop="approvalResponse">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '立项批复'}"
              :file-list="form.approvalResponse"
              :multiple="false"
              :limit="1"
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
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="其他" prop="other" style="margin-bottom:30px;">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '其他'}"
              :file-list="form.other"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'other')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'other')}"
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
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        designIntroduction: [],
        departmentOpinion: [],
        experimentReport: [],
        explorationReport: [],
        excavateReport: [],
        assessReport: [],
        approvalReport: [],
        // approvalResponse: [],
        other: []
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {},
        submit: {
          // designIntroduction: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // departmentOpinion: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // experimentReport: [
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
