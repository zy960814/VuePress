<template>
  <div>
    <el-row style="margin-top:10px">
      <el-date-picker
          v-model="form.value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-select v-model="form.value" style="margin: 0 10px" clearable placeholder="登录方式">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="form.value" clearable placeholder="操作记录">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <!-- 		<el-col :span="6" style="display: flex">
          <el-input
          size="small"
          placeholder="关键字"
          v-model="input3">
          <el-button slot="append" >搜索</el-button>
        </el-input>
        <el-button style="margin-left: 5px" type="primary">重置</el-button>
      </el-col> -->
    <!-- <el-col :span="2" style="width: 80px;margin-left: 40px"><span style="line-height: 32px;font-size: 12px">起止时间：</span></el-col> -->
    <!-- <el-col :span="11" style="text-align: right" :offset="1">
      <el-radio-group v-model="radio2" size="small"> -->
    <!-- 		<el-radio-button label="1" >导出</el-radio-button>
        <el-radio-button label="2">打印</el-radio-button> -->
    <!-- 		<el-radio-button label="3">返回</el-radio-button>
      </el-radio-group>
    </el-col> -->
    <el-row style="height: 20px"></el-row>
    <el-row>
      <el-table
          :header-cell-style="{background:'#f2f2f2',color:'#555',padding:'12px 0'}"
          :data="tableData"
          height="calc(100vh - 274px)"
          border
          stripe
          style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="address" label="登录地点" width="180"></el-table-column>
        <el-table-column prop="date" label="登录时间" width="180"></el-table-column>
        <el-table-column prop="name" label="操作记录" width="180"></el-table-column>
        <el-table-column prop="address" label="登录方式" width="180"></el-table-column>
        <el-table-column prop="name" label="登出时间" width="180"></el-table-column>
        <el-table-column prop="address" label="备注"  fixed="right"></el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.pageNation.currentPage"
          :page-size="queryParams.pageNation.pageSize"
          :page-sizes="[10, 20, 30, 50, 100]"
          layout="total,  prev, pager, next, jumper, sizes"
          :total="totalCount"
          style="text-align: center;">
      </el-pagination>
    </el-row>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      totalCount:200,
      form: {
        radio2: "1",
        input3: "",
        value2: "",
        value: '',
      },
      queryParams: {
          pageNation: {
              currentPage: 1,
              pageSize: 20
          },
      },
      
      options: [
        {value: '1', label: '黄金糕'},
        {value: '2', label: '黄金糕'},
        {value: '3', label: '黄金糕'},
        {value: '4', label: '黄金糕'},
      ],
      tableData: [
        { date: "2016-05-03", name: "王小虎", address: "上海市普陀区金沙江路 1518 弄"},
        { date: "2016-05-03", name: "王小虎", address: "上海市普陀区金沙江路 1518 弄"},
        { date: "2016-05-03", name: "王小虎", address: "上海市普陀区金沙江路 1518 弄"},
        { date: "2016-05-03", name: "王小虎", address: "上海市普陀区金沙江路 1518 弄"},
        { date: "2016-05-03", name: "王小虎", address: "上海市普陀区金沙江路 1518 弄"},
        { date: "2016-05-03", name: "王小虎", address: "上海市普陀区金沙江路 1518 弄"}
      ]
    };
  },
  methods: {
    handleSizeChange(){

      },
      handleCurrentChange(){

      },
  },
  mounted() {}
};
</script>
