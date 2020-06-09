<template>
  <div class="waitHandle">
    <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
      <div slot="header" class="fl">
        <div class="row_1 clear-float">
          <el-input
            placeholder="关键字"
            v-model="queryParams.condition.keyWord"
            class="keyword mr-10 fl"
          >
            <el-button slot="append">搜索</el-button>
          </el-input>
          <el-button type="primary" plain class="fl">重置</el-button>
        </div>
      </div>
    </collapse-form>
    <table-opt-menu @item-click="itemClick" style="margin: 5px 0"></table-opt-menu>
    <dynamic-table
      :tableData="tableData"
      :fixButtonArr="fixButtonArr"
      :dialogShow.sync="headerDialogVisible"
      @click="tableConfirm"
      @sort-change="sort"
      @header-dragend="headerDrag"
      :checkColInit="checkCol"
      :dropColInit="dropColInit"
      :cantDragColumn="2"
      :minwidth="'300px'"
      @select="selectL"
    >
      <!-- <template #headerInsert_poetry="scope">
        {{scope.scope.$index}}
        <el-button type="primary" @click.stop="header(scope)">表头插槽使用</el-button>
      </template>
      <template #lineInsert_name="scope">
        {{scope.scope.row.name}}
        <el-button type="primary">行插槽使用</el-button>
      </template>-->
      <template #operateInsert="scope">
        <table-button
          v-if="scope.scope.row.id==='1'||scope.scope.row.id==='2'||scope.scope.row.id==='3'"
          buttonName="查看申请材料"
          @button-click="tableButton('seeApplyMaterial')"
        ></table-button>
        <table-button
          v-if="scope.scope.row.id==='1'||scope.scope.row.id==='3'"
          buttonName="查看中期汇报"
          @button-click="tableButton('seeMidtermReport')"
        ></table-button>
        <table-button
          v-if="scope.scope.row.id==='1'"
          buttonName="提交结项汇报"
          @button-click="tableButton('submitClosingtermReport')"
        ></table-button>
        <table-button
          v-if="scope.scope.row.id==='2'"
          buttonName="提交中期汇报"
          @button-click="tableButton('submitMidtermReport')"
        ></table-button>
        <table-button
          v-if="scope.scope.row.id==='3'"
          buttonName="查看结项汇报"
          @button-click="tableButton('seeClosingtermReport')"
        ></table-button>
      </template>
    </dynamic-table>
    <el-row type="flex" justify="center" style="margin-top:4px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagination.currentPageNumber"
        :page-sizes="[10, 20]"
        :page-size="queryParams.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import CollapseForm from '@/components/commons/CollapseForm'
import TableOptMenu from '@/components/commons/TableOptMenu'
import DynamicTable from '@/components/commons/DynamicTable_f'
import TableButton from '@/components/commons/TableButton'
export default {
  name: 'WaithandleTable',
  components: {
    CollapseForm,
    TableOptMenu,
    DynamicTable,
    TableButton
  },
  props: {},
  data() {
    return {
      totalCount: 0,
      queryParams: {
        condition: {
          searchKey: '',
          keyWord: '',
          handle: '0',
          superviseType: '',
          currentStatus: ''
        },
        pagination: {
          currentPage: 1,
          pageSize: 10
        },
        sort: {
          column: '',
          dir: ''
        }
      },
      // 表头设置弹框
      // (用对象而不直接用boolean值是因为对话框封装成子组件的时候，点击头部小叉叉总是会报不能操作子组件属性值的错误，实属无奈之举，勿动)
      headerDialogVisible: { flag: false },
      // 表格表头属性--------往后台传从后台取
      checkCol: [
        {
          label: 'check', //必填
          prop: null,
          width: null,
          sort: null,
          sortable: null,
          insertFlagArr: { alertbutton: null },
          collapse: null,
          selection: 'selection'
        },
        {
          label: '序号',
          prop: 'id',
          width: 100, //列宽
          sort: 'descending', //排序方式(鸡肋，因为记录了也不能在一开始初始化的时候多个列都排序，因为一次只能按照一列的规则来排序)
          sortable: false, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false //展开收起
        },
        {
          label: '申请文件标题',
          prop: 'applyTitle',
          width: 200, //列宽
          sort: 'descending', //排序方式
          sortable: true, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '申请单位',
          prop: 'applyCompany',
          width: 250,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '省别',
          prop: 'province',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '收到时间',
          prop: 'acceptTime',
          width: 150,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '流水号',
          prop: 'num',
          width: 100,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        }
      ],
      // 表格表头拖拽显隐后的属性--------往后台传从后台取
      dropColInit: [
        {
          label: 'check', //必填
          prop: null,
          width: null,
          sort: null,
          sortable: null,
          insertFlagArr: { alertbutton: null },
          collapse: null,
          selection: 'selection'
        },
        {
          label: '序号',
          prop: 'id',
          width: 100, //列宽
          sort: 'descending', //排序方式(鸡肋，因为记录了也不能在一开始初始化的时候多个列都排序，因为一次只能按照一列的规则来排序)
          sortable: false, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false //展开收起
        },
        {
          label: '申请文件标题',
          prop: 'applyTitle',
          width: 200, //列宽
          sort: 'descending', //排序方式
          sortable: true, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '申请单位',
          prop: 'applyCompany',
          width: 250,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '省别',
          prop: 'province',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '收到时间',
          prop: 'acceptTime',
          width: 150,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '流水号',
          prop: 'num',
          width: 100,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        }
      ],
      fixButtonArr: ['确认', '调整'], //固定列的按钮
      // 表格数据
      tableData: [
        {
          id: '1',
          applyTitle:
            '浙江省文物局关于全国重点文物保护单位南山造像保护区划内实施南山公园提升工程的指示',
          applyCompany: '浙江省文物局xuchangfeng',
          province: '浙江省',
          acceptTime: '2020-06-05',
          num: '网审181122001号'
        },
        {
          id: '2',
          applyTitle:
            '浙江省文物局关于全国重点文物保护单位南山造像保护区划内实施南山公园提升工程的指示',
          applyCompany: '浙江省文物局xuchangfeng',
          province: '浙江省',
          acceptTime: '2020-06-05',
          num: '网审181122001号'
        },
        {
          id: '3',
          applyTitle:
            '浙江省文物局关于全国重点文物保护单位南山造像保护区划内实施南山公园提升工程的指示',
          applyCompany: '浙江省文物局xuchangfeng',
          province: '浙江省',
          acceptTime: '2020-06-05',
          num: '网审181122001号'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchWait()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchWait()
    },
    selectL(selection, row) {
      console.log(selection)
      console.log(row)
    },
    // 表格操作按钮,函数名为click-0、click-1依次类推
    // id-点击对应的行序号
    tableConfirm(row, type) {
      console.log(row)
      console.log(type)
    },
    // 表格排序按钮点击函数
    // { column, prop, order }-同elementui
    // dropCol-表头数组
    sort({ column, prop, order }, dropCol) {
      console.log(column)
      console.log(prop)
      console.log(order)
      console.log(dropCol)
    },
    // 列宽拖动函数
    // newWidth, oldWidth, column, event-同elementui
    // dropCol-表头数组
    headerDrag(newWidth, oldWidth, column, event, dropCol) {
      console.log(newWidth)
      console.log(oldWidth)
      console.log(column)
      console.log(event)
      console.log(dropCol)
    },
    // 搜索按钮
    searchFun() {
      this.searchWait()
    },

    //重置
    resetForm() {},
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    // 表格操作按钮, 依据type判断
    tableButton(type) {
      if (type === 'seeApplyMaterial') {
        this.$router.push(
          '/national/admin-license/licensing-items/deal-with?applyCode=56008-b'
        )
      } else if (type === 'seeMidtermReport') {
        this.$router.push('/components/business/midtermReport')
      } else if (type === 'submitClosingtermReport') {
        this.$router.push('/components/business/closingtermReport')
      } else if (type === 'submitMidtermReport') {
        this.$router.push('/components/business/midtermReport')
      } else if (type === 'seeClosingtermReport') {
        this.$router.push('/components/business/closingtermReport')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table th > .cell {
  text-align: center;
}
/deep/ .el-table .cell {
  text-align: center;
}
.row_1 {
  display: inline-block;
  margin: 0 auto;

  .keyword {
    width: 540px;
  }
  /deep/ .el-date-editor.el-input__inner {
    width: 260px;
  }
  /deep/ .el-input-group__prepend {
    width: 128px;
    background-color: #fff;

    .el-input__inner {
      width: 131px;
    }
  }
}
</style>