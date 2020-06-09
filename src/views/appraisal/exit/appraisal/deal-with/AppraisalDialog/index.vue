<template>
  <div class="content">
    <h2>鉴定文物或复仿制品</h2>
    <el-scrollbar :style="{height: (contentHeight - 96) + 'px'}">
      <el-container>
        <el-aside width="300px">
          <list ref="list"/>
        </el-aside>
        <el-main>
          <details-edit/>
        </el-main>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
  import List from './List'
  import DetailsEdit from './DetailsEdit'

  export default {
    components: {
      List,
      DetailsEdit
    },
    props: {
      contentHeight: Number
    },
    methods: {
      x_cyNext(row) {
        this.$refs['list'].cyNext(row);
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .content {

    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 0 0 5px 0;
      margin: 0 0 10px 0;
      border-bottom: 1px solid $--border-color;
      color: #303133;
    }

    .el-main {
      padding: 0 15px;
    }
  }
</style>
