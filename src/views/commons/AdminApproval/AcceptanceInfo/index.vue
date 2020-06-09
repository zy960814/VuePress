<template>
  <apply-form-item data="受理信息">
    <!-- 分派 -->
    <assignment />
    <!-- 受理/预约调整 -->
    <acceptance-appointment />
    <!-- 材料补正 -->
    <material-correction :data="{}" />
    <!-- 准予受理通知 -->
    <allow-acceptance :data="{}" />
    <!-- 不予受理通知 -->
    <refuse-acceptance :data="{}" />
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import MaterialCorrection from '@/components/business/approval-process/MaterialCorrection'
import AllowAcceptance from '@/components/business/approval-process/AllowAcceptance'
import RefuseAcceptance from '@/components/business/approval-process/RefuseAcceptance'
import AcceptanceAppointment from '@/components/business/approval-process/AcceptanceAppointment'
import Assignment from '@/components/business/approval-process/Assignment'

export default {
  components: {
    ApplyFormItem,
    MaterialCorrection,
    AllowAcceptance,
    RefuseAcceptance,
    AcceptanceAppointment,
    Assignment
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
