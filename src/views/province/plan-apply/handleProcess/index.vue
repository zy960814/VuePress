<template>
  <div class="content">
    <div class="scroll" :style="{height: dialogHeight+'px'}">
      <el-image :src="src">
        <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
import banliliuchen from '@/assets/image/navigation-bar/banliliuchen.jpg'
export default {
  components: {},
  props: {},
  data() {
    return {
      src: banliliuchen
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight - 80
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  .scroll {
    overflow-y: auto;
    z-index: 10000;
  }
}
</style>
