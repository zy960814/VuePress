<template>
	<el-card shadow="never">
		<div slot="header">个人注册</div>
		<el-scrollbar :style="{height: height}">
			<apply-form-item data="账号信息" class="hxl_item">
				<vertical-table
					style="width:100%;"
					:verticalTableData="applyFormData"
					:verticalTableTitle="basicInformationTitle"
					width="150px">
				</vertical-table>
			</apply-form-item>
			<apply-form-item data="个人信息" class="hxl_item">
				<vertical-table
					style="width:100%;"
					:verticalTableData="applyFormData"
					:verticalTableTitle="this.applyFormData.certificateTypeCode=='身份证'?representative:representativeNoCard"
					width="150px">
				</vertical-table>
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
				{ applyPerson: '账号密码', },
                
			],
			// 法定代表人
			representative: [
				{ nationalSecurityName: '个人姓名' },
                { certificateTypeCode: '证件类型', number: '证件号码' },
				{ passDate: '身份证有效期'},
				{ projectName1: '所属区域' },
				{ designPerson: '通信地址', },
				{ lineChose: '手机号码' },
				{ technologyMeasure: '电子邮箱' },
			],
			representativeNoCard: [
				{ nationalSecurityName: '个人姓名' },
                { certificateTypeCode: '证件类型', number: '证件号码' },
				{ projectName1: '所属区域' },
				{ designPerson: '通信地址', },
				{ lineChose: '手机号码' },
				{ technologyMeasure: '电子邮箱' },
			]
		}
	},
	mounted() {
		console.log(this.applyFormData)
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

