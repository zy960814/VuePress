<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">馆藏一级文物复制方案申请</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertL_one>
          <span style="font-size:12px;">
            <i class="el-icon-time" style="margin-right:3px;"></i>本事项承诺办结时限为20个工作日（委托评估、专家评审时间除外）
          </span>
        </template>
        <template #titleInsertR_one>
          <el-button @click="download" type="primary">下载申请材料</el-button>
          <el-button @click="saveOrSubmit('save')" type="primary">保存</el-button>
          <el-button @click="saveOrSubmit('submit') " type="primary">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </template>
        <template #titleInsertR_two>
          <el-link @click="$emit('link-text-click')" type="primary" class="fr title_link">办事指南</el-link>
        </template>
        <template #body>
          <!-- 中间内容 -->
          <div class="scrollBox" :style="{height: contentHeight}">
            <applicant-information
              applyType="56015"
              class="hxl_item"
              ref="applicantInformation"
              id="applicantInformation"
            ></applicant-information>
            <apply-document
              applyType="56015"
              class="hxl_item"
              ref="applyDocument"
              id="applyDocument"
            ></apply-document>
            <relic-information
              class="hxl_item"
              ref="relicInformation"
              id="relicInformation"
              type="copy"
            ></relic-information>
          </div>
        </template>
      </apply-form>
    </el-card>
    <!-- 提交弹框 -->
    <my-dialog
      width="1024px"
      class="boxCard_dialog"
      :height="dialogHeight+'px'"
      :visible.sync="dialogVisible"
    >
      <el-card shadow="never">
        <div slot="header">馆藏一级文物复制方案申请确认</div>
        <el-scrollbar :style="{height: dialogHeight-138+'px'}">
          <confirm-message type="copy" :key="Math.random()" :applyFormData="applyFormData" />
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="cancle">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import ApplyForm from '@/components/commons/ApplyForm'
import ApplicantInformation from '../ApplicantInformation'
import ApplyDocument from '../ApplyDocument'
import RelicInformation from '../RelicInformation'
// import ConfirmMessage from '../ConfirmMessage'
import ConfirmMessage from '@/components/business/ConfirmMessage56015/copyPlan'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    ApplyForm,
    ApplicantInformation,
    ApplyDocument,
    RelicInformation,
    ConfirmMessage,
    MyDialog
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      // 切换按钮标题
      titleData: ['申请人信息', '申请文件', '文物信息'],
      applyFormData: {},
      menuKey: 1
    }
  },

  computed: {
    contentHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 238 : 279) +
        'px)'
      )
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 815
        ? 815
        : this.$store.getters.screenHeight
    }
  },

  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 锚点点击事件
    itemClick(tab) {
      let nodes = document.querySelectorAll('.hxl_item')
      document.querySelector('.scrollBox').scrollTop =
        nodes[+tab.index].offsetTop - nodes[0].offsetTop
    },
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
    },
    cancle() {
      this.dialogVisible = false
      // Object.keys(this.applyFormData).forEach(item => {
      //   this.applyFormData[item] = null
      // })
      // this.applyFormData = {}
    },
    // 保存或提交
    // this.$refs.basicInformation.getFormData(type),
    // this.$refs.applyMaterial.getFormData(type)
    saveOrSubmit(type) {
      Promise.all([
        this.$refs.applicantInformation.getFormData(type),
        this.$refs.applyDocument.getFormData(type),
        this.$refs.relicInformation.getFormData(type)
      ]).then(val => {
        this.$set(val[0], 'tableData', val[2])
        let form = Object.assign(val[0], val[1])
        this.applyFormData = JSON.parse(JSON.stringify(form))
        this.applyFormData.applyDocumentNo = `${this.applyFormData.applyDocumentNum_part1}${this.applyFormData.applyDocumentNum_part2}${this.applyFormData.applyDocumentNum_part3}`
        delete this.applyFormData['applyDocumentNum_part1']
        delete this.applyFormData['applyDocumentNum_part2']
        delete this.applyFormData['applyDocumentNum_part3']
        console.log(this.applyFormData)
        if (type === 'save') {
          console.log(type)
          // 下面调用接口--------
        } else if (type === 'submit') {
          this.dialogVisible = true
        }
        // 下面调用接口--------
      })
    },
    // 材料下载
    download() {}
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
.box-card {
  /deep/ .el-card__header {
    padding: 10px 12px;
    .title_link {
      line-height: 23px;
    }
  }

  /deep/ .el-card__body {
    padding: 12px;
    padding-top: 0px;

    .opt_btn {
      text-align: right;
    }

    .scrollBox {
      overflow-y: auto;
      padding-right: 1px;
    }
    /deep/.el-form {
      padding: 0 18px;
    }

    /deep/.el-select,
    /deep/.el-date-editor.el-input,
    /deep/ .el-date-editor--daterange.el-input__inner {
      width: 100%;
    }

    /deep/.spilt .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    /deep/ .el-upload__tip {
      margin-left: 10px;
      font-size: 14px;
    }
    /deep/.el-textarea__inner {
      border: 1px solid gray;
    }
    /deep/.el-dialog__body {
      padding: 0px 20px !important;
    }
  }
}
</style>
