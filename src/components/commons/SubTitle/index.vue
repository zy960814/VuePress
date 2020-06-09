<template>
  <div class="sub_title">{{ data }}</div>
</template>

<script>
  export default {
    name: "SubTitle",
    props: {
      data: String
    }
  }
</script>

<style lang="scss" scoped>
  .sub_title {
    background-color: $--color-plain-hover;
    border-left: 5px solid $--color-primary;
    font-weight: bold;
    font-size: 14px;
    padding: 8px 10px;
    border-radius: 4px;
    margin: 10px 0;
  }
</style>
