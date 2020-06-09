<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">行政执法监管任务确认</div>
    <el-scrollbar :style="{height: height}">
      <div style="padding: 10px 20px">
        <!-- <h3 style="margin-top: 0">监管事项信息</h3> -->
        <!-- 垂直表格 -->
        <el-row class="clear-float">
          <vertical-table
            style="width:100%;"
            class="fr"
            title="监管事项信息"
            :verticalTableData="personInfo"
            :verticalTableTitle="thingVerticalTableTitle"
            width="150px"
          ></vertical-table>
        </el-row>
        <!-- <h3>监管对象信息</h3> -->
        <!-- 垂直表格 -->
        <el-row class="clear-float">
          <vertical-table
            style="width:100%;margin-top:10px;"
            class="fr"
            title="监管对象信息"
            :verticalTableData="personInfo"
            :verticalTableTitle="objectVerticalTableTitle"
            width="150px"
            tabelWidth="400px"
          ></vertical-table>
        </el-row>
        <!-- <h3>检查人员信息*</h3> -->
        <el-form>
          <el-form-item style="margin-top: 10px">
            <div class="titleDiv">检查人员信息</div>
            <el-table :data="personInfo.persions" border>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="rank" label="职级"></el-table-column>
              <el-table-column prop="lawStaffType" label="执法人员性质"></el-table-column>
              <el-table-column prop="qualificationLegalProfession" label="是否具有法律职业资格"></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script>
import VerticalTable from '@/components/commons/VerticalTable'
export default {
  components: {
    VerticalTable
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
          superviseObject: '监管对象',
          administrativeCpUiCode: '监管对象唯一标识'
        },
        {
          administrativeCp: '行政相对人',
          administrativeCpNa: '行政相对人性质'
        },
        {
          administrativeCpCeType: '行政相对人证件类型',
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

.box-card {
  margin-top: 20px;

  /deep/.el-card__header {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  /deep/.el-card__body {
    padding: 0;
  }

  h3 {
    margin: 30px 0 16px;
    font-size: 16px;
  }
  .titleDiv {
    width: 100%;
    font-weight: 700;
    background-color: white;
    font-size: 14px;
    border: 1px solid gray;
    border-bottom: none;
    line-height: 20px;
    padding: 5px;
    text-align: center;
  }
}
</style>
