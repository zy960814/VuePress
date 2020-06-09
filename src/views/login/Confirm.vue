<template>
	<el-card shadow="never">
		<div slot="header" style="margin:10px 0;">法人注册</div>
		<el-scrollbar :style="{height: height}">
			<apply-form-item data="账号信息" class="hxl_item">
				<vertical-table
					style="width:100%;"
					:verticalTableData="applyFormData"
					:verticalTableTitle="basicInformationTitle"
					width="150px">
				</vertical-table>
			</apply-form-item>
			<apply-form-item data="机构信息" class="hxl_item">
				<vertical-table
					style="width:100%;"
					:verticalTableData="applyFormData"
					:verticalTableTitle="information"
					width="150px">
				</vertical-table>
			</apply-form-item>
			<apply-form-item data="法定代表人信息" class="hxl_item">
				<vertical-table
					style="width:100%;"
					:verticalTableData="applyFormData"
					:verticalTableTitle="this.applyFormData.certificateTypeCode=='身份证'?representative:representativeNoCard"
					width="150px">
				</vertical-table>
			</apply-form-item>
			<apply-form-item data="经办人信息" class="hxl_item">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column label="经办人" min-width="100" prop="name" ></el-table-column>
					<el-table-column label="身份证号" min-width="180" prop="number1" ></el-table-column>
					<el-table-column label="电话" min-width="150" prop="number2" ></el-table-column>
					<el-table-column label="邮箱" min-width="180" prop="emit" ></el-table-column>
				</el-table>
				<!-- <vertical-table
					style="width:100%;"
					:verticalTableData="applyFormData"
					:verticalTableTitle="agent"
					width="150px">
				</vertical-table> -->
			</apply-form-item>
		</el-scrollbar>
	</el-card>
</template>
<script>
	import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
	import VerticalTable from '@/components/commons/VerticalTable'
export default {
	components:{ 
		ApplyFormItem,
		VerticalTable
	},
	props: {
		height: {
			type: String,
			default: '450px'
		},
		applyFormData: {
			type: Object,
			require: true
		}
	},
	data() {
		return {
			basicInformationTitle: [
				{ applyItemName: '用户账户' },
				{ applyPerson: '账号密码' },
			],
			// 机构信息
			information: [
				{ nationalSecurityName: '单位名称', province: '统一社会信用代码' },
				{ projectName1: '所属区域' },
				{ designPerson: '单位地址' },
				{ economicNature: '经济性质' , memberClass:'主管部门'},
				{ applyDocument1: '营业执照' },
			],
			// 法定代表人
			representative: [
				{ projectSituationIntroduction: '法定代表人' },
				{ certificateTypeCode: '证件类型', number: '证件号码' },
				{ passDate: '身份证有效期'},
				{ compilationBasis1: '证件扫描正面', compilationBasis2: '证件扫描反面' },
				{ lineChose: '手机号码' },
				{ technologyMeasure: '电子邮箱' },
			],
			representativeNoCard: [
				{ projectSituationIntroduction: '法定代表人' },
				{ certificateTypeCode: '证件类型', number: '证件号码' },
				{ compilationBasis: '扫描文件' },
				{ lineChose: '手机号码' },
				{ technologyMeasure: '电子邮箱' },
			],
			// 经办人信息
			agent: [
				{ name: '经办人', number1: '身份证号码'},
				{ number2: '电话', emit: ''}

			],
			tableData: [
                { date: '1', name: '张靠谱', number1: '152221199505212729',number2: '13552132211',emit: '13552132215@163.com' },
                { date: '2', name: '张李三', number1: '100000199105212728',number2: '13552132212',emit: '13552132215@163.com' },
                { date: '3', name: '王老五', number1: '150321199225212727',number2: '13552132213',emit: '13552132215@163.com' },
                { date: '4', name: '李老四', number1: '154321199305212726',number2: '13552132214',emit: '13552132215@163.com' },
                { date: '5', name: '张靠谱', number1: '156321199405212725',number2: '13552132210',emit: '13552132215@163.com' },
            ],
		}
	},
	
	mounted() {
		if(this.applyFormData.certificateTypeCode !== '身份证'){
			this.applyFormData.passDate = ''
		}
		console.log(this.applyFormData,'this')
		console.log(this.applyFormData.certificateTypeCode,'permanent')
	},
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

