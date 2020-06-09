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
          <el-form-item ref="fileUpload" label="方案设计说明及图纸" prop="palnDesign">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '方案设计说明及图纸'}"
              :file-list="form.palnDesign"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'palnDesign')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'palnDesign')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="设计委托书" prop="proxyStatement" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'proxyStatement')}"
              :data="{fieldCode: 'BAWJ', fieldName: '设计委托书'}"
              :file-list="form.proxyStatement"
              :multiple="false"
              :limit="1"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'proxyStatement')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="设计任务书" prop="taskStatement" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '设计任务书'}"
              :file-list="form.taskStatement"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'taskStatement')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'taskStatement')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="工程概算书" prop="projectEstimateBook" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '工程概算书'}"
              :file-list="form.projectEstimateBook"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'projectEstimateBook')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'projectEstimateBook')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="现场勘察报告和现状照片"
            prop="reportAndPhoto"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '现场勘察报告和现状照片'}"
              :file-list="form.reportAndPhoto"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'reportAndPhoto')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'reportAndPhoto')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="风险评估报告" prop="riskAssessment" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '风险评估报告'}"
              :file-list="form.riskAssessment"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'riskAssessment')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'riskAssessment')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="主要设备材料清单" prop="materialList" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '主要设备材料清单'}"
              :file-list="form.materialList"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'materialList')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'materialList')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="主要设备材料的检验报告或认证证书"
            prop="inspectionReport"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '主要设备材料的检验报告或认证证书'}"
              :file-list="form.inspectionReport"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'inspectionReport')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'inspectionReport')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="人员培训细则、售后服务承诺和工程验收细则"
            prop="rulesPromise"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '人员培训细则、售后服务承诺和工程验收细则'}"
              :file-list="form.rulesPromise"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'rulesPromise')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'rulesPromise')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="评审文件（复审方案在此上传）"
            prop="reviewDocument"
            class="normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '评审文件（复审方案在此上传）'}"
              :file-list="form.reviewDocument"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'reviewDocument')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'reviewDocument')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="applyType==='n_reportCRB'">
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="省级文物行政部门的意见"
            prop="CRBOpinion"
            class="redStar normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '省级文物行政部门的意见'}"
              :file-list="form.CRBOpinion"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'CRBOpinion')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'CRBOpinion')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
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
        palnDesign: [],
        proxyStatement: [],
        taskStatement: [],
        projectEstimateBook: [],
        reportAndPhoto: [],
        riskAssessment: [],
        materialList: [],
        inspectionReport: [],
        rulesPromise: [],
        CRBOpinion: [],
        reviewDocument: [],
        other: []
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {},
        submit: {
          // palnDesign: [
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
          // ],
          // riskAssessment: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // materialList: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // inspectionReport: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // rulesPromise: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // CRBOpinion: [
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
