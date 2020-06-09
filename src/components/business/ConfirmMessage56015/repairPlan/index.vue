<template>
  <div class="content">
    <apply-form-item data="申请人信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="applicantInformationTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>
    <apply-form-item data="申请文件">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="applyDocumentTitle"
        width="150px"
      >
        <template #line_20="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
    <!-- 确认信息弹框 -->
    <my-dialog
      width="1024px"
      class="boxCard_dialog"
      :height="dialogHeight+'px'"
      :visible.sync="dialogVisibleConfirm"
      append-to-body
    >
      <inner-confirm-message
        :key="Math.random()"
        :height="dialogHeight-138+'px'"
        :tableOperate="tableOperate"
        v-bind="$attrs"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmMessage">确定</el-button>
        <el-button @click="dialogVisibleConfirm=false">取消</el-button>
      </span>
    </my-dialog>
    <apply-form-item data="文物信息">
      <el-table
        ref="multipleTable"
        :data="applyFormDataInner.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="relicName" label="文物名称" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary" @click="tableConfirm(scope.row)">{{ scope.row.relicName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="sumNo" label="总登记号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="relicCategory" label="文物类别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="relicLevel" label="文物级别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="integrated" label="完残程度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="preserveStatus" label="保存状态" width="240" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryParams.pagination.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </apply-form-item>
  </div>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import VerticalTable from '@/components/commons/VerticalTable'
import InnerConfirmMessage from '@/views/personal/schedule/56015/RelicInformation/InnerConfirmMessage'
import MyDialog from '@/components/commons/MyDialog'
export default {
  name: 'ConfirmMessage',
  components: { ApplyFormItem, VerticalTable, InnerConfirmMessage, MyDialog },
  props: {
    height: {
      type: String,
      default: '400px'
    },
    applyFormData: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      // tableData: [
      //   {
      //     relicName: '莲鹤方壶',
      //     sumNo: '202004231847',
      //     relicCategory: '青铜器',
      //     relicLevel: '二级',
      //     integrated: '残',
      //     preserveStatus: '迄今发现青铜方壶中保存较为完整'
      //   },
      //   {
      //     relicName: ' 狸猫纹漆食盘',
      //     sumNo: '202004231854',
      //     relicCategory: '器具',
      //     relicLevel: '一级',
      //     integrated: '完',
      //     preserveStatus: '器具完整'
      //   },
      //   {
      //     relicName: ' 古滇国贮贝器',
      //     sumNo: '202004231858',
      //     relicCategory: '青铜器',
      //     relicLevel: '一级',
      //     integrated: '完',
      //     preserveStatus: '缺纹'
      //   }
      // ],
      tableOperate: {
        operateType: '',
        id: ''
      },
      tableOperate_f: {
        operateType: '',
        id: ''
      },
      dialogVisibleConfirm: false,
      multipleSelection: [],
      totalCount: 0,
      queryParams: {
        condition: {
          itemId: ''
        },
        pagination: {
          currentPage: 1,
          pageSize: 20
        },
        sort: {}
      },

      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      applicantInformationTitle: [
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' },
        { companyAddress: '单位地址' },
        { postCode: '邮政编码', '': '' }
      ],
      applyDocumentTitle: [
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocument: '申请文件' }
      ]

      // applyFormData: {
      //   applyItemName: '周口店遗址修复工程',
      //   applyPerson: '王大锤',
      //   handlePerson: '李复',
      //   telNo: '123800877345',
      //   applyDocumentNo: 'al_12398294',
      //   applyDocumentTitle: '元朝平底瓷碗',
      //   applyDocument: '北京市文物局申请文件.docx',
      //   nationalSecurityName: '北京市文物局',
      //   province: '河北省',
      //   projectName: '周口店遗址项目',
      //   designPerson: '周埕',
      //   sendOrganization: '河北省文物局',
      //   otherIntroduction: '',
      //   projectSituationIntroduction: '文物二期处理进行中',
      //   buildNecessary: '必要',
      //   compilationBasis: '文物二期修复细则',
      //   lineChose: '三线',
      //   technologyMeasure: '数字扫描',
      //   emergencyMeasure: '封',
      //   technologyDocument: '北京市文物局申请文件.docx',
      //   assessmentReport: '北京市文物局申请文件.docx',
      //   protectPlan: '北京市文物局申请文件.docx',
      //   relicReport: '北京市文物局申请文件.docx',
      //   other: '北京市文物局申请文件.docx'
      // }
    }
  },
  computed: {
    applyFormDataInner() {
      return this.applyFormData
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableConfirm(row) {
      this.tableOperate.operateType = 'confirm'
      this.tableOperate.id = row.sumNo
      this.$nextTick(() => {
        this.dialogVisibleConfirm = true
      })
    },
    confirmMessage() {
      this.dialogVisibleConfirm = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
.nameColor {
  color: $--color-primary;
}
</style>
