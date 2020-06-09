<template>
  <my-color-picker v-model="theme" :predefine="['#2264A0', '#1890FF', '#31859B','#F25B79', '#F67A17',
      '#11A983', '#13C2C2', '#6959CD', '#F5222D']"/>
</template>

<script>
  import MyColorPicker from './src/main'
  import theme from '@/utils/theme'

  export default {
    components: {
      MyColorPicker
    },
    data() {
      return {
        theme: theme.get()
      }
    },
    watch: {
      theme(val) {
        theme.change(val);
      }
    }
  }
</script>
