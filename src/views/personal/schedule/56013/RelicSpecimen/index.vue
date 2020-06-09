<template>
  <apply-form-item data="文物或标本信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="文物或标本名称" prop="relicSpecimenName" class="redStar">
            <el-input v-model="form.relicSpecimenName" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="地理位置信息" prop="geographyLocation" class="redStar">
            <el-input v-model="form.geographyLocation" placeholder="描述不超过2000个汉字"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="详细介绍"
            prop="detailInstroduction"
            class="redStar"
            style="margin-bottom:0px;"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述请包含文物或标本的价值评估、现状评估、保护措施等相关信息，不超过2000个汉字"
              v-model="form.detailInstroduction"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
export default {
  name: 'RelicSpecimen',
  components: {
    ApplyFormItem
  },
  data() {
    return {
      // 携运人信息
      form: {
        relicSpecimenName: '',
        geographyLocation: '',
        detailInstroduction: ''
      },

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          relicSpecimenName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          geographyLocation: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          detailInstroduction: [
            { max: 2000, message: '长度最大 20000 个字符', trigger: 'change' }
          ]
        },
        submit: {
          relicSpecimenName: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          geographyLocation: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          detailInstroduction: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 2000, message: '长度最大 20000 个字符', trigger: 'change' }
          ]
        }
      }
    }
  },
  created() {},
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
    beforeUpload(file) {
      console.log(file)

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
              this.form.applyDocumentNo = `${this.form.applyDocumentNum_part1}${this.form.applyDocumentNum_part2}${this.form.applyDocumentNum_part3}`
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
.labelZero {
  /deep/.el-form-item__content {
    margin-left: 0px !important;
  }
}

.inpuWidthBox {
  width: 2000%;
}
.inpuWidth {
  width: calc(2000% - 40px) !important;
}
</style>
