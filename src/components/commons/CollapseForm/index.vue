<template>
  <div class="collapse-form" style="text-align: center">
    <div class="clear-float" style="display: inline-block">
      <slot name="header"></slot>
      <el-button v-if="collapseEnabled" type="text" @click="toggle" class="fl">{{ collapseProps[activeIndex].text }}
        <i :class="collapseProps[activeIndex].icon"></i>
      </el-button>
    </div>
    <template v-if="collapseEnabled">
      <div v-show="activeIndex === 1">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'CollapseForm',
    props: {
      collapseEnabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        activeIndex: 1,  // 当前选中项索引
        collapseProps: [{
          text: '展开',
          icon: 'el-icon-arrow-down'
        }, {
          text: '收起',
          icon: 'el-icon-arrow-up'
        }]
      }
    },
    methods: {
      toggle() {  // 切换展开、收起
        this.activeIndex = (this.activeIndex + 1) % 2;
        this.$emit('toggle', this.activeIndex);
      }
    }
  }
</script>
