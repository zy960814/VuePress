<template>
  <div>
    <el-card shadow="never">
      <div slot="header">文物地图</div>
        <el-scrollbar :style="{height: (dialogHeight - 160) + 'px'}" view-style="height:100%">
            <iframe width="100%" height="100%" frameborder="0"  id="iframe3" :src="Url"></iframe>
        </el-scrollbar>
      </el-card>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      Url: 'http://202.41.241.235/#/stateprotect',
    }
  },
  methods: {
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 660
        ?  660
        : this.$store.getters.screenHeight;
    },
  },
}
</script>
<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x:hidden
  }
  .el-upload__tip{
    margin-left: 15px;
  }
  .row_1 {
  display: inline-block;
  margin: 0 auto;

  .keyword {
    width: 540px;
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
    height: 100% !important;
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

