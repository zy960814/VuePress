<template>
  <!-- 切换按钮 -->
  <el-row class="wenWuMenu">
    <el-menu
      :default-active="activeIndex"
      class="clear-float"
      mode="horizontal"
      @select="handleSelect"
    >
      <template v-for="(item,index) in data">
        <el-menu-item :key="index" :index="String(index)" :style="{width}">
          <el-link class="wenwuItem" :underline="false">{{item}}</el-link>
        </el-menu-item>
        <li class="liLine" :key="`split${index}`" v-if="index !== data.length - 1"></li>
      </template>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: "PageLocations",
  props: {
    data: Array,
    // 传入的需要跳转段落的id,不给默认为jumpTitle_locations(暴露给自定义跳转段落用的,不自定义可不写)
    idName: {
      type: String,
      default: "jumpTitle_locations"
    }
  },
  data() {
    return {
      //切换按钮默认激活项
      activeIndex: "0"
    };
  },
  computed: {
    width() {
      let width = 99 / this.data.length + "%";
      // console.log(width);
      return width;
    }
  },
  methods: {
    // 点击切换按钮
    handleSelect(index) {
      this.$emit("select", `${this.idName}_${index}`, index);
      // id为对应跳转的段落的id(id已经设置好了不用动直接用)
      document.getElementById(`${this.idName}_${index}`).scrollIntoView();
    }
  }
};
</script>

<style lang="scss" scoped>
// 切换按钮样式（基本信息、办理流程、办理材料目录……）
.wenWuMenu {
  margin: 8px 0;
  .el-menu-demo .el-menu-item {
    border-bottom-color: #0066a0 !important;
  }
  ul {
    box-sizing: border-box;
    // padding: 5px 0;
  }
  ul > li {
    // width: 110px;
    height: 35px;
    line-height: 35px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: center;
    // border-right: 1px solid #ccc;
    padding: 0;
    .wenwuItem {
      color: #000;
      font-size: 14px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      padding: 0 0 5px;
    }
  }
  .liLine {
    float: left;
    height: 22px;
    width: 1px;
    background-color: #909399;
    padding: 0;
    margin: 7px 0 5px;
  }
  // ul > li:nth-of-type(even) {
  //   width: 1px;
  //   height: 5px;
  //   background-color: #40859b;
  // }
  ul > li:last-of-type {
    border-right: 0;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: $--color-primary;
    // width: 110px;
    height: 35px;
    line-height: 35px;
    font-weight: 700;
    // background-color: #31859b;
  }
}
</style>