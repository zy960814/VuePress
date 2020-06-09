<template>
  <apply-form-item data="文物信息" class="cr-info">
    <!-- 添加弹框 -->
    <my-dialog
      width="1024px"
      class="boxCard_dialog"
      :height="dialogHeight+'px'"
      :visible.sync="dialogVisible"
    >
      <add-relic
        :key="Math.random()"
        :height="dialogHeight-138+'px'"
        ref="addRelic"
        :tableOperate="tableOperate"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOrSubmit('save')">保存</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
    </my-dialog>
    <div style="padding: 0px 18px 40px 18px;">
      <div class="row_1">
        <div>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="tableAdd">添加</el-button>
          <el-button type="danger">批量删除</el-button>
        </div>
        <!-- <div style="margin-top: 6px">
          <el-link @click="fillInDialogVisible = true" type="primary">填写说明</el-link>
        </div>-->
      </div>
      <!-- 确认信息弹框 -->
      <my-dialog
        width="1024px"
        class="boxCard_dialog"
        :height="dialogHeight+'px'"
        :visible.sync="dialogVisibleConfirm"
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
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <table-button @button-click="tableModify(scope.row)" button-name="编辑" />
            <table-button @button-click="tableDelete(scope.row)" button-name="删除" />
            <table-button @button-click="tableDownload(scope.row)" button-name="下载" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryParams.pagination.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import TableButton from '@/components/commons/TableButton'
import AddRelic from '@/views/personal/schedule/AddRelic'
import InnerConfirmMessage from './InnerConfirmMessage'
import MyDialog from '@/components/commons/MyDialog'
export default {
  name: 'RelicInformation',
  components: {
    ApplyFormItem,
    TableButton,
    AddRelic,
    InnerConfirmMessage,
    MyDialog
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleConfirm: false,
      // 表单校验规则的选用方案
      ruleKey: 'default',
      tableData: [
        {
          relicName: '莲鹤方壶',
          sumNo: '202004231847',
          relicCategory: '青铜器',
          relicLevel: '二级',
          integrated: '残',
          preserveStatus: '迄今发现青铜方壶中保存较为完整'
        },
        {
          relicName: ' 狸猫纹漆食盘',
          sumNo: '202004231854',
          relicCategory: '器具',
          relicLevel: '一级',
          integrated: '完',
          preserveStatus: '器具完整'
        },
        {
          relicName: ' 古滇国贮贝器',
          sumNo: '202004231858',
          relicCategory: '青铜器',
          relicLevel: '一级',
          integrated: '完',
          preserveStatus: '缺纹'
        }
      ],
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
      tableOperate: {
        operateType: '',
        id: ''
      }
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableAdd() {
      this.dialogVisible = true
      this.tableOperate.operateType = 'add'
    },
    tableConfirm(row) {
      this.dialogVisibleConfirm = true
      this.tableOperate.operateType = 'confirm'
      this.tableOperate.id = row.sumNo
    },
    tableModify(row) {
      console.log(row)
      this.dialogVisible = true
      this.tableOperate.operateType = 'edit'
      this.tableOperate.id = row.sumNo
    },
    tableDelete(row) {
      console.log(row)
    },
    tableDownload(row) {
      console.log(row)
    },
    confirmMessage() {
      this.dialogVisibleConfirm = false
    },
    saveOrSubmit(type) {
      Promise.all([
        this.$refs.addRelic.$refs.relicInfo.getFormData(type),
        this.$refs.addRelic.$refs.relicRepair.getFormData(type),
        this.$refs.addRelic.$refs.applyMaterial.getFormData(type)
      ]).then(val => {
        let form = Object.assign(...val)
        this.applyFormData = JSON.parse(JSON.stringify(form))
        console.log(this.applyFormData)

        if (type === 'save') {
          console.log(type)
          // 下面调用接口--------
          this.dialogVisible = false
        } else if (type === 'submit') {
          this.dialogVisible = true
        }
        // 下面调用接口--------
      })
    },
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getFormData(type) {
      // this.$refs['form'].clearValidate()
      this.ruleKey = type
      return new Promise((resolve, reject) => {
        resolve(this.tableData)
        // this.$nextTick(() => {
        //   this.$refs['form'].validate(valid => {
        //     if (valid) {
        //       resolve(this.form)
        //     } else {
        //       reject()
        //     }
        //   })
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cr-info {
  .row_1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }
}
</style>
