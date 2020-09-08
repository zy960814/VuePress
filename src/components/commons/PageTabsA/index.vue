<template>
  <el-row class="wenWuMenu">
    <el-menu
        :default-active="activeIndex"
        class="clear-float"
        mode="horizontal"
        @select="handleSelect"
    >
      <template v-for="(item,index) in pageTabsData.tabs">
        <el-menu-item :key="index" :index="String(index+1)" :style="{width}">
          <span class="wenwuItem">{{item.title}}</span>
          <el-badge :value="item.num" class="item" style="z-index:100;"></el-badge>
        </el-menu-item>
        <li class="liLine" :key="`split${index}`" v-if="index !== pageTabsData.tabs.length - 1"></li>
      </template>
      <div
          class="fr clear-float"
          style="height:35px;box-sizing:border-box;padding:3px;"
          v-if="pageTabsData.hasOwnProperty('buttons') "
      >
        <template v-for="(item,index) in pageTabsData.buttons">
          <el-button
              type="primary"
              class="fl personalTake"
              size="mini"
              :key="index"
              @click="buttonClick(index+1)"
          >{{item}}
          </el-button>
        </template>
      </div>
      <div style="line-height:36px;text-align: right">
        <slot></slot>
      </div>
    </el-menu>
  </el-row>
</template>

<script>
  export default {
    name: 'PageTabs',
    props: {
      pageTabsData: {
        type: Object,
        require: true
      },
      auth: {
        type: Boolean,
        default: false
      },
      selectMenuItem:{
        default:1,
      }
    },
    watch:{
      selectMenuItem(val){
        this.selectMenuItem=val;
        if(!this.$route.query.selectMenuItem){
          this.activeIndex=this.selectMenuItem.toString();
        }
      }
    },
    data() {
      return {
        // 文物进出境默认激活项
        activeIndex: '1'
      }
    },
    computed: {
      width() {
        return 99 / this.pageTabsData.tabs.length + '%'
      }
    },
    mounted() {
      this.activeIndex = this.$route.query.selectMenuItem
        ? this.$route.query.selectMenuItem.toString()
        : '1';
      if (this.auth) {
        for (let i = 0; i < this.pageTabsData.tabs.length; i++) {
          if (this.$store.getters.accessTabs.indexOf(this.pageTabsData.tabs[i].title) < 0) {
            this.pageTabsData.tabs.splice(i, 1);
            i--;
          }
        }
      }
    },
    methods: {
      // 文物进出境菜单(从1开始)
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$emit('handle-select', key, keyPath)
      },
      // 按钮点击事件
      buttonClick(index) {
        // 按钮点击事件名称为button-click-1、button-click-2...依次
        this.$emit(`button-click-${index}`)
      },
      // 设置 TAB 页索引
      setIndex(tabIndex) {
        this.activeIndex = tabIndex;
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 下标位置
  .el-badge {
    margin-left: 5px;
  }

  /deep/ .el-badge__content {
    border: none;
    border-radius: 3px;
    top: 50%;
    transform: translateY(-5%);
  }

  .wenWuMenu {
    .el-menu-demo .el-menu-item {
      border-bottom-color: $--color-primary !important;
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
      text-align: center;
      // border-right: 1px solid #ccc;
      padding: 0 10px 5px;

      .wenwuItem {
        font-size: 14px;
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

    // 个人携带按钮样式
    .el-button.personalTake {
      // background: $--color-primary;
      color: white;
      margin-left: 5px;
      // width: 120px;
      font-size: 14px;
      border: none;
      // border-color: white;
    }

    .el-button--mini {
      border-radius: 6px;
    }
  }
</style>
