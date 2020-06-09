<template>
  <div class="conten">
    <page-tabs
      :pageTabsData="pageTabsData"
      @handle-select="handleSelect"
      style="margin-bottom: 18px"
    ></page-tabs>
    <template v-if="handleIndex === '1'">
      <div style="text-align: center; margin-bottom: 18px">
        <el-radio v-model="acceptIndex" label="1">准予受理</el-radio>
        <el-radio v-model="acceptIndex" label="2">不予受理</el-radio>
        <el-radio v-model="acceptIndex" label="3">材料补正</el-radio>
      </div>
      <allow-acceptance ref="accept_1" :data="acceptNotice" v-if="acceptIndex === '1'" />
      <refuse-acceptance ref="accept_2" :data="acceptNotice" v-else-if="acceptIndex === '2'" />
      <material-correction ref="accept_3" :data="acceptNotice" v-else />
    </template>
    <template v-else>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="clear-float"
        label-position="left"
        label-width="110px"
      >
        <el-col :span="12">
          <el-form-item label="发送给：" prop="remark" class="redStar">
            <div style="display: flex; justify-content: space-between">
              <el-input v-model="form.remark" style="flex: 1"></el-input>
              <el-button type="primary" @click="showSendDialog" style="margin-left: 10px">选择</el-button>
            </div>
          </el-form-item>
        </el-col>
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
    </template>
    <!-- 选择--发送备选人弹框 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="sendDialogHeight + 'px'"
      center
      :visible.sync="sendDialogVisible"
      :append-to-body="true"
    >
      <select-dialog
        :pageTabsData="sendPageTabsData"
        title="选择发送人员"
        @handle-select="handleSelect"
        :height="sendDialogHeight + 'px'"
        ref="selectDialog"
      >
        <template #body_1>
          <el-scrollbar :style="{height: (sendDialogHeight - 170) + 'px'}">
            <SendDialog></SendDialog>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (sendDialogHeight - 170) + 'px'}">
            <SendDialog></SendDialog>
          </el-scrollbar>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendDialogVisible = false">确定</el-button>
        <el-button @click="sendDialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import PageTabs from '@/components/commons/PageTabs'
import CommonLanguage from '@/components/commons/CommonLanguage'
import AllowAcceptance from '@/components/business/approval-process/AllowAcceptance'
import RefuseAcceptance from '@/components/business/approval-process/RefuseAcceptance'
import MaterialCorrection from '@/components/business/approval-process/MaterialCorrection'
import { handleAppointment, appraisalAccept } from '@/api/appraisal/temp-entry'
import SelectDialog from '@/components/commons/SelectDialog'
import SendDialog from '@/components/business/ApplyForDialog/SendDialog'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    PageTabs,
    CommonLanguage,
    AllowAcceptance,
    RefuseAcceptance,
    MaterialCorrection,
    SendDialog,
    SelectDialog,
    MyDialog
  },
  props: {
    itemId: String
  },
  data() {
    return {
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '受理',
            num: ''
          },
          {
            title: '发送意见',
            num: ''
          }
        ]
      },
      handleIndex: '1', // 1受理, 2预约调整
      acceptIndex: '1', // 1准予受理, 2不予受理, 3材料补正
      acceptNotice: {}, // 受理通知书信息
      form: {
        id: null,
        itemId: '',
        type: '1',
        dealDay: '',
        dealTime: '',
        position: '窗口办理',
        adress: '',
        remark: ''
      },
      rules: {
        dealDay: [{ required: true, message: ' ', trigger: 'blur' }],
        dealTime: [{ required: true, message: ' ', trigger: 'blur' }],
        adress: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
        ]
      },
      sendPageTabsData: {tabs:[{title:'常用'},{title:'全部'}]},
      sendDialogVisible: false, // 发送备选人弹窗
      sendDialogHeight: 600 // 发送弹窗高度
    }
  },
  watch: {
    acceptIndex: function() {
      this.acceptNotice.situation = ''
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
    },
    showSendDialog(){
      this.sendDialogVisible = true
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
</style>
