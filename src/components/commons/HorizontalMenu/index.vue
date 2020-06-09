<template>
  <el-scrollbar>
    <el-menu
        ref="menu"
        :style="{width: menuContainerWidth + 'px'}"
        class="menu"
        default-active="first"
        mode="horizontal"
    >
      <div class="split"></div>
      <el-submenu
          v-for="(item, index) in $store.getters.menuList"
          :key="index"
          :index="String(index)">
        <template slot="title">
          <svg-icon icon-class="site" style="margin-right: 5px"/>
          <!--<i class="el-icon-location"></i>-->
          <span slot="title">{{ item.auth_name }}</span>
        </template>
        <el-scrollbar class="submenu-box">
          <el-menu-item
              v-for="(subItem, subIndex) in item.submenu"
              :key="subIndex"
              :index="String(subIndex)">{{ subItem.auth_name }}
          </el-menu-item>
        </el-scrollbar>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  export default {
    name: "HorizontalMenu",
    data() {
      return {
        menuContainerWidth: 200
      }
    },
    mounted() {
      this.$nextTick(() => {
        const menuEle = this.$refs.menu.$el;
        const firstLevelMenu = menuEle.querySelectorAll('.el-submenu');
        let containerWidth = 0;
        firstLevelMenu.forEach(item => containerWidth += item.clientWidth);
        this.menuContainerWidth = containerWidth + 50;
      });
    }
  }
</script>

<style lang="scss" scoped>

  /*.el-menu {
    .el-menu-item {
      font-size: 16px;
    }
  }*/

  .menu {

    .el-menu-item, .el-submenu /deep/ .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }

    .split {
      border-right: 2px solid #777;
      float: left;
      height: 20px;
      line-height: 20px;
      position: relative;
      top: 10px;
      margin: 0 5px 0 10px;

      i {
        color: #666;
        cursor: pointer;
      }

      i:hover {
        color: $--color-primary;
      }
    }

    /*/deep/ .el-submenu__title {
      font-size: 16px;
      color: #000;
    }*/
  }

  .submenu-box {

    /deep/ .el-scrollbar__wrap {
      max-height: 300px;
    }
  }
</style>
