<template>
  <el-row style="border:1px solid #f2f2f2;">
    <p
      style="line-height:22px;"
      :class="{forbidenP:true,textident:identFlag}"
      v-for="(item,index) in textData"
      :key="index"
    >{{item}}</p>
  </el-row>
</template>

<script>
export default {
  name: "Paragraph",
  props: {
    textData: {
      type: Array,
      require: true
    },
    // 是否首行缩进
    identFlag: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.forbidenP {
  font-size: 12px;
  line-height: 12px;
  margin: 5px 0;
  text-align: left;
}
.textident {
  text-indent: 30px;
}
</style>