<template>
  <div class="sidebar">
    <ul>
      <li>帮助<br>手册</li>
      <li>材料<br>下载</li>
      <li>
        <a href="#/framework/policy">
          法律<br>法规
        </a>
      </li>
      <li>
        <a href="#/framework/standard-specification">
          标准<br>规范
        </a>
      </li>
      <li>服务<br>评价</li>
      <el-popover
          placement="left"
          trigger="hover"
          v-model="visible">
        <img src="/static/img/side-bar/download_code.png" alt="">
        <li slot="reference">移动<br>应用</li>
      </el-popover>
      <li class="last_child">
        <a href="#/framework/systematic-notification">
          系统<br>通知
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {
        visible: false
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

  .sidebar {
    position: relative;

    ul {
      border: 1px solid #C9C9C9;
      border-radius: 5px;
      overflow: hidden;
      position: fixed;
      top: 30vh;
      list-style: none;

      li {
        width: 50px;
        padding: 6px 0;
        border-bottom: 1px solid #C9C9C9;
        background-color: #FFF;
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        color: #666;
        line-height: 1.4;

        &.last_child {
          border-bottom: none;
        }
      }

      li:hover {
        background-color: $--color-primary;
        color: #FFF;
      }
    }
  }
</style>
