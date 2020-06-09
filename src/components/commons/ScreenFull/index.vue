<template>
  <svg-icon class="opt_icon" :icon-class="isFullscreen?'exit-full-screen':'full-screen'" @click="click" />
</template>

<script>
  import screenFull from 'screenfull'
  export default {
    name: "ScreenFull",
    data() {
      return {
        isFullscreen: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      click() {
        if (!screenFull.isEnabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          });
          return false;
        }
        screenFull.toggle();
      },
      init() {
        if (screenFull.isEnabled) {
          screenFull.on('change', () => {
            this.isFullscreen = screenFull.isFullscreen;
          })
        }
      }
    }
  }
</script>

<style scoped>
  .opt_icon {
    font-size: 16px !important;
    position: relative;
    top: -2px;
  }
</style>
