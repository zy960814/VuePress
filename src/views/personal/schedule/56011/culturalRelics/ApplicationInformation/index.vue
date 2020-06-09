<template>
  <div>
    <el-form
			ref="form"
			:rules="rules"
			:model="form"
			label-position="left"
			label-width="130px"
			:show-message="false">
      <el-row class="boxBottom">
        <el-col :span="24">
          <el-form-item label="申请资质类型" prop="radio"  class="redStar">
            <el-radio v-model="form.radio" label="1" @change='changeRadio'>勘察设计甲级</el-radio>
            <el-radio v-model="form.radio" label="2" @change='changeRadio'>施工一级</el-radio>
            <el-radio v-model="form.radio" label="3" @change='changeRadio'>监理甲级</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="boxBottom">
        <el-col>
          <el-form-item label="申请资质业务范围" prop="provinceList" class="redStar">
            <el-checkbox-group  v-model="form.provinceList" @change='changeProvinceList'>
              <el-checkbox label="古文化遗址古墓葬"></el-checkbox>
              <el-checkbox label="古建筑"></el-checkbox>
              <el-checkbox label="石窟寺和石刻"></el-checkbox>
              <el-checkbox label="近现代重要史迹及代表性建筑"></el-checkbox>
              <el-checkbox label="壁画"></el-checkbox>
              <el-checkbox label="保护规划"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
			<el-row v-if="otherCheckboxShow">
				<el-col :span="24">
					<el-form-item label="" prop="otherCheckbox" class="redStar">
						<el-input v-model="form.otherCheckbox" placeholder></el-input>
					</el-form-item>
				</el-col>
			</el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="nationalSecurityName">
            <el-input v-model="form.nationalSecurityName" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
		</el-form>
  </div>
</template>
<script>
export default {
  props: {
		height: {
			type: String,
			default: '430px'
		},
		propsData:{
			type:Function,
		}
	},
  data() {
    return {
			checkData:null,
			otherCheckboxShow:false,
			form: {
				provinceList:[],
				province:[],
        radio: '2',
        otherCheckbox: '',
				nationalSecurityName:'',
			},
      rules:{
        radio:[
          { required: true, message: '请选择相关项目', trigger: 'change' },
        ],
				otherCheckbox:[
          { required: false, message: '请选择相关项目', trigger: 'change' },
        ],

			},
    };
  },
  mounted() {
  
  },
  methods: {
    // 表单校验
		validataForm() { // 表单校验
			let flag=false;
			this.$refs["form"].validate(valid => {
				if (valid) {
				
					flag=true;
				}
			});
			return flag
		},
		//获取表格数据
		getTableData(){
			console.log('调用表格接口并赋值');
		},
		// 选择业务范围
    changeProvinceList(provinceList){
      if(provinceList.indexOf('其他') !=-1){
        this.otherCheckboxShow=true;
        this.rules.otherCheckbox[0].required=true;
      }else{
        this.otherCheckboxShow=false;
        this.rules.otherCheckbox[0].required=true;
      }
			this.getTableData()
    },
		// 是否返聘
		changeRadio(value){
			console.log(value)
			this.getTableData()
		},
  }
};
</script>
<style  lang="scss" scoped>
	.el-upload__tip{
		margin-left: 15px;
	}
	/deep/ .el-form-item__label {
    white-space: break-spaces;
	}
  .boxBottom /deep/ .el-form-item--small.el-form-item{
    margin-bottom: 0px;
  }
  
</style>

