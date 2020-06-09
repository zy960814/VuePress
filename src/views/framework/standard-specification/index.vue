<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        标准规范
      </div>
      <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
        <div slot="header" class="fl">
          <el-select v-model="value" style="font-size: 12px; float:left;">
            <el-option label="关键字" value="keyWord"></el-option>
            <el-option label="标准名称" value="standardName"></el-option>
            <el-option label="标准号" value="standardNum"></el-option>
          </el-select>
          <div class="row_1 clear-float">
            <el-input
              placeholder="关键字"
              v-model="form.keyWord"
              class="keyword mr-10 fl">
              <el-button slot="append" @click="searchFun">搜索</el-button>
            </el-input>
            <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
          </div>
        </div>
      </collapse-form>
      <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
        <el-date-picker
          size="mini"
          v-model="form.includedYear"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          class="mr-10"
          style="width:300px;vertical-align: middle;">
        </el-date-picker>
        <el-select
          size="mini"
          clearable
          v-model="form.standardStatusCode"
          placeholder="标准状态"
          @change="searchHandle"
          class="mr-10">
          <el-option
            v-for="(label,key)  in  provinceOptions"
            :label="label.qualRangeName"
            :key="key"
            :value="label.qualRangeCode"
            style="vertical-align: middle;">
          </el-option>
        </el-select>
      <el-select
        size="mini"
        clearable
        v-model="form.standardNatureCode"
        placeholder="标准性质"
        @change="searchHandle"
        class="mr-10">
        <el-option
          v-for="(label,key)  in  provinceOptions1"
          :label="label.qualRangeName"
          :key="key"
          :value="label.qualRangeCode"
          style="vertical-align: middle;">
        </el-option>
      </el-select>
      </table-opt-menu>
      <el-table :data="tableData" border style="width: 100%" :height="contentHeight">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index"	:index="indexMethod" label="序号"	align="center"	width="60"></el-table-column>
        <el-table-column prop="standardNum" align="center" min-width="60px" label="标准号"></el-table-column>
        <el-table-column prop="title" align="center" label="标准名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.url">{{scope.row.title}}</span>
            <a v-else :href="scope.row.url" class="bulueClass">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="publishingDate" align="center" min-width="60px" label="发布日期">
          <template slot-scope="scope">{{scope.row.publishingDate|dateFormat('yyyy年MM月dd日')}}</template>
        </el-table-column>
        <el-table-column prop="executeDate" align="center" min-width="60px" label="实施日期">
          <template slot-scope="scope">{{scope.row.executeDate|dateFormat('yyyy年MM月dd日')}}</template>
        </el-table-column>
        <el-table-column prop="standardNatureName" align="center" min-width="60px" label="标准性质"></el-table-column>
        <el-table-column prop="standardStatusName" align="center" min-width="60px" label="标准状态"></el-table-column>
        <el-table-column prop="publishingBody" align="center" min-width="60px" label="发布机构"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagination.currentPageNumber"
        :page-sizes="[10, 20]"
        :page-size="queryParams.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
    <my-dialog width="500px" class="boxCard_dialog" :height='dialogHeight + "px"' :visible.sync="dialogFormVisibleType"  :append-to-body="false">
     <el-card shadow="never">
        <div slot="header">{{noticeTitle}}</div>
        <el-scrollbar :style="{height: (dialogHeight - 420) + 'px'}">
          <el-row style="text-align: left;margin-top:10px">
            <el-col :span="12"><p style="padding-bottom:0">发布机构：国家文物局</p></el-col>
            <el-col :span="12" style="text-align: right;"><p style="padding-bottom:0">日期：2020年03月01日</p></el-col>
            <p>根据国务院办公厅关于加强政府网站域名管理的通知（国办函[2018]55号），国家文物局综合行政管理平台将于2019年12月26日正式启用新域名gl.ncha.gov.cn，原域名gl.sach.gov.cn将于2020年3月26日停止使用，敬请广大网友使用新域名访问，由此带来的不便敬请谅解。特此公告。</p>
            <!-- <el-col :span="12"><p style="padding-bottom:0">发布机构：{{pubOrganization}}</p></el-col>
            <el-col :span="12" style="text-align: right;"><p style="padding-bottom:0">日期：{{pubTime|dateFormat('yyyy年MM月dd日')}}</p></el-col> -->
          </el-row>
          <!-- <p>{{data1 }}</p> -->
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisibleType = false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
// import PageTabs from '@/components/commons/PageTabs'
import CollapseForm from "@/components/commons/CollapseForm";
import TableOptMenu from "@/components/commons/TableOptMenu";
import MyDialog from "@/components/commons/MyDialog";
export default {
  name: "adminLaw",
  components: {
    TableOptMenu,
    MyDialog,
    CollapseForm
  },
  data() {
    return {
      totalCount: 0,
      value:"keyWord",
      currentPage: "1",
      dialogFormVisibleType: false,
      pubOrganization: "",
      pubTime: "2020-03-01 15:53:17",
      data1: "",
      provinceOptions: [],
      provinceOptions1: [],
      noticeTitle: "关于国家文物局综合行政管理平台域名更换的公告",
      queryParams: {
        pagination: {
          currentPageNumber: "",
          currentPage: "1"
        }
      },
      pagination: {
        currentPage: "1",
        pageSize: 10
      },
      // 表单数据
      form: {
        keyWordS: "", //下拉框
        keywords: "", //输入框
        handle: "", //个人待办
        superviseType: "" //监管类型
      },
      tableData: [
        {
          executeDate: "2019-06-01 00:00:00",
          fileName: "拓片元数据 著录规则.pdf",
          publishingBody: "中华人民共和国国家文物局",
          publishingDate: "2019-01-31 00:00:00",
          standardContent: "",
          standardNatureCode: "2",
          standardNatureName: "推荐性",
          standardNum: "WW/T 0093-2018",
          standardStatusCode: "1",
          standardStatusName: "现行",
          title: "拓片元数据 著录规则",
          url: "http://gl.ncha.gov.cn:8080/industry/bzgf/download?id=4028318170e677520170e67857c00097"
        },
        
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {
    //  选中项
    this.selectMenuItem = this.$route.query.selectMenuItem
      ? this.$route.query.selectMenuItem.toString()
      : "1";
    // 为了一进页面就显示角标
    // this.searchWait()
    // this.searchAlready()
    window.localStorage.getItem("token");
  },
  destroyed() {},
  methods: {
    show() {
      this.dialogFormVisibleType = true;
    },
    confirm() {
      this.dialogFormVisibleType = false;
    },
    // 搜索按钮
    searchFun() {
      this.searchWait();
    },
    //重置
    resetForm() {
      // this.form = {
      //   keyWordS: '',
      //   keywords: '',
      //   handle: '',
      //   superviseType: ''
      // }
      this.queryParams = {
        condition: {
          searchKey: "",
          keyWord: "",
          handle: "0",
          superviseType: ""
        },
        pagination: {
          currentPage: 1,
          pageSize: 10
        },
        sort: {
          column: "",
          dir: ""
        }
      };
      // console.log(this.queryParams)

      this.searchWait();
    },
    itemClick(evt) {
      switch (evt) {
        case "set-up":
          this.headerDialogVisible.flag = true;
          break;
      }
      console.log(evt);
    },
    searchHandle() {

    },
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val;
      this.searchWait();
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val;
      this.searchWait();
    },
    //表头的序号
    indexMethod(index) {
      return ++index;
    }
  },
  computed: {
    contentHeight: function() {
      return (
        "calc(100vh - " +
        (this.$store.getters.menuStyle === 1 ? 240 : 300) +
        "px)"
      );
    },
    dialogHeight() {
      // return 400
      return this.$store.getters.screenHeight > 255
        ? 255
        : this.$store.getters.screenHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  /deep/.el-dialog__body {
    padding: 0 20px;
  }

  /deep/ .el-card .el-card__body {
    padding-top: 0px !important;
    padding-bottom: 10px !important;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .bulueClass {
    color: #4b74ff !important;
    text-decoration: none !important;
    cursor: pointer;
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
}
</style>
