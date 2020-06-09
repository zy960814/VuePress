<template>
  <div>
    <navigation-bar/>
    <div v-show="$store.getters.showMainContainer">
      <horizontal-menu v-show="$store.getters.menuStyle===0" />
      <div class="main-container" :style="{ height: mainContainerHeight }">
        <left-menu v-if="$store.getters.menuStyle===1"/>
        <div class="app-main">
          <router-view/>
        </div>
        <sidebar v-show="sidebar.opened" class="sidebar"/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationBar from '../NavigationBar'
  import HorizontalMenu from '../HorizontalMenu'
  import LeftMenu from '../LeftMenu'
  import Sidebar from '../Sidebar'

  export default {
    name: "Layout",
    components: {
      NavigationBar,
      HorizontalMenu,
      LeftMenu,
      Sidebar
    },
    computed: {
      sidebar() {
        return this.$store.getters.sidebar
      },
      mainContainerHeight() {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 60 : 101) + 'px' + ')';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    background-color: #F2F2F2;

    .app-main {
      flex: 1;
      margin: 3px;
      padding: 10px;
      background-color: #FFF;
      overflow-x: hidden;
      overflow-y: hidden;
    }

    .sidebar {
      width: 50px;
      position: relative;
      right: 5px;
      margin-left: 5px;
    }

  }
</style>
