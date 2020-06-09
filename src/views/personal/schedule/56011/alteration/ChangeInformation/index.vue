<template>
	<div>
		<el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="130px"
      :show-message="false">
			<el-row>
        <el-col :span="24">
          <el-form-item label="单位名称" prop="instName" class="redStar">
            <el-input v-model="form.instName" placeholder></el-input>
          </el-form-item>
        </el-col>
			</el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="单位地址" prop="creditCode" class="redStar">
            <el-input v-model="form.creditCode" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="法定代表人" prop="economicType" class="redStar" >
              <el-input v-model="form.economicType" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="注册资金(万元)" prop="money " class="redStar">
              <el-input v-model="form.money"  placeholder="可精确到小数点后四位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="经济性质" prop="linkPhone" class="redStar">
              <el-input v-model="form.linkPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="备注" prop="break">
              <el-input v-model="form.break" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
		</el-form>
	</div>
</template>
<script>
// import VerticalTable from '@/components/commons/VerticalTable'
// import StatusButton from '@/components/commons/StatusButton'
import API_PREFIX from '@/api/config'
export default {
  components: {
    // VerticalTable,
    // StatusButton
  },
  props:{
    status:{
      type:Number,
    }
  },
	data() {
		return {
      nationalInput: true,
      provinceDisabled: true,
      disabled:true,
			form: {
        instName: "",
        creditCode: "",
        money: "",
        applyDocumentNum_part1: "",
        applyDocumentNum_part2: "",
        applyDocumentNum_part3: "",
        economicType: "王盼盼",
        projectLevel: [],
        linkPhone: "",
      },
      projectLevel:[],
      statusAll:{
        form:false,//显示form还是显示表格
        cyzx:true,// 存疑 回头改个名
        cyzxShow:false,// 存疑显示 回头改个名
        formDisabled:false,//表单是否可编辑
      },
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      rules: {
        instName: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
        ],
        creditCode: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
        ],
        projectLevel: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
        ],
        economicType: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
        ],
        linkPhone: [
          { required: true, message: '请输入人员名称', trigger: 'change' },
          { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
        ],
      },
		}
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
  },
  computed: {
    
  },
  mounted() {

  },
}
</script>

<style  lang="scss" scoped>
  .pr5 {
      margin-left: 16.7px;
  }
  /deep/ .el-form-item__label {
    white-space: break-spaces;
  }
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
  
  // .verticalTable {
  //   // padding: 0 10px 10px 10px;
  // }
</style>

