<!-- 文物进出境事项 -->
<template>
  <div class="content">
    <collapse-form>
      <div slot="header" class="fl">
        <div class="row_1 clear-float">
          <el-date-picker
              class="mr-10 fl"
              v-model="pickerTime"
              type="daterange"
              align="left"
              unlink-panels
              value-format="yyyy-MM-dd"
              @change="search(1)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
          ></el-date-picker>
          <el-input
              placeholder="申请事项名称 / 流水号 / 携运人 / 文物名称"
              v-model="queryParams.condition.keyword"
              class="keyword mr-10 fl"
          >
            <el-select v-model="queryParams.condition.queryType" slot="prepend" clearable placeholder="关键字">
              <el-option label="关键字" value=""></el-option>
              <el-option label="申请事项名称" value="itemName"></el-option>
              <el-option label="流水号" value="serialNum"></el-option>
              <el-option label="单证号" value="certificateNum"></el-option>
              <el-option label="携运人" value="carryPerson"></el-option>
              <el-option label="文物名称" value="crName"></el-option>
            </el-select>
            <el-button type="primary" slot="append" @click="search(1)">搜索</el-button>
          </el-input>
          <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
        </div>
      </div>
    </collapse-form>
    <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
      <el-select
          v-model="queryParams.condition.crTextureCode"
          @change="search(1)"
          size="mini"
          clearable
          placeholder="质地"
          class="mr-10">
        <el-option
            v-for="item in options.texture"
            :key="item.code"
            :label="item.name"
            :value="item.code"
        ></el-option>
      </el-select>
      <el-select
          v-model="queryParams.condition.crClassCode"
          @change="search(1)"
          size="mini"
          clearable
          placeholder="类别"
          class="mr-10">
        <el-option
            v-for="item in options.scrRelicType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
        ></el-option>
      </el-select>
      <el-select
          v-model="queryParams.condition.crLevelCode"
          @change="search(1)"
          size="mini"
          clearable
          placeholder="级别"
          class="mr-10">
        <el-option
            v-for="item in options.relicLevel"
            :key="item.code"
            :label="item.name"
            :value="item.code"
        ></el-option>
      </el-select>
      <el-select
          v-model="queryParams.condition.itemCode"
          @change="search(1)"
          size="mini"
          clearable
          placeholder="事项"
          class="mr-10">
        <el-option
            v-for="item in options.itemDic"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </el-select>
      <el-select
          v-model="value"
          @change="search(1)"
          size="mini"
          clearable
          placeholder="状态"
          class="mr-10">
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
        :search-height="45"
        v-if="dropColInit.length > 0 && checkCol.length > 0"
        @click-0="tableConfirm"
        @sort-change="sort"
        @header-dragend="headerDrag"
        @drop="saveDynamicCol"
        @check-header="saveDynamicCol"
        :checkColInit="checkCol"
        :dropColInit="dropColInit"
        minwidth="140px"/>
    <el-pagination
        @size-change="sizeChange"
        @current-change="search"
        :current-page="queryParams.pagination.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
  import CollapseForm from '@/components/commons/CollapseForm'
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import DynamicTable from '@/components/commons/DynamicTable'
  import {findStationCroList} from '@/api/appraisal/query-retrieval'
  import {saveDynamicCol, queryDynamicCol} from '@/api/basic'
  import {queryDictionary} from '@/api/basic'

  export default {
    components: {
      CollapseForm,
      TableOptMenu,
      DynamicTable
    },
    data() {
      return {
        tableType: 'query_all_appraisal_cr',
        options: {
          // 文物质地
          texture: [],
          // 文物类别
          scrRelicType: [],
          // 文物级别
          relicLevel: [],
          itemDic: [{
            label: '文物出境',
            value: '56020-a'
          }, {
            label: '文物临时进境',
            value: '56020-b'
          }, {
            label: '文物复出境',
            value: '56020-c'
          }, {
            label: '文物临时出境',
            value: '56020-d'
          }, {
            label: '文物复进境',
            value: '56020-e'
          }],
          testData: []
        },
        pickerTime: null,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end])
            }
          }]
        },
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: {
            applyTime: 'desc'
          },
          condition: {
            applyStartTime: '',
            applyEndTime: '',
            queryType: '',
            keyword: '',
            itemCode: '',
            crClassCode: '',
            crTextureCode: '',
            crLevelCode: ''
          }
        },
        originalCol: [{
          label: '序号',
          prop: 'num',
          width: 100, //列宽
          insertFlagArr: {alertbutton: false}, //表头自定义组件
          collapse: false
        }, {
          label: '单证号',
          prop: 'certificateNum',
          width: 100,
          sort: '',
          sortable: false,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '文物或复仿制品名称',
          prop: 'crName',
          width: 300,
          sort: '',
          sortable: false,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '尺寸',
          prop: 'realSize',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '质地',
          prop: 'crTextureName',
          width: 300,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '携运数量',
          prop: 'carryAmount',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '申请人',
          prop: 'applyAccountName',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '携运人',
          prop: 'carryPerson',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '审批事项类型',
          prop: 'itemSname',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '申请类型',
          prop: 'isExhibition',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }, {
          label: '申请时间',
          prop: 'applyTime',
          width: 180,
          sort: '',
          sortable: true,
          insertFlagArr: {alertbutton: false},
          collapse: false
        }],
        headerDialogVisible: {flag: false},  // 表头配置对话框是否显示
        // 表格表头属性
        checkCol: [],
        // 表格表头拖拽显隐后的属性
        dropColInit: [],
        fixButtonArr: ['查看', '流程跟踪'], //固定列的按钮
        value: '',
      }
    },
    mounted() {
      this.initData();
      this.queryCol();
      this.search();
    },
    methods: {
      initData() {
        // 查询文物质地数据字典
        queryDictionary('ScrRelicQuality').then(({data}) => this.options.texture = data);
        // 查询文物类别数据字典
        queryDictionary('ScrRelicType').then(({data}) => this.options.scrRelicType = data);
        // 查询文物级别数据字典
        queryDictionary('CrLevelCode').then(({data}) => this.options.relicLevel = data);
      },
      queryCol() {
        queryDynamicCol(this.tableType).then(({data}) => {
          if (data.tableType !== '未定义') {
            this.checkCol = data.checkCol;
            this.dropColInit = data.dropColInit;
          } else {
            this.checkCol = [...this.originalCol];
            this.dropColInit = [...this.originalCol];
          }
        });
      },
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        this.queryParams.condition.applyStartTime = this.pickerTime ? this.pickerTime[0] : '';
        this.queryParams.condition.applyEndTime = this.pickerTime ? this.pickerTime[1] : '';
        if (this.queryParams.condition.isExhibition === '') {
          this.queryParams.condition.isExhibition = null; // 额外处理, 适配接口
        }
        findStationCroList(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
        });
      },
      // 表格排序按钮点击函数
      // { column, prop, order }-同elementui
      // dropCol-表头数组
      sort({prop, order}) {
        if (order == null) {
          this.queryParams.sort = {applyTime: 'desc'};
        } else {
          const param = {};
          param[prop] = order === 'ascending' ? 'asc' : 'desc';
          this.queryParams.sort = param;
        }
        this.search();
      },
      // 列宽拖动函数
      // newWidth, oldWidth, column, event-同elementui
      // dropCol-表头数组
      headerDrag(newWidth, oldWidth, column, event, dropCol, checkCol) {
        this.saveDynamicCol(dropCol, checkCol);
      },
      // 保存动态列数据
      saveDynamicCol(dropCol, checkCol) {
        this.dropColInit = dropCol;
        this.checkColInit = checkCol;
        saveDynamicCol({
          tableType: this.tableType,
          checkCol: this.checkColInit,
          dropColInit: this.dropColInit
        });
      },
      resetForm() {
        for (const key in this.queryParams.condition) {
          if (this.queryParams.condition.hasOwnProperty(key)) {
            this.queryParams.condition[key] = '';
          }
        }
        this.pickerTime = null;
        this.search();
      },
      itemClick(evt) {
        switch (evt) {
          case 'set-up':
            this.headerDialogVisible.flag = true;
            break
        }
        console.log(evt)
      },
      // 表格操作按钮,函数名为click-0、click-1依次类推
      // id-点击对应的行序号
      tableConfirm(id) {
        console.log(id)
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
      padding: 5px 20px;
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
          width: 130px;
        }
      }
    }
  }
</style>
