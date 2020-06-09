<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        审批事项查询
        <!-- <div class="clear-float header_buttonTable">
          <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div> -->
      </div>
      <waithandle-table
        v-if="selectMenuItem==='1'"
        @total="total=>this.pageTabsData.tabs[0].num=total"
        :selectMenuItem="selectMenuItem"/>
    </el-card>
  </div>
</template>

<script>
// import PageTabs from '@/components/commons/PageTabs'
import WaithandleTable from './WaithandleTable'
// import { searchAlreadyHandle, searchWaitHandle } from '@/api/national'
export default {
  name: 'adminLaw',
  components: {
    // PageTabs,
    WaithandleTable,
  },
  props: {},
  data() {
    return {
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '待办',
            num: ''
          },
          {
            title: '已办',
            num: ''
          }
        ]
      },
      // 选中的菜单项（文物临时进境/文物复出境...）
      selectMenuItem: ''
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 615
        ? 615
        : this.$store.getters.screenHeight
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
    // 切换代办已办
    handleSelect(key) {
      // console.log(key, keyPath)
      this.selectMenuItem = key
      this.$router.push({ query: { selectMenuItem: key } })
      // this.$route.query.selectMenuItem = key
    },
    
  }
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
}
</style>
