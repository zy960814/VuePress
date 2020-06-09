<template>
  <div>
    <el-form
			ref="form"
			:rules="rules"
			:model="form"
			label-position="left"
			label-width="200px"
			:show-message="false">
			<el-row>
				<el-col :span="24">
					<el-form-item ref="fileUpload" label="资质证书变更申请表" prop="technologyDocument" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '资质证书变更申请表'}"
							:file-list="form.technologyDocument"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：doc/docx/pdf</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item ref="fileUpload" label="变更后的企业法人营业执照或事业单位法人证书或文件加盖公章彩色扫描件" prop="technologyDocument0" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '变更后的企业法人营业执照或事业单位法人证书或文件加盖公章彩色扫描件'}"
							:file-list="form.technologyDocument0"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument0')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument0')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：doc/docx/pdf</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
      <el-row class="boxBottom">
				<el-col :span="24">
					<el-form-item ref="fileUpload" label="省级文物行政部门的书面意见" prop="technologyDocument0" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '省级文物行政部门的书面意见'}"
							:file-list="form.technologyDocument0"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument0')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument0')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：doc/docx/pdf</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
  </div>
</template>
<script>
import API_PREFIX from '@/api/config'
export default {
  props: {
		height: {
			type: String,
			default: '430px'
		},
		propsData:{
			type:Function,
		}
	},
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
			form: {
				provinceList:[],
				province:[],
				radio: '2',
				nationalSecurityName:'',
			},
      rules:{
				nationalSecurityName:[
					{ required: true, message: '请输入人员名称', trigger: 'blur' },
          { min: 0, max: 200, message: '', trigger: 'blur' }
				],//人员名称 必填 长度小于200
				technologyDocument:[],
				technologyDocument0:[],
				technologyDocument1:[],
				technologyDocument2:[],

			},
     
    };
  },
  mounted() {
  
  },
  methods: {
    // 表单校验
		validataForm() { // 表单校验
			let flag=false;
			this.$refs["form"].validate(valid => {
				if (valid) {
				
					flag=true;
				}
			});
			return flag
		},
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
  }
};
</script>
<style  lang="scss" scoped>
	.el-upload__tip{
		margin-left: 15px;
	}
	/deep/ .el-form-item__label {
    white-space: normal !important;
    line-height: 15px;
  }
  .boxBottom /deep/ .el-form-item--small.el-form-item{
    margin-bottom: 10px;
  }
</style>

