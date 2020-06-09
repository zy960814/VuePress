<template>
  <el-card shadow="never">
    <div slot="header">非国有文物收藏单位和其他单位借用国有馆藏一级文物许可申请</div>
    <el-scrollbar :style="{height: height}">
      <apply-form-item data="基本信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="basicInformationTitle"
          width="150px"
        >
          <template #line_30="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
        </vertical-table>
      </apply-form-item>
      <apply-form-item data="项目信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="projectInfoTitle"
          width="150px"
        ></vertical-table>
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
      <apply-form-item data="申请材料">
        <vertical-table
          style="width:100%;"
          borderTitle="none"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="applyMaterialTitle"
          width="150px"
        >
          <template #line_01="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_11="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_21="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_31="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
          <template #line_41="scope">
            <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
            <el-link type="primary" v-else>{{ }}</el-link>
          </template>
        </vertical-table>
      </apply-form-item>
    </el-scrollbar>
  </el-card>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import VerticalTable from '@/components/commons/VerticalTable'
import InnerConfirmMessage from '@/views/personal/schedule/56017/RelicInformation/InnerConfirmMessage'
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
      tableOperate: {
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
      basicInformationTitle: [
        { applyItemName: '申请事项名称' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocumentNo: '申请文号' },
        { applyDocument: '申请文件' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' },
        { address: '联系地址' },
        { postcode: '邮政编码', '': '' }
      ],
      projectInfoTitle: [
        { relicBorrow: '文物借用单位' },
        { borrowPurpose: '借用用途' },
        { borrowLimit: '借用期限' }
      ],
      applyMaterialTitle: [
        { borrowAgreement: '文物借用协议' },
        { proxyStatement: '借用文物的安全状况评估报告' },
        { taskStatement: '借用单位的自信其概况报告' },
        { projectEstimateBook: '借用单位的场馆设施条件评估报告' },
        { reportAndPhoto: '其他' }
      ]
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
  mounted() {
    console.log(this.applyFormData)
  },
  destroyed() {},
  methods: {
    tableConfirm(row) {
      this.tableOperate.operateType = 'confirm'
      this.tableOperate.id = row.sumNo
      this.dialogVisibleConfirm = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
