<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">考古发掘计划（一般事项）申请确认</div>
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
              class="hxl_item"
              ref="applicantInformation"
              id="applicantInformation"
            ></applicant-information>
            <explore-information class="hxl_item" ref="exploreInformation" id="exploreInformation" />
            <exploreobject-information
              class="hxl_item"
              ref="exploreobjectInformation"
              id="exploreobjectInformation"
            />
            <explore-location class="hxl_item" ref="exploreLocation" id="exploreLocation" />
            <map-tag class="hxl_item" ref="mapTag" id="mapTag" />
            <explore-plan class="hxl_item" ref="explorePlan" id="explorePlan" />
            <business-constitute class="hxl_item" ref="businessConstitute" id="businessConstitute" />
            <other-instroduction class="hxl_item" ref="otherInstroduction" id="otherInstroduction" />
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
      <!-- <confirm-message
        :key="Math.random()"
        :height="dialogHeight-138+'px'"
        :applyFormData="applyFormData"
        applyType="applyMaterialTitle_08"
      />-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="cancle">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import ApplyForm from '@/components/commons/ApplyForm'
import ApplicantInformation from './ApplicantInformation'
import ExploreInformation from './ExploreInformation'
import ExploreobjectInformation from './ExploreobjectInformation'
import ExploreLocation from './ExploreLocation'
import mapTag from './mapTag'
import ExplorePlan from './ExplorePlan'
import BusinessConstitute from './BusinessConstitute'
import OtherInstroduction from './OtherInstroduction'
// import ConfirmMessage from './ConfirmMessage'
import MyDialog from '@/components/commons/MyDialog'
export default {
  components: {
    ApplyForm,
    ApplicantInformation,
    ExploreInformation,
    ExploreobjectInformation,
    ExploreLocation,
    mapTag,
    ExplorePlan,
    BusinessConstitute,
    OtherInstroduction,
    // ConfirmMessage,
    MyDialog
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      // 切换按钮标题
      titleData: [
        '申请人信息',
        '考古发掘项目基本信息',
        '考古发掘对象信息',
        '发掘地点位置信息',
        '地图标注',
        '发掘计划及有关情况',
        '考古发掘项目负责人、主要业务人员构成',
        '其他说明'
      ],
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
    },
    saveOrSubmit(type) {
      Promise.all([
        this.$refs.applicantInformation.getFormData(type),
        this.$refs.exploreInformation.getFormData(type),
        this.$refs.exploreobjectInformation.getFormData(type),
        this.$refs.exploreLocation.getFormData(type),
        this.$refs.mapTag.getFormData(type),
        this.$refs.explorePlan.getFormData(type),
        this.$refs.businessConstitute.getFormData(type),
        this.$refs.otherInstroduction.getFormData(type)
      ]).then(val => {
        let form = Object.assign(...val)
        this.applyFormData = JSON.parse(JSON.stringify(form))
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
