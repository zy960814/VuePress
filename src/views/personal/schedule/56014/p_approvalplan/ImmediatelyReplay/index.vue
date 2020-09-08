<template>
  <apply-form-item data="立项批复文件">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <replay-dialog ref="replayDialog" />
      <!-- <el-row>
        <my-dialog
          width="1024px"
          :height="dialogHeight+'px'"
          :visible.sync="dialogVisible"
          class="boxCard_dialog"
        >
          <replay-document
            :height="dialogHeight-275+'px'"
            @nationalSecurity="earnNationalSecurity"
            @singleSelect="singleSelect"
          />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </span>
        </my-dialog>
        <el-col :span="24">
          <el-form-item label="批复文件标题" prop="replayDocumentTitle" class="redStar">
            <el-button type="primary" @click="dialogVisible=true">选择</el-button>
            <el-input
              v-model="form.replayDocumentTitle"
              style="width:90%;margin-left:10px;"
              :placeholder="titlePlaceholder"
              :disabled="replayDocumentDisabled"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="批复文号" prop="replayDocumentNo" class="redStar">
            <el-input
              v-model="form.replayDocumentNo"
              placeholder
              :disabled="replayDocumentDisabled"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="立项批复文件" prop="approvalResponse" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '立项批复文件'}"
              :file-list="form.approvalResponse"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'approvalResponse')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'approvalResponse')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="24">
          <el-form-item
            style="margin-bottom:0px;"
            ref="fileUpload"
            label="立项报告"
            prop="approvalReport"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '立项报告'}"
              :file-list="form.approvalReport"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'approvalReport')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'approvalReport')}"
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
import ReplayDialog from '@/components/business/ReplayDialog'
export default {
  name: 'ImmediatelyReplay',
  components: {
    ApplyFormItem,
    ReplayDialog
  },
  data() {
    return {
      // replayDocumentObject: null,
      replayDocumentDisabled: false,
      dialogVisible: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        replayDocumentTitle: '',
        replayDocumentNo: '',
        approvalResponse: [],
        approvalReport: []
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          replayDocumentTitle: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          replayDocumentNo: [
            { max: 50, message: '长度最大 50 个字符', trigger: 'change' }
          ]
        },
        submit: {
          replayDocumentTitle: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          replayDocumentNo: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 50, message: '长度最大 50 个字符', trigger: 'change' }
          ]
          // approvalResponse: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ]
        }
      },
      titlePlaceholder: '请选择或填写国家文物局关于本项目立项的批复文件标题'
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
    },
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      // this.replayDocumentObject = val
      this.form.replayDocumentTitle = val.replayDocumentTitle
      this.form.replayDocumentNo = val.replayDocumentNo
      if (val) {
        this.replayDocumentDisabled = true
      }
    },
    // 无此文件,手动上传
    singleSelect(val) {
      this.replayDocumentDisabled = !val
      // console.log(this.replayDocumentDisabled)
      this.form.replayDocumentTitle = ''
      this.form.replayDocumentNo = ''
      this.titlePlaceholder = '请填写国家文物局关于本项目立项的批复文件标题'
      // this.replayDocumentObject = null
    },
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
  width: 100%;
}
.inpuWidth {
  width: calc(100% - 40px) !important;
}
</style>
