<template>
  <div class="content">
    <div class="title" @click="DropDownClick">
      <i class="el-icon-document"></i>
      <span>{{ data }}</span>
      <span v-if="showDropDown" class="DropDown">
        <span v-if='DropDownStaus' class="el-icon-arrow-down"></span>
        <span v-if='!DropDownStaus' class="el-icon-arrow-right"></span>
      </span>
    </div>
    <div style="padding: 10px" class="applyFormItem " v-if='DropDownStaus'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: String,
    showDropDown:{ // 是否显示下拉 默认fasle 不显示
      type:Boolean,
      default:false
    },
    DropDownStaus:{// 下拉默认状态 默认true 展开
      type:Boolean,
      default:true
    }
  },
 methods: {
   DropDownClick(){
    if(!this.showDropDown) return //如果不显示 不触发事件
    this.DropDownStaus=!this.DropDownStaus
   },
 },
}
</script>

<style lang="scss" scoped>
.content {
  .title {
    padding: 10px;
    background-color: #f2f2f2;
    font-weight: bold;
    font-size: 14px;
    span {
      margin-left: 10px;
    }
  }
}
.DropDown{
  float: right
}
</style>
