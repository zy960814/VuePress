<template>
  <div class="tableBUttonItem">
    <!-- @buttonClick="`click${index}(${id})`" -->
    <table-button v-for="(item,index) in tablebuttonItemData" :key="index" :buttonName="item"></table-button>
  </div>
</template>

<script>
import TableButton from '@/components/commons/TableButton'
export default {
  name: 'TablebuttonItem',
  components: { TableButton },
  props: {
    tablebuttonItemData: {
      type: Array,
      require: true
    },
    id: {
      type: String,
      require: true
    }
  },
  data() {
    return {}
  },
  methods: {
    // 按钮点击事件
    // click1() {},
    // click2() {}
  }
}
</script>

<style>
</style>