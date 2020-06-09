<template>
	<div id="#search-result-table">
		<!-- 表单填写信息 -->
		<el-row style="text-align: left" v-if="showText">
			<el-col :span="24" style="margin-top:10px;">
				<span style="color: red;font-size: 12px;line-height: 20px;margin-left: 10px">温馨提示：基本信息中置灰部分不可进行修改，如果信息有误请联系系统管理员，联系电话：XXXXXX</span>
			</el-col>
			<el-col>
				<!-- <el-card shadow="never" :body-style="{padding:'5px'}"> -->
			<!-- 法人 -->
				<legalperson :showText="false" ref="child"></legalperson>
			<!--个人-->
				<!-- <personal :showText="false" ref="child"></personal> -->
			<!-- 运维 -->
				<!-- <Operation :showText="false" ref="child"></Operation> -->
			<!-- 评估机构 -->
				<!-- <Abroad :showText="false" ref="child"></Abroad> -->
			<!-- 国局省局 -->
				<!-- <currency :showText="false" ref="child"></currency> -->
			<el-col>
				<el-row style="text-align: right;margin-right:20px;">
					<el-button type="primary" size="small"  @click="submitForm('ruleForm')">确认</el-button>
					<el-button type="primary" size="small" plain @click="resetForm('ruleForm')">取消</el-button>
				</el-row>
			</el-col>
			<!-- </el-card> -->
			</el-col>
		</el-row>
		<!-- 表单展示 -->
		<el-row v-if="!showText">
			<!-- 法人 -->
				<legalperson></legalperson>
			<!--个人-->
				<!-- <personal></personal> -->
			<!-- 运维 -->
				<!-- <Operation></Operation> -->
			<!-- 评估机构 -->
				<!-- <Abroad></Abroad> -->
			<!-- 国局省局 -->
			<!-- <currency></currency> -->
		</el-row>
	</div>
</template>
<script type="text/javascript">
import legalperson from "./legalperson";
import personal from "./personal";
import Operation from "./Operation";
import currency from "./currency";
import Abroad from "./Abroad";
export default {
	components:{
		legalperson,
		personal,
		Operation,
		currency,
		Abroad
	},
	props: ['showText'],
	data(){
		return {
			// showText:false,
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			srcList: [
			'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
			],
			tableData: []
		}
	},
	methods:{
		show(){
			this.showText = !this.showText
		},
		fatherMethod() {
			alert('测试');
		},
		// 父组件调用子组件的表单提交方法
		submitForm() {
			this.$refs.child.submitForm('form')
		},
		resetForm() {
			this.$refs.child.resetForm('form')
		}
	}
}
</script>
<style type="text/css"  scoped>
.basics {
	font-size: 12px;
	font-weight:bold;
	padding: 5px 0;
}
.detailboldfont {
	width: 140px;
	text-align: left;
	padding-left:5px;
	height:30px;
	font-size: 12px!important;
	background-color:rgb(242, 242, 242);
}
.detailboldfont-1 {
	text-align: left;
	padding:5px;
	font-size: 12px;
}
	.text-a {
		line-height: 35px;
	}
	.disable {
		padding: 5px 0;
		padding-left: 5px;
		background-color: #eee;
		border: 1px solid;
		margin-bottom: 5px;
	}
</style>