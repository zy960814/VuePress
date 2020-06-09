<template>
  <div>
    <el-form
			ref="form1"
			:rules="rules"
			:model="form"
			label-position="left"
			label-width="130px"
			:show-message="false">
			<div>
				<el-row>
					<el-col :span="11">
						<el-form-item label="姓名" prop="nationalSecurityName" class="redStar">
							<el-input v-model="form.nationalSecurityName" placeholder></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
					<el-col :span="11">
						<el-form-item label="出生年份" prop="nationalSecurityYear" class="redStar">
							<el-date-picker
                v-model="form.nationalSecurityYear"
                type="year"
                placeholder="选择年"
								:picker-options="pickerOptions"
								value-format="yyyy"
								>
              </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
					<el-col :span="24">
						<el-form-item label="专业" prop="nationalSecurityModel" class="redStar">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.nationalSecurityModel"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
					<el-col :span="24">
						<el-form-item label="专业职称" prop="ProfessionalName" class="redStar">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.ProfessionalName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="bottomLine"></div>
			<el-row class="linklabel">
				<el-col :span="24">
					<el-form-item ref="fileUpload" label-width="300px" label="技术职称等证书的彩色扫描件" prop="technologyDocument" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '技术职称等证书的彩色扫描件'}"
							:file-list="form.technologyDocument"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="linklabel">
				<el-col :span="24">
					<el-form-item ref="fileUpload" label-width="300px" label="身份证正反面彩色扫描件" prop="technologyDocument" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '身份证正反面彩色扫描件'}"
							:file-list="form.technologyDocument"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="linklabel">
				<el-col :span="24">
					<el-form-item ref="fileUpload" label-width="300px" label="现申报单位的劳动合同(六个月内新聘用人员需提供原聘用单位的解聘证明或任职关系证明复印件)" prop="technologyDocument" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '现申报单位的劳动合同(六个月内新聘用人员需提供原聘用单位的解聘证明或任职关系证明复印件)'}"
							:file-list="form.technologyDocument"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="linklabel">
				<el-col :span="24">
					<el-form-item ref="fileUpload" label-width="300px" label="近六个月现申报单位社保证明(军队或高校的主要专业技术人员可不提供社保证明，但需提供所在单位人事主管部门的人事证明材料)" prop="technologyDocument" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '近六个月现申报单位社保证明(军队或高校的主要专业技术人员可不提供社保证明，但需提供所在单位人事主管部门的人事证明材料)'}"
							:file-list="form.technologyDocument"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
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
		},
		childData1:{},
	},
	watch: {
		childData1(value){
			if(!value){
				this.form={
					provinceList:[],
					province:[],
					radio: '2',
					nationalSecurityName:'',
				}
			}else{
			this.form={
				...value
				}	
			}
		}
	},
  data() {
    return {
			pickerOptions:{
				disabledDate:(time)=>{return time.getTime() > Date.now()}
			},
			totalCount:200,
			title: '添加单位技术人员构成',
      dialogFormVisibleType:false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
			form: {
				provinceList:[],
				radio: '1',
				name:'',
			},
			queryParams: {
				pageNation: {
					currentPage: 1,
					pageSize: 20
				},
			},
			options:[],
			// 选中的菜单项（基本信息/工程概况...）
      selectMenuItem: '1',
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '选择责任设计师/工程师/监理师',
            num: ''
          },
          {
            title: '添加其他专业技术骨干',
            num: ''
          }
        ]
      },
      rules:{
				nationalSecurityName:[
					{ required: true, message: '请输入人员名称', trigger: 'change' },
          { min: 0, max: 200, message: '', trigger: 'change' }
				],//人员名称 必填 长度小于200
				nationalSecurityYear:[
					{ required: true, message: '请选择日期', trigger: 'change' },
				], //日期
				nationalSecurityModel:[
					{ required: true, message: '请输入专业', trigger: 'change' },
          { min: 0, max: 200, message: '', trigger: 'change' }
				], // 专业
				ProfessionalName:[
					{ required: true, message: '请输入专业职称', trigger: 'change' },
          { min: 0, max: 200, message: '', trigger: 'change' }
				],
				technologyDocument:[],
				technologyDocument0:[],
				technologyDocument1:[],
				technologyDocument2:[],
			},
      // 单位构成人员数据
      unitPersonnelArr:[
				{
					qualificationType:'责任设计师',
					num:0,
					fpNum:0,
				},
				{
					qualificationType:'责任工程师',
					num:0,
					fpNum:0,
				},
				{
					qualificationType:'责任监理师',
					num:0,
					fpNum:0,
				},
				{
					qualificationType:'其他技术骨干',
					num:0,
					fpNum:null,
				}
			],
    };
  },
  mounted() {
  
  },
  methods: {
		handleSelect(key) {
			this.reportType = key
			console.log(key,'key')
		},
		resetForm(){
			this.form={
				provinceList:[],
				radio: '1',
				name:'',
			}
		},
		handleSizeChange(){

		},
		handleCurrentChange(){

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
		// 表单校验
		validataForm() {
			let flag=false;
			this.$refs["form1"].validate(valid => {
				if (valid) {
					let obj={
						...this.form,
						name:this.form.nationalSecurityName,
						dateBirth:this.form.nationalSecurityYear,
						qualificationType:'其他技术骨干',

					}
					this.propsData(obj);
					flag=true;
				}
			});
			return flag
		}
  }
};
</script>
<style  lang="scss" scoped>
	.el-select, .el-date-editor.el-input,
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
	.el-upload__tip{
		margin-left: 15px;
	}
	.bottomLine{
		border-bottom: 1px solid #e5e5e5;
		margin-top: 10px;
		margin-bottom: 28px;
	}
	.linklabel /deep/ .el-form-item__label {
		white-space: normal !important;
		line-height: 15px;
	}
</style>

