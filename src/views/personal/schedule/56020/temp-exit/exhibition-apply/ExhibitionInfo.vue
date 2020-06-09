<template>
  <apply-form-item data="展览信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="100px"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="展览名称" prop="exhibitionName" class="redStar">
            <el-input v-model="form.exhibitionName" placeholder="请与批准文件上展览名称保持一致"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="展览时间" prop="pickerTime" class="redStar">
            <el-date-picker
              v-model="form.pickerTime"
              type="daterange"
              align="left"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="申报单位" prop="declarationUnit" class="redStar">
            <el-input v-model="form.declarationUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="主管单位" prop="msgUnit" class="redStar">
            <el-input v-model="form.msgUnit" placeholder="请填写申报单位的主管单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="承办单位" prop="organizer" class="redStar">
            <el-input v-model="form.organizer"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="负责人" prop="operator" class="redStar">
            <el-input v-model="form.operator"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="境外机构" prop="overseasUnit" class="redStar">
            <el-input v-model="form.overseasUnit" placeholder="请填写此次展览合作的境外机构名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="展览地点" prop="exhibitionVenue" class="redStar">
            <el-input v-model="form.exhibitionVenue" placeholder="请填写具体地址（城市、街道...）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="出境目的地" prop="destination" class="redStar">
            <el-input v-model="form.destination" placeholder="请填写具体地址（城市、街道...）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="批准文号" prop="dispatchFileNum" class="redStar">
            <el-input v-model="form.dispatchFileNum" placeholder="请填写此次展览的批准文件的文号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            ref="fileUpload"
            label="批准文件"
            prop="docType"
            class="redStar"
            style="margin-bottom: 0px;"
          >
            <el-upload
              :action="fileUploadUrl"
              :with-credentials="true"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :data="{fieldCode: 'PZWJ', fieldName: '批准文件'}"
              :file-list="form.docType"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-success="fileUploadSuccess"
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
  components: {
    ApplyFormItem
  },
  data() {
    return {
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadDexhibitionFile`,
      // 展览信息
      form: {
        pickerTime: null,
        id: null,
        itemId: '',
        exhibitionName: '',
        termStart: '',
        termEnd: '',
        declarationUnit: '',
        msgUnit: '',
        organizer: '',
        operator: '',
        overseasUnit: '',
        exhibitionVenue: '',
        destination: '',
        dispatchFileNum: '',
        docType: []
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          exhibitionName: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          declarationUnit: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          msgUnit: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          organizer: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          operator: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          overseasUnit: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          exhibitionVenue: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          destination: [
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          dispatchFileNum: [
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ]
        },
        submit: {
          exhibitionName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          pickerTime: [{ required: true, message: ' ', trigger: 'change' }],
          declarationUnit: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          msgUnit: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          organizer: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          operator: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          overseasUnit: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          exhibitionVenue: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          destination: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
          ],
          dispatchFileNum: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          docType: [
            { required: true, message: '请上传批准文件', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getData(type) {
      this.$refs['form'].clearValidate()
      this.ruleKey = type
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.form.termStart = this.form.pickerTime
                ? this.form.pickerTime[0]
                : ''
              this.form.termEnd = this.form.pickerTime
                ? this.form.pickerTime[1]
                : ''
              resolve({ ...this.form })
            } else {
              reject()
            }
          })
        })
      })
    },
    // 文件列表移除某个文件前的回调
    beforeRemove(file) {
      if (file && file.status === 'success') {
        return this.$confirm(`确定要移除文件 ${file.name} 吗？`, {
          type: 'warning'
        })
      }
    },
    // 文件列表移除了某个文件的回调
    handleRemove(file, fileList) {
      this.form.docType = fileList
    },
    // 文件上传前
    beforeUpload(file) {
      const fileExt = file.name.replace(/.+\./, '')
      // 判断文件格式
      if (['doc', 'docx', 'pdf'].indexOf(fileExt.toLowerCase()) === -1) {
        this.$alert('请上传后缀名为 doc、docx 或 pdf 的文件', {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
        return false
      }
      // 判断文件大小
      if (file.size > 800 * 1024 * 1024) {
        this.$alert('上传的文件大小不能超过 800M', {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
        return false
      }
    },
    // 文件上传成功的回调
    fileUploadSuccess(response, file) {
      if (response.code === 200) {
        // 清除文件必填项校验提示
        this.$refs.fileUpload.clearValidate()
        const { data } = response
        data.uid = file.uid
        data.name = data.fileName
        this.form.docType.push(data)
      } else {
        this.$store.dispatch('promptErrorMsg', '文件上传失败')
      }
    },
    // 文件上传失败的回调
    fileUploadError() {
      this.$store.dispatch('promptErrorMsg', '文件上传失败')
    },
    // 数据保存成功, 设置 id
    setId(id) {
      this.form.id = id
    },
    // 设置数据
    setData(data) {
        for (const key in this.form) {
            if (this.form.hasOwnProperty(key)) {
                this.form[key] = data[key]
            }
        }
        this.form.pickerTime = [data.termStart, data.termEnd]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 18px;
}

/deep/ .el-date-editor--daterange.el-input__inner {
  width: 100%;
}

/deep/ .el-upload__tip {
  margin-left: 10px;
  font-size: 14px;
}
</style>
