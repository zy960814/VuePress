<template>
  <div class="statusButton">
    <el-button
      size="mini"
      :type="buttonType"
      :icon="iconClass"
      class="statusButton"
      @click="iconClassChange"
    >
      <span v-if="iconClass===''">?</span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'StatusButton',
  components: {},
  props: {
    initStatus: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      // 对勾叉叉未选择
      statusBUttonArr: [],
      iconClass: '',
      buttonType: '',
      buttonFlag: this.initStatus
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.iconClassChange()
  },
  destroyed() {},
  methods: {
    // 对勾叉叉未选择切换
    iconClassChange() {
      // 0-对，1-错，2-存疑
      if (this.buttonFlag === 0) {
        this.iconClass = 'el-icon-check'
        this.buttonType = 'success'
        this.buttonFlag = 1
      } else if (this.buttonFlag === 1) {
        this.iconClass = 'el-icon-close'
        this.buttonType = 'danger'
        this.buttonFlag = 2
      } else if (this.buttonFlag === 2) {
        this.iconClass = ''
        this.buttonType = 'warning'
        this.buttonFlag = 0
      }
      this.$emit('getStatus', (this.buttonFlag + 2) % 3)
    }
  }
}
</script>

<style lang="scss" scoped>
.statusButton {
  .statusButton {
    width: 30px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
    // border: 1px solid #ccc;
    padding: 0px;
    box-sizing: border-box;
    // border-color: #bdd1e3;
    // background-color: #e9f0f6;
  }
}
</style>
