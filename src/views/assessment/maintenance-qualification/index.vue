<template>
  <div class="content">
    <el-card shadow="never" class="header_Table">
      <div slot="header">
        文保资质信息维护
        <div class="clear-float header_buttonTable">
          <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
        </div>
      </div>
      <unit-information
        v-if="selectMenuItem==='1'"
        @total="total=>this.pageTabsData.tabs[0].num=total"
        :selectMenuItem="selectMenuItem"/>
      <personnel
        v-if="selectMenuItem==='2'"
        :selectMenuItem="selectMenuItem"
        @total="total=>this.pageTabsData.tabs[1].num=total"/>
    </el-card>
  </div>
</template>

<script>
import PageTabs from '@/components/commons/PageTabs'
import UnitInformation from './UnitInformation'
import Personnel from './Personnel'
// import AlreadyhandleTable from './AlreadyhandleTable'
// import { searchAlreadyHandle, searchWaitHandle } from '@/api/national'
export default {
  name: 'adminLaw',
  components: {
    PageTabs,
    UnitInformation,
    Personnel
    // AlreadyhandleTable
  },
  props: {},
  data() {
    return {
      // 切换按钮数据
      pageTabsData: {
        tabs: [
          {
            title: '资质单位信息维护',
            num: ''
          },
          {
            title: '资格人员信息维护',
            num: ''
          },
          {
            title: '批复文件',
            num: ''
          }
        ]
      },
      // 选中的菜单项（文物临时进境/文物复出境...）
      selectMenuItem: ''
    }
  },
  computed: {},
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
    padding-bottom: 10px !important;
  }
}
</style>
