<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        系统通知
      </div>
      <table-opt-menu @item-click="itemClick" style="margin: 5px 0">
        <el-date-picker
          size="mini"
          v-model="form.submitTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          class="mr-10"
          style="width:300px;vertical-align: middle;">
        </el-date-picker>
      </table-opt-menu>
      <el-table :data="tableData" border style="width: 100%" :height="contentHeight">
        <el-table-column width="50" prop="num" label="序号"  ></el-table-column>
        <el-table-column min-width="150" prop="noticeTitle" label="通知标题"  >
          <template  slot-scope="scope">
            <a class="bulueClass" href="javascript:" @click="show(scope.row)">{{scope.row.noticeTitle}}</a>
          </template>
        </el-table-column>
        <el-table-column min-width="150" prop="pubTime" label="发布时间"  >
          <template slot-scope="scope">{{scope.row.pubTime|dateFormat('yyyy年MM月dd日')}}</template>
        </el-table-column>
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
import TableOptMenu from '@/components/commons/TableOptMenu'
import MyDialog from '@/components/commons/MyDialog'
export default {
  name: 'adminLaw',
  components: {
    TableOptMenu,
    MyDialog
  },
  data() {
    return {
      totalCount: 0,
      currentPage: 1,
      dialogFormVisibleType:false,
      pubOrganization: '',
      pubTime: '2020-03-01 15:53:17',
      data1:'',
      noticeTitle: '关于国家文物局综合行政管理平台域名更换的公告',
      queryParams: {
        pagination: {
          currentPageNumber: '',
          currentPage: 1
        }
      },
     // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
      tableData: [
        {
          num: 1,
          pubTime: '2020-03-01 15:53:17',
          noticeTitle: '关于国家文物局综合行政管理平台域名更换的公告',
        }
      ],
    }
  },
  watch: {},
  created() {},
  mounted() {
    //  选中项
    this.selectMenuItem = this.$route.query.selectMenuItem
      ? this.$route.query.selectMenuItem.toString()
      : '1'
    // 为了一进页面就显示角标
    // this.searchWait()
    // this.searchAlready()
    window.localStorage.getItem('token');

  },
  destroyed() {},
  methods: {
    show() {
      this.dialogFormVisibleType = true;
    },
    confirm() {
      this.dialogFormVisibleType = false;
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
    // 分页
    handleSizeChange(val) {
      this.queryParams.pagination.pageSize = val
      this.searchWait()
    },
    handleCurrentChange(val) {
      this.queryParams.pagination.currentPage = val
      this.searchWait()
    },
  },
  computed: {
    contentHeight: function() {
      return (
        'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 200 : 300) + 'px)'
      )
    },
    dialogHeight(){
        // return 400
       return this.$store.getters.screenHeight > 255
        ? 255
        : this.$store.getters.screenHeight
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  /deep/.el-dialog__body {
    padding: 0 20px;
  }

  /deep/ .el-card .el-card__body {
    padding-top: 0px !important;
    padding-bottom: 10px!important;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .bulueClass {
    color: #4b74ff !important;
    text-decoration: none !important;
    cursor: pointer;
  }
}
</style>
