<template>
  <el-form label-width="120px" label-position="left">
    <div class="hint">提示：批量鉴定时，已经在文物列表鉴定过的结果将不被修改。</div>
    <el-form-item label="是否是文物" prop="approvalFlag" class="redStar">
      <el-radio v-model="form.isCr" label="0">是</el-radio>
      <el-radio v-model="form.isCr" label="1">否</el-radio>
    </el-form-item>
    <el-form-item label="是否允许出境" prop="approvalFlag" class="redStar" style="margin-bottom: 0">
      <el-radio v-model="form.approvalFlag" label="0">是</el-radio>
      <el-radio v-model="form.approvalFlag" label="1">否</el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          isCr: '1',
          approvalFlag: '0'
        }
      }
    },
    methods: {
      getData() {
        return {...this.form}
      }
    }
  }
</script>

<style scoped>
  .hint {
    font-size: 14px;
    color: #18B9F4;
    margin-bottom: 15px;
  }
</style>
