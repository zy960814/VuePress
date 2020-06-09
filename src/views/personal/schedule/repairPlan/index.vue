<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物保护单位修缮年度计划申请</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertL_one>
          <span style="font-size:12px;">
            <i class="el-icon-time" style="margin-right:3px;"></i>
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
            <!-- <confirm-message
              :key="Math.random()"
              :height="dialogHeight-138+'px'"
              :applyFormData="applyFormData"
            />-->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirm">确定</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </span>
          </my-dialog>
          <!-- 中间内容 -->
          <div class="scrollBox" :style="{height: contentHeight}">
            <province-document-information
              class="hxl_item"
              ref="provinceDocumentInformation"
              id="provinceDocumentInformation"
            ></province-document-information>
            <enclosure class="hxl_item" ref="enclosure" id="enclosure"></enclosure>
          </div>
        </template>
      </apply-form>
    </el-card>
  </div>
</template>

<script>
import ApplyForm from '@/components/commons/ApplyForm'
import Enclosure from './Enclosure'
import ProvinceDocumentInformation from './ProvinceDocumentInformation'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    ApplyForm,
    Enclosure,
    ProvinceDocumentInformation,
    MyDialog
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      // 切换按钮标题
      titleData: ['省文件信息', '附件信息'],
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
    // this.$refs.basicInformation.getFormData(type),
    // this.$refs.applyMaterial.getFormData(type)
    saveOrSubmit(type) {
      Promise.all([
        this.$refs.provinceDocumentInformation.getFormData(type),
        this.$refs.enclosure.getFormData(type)
      ]).then(val => {
        let form = Object.assign(...val)
        this.applyFormData = JSON.parse(JSON.stringify(form))
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
</script>

<style lang="scss" scoped>
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
