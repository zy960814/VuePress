<template>
  <div class="assignment clear-float">
    <div class="header">
      <span style="font-weight:700;font-size:12px;">分派</span>
    </div>
    <div class="content clear-float">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="110px">
        <el-form-item>
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">文物保护与考古司</el-radio>
            <el-radio :label="2">博物馆与社会文物司</el-radio>
            <el-radio :label="3">督察司</el-radio>
            <el-radio :label="4">政策法规司</el-radio>
            <el-radio :label="5">机关党委、人事司</el-radio>
            <el-radio :label="6">革命文物司</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 9px">
            <common-language @language="language" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="办理意见" prop="remark" class="redStar">
            <el-input type="textarea" :rows="4" v-model="form.remark" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
import CommonLanguage from '@/components/commons/CommonLanguage'
import { handleAppointment, appraisalAccept } from '@/api/appraisal/temp-entry'

export default {
  components: {
    CommonLanguage
  },
  props: {
    itemId: String
  },
  data() {
    return {
      acceptNotice: {}, // 受理通知书信息
      form: {
        remark: '',
        radio: 1
      },
      rules: {
        remark: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    acceptIndex: function() {
      this.acceptNotice.remark = ''
    }
  },
  mounted() {
    // 查询受理通知书
    // getAcceptNotice({ itemId: this.itemId }).then(
    //   ({ data }) => (this.acceptNotice = data)
    // )
  },
  methods: {
    // 受理、预约调整 TAB 切换
    handleSelect(tabIndex) {
      this.handleIndex = tabIndex
    },
    // 常用语下拉框
    language(value) {
      this.form.remark += value
    },
    submitData() {
      if (this.handleIndex === '1') {
        // 受理
        this.$refs[`accept_${this.acceptIndex}`].getData().then(formData => {
          formData.noticeType = this.acceptIndex
          appraisalAccept(formData).then(() => {
            this.$router.go(-1)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          })
        })
      } else {
        // 预约调整
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.itemId = this.itemId
            handleAppointment(this.form).then(() => {
              this.$router.go(-1)
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.yy_time.el-date-editor.el-input,
/deep/ .yy_time.el-date-editor.el-input__inner {
  width: 277px;
}

.bl_place .el-radio {
  width: 123px;
}

.detail_addr {
  flex: 1;
  margin-left: 11px;
}
.content {
  border: 1px solid gray;
  border-top: none;
  padding: 20px;
}
.header {
  //   font-weight: bold;
  background-color: #f2f2f2;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border: 1px solid gray;
  //   margin-top: 10px;
}
</style>
