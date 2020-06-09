<template>
  <div id="app" v-loading.fullscreen.lock="$store.getters.loading">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
