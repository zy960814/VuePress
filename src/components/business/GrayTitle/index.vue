<template>
  <el-row class="basicMessage clear-float" :id="`${idName}_${data.idIndex}`">
    <span class="fl">{{data.changeList[+data.idIndex]}}</span>
    <el-link
        type="primary"
        class="fr"
        @click="$emit('click')"
        v-if="data.linkName">{{data.linkName}}</el-link>
  </el-row>
</template>

<script>
  export default {
    name: "GrayTitle",
    props: {
      data: {
        type: Object,
        required: true
      },
      // 传入的需要跳转段落的id,不给默认为jumpTitle_locations
      idName: {
        type: String,
        default: "jumpTitle_locations"
      }
    }
  };
</script>

<style lang="scss" scoped>
  .basicMessage {
    text-align: left;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
    padding: 10px;
    color: #000;
    background-color: #F5F7FA;
  }
</style>
