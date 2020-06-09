<template>
  <div>
    <template v-for="(item, index) in data">
      <el-submenu
          v-if="item.submenu"
          :key="index"
          :index="item.id">
        <template slot="title">
          <svg-icon icon-class="site" style="margin: 0 10px 0 5px"/>
          <!--<i class="el-icon-location"></i>-->
          <span slot="title">{{ item.auth_name }}</span>
        </template>
        <menu-tree v-if="!!item.submenu" :data="item.submenu"></menu-tree>
        <el-menu-item
            v-else
            @click="$router.push(subItem.url)"
            v-for="(subItem, subIndex) in item.submenu"
            :key="subIndex"
            :index="subItem.id">{{ subItem.auth_name }}</el-menu-item>
      </el-submenu>
      <el-menu-item @click="$router.push(item.url)" v-else :key="index">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.auth_name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  import MenuTree from './MenuTree'

  export default {
    name: "MenuTree",
    components: {
      MenuTree
    },
    props: {
      data: Array
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-submenu__title, .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
</style>
