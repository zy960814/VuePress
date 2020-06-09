<template>
  <el-row class="basicMessage clear-float" :id="`${idName}_${data.idIndex}`">
    <span class="fl">{{data.changeList[+data.idIndex]}}</span>
    <el-link type="primary" class="fr" v-if="data.linkName">{{data.linkName}}</el-link>
  </el-row>
</template>

<script>
export default {
  name: 'GrayTitle',
  props: {
    // data:{
    // titletext-标题名称,
    // idIndex-第几个灰色背景标题
    // linkName-链接名称
    // }
    data: {
      type: Object,
      required: true
    },
    // 传入的需要跳转段落的id,不给默认为jumpTitle_locations
    idName: {
      type: String,
      default: 'jumpTitle_locations'
    }
  }
}
</script>
<style lang="scss" scoped>
// 基本信息行样式
.basicMessage {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
  padding: 10px;
  color: #000;
  background-color: #f5f7fa;
}
</style>
