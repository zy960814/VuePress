<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">全国重点文物保护单位原址保护措施申请</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertL_one>
          <span style="font-size:12px;">
            <i class="el-icon-time" style="margin-right:3px;"></i>本事项承诺办结时限为20个工作日（委托评估、专家评审时间除外）
          </span>
        </template>
        <template #titleInsertR_one>
          <el-button @click="saveOrSubmit('save')" type="primary">保存</el-button>
          <el-button @click="saveOrSubmit('submit') " type="primary">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </template>
        <template #titleInsertR_two>
          <el-link @click="$emit('link-text-click')" type="primary" class="fr title_link">办事指南</el-link>
        </template>
        <template #body>
          <!-- 提交弹框 -->
          <my-dialog
            width="1024px"
            class="boxCard_dialog"
            :height="dialogHeight+'px'"
            :visible.sync="dialogVisible"
          >
            <el-card shadow="never">
              <div slot="header">全国重点文物保护单位原址保护措施申请</div>
              <el-scrollbar :style="{height: dialogHeight-138+'px'}">
                <!-- <div style="margin-bottom:10px;"> -->
                <confirm-message :key="Math.random()" :applyFormData="applyFormData" />
                <!-- </div> -->
              </el-scrollbar>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirm">确定</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </span>
          </my-dialog>
          <!-- 中间内容 -->
          <div class="scrollBox" :style="{height: contentHeight}">
            <basic-information
              applyType="56004"
              class="hxl_item"
              ref="basicInformation"
              id="basicInformation"
            ></basic-information>
            <project-information
              class="hxl_item"
              ref="projectInformation"
              id="projectInformation"
              applyType="56004"
            ></project-information>
            <apply-material class="hxl_item" ref="applyMaterial" id="applyMaterial"></apply-material>
          </div>
        </template>
      </apply-form>
    </el-card>
  </div>
</template>

<script>
import BasicInformation from '@/views/personal/schedule/BasicInformation'
import ApplyForm from '@/components/commons/ApplyForm'
// import ProjectInformation from './ProjectInformation'
// import ApplyMaterial from './ApplyMaterial'
// import ConfirmMessage from './ConfirmMessage'
import ProjectInformation from '@/components/business/ProjectInformation_04051012'
import ApplyMaterial from '@/components/business/ApplyMaterial_04051012'
import ConfirmMessage from '@/components/business/ConfirmMessage56004'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    BasicInformation,
    ApplyForm,
    ProjectInformation,
    ApplyMaterial,
    ConfirmMessage,
    MyDialog
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      // 切换按钮标题
      titleData: ['基本信息', '项目信息', '申请材料'],
      applyFormData: {}
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
  watch: {},
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
    // 保存或提交
    saveOrSubmit(type) {
      if (this.$refs.projectInformation.$refs.basicMessage.$refs.designDialog) {
        Promise.all([
          this.$refs.basicInformation.getFormData(type),
          this.$refs.basicInformation.$refs.nationalsecurityDialog.getFormData(
            type
          ),
          this.$refs.projectInformation.$refs.basicMessage.getFormData(type),
          this.$refs.projectInformation.$refs.basicMessage.$refs.designDialog.getFormData(
            type
          ),
          this.$refs.projectInformation.$refs.basicMessage.$refs.chargepersonDialog.getFormData(
            type
          ),
          this.$refs.projectInformation.$refs.projectSituation.getFormData(
            type
          ),
          this.$refs.applyMaterial.getFormData(type)
        ]).then(val => {
          let form = Object.assign(...val)
          form.applyDocumentNo = `${form.applyDocumentNum_part1}${form.applyDocumentNum_part2}${form.applyDocumentNum_part3}`
          this.applyFormData = JSON.parse(JSON.stringify(form))
          delete this.applyFormData['applyDocumentNum_part1']
          delete this.applyFormData['applyDocumentNum_part2']
          delete this.applyFormData['applyDocumentNum_part3']

          if (type === 'save') {
            // 下面调用接口--------
          } else if (type === 'submit') {
            this.dialogVisible = true
          }
          // 下面调用接口--------
        })
      } else {
        Promise.all([
          this.$refs.basicInformation.getFormData(type),
          this.$refs.basicInformation.$refs.nationalsecurityDialog.getFormData(
            type
          ),
          this.$refs.projectInformation.$refs.basicMessage.getFormData(type),
          this.$refs.projectInformation.$refs.basicMessage.$refs.chargepersonDialog.getFormData(
            type
          ),
          this.$refs.projectInformation.$refs.projectSituation.getFormData(
            type
          ),
          this.$refs.applyMaterial.getFormData(type)
        ]).then(val => {
          let form = Object.assign(...val)
          form.applyDocumentNo = `${form.applyDocumentNum_part1}${form.applyDocumentNum_part2}${form.applyDocumentNum_part3}`
          this.applyFormData = JSON.parse(JSON.stringify(form))
          delete this.applyFormData['applyDocumentNum_part1']
          delete this.applyFormData['applyDocumentNum_part2']
          delete this.applyFormData['applyDocumentNum_part3']
          // console.log(this.applyFormData)

          if (type === 'save') {
            // 下面调用接口--------
          } else if (type === 'submit') {
            this.dialogVisible = true
          }
          // 下面调用接口--------
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  /deep/ .el-card__header {
    padding: 10px 12px;
    .title_link {
      line-height: 23px;
    }
  }
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  /deep/.el-scrollbar__bar.is-horizontal {
    display: none;
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
    .el-form {
      padding: 0 18px;
      .el-form {
        padding: 0 0px;
      }
    }

    .el-select,
    .el-date-editor.el-input,
    .el-date-editor--daterange.el-input__inner {
      width: 100%;
    }

    .spilt .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .el-upload__tip {
      margin-left: 10px;
      font-size: 14px;
    }
    .el-textarea__inner {
      border: 1px solid gray;
    }
    .el-dialog__body {
      padding: 0px 20px !important;
    }
  }
}
</style>
