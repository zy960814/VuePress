<template>
  <div class="waitHandle">
    <collapse-form @search-fun="searchFun" @reset-form="resetForm"  @toggle="toggle" :collapse-enabled="true">
      <div slot="header" class="fl">
        <div class="row_1 clear-float">
          <el-input
            placeholder="单位名称/法定代表人"
            v-model="form.keyWord"
            class="keyword mr-10 fl">
            <el-button slot="append" @click="searchFun">搜索</el-button>
          </el-input>
          <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
        </div>
      </div>
      <div class="formCheck">
        <el-form ref="form" :model="form" label-width="80px" label-position=left>
          <el-form-item label="资格类型">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="责任设计师"></el-checkbox>
              <el-checkbox label="责任工程师"></el-checkbox>
              <el-checkbox label="责任监理师"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="业务范围">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="保护规划"></el-checkbox>
              <el-checkbox label="古建筑"></el-checkbox>
              <el-checkbox label="石窟寺和石刻"></el-checkbox>
              <el-checkbox label="壁画" ></el-checkbox>
              <el-checkbox label="古文化遗址古墓葬" ></el-checkbox>
              <el-checkbox label="近现代重要史迹及代表性建筑" ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </collapse-form>
    <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
      <el-button type="primary" size="mini" @click=" dialogFormVisibleNewly = true">新增</el-button>
      <el-button type="primary" size="mini">批量新增</el-button>
      <el-button type="primary" size="mini" class="mr-10">删除</el-button>
      <el-select
        size="mini"
        clearable
        v-model="form.qualTypeCode1"
        placeholder="省份"
        @change="searchHandle"
        class="mr-10">
        <el-option
          v-for="(label,key)  in  qualificationLevelOption"
          :label="label.qualRangeName"
          :key="key"
          :value="label.qualRangeCode"
          style="vertical-align: middle;">
        </el-option>
      </el-select>
    </table-opt-menu>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :height="contentHeight"
      style="width: 100%;margin-top:10px;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column min-width="50" type="index" label="序号" :index="indexMethod"></el-table-column>
      <el-table-column width="120" label="姓名" porp="organizationName">
        <template slot-scope="scope">{{ scope.row.organizationName }}</template>
      </el-table-column>
      <el-table-column min-width="160" prop="districtCode" label="所在单位"></el-table-column>
      <el-table-column min-width="100"  label="资质信息">
        <el-table-column min-width="100" prop="province" label="责任设计师"> </el-table-column>
        <el-table-column min-width="100" prop="province" label="责任工程师"> </el-table-column>
        <el-table-column min-width="100" prop="province" label="责任监理师"> </el-table-column>
      </el-table-column>
      <el-table-column min-width="100" prop="name" label="数据更新时间"></el-table-column>
      <el-table-column min-width="240" prop="name" label="操作">
        <template>
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" plain @click=" dialogFormVisibleType = true">变更记录</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagination.currentPageNumber"
        :page-sizes="[10, 20]"
        :page-size="queryParams.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
      <!-- 变更信息弹框 -->
    <my-dialog width="800px" class="boxCard_dialog" :height='dialogHeight + "px"' center :visible.sync="dialogFormVisibleType"  :append-to-body="true">
      <el-card shadow="never">
        <div slot="header">变更记录</div>
        <el-scrollbar :style="{height: (dialogHeight - 135) + 'px'}">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:10px;"
            @selection-change="handleSelectionChange">
            <el-table-column min-width="50" type="index" label="序号" :index="indexMethod"></el-table-column>
            <el-table-column min-width="100" prop="districtCode" label="变更日期"></el-table-column>
            <el-table-column min-width="100" prop="name" label="变更类型"></el-table-column>
            <el-table-column min-width="160" prop="address" label="变更文件"></el-table-column>
            <el-table-column min-width="100" prop="registeredCapital" label="变更前内容"></el-table-column>
            <el-table-column min-width="160" prop="organizationNature" label="变更后内容"></el-table-column>
          </el-table>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleType = false">取消</el-button>
      </span>
		</my-dialog>
    <!-- 新增弹框 -->
    <my-dialog width="800px" class="boxCard_dialog" :height='dialogHeight + "px"' center :visible.sync="dialogFormVisibleNewly"  :append-to-body="true">
      <el-card shadow="never">
        <div slot="header">新增</div>
        <el-scrollbar :style="{height: (dialogHeight - 135) + 'px'}">
          <Newly></Newly>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleNewly = false">取消</el-button>
      </span>
		</my-dialog>
  </div>
</template>

<script>
import CollapseForm from '@/components/commons/CollapseForm'
import TableOptMenu from '@/components/commons/TableOptMenu'
import MyDialog from '@/components/commons/MyDialog'
import Newly from './newly'
// import {
//   
// } from '@/api/national'
export default {
  name: 'WaithandleTable',
  components: {
    CollapseForm,
    TableOptMenu,
    MyDialog,
    Newly
  },
  props: {
    selectMenuItem: {
      type: String,
      require: true
    },
    collapseEnabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisibleType:false,
      dialogFormVisibleNewly:false,
      activeIndex: 0,  // 当前选中项索引
      collapseFormHeigth: 0,
      checkList: [],
      // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      
      currentPage: 1,
      queryParams: {
        pagination: {
          currentPageNumber: "",
          currentPage: "1"
        }
      },
      tableData:[
        {
          address: "北京市大兴区黄村镇市场路2号楼三层3181室",
          creditId: "                  ",
          districtCode: "北京市",
          gmtCreate: "2020-02-26 16:43:58",
          id: "8280818370809e6e017080aac07c0a6a",
          legalRepresentative: "",
          mngDepartment: "",
          organizationId: "8280818370809e6e017080aac02b0a69",
          organizationName: "北京凯莱斯建筑工程有限公司",
          organizationNature: "有限责任公司（自然人投资或控股）",
          pcrunitQualicationTypeCodes: "2",
          pcrunitQualicationTypeNames: "施工一级",
          registeredCapital: "",
          remark: "",
          serialNum: "ZZ00000024",
          telNo: ""
        }
      ],
      // 资格类型
      qualificationLevelOption: [
        { qualRangeName: "勘察设计甲级", qualRangeCode: "1" },
        { qualRangeName: "勘察设计乙级", qualRangeCode: "4" },
        { qualRangeName: "勘察设计丙级", qualRangeCode: "5" },
        { qualRangeName: "施工一级", qualRangeCode: "2" },
        { qualRangeName: "施工二级", qualRangeCode: "6" },
        { qualRangeName: "施工三级", qualRangeCode: "7" },
        { qualRangeName: "监理甲级", qualRangeCode: "3" },
        { qualRangeName: "监理乙级", qualRangeCode: "8" },
        { qualRangeName: "监理丙级", qualRangeCode: "9" }
      ],
      // 确认弹框
      totalCount: 0,
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 515
        ? 515
        : this.$store.getters.screenHeight
    },
    contentHeight: function() {
      return (
        'calc(100vh - ' + ((this.$store.getters.menuStyle === 1 ? 375 : 300) + this.collapseFormHeigth) + 'px)'

      )
    },
  },
  watch: {
   
  },
  created() {
  },
  mounted() {},
  methods: {
    close() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 搜索按钮
    searchFun() {
    },
    // /表头的序号
    indexMethod(index) {
      return ++index;
    },
    toggle(val) {  // 切换展开、收起
      this.collapseFormHeigth = val ? 0 : -74;
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    //重置
    resetForm() {
      this.queryParams = {
        condition: {
          searchKey: '',
          keyWord: '',
          handle: '0',
          superviseType: ''
        },
        pagination: {
          currentPage: 1,
          pageSize: 10
        },
        sort: {
          column: '',
          dir: ''
        }
      }
      // console.log(this.queryParams)
    },

    // 分页
    handleSizeChange() {
      // this.queryParams.pagination.pageSize = val
    },
    handleCurrentChange() {
      // this.queryParams.pagination.currentPage = val
    },
    // 个人待办选中查询
    searchHandle() {
    },
  }
}
</script>

<style lang="scss" scoped>
.formCheck /deep/ .el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
 
/deep/ .el-dialog--center .el-dialog__footer{
  text-align: right;
  padding: 10px 20px 15px 0;
}
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
.waitHandle /deep/ .collapse-form{
  text-align: left!important;
}
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

  // /deep/ .el-input__inner {
  //   width: 350px;
  // }
}
</style>