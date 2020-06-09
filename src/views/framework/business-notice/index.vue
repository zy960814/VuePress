<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        业务通知
      </div>
      <!-- <collapse-form @search-fun="searchFun" @reset-form="resetForm" :collapse-enabled="false">
        <div slot="header" class="fl">
          <el-select v-model="value" style="font-size: 12px; float:left;">
            <el-option label="关键字" value="keyWord"></el-option>
            <el-option label="标题" value="standardName"></el-option>
            <el-option label="正文" value="standardNum"></el-option>
            <el-option label="文号" value="standardNum"></el-option>
          </el-select>
          <div class="row_1 clear-float">
            <el-input
              placeholder="标题/正文/文号"
              v-model="form.keyWord"
              class="keyword mr-10 fl">
              <el-button slot="append" @click="searchFun">搜索</el-button>
            </el-input>
            <el-button type="primary" plain @click="resetForm" class="fl">重置</el-button>
          </div>
        </div>
      </collapse-form> -->
      <!-- <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
        <span style="font-size:13px">时间范围：</span>
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
      </table-opt-menu> -->
      <el-table :data="tableData" border style="width: 100%" :height="contentHeight" :cell-style="yellowBg">
        <el-table-column prop="name" label="标记" width="60"></el-table-column>
        <el-table-column type="index" width="55" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column prop="infoTitle" label="通知标题"></el-table-column>
        <el-table-column prop="infoNum" label="通知内容"></el-table-column>
        <el-table-column prop="writtenDate" label="通知日期"></el-table-column>
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
  </div>
</template>

<script>
// import PageTabs from '@/components/commons/PageTabs'
// import CollapseForm from "@/components/commons/CollapseForm";
// import TableOptMenu from "@/components/commons/TableOptMenu";
// import MyDialog from "@/components/commons/MyDialog";
export default {
  name: "adminLaw",
  components: {
    // TableOptMenu,
    // MyDialog,
    // CollapseForm
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
          name: '未读',
          classId: "06",
          describe: "文物政发〔2020〕6号国家文物局关于修改《可移动文物修复管理办法》等三部规范性文件的决定根据党中央、国务院关于深化“放管服”改革、优化营商环境决策部署有关要求，现对《可移动文物修复管理办法》等三部规范性文件作出修改如下。一、对《可移动...",
          displayDate: "2020-04-30 10:50:47",
          id: "8280818670cda4c60170cdazxx051301",
          infoContent: "",
          infoNum: "文物政发〔2020〕6号",
          infoTitle: "可移动文物修复管理办法",
          legalType: "规范性文件",
          num: 1,
          postOffice: "政策法规司                                     ",
          publishDate: "",
          writtenDate: "2020-04-30 10:51:47"
        },
        {
          name: '已读',
          classId: "06",
          describe: "文物政发〔2020〕6号国家文物局关于修改《可移动文物修复管理办法》等三部规范性文件的决定根据党中央、国务院关于深化“放管服”改革、优化营商环境决策部署有关要求，现对《可移动文物修复管理办法》等三部规范性文件作出修改如下。一、对《可移动...",
          displayDate: "2020-04-30 10:49:47",
          id: "8280818670cda4c60170cdazxx051302",
          infoContent: "",
          infoNum: "文物政发〔2020〕6号",
          infoTitle: "文物拍卖管理办法",
          legalType: "规范性文件",
          num: 2,
          postOffice: "政策法规司                                        ",
          publishDate: "",
          writtenDate: "2020-04-30 10:51:47",
        }
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
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
    // rowIndex是第几行，columnIndex是第几列
    yellowBg ({row, columnIndex}) {
      if (row.name === '未读' && columnIndex === 0) {
        return {
          background: 'red',color:'#fff'
        }
      }else if(row.name === '已读' && columnIndex === 0) {
        return {
          background: 'green',color:'#fff'
        }
      }
    },
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
  },
  computed: {
    contentHeight: function() {
      return (
        "calc(100vh - " +
        (this.$store.getters.menuStyle === 1 ? 160 : 300) +
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
.textRight {
    text-align: center;
    margin: 5px 0;
  }
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
