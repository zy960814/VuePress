<template>
  <div>
    <div style="height: 800px;">
      <iframe width="100%" height="100%" frameborder="0"  id="iframe3" :src="Url"></iframe>
    </div>
  </div>
</template>
<script>
// import TableOptMenu from '@/components/commons/TableOptMenu'
export default {
  components: {
    // TableOptMenu
  },
  data() {
    return {
      Url: 'http://202.41.241.235/#/statelocation?showTowLine=1&showToolBox=1',
      tableData:[
        {
          name: '文书室',
          department: '省局',
          record: '已发送',
          blyj: '不通过',
          jssj: '12：20',
          fssj: '3:10',
          tlsj: '12：40',
          bjqxsyts: '1',
          cbxx: '着急'
        }
      ]
    }
  },
  methods: {
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 640
        ?  640
        : this.$store.getters.screenHeight;
    },
  },
}
</script>
<style lang="scss" scoped>
 .buttonRgith {
   text-align: right;
   margin-bottom: 10px;
 }
 /deep/ .el-scrollbar__wrap {
   overflow-x: hidden;
 }
 
  // /deep/ .el-table--scrollable-x .el-table__body-wrapper{
  //   overflow-x: hidden;
  // }
</style>

