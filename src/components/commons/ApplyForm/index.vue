<template>
  <div class="applyForm">
    <!-- <div class="style1" v-if="choseStatus">
      <div class="title_0 clear-float">
        <div class="fl">
          <span
            v-for="(item, index) in data"
            :key="index"
            @click="buttonChange(item,index)"
            v-text="item"
            :class="[{click_style:index===0?clickstyle_0:clickstyle_1}]"
          ></span>
        </div>
        <div class="fr titleInsert">
          <slot name="title_insert"></slot>
        </div>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
    </div>

    <div class="style2" v-if="!choseStatus">
      <div class="title_1 clear-float">
        <div class="fl">
          <span
            v-for="(item, index) in data"
            :key="index"
            @click="buttonChange(item,index)"
            v-text="item"
          ></span>
        </div>
        <div class="fr titleInsert">
          <slot name="title_insert"></slot>
        </div>
      </div>
      <div>
        <slot name="body"></slot>
      </div>
    </div>-->
    <div>
      <!-- 第一行 -->
      <div class="clear-float button_oneline">
        <!-- 第一行左边插槽 -->
        <div class="fl" :style="{width:widthOneL}">
          <slot name="titleInsertL_one"></slot>
        </div>
        <!-- 第一行右边插槽 -->
        <div class="fr" :style="{width:widthOneR}">
          <div class="fr">
            <slot name="titleInsertR_one"></slot>
          </div>
        </div>
      </div>
      <!-- 第二行 -->
      <div class="clear-float button_twoline">
        <div class="fl" :style="{width:widthTwoL}">
          <el-tabs v-model="activeName" @tab-click="buttonChange">
            <el-tab-pane v-for="(item, index) in dataTitle" :key="index" :label="item" :name="item">
              <span slot="label">{{item}}</span>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 第二行右边插槽 -->
        <div class="fr button_oneline" :style="{width:widthTwoR}">
          <div class="fr">
            <slot name="titleInsertR_two"></slot>
          </div>
        </div>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplyForm',
  props: {
    data: {
      type: Array,
      require: true
    },
    widthOneL: {
      type: String,
      default: '40%'
    },
    widthTwoL: {
      type: String,
      default: '90%'
    }
  },
  data() {
    return {
      // 按钮点击时的样式
      clickstyle_0: true,
      clickstyle_1: false,
      tableData: [],
      totalCount: 0
    }
  },
  computed: {
    dataTitle() {
      return this.data
    },
    activeName: {
      get() {
        return this.data[0]
      },
      set() {}
    },
    widthTwoR() {
      return `calc(100% - ${this.widthTwoL})`
    },
    widthOneR() {
      return `calc(100% - ${this.widthOneL})`
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // buttonChange(item, index) {
    //   if (index === 0) {
    //     this.clickstyle_0 = true
    //     this.clickstyle_1 = false
    //   } else {
    //     this.clickstyle_0 = false
    //     this.clickstyle_1 = true
    //   }
    //   this.$emit('click', item)
    // }
    buttonChange(tab) {
      this.$nextTick(() => {
        this.$emit('tab-click', tab)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.applyForm {
  /deep/.el-tabs--border-card > .el-tabs__content {
    display: none;
  }
  .el-tabs--border-card {
    border-right: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  /deep/.el-tabs--border-card > .el-tabs__header {
    border-bottom: none;
  }
  .button_oneline {
    line-height: 40px;
    height: 40px;
    border-bottom: 2px solid #dfe4ed;
    // background-color: #f2f2f2;
    padding: 0 0px;
  }
  // .button_twolineR {
  //   line-height: 38px;
  //   border-bottom: 2px solid #dfe4ed;
  //   padding: 0 8px;
  // }
  .button_twoline {
    margin-top: 5px;
  }
  .body {
    // margin-top: 3px;
    border: 1px solid gray;
    height: 100px;
  }
  // .style1 {
  //   .title_0 {
  //     border: 1px solid gray;
  //     border-bottom: none;
  //     padding: 8px 0 0;
  //     position: relative;
  //     .titleInsert {
  //       position: absolute;
  //       top: 50%;
  //       right: 0;
  //       transform: translateY(-50%);
  //     }
  //     .fl span {
  //       padding: 10px 20px;
  //       margin-right: 2px;
  //       background-color: $--color-primary;
  //       opacity: 0.5;
  //       color: #fff;
  //       position: relative;
  //       cursor: pointer;
  //       display: inline-block;
  //       font-size: 14px;
  //       // border: 1px solid gray;
  //       &:after {
  //         content: '';
  //         width: 0;
  //         height: 0;
  //         position: absolute;
  //         right: 0;
  //         top: 0;
  //         border: 5px solid #fff;
  //         border-bottom-color: transparent;
  //         border-left-color: transparent;
  //       }

  //       // &:hover {
  //       //   background: $--color-primary-hover;
  //       //   border-color: $--color-primary-hover;
  //       // }
  //     }
  //     .click_style {
  //       opacity: 1 !important;
  //       // background-color: $--color-primary-hover !important;
  //       border-color: $--color-primary-hover;
  //     }
  //     .fr {
  //       padding: 3px 5px 0 0;
  //       line-height: 18px;
  //     }
  //   }
  //   .body {
  //     // margin-top: 3px;
  //     border: 1px solid gray;
  //     height: 100px;
  //   }
  // }
  // .style2 {
  //   .title_1 {
  //     .fl span {
  //       padding: 0 8px;
  //       height: 28px;
  //       line-height: 28px;
  //       margin-right: 2px;
  //       background-color: $--color-primary;
  //       color: #fff;
  //       position: relative;
  //       cursor: pointer;
  //       display: inline-block;
  //       font-size: 14px;

  //       &:after {
  //         content: '';
  //         width: 0;
  //         height: 0;
  //         position: absolute;
  //         right: 0;
  //         top: 0;
  //         border: 5px solid #fff;
  //         border-bottom-color: transparent;
  //         border-left-color: transparent;
  //       }

  //       &:hover {
  //         background: $--color-primary-hover;
  //         border-color: $--color-primary-hover;
  //       }
  //     }
  //   }

  //   .body {
  //     margin-top: 3px;
  //     border: 1px solid $--border-color;
  //   }
  // }
}
</style>
