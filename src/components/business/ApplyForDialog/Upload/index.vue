<template>
  <div>
    <el-card shadow="never">
      <div slot="header">上传最终稿</div>
        <el-scrollbar :style="{height: (dialogHeight - 100) + 'px'}">
          <el-form
            ref="scholar"
            :model="form"
            label-position="left"
            label-width="130px"
            :show-message="false">
            <el-form-item ref="fileUpload" label="上传最终稿" prop="technologyDocument" class="redStar">
              <el-upload
                :action="fileUploadUrl"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :data="{fieldCode: 'BAWJ', fieldName: '上传最终稿'}"
                :file-list="form.technologyDocument"
                :multiple="false"
                :limit="1"
                :before-upload="beforeUpload"
                :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
                :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
                :on-error="fileUploadError">
                <el-button size="small" type="primary">点击上传</el-button>
                <span slot="tip" class="el-upload__tip">支持扩展名：doc./DOC./docx./DOCX</span>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-card>
  </div>
</template>
<script>
// import TableOptMenu from '@/components/commons/TableOptMenu'
import API_PREFIX from '@/api/config'
export default {
  components: {
  },
  data() {
    return {
       // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
     
    }
  },
  methods: {
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
    // 搜索按钮
    searchFun() {
      // this.searchWait()
    },
    resetForm( ){

    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
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
    dialogHeight() {
      return this.$store.getters.screenHeight > 180
        ?  180
        : this.$store.getters.screenHeight;
    },
  },
}
</script>
<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x:hidden
  }
  .el-upload__tip{
    margin-left: 15px;
  }
  .row_1 {
    display: inline-block;
    margin: 0 auto;

    .keyword {
      width: 540px;
    }
    /deep/ .el-date-editor.el-input__inner {
      width: 260px;
    }

    /deep/ .el-input-group__prepend {
      width: 128px;
      background-color: #fff;

      .el-input__inner {
        width: 131px;
      }
    }

    // /deep/ .el-input__inner {
    //   width: 350px;
    // }
  }
</style>

