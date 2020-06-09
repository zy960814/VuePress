<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="工程级别填写说明" name="1">
        <template slot="title">
          <span class="collapseSty">工程级别填写说明</span>
        </template>
        <table border="0" cellspacing="0" cellpadding="0"  width="900" class="tableBox">
          <tr>
            <td colspan="1" class="text">一级</td>
            <td colspan="18">
              <p class="textLeft">全国重点文物保护单位和国家文物局指定的重要文物的修缮工程、迁移工程、重建工程的方案及施工图设计，保护规划编制。</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" class="text">二级</td>
            <td colspan="18">
              <p class="textLeft" >1.全国重点文物保护单位的保养维护工程、抢险加固工程的方案及施工图设计。</p>
              <p class="textLeft" >2.省级文物保护单位的修缮工程、迁移工程、重建工程的方案及施工图设计、保护规划编制。</p>
              <p class="textLeft" >3.市、县级文物保护单位和尚未核定公布为文物保护单位的不可移动文物的迁移工程、重建工程。</p>
            </td>
          </tr>
          <tr>
            <td colspan="1" class="text">三级</td>
            <td colspan="18">
              <p class="textLeft">1.省局文物保护单位的保养维护工程、抢险加固工程的方案及施工图设计。</p>
              <p class="textLeft">2.市、县级文物保护单位和尚未核定公布为文物保护单位的不可移动文物的保养维护工程、抢险加固工程、修缮工程的方案及施工图设计、保护规划编制。</p>
            </td>
          </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
      <el-form
        ref="history"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="130px"
        :show-message="false">
        <el-row style="margin-top:10px;">
          <el-col :span="11">
            <el-form-item label="工程级别" prop="projectLevel " class="redStar">
              <el-select v-model="form.projectLevel" placeholder="请选择" >
                <el-option
                  width="100%"
                  v-for="(label,key)  in  projectLevel"
                  :label="label.qualRangeName"
                  :key="key"
                  :value="label.qualRangeCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目名称" prop="projectName" class="redStar">
              <el-input v-model="form.projectName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="文物保护单位名称" prop="protectDepart" class="redStar">
              <el-input v-model="form.protectDepart"/> 
              <!-- <el-button type="primary" style="flex-grow:1;" @click="dialogVisible=true">选择</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="保护单位级别" prop="protectionDepartLevel" class="redStar">
              <el-select v-model="form.protectionDepartLevel" placeholder="请选择" >
                <el-option
                  width="100%"
                  v-for="(label,key)  in  protectionDepartLevelOption"
                  :label="label.qualRangeName"
                  :key="key"
                  :value="label.qualRangeCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="批准部门" prop="projectName" class="redStar">
              <el-input v-model="form.projectName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="box">
          <el-col :span="24">
            <el-form-item label="批准门号" prop="projectName" class="redStar">
              <el-input v-model="form.projectName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bottomLine"></div>
        <el-row>
          <el-col :span="24">
            <el-form-item ref="fileUpload"  label-width="315px" label="项目批复文件扫描件(含立项、方案批复及核准函)" prop="technologyDocument" class="redStar">
              <el-upload
                :action="fileUploadUrl"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :data="{fieldCode: 'BAWJ', fieldName: '项目批复文件扫描件(含立项、方案批复及核准函)'}"
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
        <el-row>
          <el-col :span="24">
            <el-form-item ref="fileUpload"  label-width="315px" label="项目合同及中标通知书（如有）扫描件并加盖公章" prop="technologyDocument" class="redStar">
              <el-upload
                :action="fileUploadUrl"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :data="{fieldCode: 'BAWJ', fieldName: '项目合同及中标通知书（如有）扫描件并加盖公章'}"
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
        <el-row>
          <el-col :span="24">
            <el-form-item ref="fileUpload"  label-width="315px" label="项目设计方案扉页扫描件(含图纸报审专用章和项目人员签字)" prop="technologyDocument1" class="redStar">
              <el-upload
                :action="fileUploadUrl"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :data="{fieldCode: 'BAWJ', fieldName: '项目设计方案扉页扫描件(含图纸报审专用章和项目人员签字)'}"
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
      </el-form>
  </div>
</template>
<script>
import API_PREFIX from "@/api/config";
export default {
  components: {
    
  },
  props:{
    returnFormData:{
      type:Function
    }
  },

  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      form: {
        startTime: "",
        finishTime: "",
        projectLevel: "",
        protectionDepartLevel: ""
      },
      activeNames:'1',
      projectLevel: [
        { qualRangeName: "一级", qualRangeCode: "1" },
        { qualRangeName: "二级", qualRangeCode: "2" },
        { qualRangeName: "三级", qualRangeCode: "3" }
      ],
      protectionDepartLevelOption: [
        { qualRangeName: "全国重点文物保护单位", qualRangeCode: "1" },
        { qualRangeName: "省级文物保护单位", qualRangeCode: "2" },
        { qualRangeName: "市、县级文物保护单位", qualRangeCode: "3" },
        {
          qualRangeName: "尚未核定公布为文物保护单位的不可移动文物",
          qualRangeCode: "4"
        }
      ],
      pickeroptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      rules: {
        projectLevel:[
            { required: true, message: '请输入工程级别',  trigger: 'change' },
            { min: 0, max: 200, message: '',  trigger: 'change' }
        ],
        projectName:[
            { required: true, message: '请输入项目名称', trigger: 'change'},
            { min: 0, max: 200, message: '',  trigger: 'change'}
        ],
        protectDepart:[
            { required: true, message: '请输入文物保护单位名称', trigger: 'change'},
            { min: 0, max: 200, message: '',  trigger: 'change'}
        ],
        protectionDepartLevel:[
          { required: true, message: '请选择保护单位级别',  trigger: 'change' },
        ],
        startTime:[
          { required: true, message: '请选择开始时间',  trigger: 'change' },
        ],
        finishTime:[
          { required: true, message: '请选择验收时间', trigger: 'change'}, 
        ],
        technologyDocument:[], //图片校验
        technologyDocument0:[],        
        technologyDocument1:[],
        technologyDocument2:[],
      },
    }
  },
  methods: {
    // 表单校验
    validataForm(){
      this.$refs['history'].validate(vaild=>{
        if(vaild){
          this.returnFormData(this.form)
        }
      })
    },
    
    confirm() {
      // console.log(this.$refs.designDocument.$refs.selfDocument)
      if (this.$refs.designDocument.$refs.selfDocument) {
        Promise.resolve(
          this.$refs.designDocument.$refs.selfDocument.getFormData()
        ).then(val => {
          this.dialogVisible = false
          this.showSelect = false
          this.form.designPerson = val.designPerson
        })
      } else if (this.$refs.designDocument.$refs.selectDocument) {
        this.dialogVisible = false
        this.showSelect = true
        this.form.designPerson = this.designDocumentObject.designPerson
        this.form.qualityType = this.designDocumentObject.qualityType
        this.form.level = this.designDocumentObject.level
        this.form.businessRange = this.designDocumentObject.businessRange
      }
    },
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log(file);

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
      return this.$confirm("确定要移除文件 " + file.name + " 吗？", {
        type: "warning"
      });
    },
    // 文件列表移除了某个文件的回调
    handleRemove(file, fileList, name) {
      this.form[name] = fileList;
    },
    // 文件上传成功的回调
    fileUploadSuccess(response, file, name) {
      if (response.code === 200) {
        // 清除文件必填项校验提示
        this.$refs.fileUpload.clearValidate();
        const { data } = response;
        data.uid = file.uid;
        data.name = data.fileName;
        this.form[name].push(data);
      } else {
        this.$message({
          showClose: true,
          message: "文件上传失败",
          type: "error"
        });
      }
    },
    // 文件上传失败的回调
    fileUploadError() {
      this.$message({
        showClose: true,
        message: "文件上传失败。",
        type: "error"
      });
    },
    beforeUpload(file) {
      const fileExt = file.name.replace(/.+\./, "");
      // 判断文件格式doc / docx / pdf
      if (["doc", "docx", "pdf"].indexOf(fileExt.toLowerCase()) === -1) {
        this.$alert("请上传后缀名为 doc、docx、pdf的文件", {
          confirmButtonText: "我知道了",
          type: "warning"
        });
        return false;
      }
      // 判断文件大小
      if (file.size > 1 * 1024 * 1024 * 1024) {
        this.$alert(`上传的文件大小不能超过 800M`, {
          confirmButtonText: "我知道了",
          type: "warning"
        });
        return false;
      }
      // this.disabled = this.fileList && this.fileList.length === this.limit
    }
  },
}
</script>
<style  lang="scss" scoped>
  .el-select, .el-date-editor.el-input,
    /deep/ .el-date-editor--daterange.el-input__inner {
      width: 100%;
  }
  .title {
    background-color: #dcdfe6;
    align-items: center;
    display: flex;
    height: 30px;
    margin: 10px 0;
    padding-left: 10px;
  }
  .text {
    width: 50px;
    text-align: center;
  }
  .textLeft {
    text-align: left;
    padding-left: 10px;
  }
  .el-upload__tip{
    margin-left: 15px;
  }
  .boxBottom {
    margin-bottom: 10px;
  }
  .tableBox{
    width: 900px!important;
    margin: 0 8px;
    border-top: 1px gray solid !important ;
    border-left: 1px gray solid !important ;  
  }
  .tableBox td{
    border-bottom: 1px gray solid !important ;
    border-right: 1px gray solid !important ;
  }
  /deep/ .el-form-item__label {
    white-space: normal !important;
    line-height: 15px;
  }
  .box /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  .el-collapse-item__content {
    padding-bottom: 18px;
  }
  .collapseSty {
    font-size: 13px;
    font-weight: 700;
    padding-left: 18px;
    color: $--color-primary;
  }
  .bottomLine{
		border-bottom: 1px solid #e5e5e5;
		margin-top: 10px;
		margin-bottom: 10px;
	}
  .boxCard_dialog{
    z-index: 10001 !important;
  }
</style>

