<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('updateV2Token', decodeURIComponent(this.$route.query.token));
    }
  }
</script>
