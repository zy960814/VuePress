<template>
  <el-card shadow="never">
    <div slot="header">行政执法监管任务确认</div>
    <el-scrollbar :style="{height: height}">
      <!-- <h3 style="margin-top: 0">监管事项信息</h3> -->
      <!-- 垂直表格 -->
      <apply-form-item data="监管事项信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="personInfo"
          :verticalTableTitle="thingVerticalTableTitle"
          width="150px"
        ></vertical-table>
      </apply-form-item>
      <!-- <h3>监管对象信息</h3> -->
      <!-- 垂直表格 -->
      <apply-form-item data="监管对象信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="personInfo"
          :verticalTableTitle="objectVerticalTableTitle"
          width="150px"
          tabelWidth="400px"
        ></vertical-table>
      </apply-form-item>
      <!-- <h3>检查人员信息*</h3> -->
      <apply-form-item data="检查人员信息">
        <el-form>
          <el-form-item>
            <el-table :data="personInfo.persions" border>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="rank" label="职级"></el-table-column>
              <el-table-column prop="lawStaffType" label="执法人员性质"></el-table-column>
              <el-table-column prop="qualificationLegalProfession" label="是否具有法律职业资格"></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </apply-form-item>
    </el-scrollbar>
  </el-card>
</template>

<script>
import VerticalTable from '@/components/commons/VerticalTable'
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
export default {
  components: {
    VerticalTable,
    ApplyFormItem
  },
  props: {
    height: {
      type: String,
      default: '400px'
    },
    // 监管对象信息
    personInfo: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      thingVerticalTableTitle: [
        { itemName: '监管类型', superviseItemImplementCode: '事项编码' },
        { entrustDept: '实施机构', entrustDeptCode: '受委托部门编号' }
      ],
      objectVerticalTableTitle: [
        {
          superviseObject: '监管对象'
        },
        {
          administrativeCp: '行政相对人',
          administrativeCpNaName: '行政相对人性质'
        },
        {
          administrativeCpCeTypeName: '行政相对人证件类型',
          administrativeCpUiCode: '行政相对人编码'
        },
        { addressRegistered: '注册地址', addressOperating: '经营地址' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
</style>
