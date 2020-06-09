<!-- 使用教程 -->
<!--
      1.tableData 为单元格标题  type--img为图片格式--url为超级链接跳转形式
      2.data 为val值匹配值
      3.title 标题
 -->
<template>
<table class="tablesty" style="border-collapse: collapse;" border="1px" cellspacing="0" cellpadding="0"  :style="styleObject"
>
<tr>
  <td :colspan="title.col" class="basics">
    <slot>{{title.name}}</slot>
  </td>
</tr>
<template v-for="(item,index) in tableData">
    <tr>
      <template v-for="(Sitem,Sindex) in item">
        <td class="detailboldfont">
          {{Sitem.val}}
        </td>
        <td class="detailboldfont-1" :colspan="Sitem.col">
            <span v-if="!Sitem.type">
               {{data[Sitem.key]}}
            </span>
            <el-image
            v-if="Sitem.type == 'img'"
            style="width: 100px; height: 100px;text-align: center"
            :src="data[Sitem.key]"
            :preview-src-list="[data[Sitem.key]]">
          </el-image>
          <a class="bulueClass" v-if="Sitem.type == 'url'" target="_blank" :href="data[Sitem.key]">点击跳转</a>
        </td>
      </template>
    </tr>
</template>
</table>
</template>
<script>
export default {
data() {
  return {

styleObject: {},
srcList:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
// data:
// {
//   url:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
//   v1:'123',
//   v2:'1111',
//   url2:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
//   v3:'123'

// },
// title:{
//   name:'请填写标题',
//   col:12,
// },
// tableData: [[{
//   col: 1,
//   val: "单号",
//   key:"url",
//   type:'img',
// }, {
//   col: 1,
//   val: "1001",
//   title: false,
//   key: "v1"
// }, {
//   col: 1,
//   val: "商品名称",
//   title: true
// }, {
//   col: 1,
//   val: "篮球",
//   title: false,
//   key: "v2"
// }, {
//   col: 1,
//   val: "价格",
//   title: true
// }, {
//   col: 1,
//   val: "120.00",
//   title: false,
//   key: "v3"
// }], [{
//   col: 2,
//   val: "订单日期",
//   title: true
// }, {
//   col: 2,
//   val: "2017-03-01",
//   title: false,
//   key: "v4"
// }, {
//   col: 2,
//   val: "付款方式",
//   title: true
// }, {
//   col: 2,
//   val: "在线支付",
//   title: false,
//   type:'url',
//   key: "url2"
// }], [{
//   col: 5,
//   val: "收货地址",
//   title: true,
//   key: "v6"
// }, {
//   col: 5,
//   val: "北京市海淀区西北旺镇",
//   title: false,
//   key: "v7"
// }]],
  s_showByRow: true,
  };
},
props: [ 'tableStyle', 'showByRow','tableData','title','data'],
computed: {
  rowCount: function() {
    return Math.ceil(this.tableData.length/2);
  }
},
created() {
  this.styleObject = this.tableStyle;
  if(this.showByRow !== undefined){
    this.s_showByRow = this.showByRow;
  }
},
}
</script>
<style type="text/css" lang="scss" scoped>
.bulueClass {
  color:#4b74ff !important;
}
.basics {
  font-size: 14px;
  font-weight:bold;
  padding: 5px;
  text-align: center;
}
.detailboldfont {
  width: 150px;
  text-align: center;
  padding-left:5px;
  height:30px;
  font-size: 12px!important;
  background-color:rgb(242, 242, 242);
}
.detailboldfont-1 {
  text-align: center;
  padding:5px;
  font-size: 12px;
}
.tablesty {
  width: 100%;
  table-layout: fixed;
  margin:auto;
  border: 1px solid grey;
  text-align: center;
}
</style>