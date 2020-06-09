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
					<el-col :span="24" style="height:50px;">
						<el-form-item prop="nationalSecurityName" label-width="30px">
							<el-row>
								<el-col :span="18">
									<el-input placeholder="人员姓名/证书编号" v-model="form.nationalSecurityName"></el-input>
								</el-col>
								<el-col	:span="2" style="margin:0 10px 0 -3px;">
									<el-button type="primary">查询</el-button>
								</el-col>
								<el-col	:span="2" >
									<el-button type="primary" plain >重置</el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="bottomlike">
						<el-form-item label="人员资格" prop="provinceList">
							<el-checkbox-group v-model="form.provinceList" @change='changeprovinceList'>
								<el-checkbox label="责任设计师"></el-checkbox>
								<el-checkbox label="责任工程师"></el-checkbox>
								<el-checkbox label="责任监理师"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="bottomlike">
						<el-form-item label="业务范围" prop="province" @change='changeprovince'>
							<el-checkbox-group  v-model="form.province">
								<el-checkbox label="古文化遗址古墓葬"></el-checkbox>
								<el-checkbox label="古建筑"></el-checkbox>
								<el-checkbox label="石窟寺和石刻"></el-checkbox>
								<el-checkbox label="近现代重要史迹及代表性建筑"></el-checkbox>
								<el-checkbox label="壁画"></el-checkbox>
								<el-checkbox label="保护规划"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-table :data="tableData" style="width: 100%" @row-click='rowClick'>
					<el-table-column  width="55" prop="checkStatus">
						<template slot-scope="scope">
							<el-checkbox v-model='scope.row.checkStatus' />
						</template>
					</el-table-column>
					<el-table-column label="序号" min-width="50" prop="date" ></el-table-column>
					<el-table-column label="姓名" min-width="100" prop="name" >
						<!-- <template slot-scope="scope">
							{{scope.row.name + (scope.row.checkStatus?'(已选择)':'')}}
						</template> -->
					</el-table-column>
					<el-table-column label="出生年份" min-width="150" prop="dateBirth" ></el-table-column>
					<el-table-column label="资格类型" min-width="150" prop="business" ></el-table-column>
					<el-table-column label="证书编号" min-width="150" prop="certificateNo" ></el-table-column>
				</el-table>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="queryParams.pageNation.currentPage"
					:page-size="queryParams.pageNation.pageSize"
					:page-sizes="[10, 20, 30, 50, 100]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
					style="text-align: center;">
				</el-pagination> 
			</div>
			<div class="bottomLine"></div>
			<el-row>
				<el-col :span="24">
					<el-form-item label="是否返聘" prop="radio" >
						<el-radio v-model="form.radio" label="2" @change='changeRadio'>否</el-radio>
						<el-radio v-model="form.radio" label="1" @change='changeRadio'>是</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="linklabel">
				<el-col :span="24">
					<el-form-item ref="fileUpload" label-width="300px" label="责任书证书、转注证明(如有)彩色扫描件" prop="technologyDocument" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '责任书证书、转注证明(如有)彩色扫描件'}"
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
				<el-col :span="24" >
					<el-form-item ref="fileUpload" label-width="300px" label="身份证正反面彩色扫描件" prop="technologyDocument0" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '身份证正反面彩色扫描件'}"
							:file-list="form.technologyDocument0"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument0')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument0')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="linklabel">
				<el-col :span="24"> 
					<el-form-item ref="fileUpload" label-width="300px" label="现申报单位的劳动合同(六个月内新聘用人员需提供原聘用单位的解聘证明或任职关系证明复印件)" prop="technologyDocument1" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '现申报单位的劳动合同(六个月内新聘用人员需提供原聘用单位的解聘证明或任职关系证明复印件)'}"
							:file-list="form.technologyDocument1"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument1')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument1')}"
							:on-error="fileUploadError">
							<el-button size="small" type="primary">点击上传</el-button>
							<span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="linklabel">
				<el-col :span="24" >
					<el-form-item ref="fileUpload" label-width="300px" label="近六个月现申报单位社保证明(军队或高校的主要专业技术人员可不提供社保证明，但需提供所在单位人事主管部门的人事证明材料)" prop="technologyDocument2" class="redStar">
						<el-upload
							:action="fileUploadUrl"
							:on-preview="handlePreview"
							:before-remove="beforeRemove"
							:data="{fieldCode: 'BAWJ', fieldName: '近六个月现申报单位社保证明(军队或高校的主要专业技术人员可不提供社保证明，但需提供所在单位人事主管部门的人事证明材料)'}"
							:file-list="form.technologyDocument2"
							:multiple="false"
							:limit="1"
							:before-upload="beforeUpload"
							:on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument2')}"
							:on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument2')}"
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
	components: {
		
	},
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
			totalCount:200,
			title: '添加单位技术人员构成',
      dialogFormVisibleType:false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      tableData: [
        {
          business: "责任设计师:文物保护规划,古建筑",
					certificateNo: "ZRSJ20150053;",
					checkStatus: null,
					dateBirth: null,
					docType: {},
					finishFlag: "1",
					id: "8a8086a170f610870171e97c30240311",
					instName: "北京诗琴园林设计有限公司（测试11）",
					name: "毕毅",
					newInstId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
					organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
					otherFlag: null,
					perRangeCode: "责任设计师:1,责任设计师:2",
					perTypeCode: "1",
					qualificationType: "责任设计师",
					rehireAfterRetirement: "0",
					userId: "71DC4522-13B9-4D6D-9C26-56496FE4357E"
        },
        {
          business: "考古",
					certificateNo: "设计师",
					checkStatus: null,
					dateBirth: "2020",
					docType: {},
					finishFlag: "1",
					id: "8a8086a170f610870171e97c30250312",
					instName: "北京诗琴园林设计有限公司（测试11）",
					name: "李丽",
					newInstId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
					organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
					otherFlag: null,
					perRangeCode: null,
					perTypeCode: null,
					qualificationType: "其他技术骨干",
					rehireAfterRetirement: null,
					userId: null
        }
			],
			tableData1: [
				{
					business: "责任设计师:古建筑,古文化遗址古墓葬,近现代重要史迹及代表性建筑",
					certificateNo: "",
					dateBirth: null,
					name: "阿布都艾尼·阿不都拉",
					new_inst_name: null,
					num: "1",
					perRangeCode: "责任设计师:2,责任设计师:5,责任设计师:6",
					perTypeCode: "1",
					qualificationType: "责任设计师",
					userId: "9F23715D-9C74-4023-BD17-62F59EC00A3C"
				},
				{
					business: "责任工程师:古建筑,石窟寺和石刻,壁画(含彩塑)",
					certificateNo: "ZRGC20151293;",
					dateBirth: null,
					name: "阿尔史体",
					new_inst_name: "常熟古建园林股份有限公司（测试11）",
					num: "2",
					perRangeCode: "责任工程师:2,责任工程师:3,责任工程师:4",
					perTypeCode: "2",
					qualificationType: "责任工程师",
					userId: "D2C0EE64-399B-4E6F-B08A-C8C1E02CC8BA"
				}
			],
			checkData:null,
			form: {
				provinceList:[],
				province:[],
				radio: '2',
				nationalSecurityName:'',
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
		handleSizeChange(){

		},
		handleCurrentChange(){

		},
		//获取表格数据
		getTableData(){
			console.log(this.form);
			console.log('调用表格接口并赋值');
		},
		//选择人员职称List
		changeprovinceList(provinceList){
			console.log(provinceList)
			this.getTableData()
		},
		// 选择业务范围
		changeprovince(province){
			console.log(province)
			this.getTableData()
		},
		// 是否返聘
		changeRadio(value){
			console.log(value)
			this.getTableData()
		},
		// 行点击
		rowClick(value){
			if(value.checkStatus){
				value.checkStatus=null;
				this.checkData=null;
				this.propsData(null);
			}else{
				this.tableData.forEach((item)=>{
					item.checkStatus=null;
				})
				value.checkStatus=true;
				this.checkData=value;
				this.propsData(value);
			}
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
	.linklabel /deep/ .el-form-item__label {
		white-space: normal !important;
		line-height: 15px;
	}
	.bottomlike /deep/ .el-form-item--small.el-form-item {
		margin-bottom: 0px;
	}
	/deep/ .applyFormItem {
		padding: 0px !important;
	}
	/deep/ .el-checkbox__input{
    font-size: 12px;
  }
  /deep/ .el-checkbox__label{
    font-size: 12px;
  }
	.bottomLine{
		border-bottom: 1px solid #e5e5e5;
		margin-top: 10px;
		margin-bottom: 3px;
	}
	// .row_1 {
  //   // display: inline-block;
  //   margin: 0 auto;

  //   .keyword {
  //     width: 400px;
  //   }

  //   /deep/ .el-date-editor.el-input__inner {
  //     width: 260px;
  //   }

  //   /deep/ .el-input-group__prepend {
  //     width: 128px;
  //     background-color: #fff;

  //     .el-input__inner {
  //       width: 131px;
  //     }
  //   }
  // }
	// .header_button_two {
  //   margin-top: -6px;
  //   vertical-align: middle;
  //   height: 50px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   padding-right: 12px;
  //   padding-left: 20px;
  //   // border-bottom: 1px solid #e6ebf5;
  // }
</style>

