<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header">文物出境许可督办</div>
      <collapse-form>
        <div slot="header" class="fl">
          <div class="row_1 clear-float">
            <el-input
                placeholder="申请事项名称 / 流水号 / 携运人 / 文物名称"
                v-model="queryParams.keyword"
                class="keyword mr-10 fl"
            >
              <el-select v-model="queryParams.type" slot="prepend" clearable placeholder="关键字">
                <el-option label="关键字" value="1"></el-option>
                <el-option label="申请事项名称" value="2"></el-option>
                <el-option label="流水号" value="3"></el-option>
                <el-option label="单证号" value="4"></el-option>
                <el-option label="携运人" value="5"></el-option>
                <el-option label="文物名称" value="6"></el-option>
              </el-select>
              <el-button type="primary" slot="append" @click="search">搜索</el-button>
            </el-input>
            <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
          </div>
        </div>
      </collapse-form>
      <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
        <el-select v-model="value" size="mini" placeholder="事项" class="mr-10">
          <el-option
              v-for="item in options.testData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value" size="mini" placeholder="状态" class="mr-10">
          <el-option
              v-for="item in options.testData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value" size="mini" placeholder="审核机构" class="mr-10">
          <el-option
              v-for="item in options.testData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value" size="mini" placeholder="类型" class="mr-10">
          <el-option
              v-for="item in options.testData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value" size="mini" placeholder="单证类型" class="mr-10">
          <el-option
              v-for="item in options.testData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
      </table-opt-menu>
      <dynamic-table
          :tableData="tableData"
          :fixButtonArr="fixButtonArr"
          :dialogShow.sync="headerDialogVisible"
          :search-height="10"
          minwidth="140"
          @click-0="tableConfirm"
          @sort-change="sort"
          @header-dragend="headerDrag"
          :checkColInit="checkCol"
          :dropColInit="dropColInit"
      />
      <el-pagination
          @size-change="sizeChange"
          @current-change="search"
          :current-page="queryParams.pagination.currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import CollapseForm from '@/components/commons/CollapseForm'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import DynamicTable from '@/components/commons/DynamicTable'

  export default {
    components: {
      CollapseForm,
      TableOptMenu,
      DynamicTable
    },
    data() {
      return {
        options: {
          testData: []
        },
        pickerTime: null,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        },
        // tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 5
          },
          type: '',
          keyword: ''
        },

        value: '',
        // 表头设置弹框
        // (用对象而不直接用boolean值是因为对话框封装成子组件的时候，点击头部小叉叉总是会报不能操作子组件属性值的错误，实属无奈之举，勿动)
        headerDialogVisible: {flag: false},
        // 表格表头属性--------往后台传从后台取
        checkCol: [
          {
            label: '日期',
            prop: 'date',
            width: 100, //列宽
            sort: 'descending', //排序方式
            sortable: true, //是否显示排序图标
            insertFlagArr: {alertbutton: false}, //表头自定义组件
            collapse: false //展开收起
          },
          {
            label: '姓名',
            prop: 'name',
            width: 100,
            sort: '',
            sortable: false,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '地址',
            prop: 'address',
            width: 300,
            sort: '',
            sortable: false,
            insertFlagArr: {alertbutton: true},
            collapse: false
          },
          {
            label: '作者',
            prop: 'author',
            width: 100,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '诗歌',
            prop: 'poetry',
            width: 300,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          }
        ],
        // 表格表头拖拽显隐后的属性--------往后台传从后台取
        dropColInit: [
          {
            label: '序号',
            prop: 'date',
            width: 100, //列宽
            sort: 'descending', //排序方式
            sortable: true, //是否显示排序图标
            insertFlagArr: {alertbutton: false}, //表头自定义组件
            collapse: false
          },
          {
            label: '单证号',
            prop: 'name',
            width: 100,
            sort: '',
            sortable: false,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '文物或复仿制品名称',
            prop: 'address',
            width: 300,
            sort: '',
            sortable: false,
            insertFlagArr: {alertbutton: true},
            collapse: false
          },
          {
            label: '尺寸',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '质地',
            prop: 'poetry',
            width: 300,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '携运数量',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '申请人',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '携运人',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '审批事项类型',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '申请类型',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '申请时间',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '状态',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          },
          {
            label: '审核机构',
            prop: 'author',
            width: 180,
            sort: '',
            sortable: true,
            insertFlagArr: {alertbutton: false},
            collapse: false
          }
        ],
        fixButtonArr: ['查看'], //固定列的按钮
        optColWidth: 120,
        // 表格数据
        tableData: [
          {
            id: '1',
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 100 弄',
            author: '杜甫',
            poetry: '江边踏青罢，回首见旌旗。风起春城暮，高楼鼓角悲。'
          },
          {
            id: '2',
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 200 弄',
            author: '苏轼',
            poetry:
              '莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生'
          },
          {
            id: '3',
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 300 弄',
            author: '李白',
            poetry:
              '李白乘舟将欲行，忽闻岸上踏歌声。桃花潭水深千尺，不及汪伦送我情'
          },
          {
            id: '4',
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 400 弄',
            author: '李清照',
            poetry:
              '常记溪亭日暮，沉醉不知归路，兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭。'
          }
        ]
      }
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1
        const data = 'responseData';

        this.tableData = data.data;
        this.totalCount = data.pagination.totalNum;
      },
      resetForm() {
      },
      itemClick(evt) {
        switch (evt) {
          case 'set-up':
            this.headerDialogVisible.flag = true
            break
        }
        console.log(evt)
      },
      // 表格操作按钮,函数名为click-0、click-1依次类推
      // id-点击对应的行序号
      tableConfirm(id) {
        console.log(id)
      },
      // 表格排序按钮点击函数
      // { column, prop, order }-同elementui
      // dropCol-表头数组
      sort({column, prop, order}, dropCol) {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-select {
    width: 130px;
  }

  .content {
    /deep/ .el-card__header {
      padding-bottom: 10px;
    }

    /deep/ .el-card__body {
      padding: 0 20px 10px;
    }

    .row_1 {
      display: inline-block;
      margin: 10px auto 0;

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
          width: 130px;
        }
      }
    }
  }
</style>
