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
            label="中华人民共和国考古发掘团体资格申请书"
            prop="qualityApply"
            class="normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '中华人民共和国考古发掘团体资格申请书'}"
              :file-list="form.qualityApply"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'qualityApply')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'qualityApply')}"
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
            label="主管部门出具的关于同意申请的书面材料"
            prop="agreeMaterial"
            class="normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '主管部门出具的关于同意申请的书面材料'}"
              :file-list="form.agreeMaterial"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'agreeMaterial')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'agreeMaterial')}"
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
          <el-form-item ref="fileUpload" label="考古发掘机构及设备简况" prop="exploreEquipment" class="normal">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '考古发掘机构及设备简况'}"
              :file-list="form.exploreEquipment"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'exploreEquipment')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'exploreEquipment')}"
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
            label="文物保护机构及设备简况"
            prop="protectEquipment"
            style="margin-bottom:30px;"
            class="normal"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '文物保护机构及设备简况'}"
              :file-list="form.protectEquipment"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'protectEquipment')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'protectEquipment')}"
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
        qualityApply: [],
        agreeMaterial: [],
        exploreEquipment: [],
        protectEquipment: []
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {},
        submit: {
          // qualityApply: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // agreeMaterial: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // exploreEquipment: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // protectEquipment: [
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
</style>
