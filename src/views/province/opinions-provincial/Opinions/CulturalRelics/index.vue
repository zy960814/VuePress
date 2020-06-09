<template>
	<div  class="content">
		<!-- <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="allData.CulturalRelics.form"
      label-position="left"
      label-width="130px"
      :show-message="false">
			<el-row>
        <el-col :span="24">
          <el-form-item label="意见" prop="opinionContent" class="redStar">
            <el-input
              type="textarea"
              v-model="form.opinionContent"
              :autosize="{ minRows: 5}">
            </el-input>
          </el-form-item>
        </el-col>
			</el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否通过">
            <el-radio-group v-model="form.isIllegal">
              <el-radio label="建议通过" value="0"></el-radio>
              <el-radio label="建议不通过" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="附件" prop="technologyDocument" >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '附件'}"
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
		</el-form> -->
    <vertical-table
        style="width:100%;"
        :verticalTableData="personInfo"
        :verticalTableTitle="thingVerticalTableTitle"
        width="150px">
        <template v-for="(item,k) in statusbuttonblotname">
          <img :src="item.src" :key='k' :slot="item.title"/>
        </template>
      </vertical-table>
	</div>
</template>
<script>
// import PictureUpload from "@/components/commons/PictureUpload"
import API_PREFIX from '@/api/config'
import VerticalTable from '@/components/commons/VerticalTable'
export default {
  components: {
    // PictureUpload
    VerticalTable
  },
  props:{
    allData:{
      type:Object
    },
    status:{
      type:Number,
    },
  },
  watch:{
    status(curVal){
      if(curVal){
        this.status=curVal
      }
    },
    allData(curVal){
      if(curVal){
        this.allData=curVal
      }
    },
  },
	data() {
		return {
      nationalInput: true,
      provinceDisabled: true,
      firstOpinionDisabled: true,
      provinceArr: [
        { value: '0', label: '北京' },
        { value: '1', label: '安徽' },
        { value: '2', label: '江西' },
        { value: '3', label: '江苏' },
        { value: '4', label: '西藏' }
      ],
      options:[],
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
			// 表单校验规则的选用方案
      ruleKey: 'default',
			// 三套表单校验规则
      rules: {
        default: {},
        save: {
          nationalSecurityName: [],
          province: [],
          projectName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          designPerson: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          nationalSecurityName: [
            { required: true, message: '', trigger: 'change' }
          ],
          province: [{ required: true, message: '', trigger: 'change' }],
          projectName: [
            { required: true, message: '', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          designPerson: [
            { required: true, message: '', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          sendOrganization: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          otherIntroduction: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
        }
      },
      personInfo:{},
      thingVerticalTableTitle:[
        { opinionContent:'意见' },
        { isIllegal:'是否通过' },
        { technologyDocument:'附件' },
      ],
      statusbuttonblotname:[ 
        {title:'line_20',src:'111'},
      ]
    }
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
  },
}
</script>

<style  lang="scss" scoped>
  .pr5 {
      margin-left: 16.7px;
  }
  .content {
    margin-top: 10px;
  }
  /deep/.el-form-item__label {
    white-space: break-spaces;
  }
</style>

