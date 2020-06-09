<template>
  <div class="error">
    <img src="/static/img/error/404.png" alt>
    <h2>当前页面不存在，请输入正确的网址或返回主页</h2>
    <el-button round @click="$router.push('/')">返回主页</el-button>
  </div>
</template>

<style scoped>
  .error {
    background: #FFF;
    text-align: center;
  }

  img {
    height: 60vh;
  }
</style>
