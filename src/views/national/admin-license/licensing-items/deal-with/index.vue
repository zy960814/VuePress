<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">全国重点文物保护单位修缮工程设计方案（修缮计划已获国家文物局批准）申请</div>
    <apply-form :data="titleData" @tab-click="itemClick" widthOneL="25%">
      <template #titleInsertL_one>
        <span style="font-size: 12px">
          <i class="el-icon-time" style="margin-right: 3px"></i>本事项总限时为20个工作日，剩余7工作日
        </span>
      </template>
      <template #titleInsertR_one>
        <opt-button-group @item-click="btnItemClick" />
      </template>
      <template #titleInsertR_two>
        <el-link @click="dialogFormVisiblePress = true" type="primary" class="fr">流程跟踪</el-link>
        <el-link @click="dialogFormPreservation = true" type="primary" class="fr">国保单位</el-link>
        <el-link @click="dialogFormCultural = true" type="primary" class="fr">馆藏文物</el-link>
        <el-link @click="dialogFormIframe = true" type="primary" class="fr">文物地图</el-link>
      </template>
      <template #body>
        <div class="scrollBox" :style="{height: contentHeight}">
          <!-- 申请信息 -->
          <apply-info v-bind:applyCode="applyCode" class="hxl_item" />
          <!-- 受理信息 -->
          <acceptance-info class="hxl_item" />
          <!-- 评审意见 -->
          <evaluation-opinions v-bind:applyCode="applyCode" class="hxl_item" />
          <!-- 事项审查 -->
          <item-audit class="hxl_item" />
          <!-- 审批信息 -->
          <approve-info class="hxl_item" />
          <!-- 批复文件 -->
          <reply-file class="hxl_item" />
        </div>
      </template>
    </apply-form>
    <!-- 流程跟踪对话框 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :append-to-body="true"
      :visible.sync="dialogFormVisiblePress">
      <ProcessTraceDialog />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisiblePress = false">确定</el-button>
        <el-button @click="dialogFormVisiblePress = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 发送弹框 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormVisibleType"
      :append-to-body="true"
    >
      <select-dialog
        :pageTabsData="pageTabsData2"
        title="选择发送人员"
        @handle-select="handleSelect"
        :height="dialogHeight + 'px'"
        ref="selectDialog"
      >
        <template #body_1>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <SendDialog></SendDialog>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <SendDialog></SendDialog>
          </el-scrollbar>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm1">确定</el-button>
        <el-button @click="dialogFormVisibleType = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 上传最终稿弹框 -->
    <my-dialog
      width="500px"
      class="boxCard_dialog"
      :height="dialogHeight1 + 'px'"
      center
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <Upload></Upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 专家评审弹框 -->
    <my-dialog
      width="1200px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormExpertReview"
      :append-to-body="true"
    >
      <select-dialog
        :pageTabsData="pageTabsData1"
        title="专家评审"
        @handle-select="handleSelect"
        :height="dialogHeight + 'px'"
        ref="selectDialog"
      >
        <template #body_1>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <Specialist></Specialist>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <assess></assess>
          </el-scrollbar>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormExpertReview = false">确定</el-button>
        <el-button @click="dialogFormExpertReview = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 表单修改痕迹 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormTrace"
      :append-to-body="true"
    >
      <Trace></Trace>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormTrace = false">确定</el-button>
        <el-button @click="dialogFormTrace = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 国保单位 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormPreservation"
      :append-to-body="true"
    >
      <Preservation />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormPreservation = false">确定</el-button>
        <el-button @click="dialogFormPreservation = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 馆藏文物弹框 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormCultural"
      :append-to-body="true"
    >
      <Cultural></Cultural>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click=" dialogFormCultural = false">确定</el-button>
        <el-button @click="dialogFormCultural = false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 文物地图弹框 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormIframe"
      :append-to-body="true"
    >
      <CulturalMap />
    </my-dialog>
  </el-card>
</template>

<script>
import ApplyForm from '@/components/commons/ApplyForm'
import OptButtonGroup from '@/views/commons/AdminApproval/OptButtonGroup'
import ApplyInfo from '@/components/business/ApplyInfoShow'
import AcceptanceInfo from '@/views/commons/AdminApproval/AcceptanceInfo'
import EvaluationOpinions from '@/views/commons/AdminApproval/EvaluationOpinions'
import ItemAudit from '@/views/commons/AdminApproval/ItemAudit'
import ApproveInfo from '@/views/commons/AdminApproval/ApproveInfo'
import ReplyFile from '@/views/commons/AdminApproval/ReplyFile'
import MyDialog from '@/components/commons/MyDialog'
import SelectDialog from '@/components/commons/SelectDialog'
import SendDialog from '@/components/business/ApplyForDialog/SendDialog'
import Upload from '@/components/business/ApplyForDialog/Upload'
import Specialist from '@/components/business/ApplyForDialog/assessment-experts/specialist'
import Assess from '@/components/business/ApplyForDialog/assessment-experts/assess'
import Trace from '@/components/business/ApplyForDialog/Trace'
import Cultural from '@/components/business/ApplyForDialog/Cultural'
import Preservation from '@/components/business/ApplyForDialog/Preservation'
import CulturalMap from '@/components/business/ApplyForDialog/cultural-map'
import ProcessTraceDialog from '@/components/business/ProcessTraceDialog'
// import NationalsecurityDocument from '@/components/business/NationalsecurityDocument'

export default {
  components: {
    ApplyForm,
    OptButtonGroup,
    ApplyInfo,
    AcceptanceInfo,
    EvaluationOpinions,
    ItemAudit,
    ApproveInfo,
    ReplyFile,
    MyDialog,
    SelectDialog,
    SendDialog,
    Upload,
    Specialist,
    Trace,
    Cultural,
    Preservation,
    CulturalMap,
    Assess,
    ProcessTraceDialog
    // NationalsecurityDocument
  },
  data() {
    return {
      titleData: [],
      dialogKey: 0,
      dialogFormVisiblePress: false,
      dialogFormTrace: false,
      dialogFormIframe: false,
      dialogFormPreservation: false,
      dialogFormVisible: false,
      dialogFormCultural: false,
      dialogFormVisibleType: false,
      dialogFormExpertReview: false,
      queryParams: {
        condition: {
          itemId: ''
        },
        pagination: {
          currentPage: 1,
          pageSize: 1
        },
        sort: {}
      },
      applyCode: '',
      pageTabsData1: {
        tabs: [
          { title: '专家评审', num: '' },
          { title: '评估机构', num: '' },
          { title: '会审', num: '' }
        ]
      },
      pageTabsData2: {
        tabs: [
          { title: '常用', num: '' },
          { title: '全部', num: '' }
        ]
      }
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
    // 弹出框
    dialogHeight() {
      return this.$store.getters.screenHeight > 600
        ? 600
        : this.$store.getters.screenHeight
    },
    dialogHeight1() {
      return this.$store.getters.screenHeight > 220
        ? 220
        : this.$store.getters.screenHeight
    },
    dialogHeight2() {
      return this.$store.getters.screenHeight > 370
        ? 370
        : this.$store.getters.screenHeight
    }
  },
  beforeMount() {
    this.applyCode = this.$route.query.applyCode
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 选择获取国保单位名称
    earnNationalSecurity(val) {
      this.nationalsecurityDocumentObject = val
    },
    // 锚点点击事件
    itemClick(tab) {
      let nodes = document.querySelectorAll('.hxl_item')
      document.querySelector('.scrollBox').scrollTop =
        nodes[+tab.index].offsetTop - nodes[0].offsetTop
    },
    initData() {
      this.titleData = [
        '申请信息',
        '受理信息',
        '评审意见',
        '事项审查',
        '审批信息',
        '批复文件'
      ]
    },
    // 按钮组点击事件
    btnItemClick(evt) {
      switch (evt) {
        case 'send':
          this.dialogFormVisibleType = true
          break
        case 'upload':
          this.dialogFormVisible = true
          break
        case 'review':
          this.dialogFormExpertReview = true
          break
        case 'trace':
          this.dialogFormTrace = true
      }
      console.log(evt)
    },
    confirm() {
      this.dialogFormVisible = false
    },
    confirm1() {
      this.dialogFormVisibleType = false
    },
    confirm2() {
      this.dialogFormTrace1 = false
    },
    handleSelect(key) {
      this.selectMenuItem = key
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  /deep/ .el-card__header {
    text-align: center;
    padding: 12px;
    font-weight: bold;
  }

  /deep/ .el-card__body {
    padding: 12px;
    padding-top: 0;

    .el-card__body {
      padding-top: 12px;
    }

    .opt_btn {
      text-align: right;
    }

    .scrollBox {
      overflow-y: auto;
      padding-right: 1px;
    }
  }
}
/deep/ .el-dialog__footer {
  text-align: right !important;
}
</style>
