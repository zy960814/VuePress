<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">水下文物的考古勘探和发掘活动申请</div>
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
            <basic-information
              applyType="56009"
              class="hxl_item"
              ref="basicInformation"
              id="basicInformation"
            ></basic-information>
            <project-information class="hxl_item" ref="projectInformation" id="projectInformation"></project-information>
            <apply-material
              class="hxl_item"
              ref="applyMaterial"
              id="applyMaterial"
              applyType="56009"
            ></apply-material>
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
        <div slot="header">水下文物的考古勘探和发掘活动申请</div>
        <el-scrollbar :style="{height: dialogHeight-138+'px'}">
          <confirm-message :key="Math.random()" :applyFormData="applyFormData" />
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
import BasicInformation from '@/views/personal/schedule/BasicInformation'
// import ProjectInformation from './ProjectInformation'
// import ApplyMaterial from './ApplyMaterial'
// import ConfirmMessage from './ConfirmMessage'
import ProjectInformation from '@/components/business/ProjectInformation_0809'
import ApplyMaterial from '@/components/business/ApplyMaterial_0809'
import ConfirmMessage from '@/components/business/ConfirmMessage56009'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    ApplyForm,
    BasicInformation,
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
        this.$refs.basicInformation.getFormData(type),
        this.$refs.projectInformation.$refs.basicMessage.getFormData(type),
        this.$refs.projectInformation.$refs.basicMessage.$refs.nationalsecurityDialog.getFormData(
          type
        ),
        this.$refs.projectInformation.$refs.textFact.getFormData(type),
        this.$refs.projectInformation.$refs.drawingFact.getFormData(type),
        this.$refs.projectInformation.$refs.explainFact.getFormData(type),
        this.$refs.projectInformation.$refs.materialFact.getFormData(type),
        this.$refs.applyMaterial.getFormData(type)
      ]).then(val => {
        let form = Object.assign(...val)
        form.applyDocumentNo = `${form.applyDocumentNum_part1}${form.applyDocumentNum_part2}${form.applyDocumentNum_part3}`
        this.applyFormData = JSON.parse(JSON.stringify(form))
        delete this.applyFormData['applyDocumentNum_part1']
        delete this.applyFormData['applyDocumentNum_part2']
        delete this.applyFormData['applyDocumentNum_part3']
        if (type === 'save') {
          console.log(type)
          // 下面调用接口--------
        } else if (type === 'submit') {
          this.dialogVisible = true
          // 下面调用接口--------
        }
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
      .el-form {
        padding: 0 0px;
      }
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
