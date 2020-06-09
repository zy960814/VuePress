<template>
	<div class="box">
    <div class="verticalTable" v-if="!statusAll.form">
      <vertical-table
        style="width:100%;"
        :verticalTableData="personInfo"
        :verticalTableTitle="thingVerticalTableTitle"
        width="150px">
        <div  v-for="(item,k) in statusbuttonblotname" :slot='item.title' :key="k">
         <img :src="item.src" />
        </div>
      </vertical-table>
    </div>
		<el-form
      ref="form"
      :rules="rules"
      :model="allData.AgencyInformation.form"
      label-position="left"
      label-width="132px"
      v-if="statusAll.form"
      :show-message="false"
      :disabled='statusAll.formDisabled || !redactFlag'>
      <div class="boxtitle">提示：营业执照与资质证书上信息不对应的，应在线下完成资质证书变更程序后再行填写</div>
			<el-row>
        <el-col :span="24">
          <el-form-item label="单位名称" prop="instName" class="redStar">
            <el-input v-model="allData.AgencyInformation.form.instName" placeholder></el-input>
          </el-form-item>
        </el-col>
			</el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="统一社会信用代码" prop="creditCode" class="redStar">
            <el-input v-model="allData.AgencyInformation.form.creditCode" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="所属地区" class="redStar" prop="area">
            <el-col :span="11">
              <el-select v-model="allData.AgencyInformation.form.province" placeholder="请选择活动区域" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11"  :offset="2">
              <el-select v-model="allData.AgencyInformation.form.city" placeholder="请选择活动区域">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="7" :offset="1">
              <el-select v-model="allData.AgencyInformation.form.region" placeholder="请选择活动区域">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="机构地址" prop="address">
            <el-input v-model="allData.AgencyInformation.form.address" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="经济性质" prop="economicType" class="redStar">
              <el-input v-model="allData.AgencyInformation.form.economicType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="注册资金(万元)" prop="regMoney" class="redStar">
              <el-input v-model="allData.AgencyInformation.form.regMoney" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11" >
          <el-form-item label="单位邮箱" prop="email" class="redStar">
            <el-input v-model="allData.AgencyInformation.form.email" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="联系电话" prop="linkPhone" class="redStar">
              <el-input v-model="allData.AgencyInformation.form.linkPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="主管部门" prop="mngInst">
              <el-input v-model="allData.AgencyInformation.form.mngInst"></el-input>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="法定代表人姓名" prop="corpName" class="redStar">
              <el-input v-model="allData.AgencyInformation.form.corpName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="法定代表人身份证号码" prop="corpIdCard" class="redStar">
              <el-input v-model="allData.AgencyInformation.form.corpIdCard" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item ref="fileUpload" label="法定代表人身份证正面扫描件" prop="idcardPositivePic" class="redStar">
              <!-- <h4 class="formText">提示：企业法人营业执照副本复印件(或事业单位主管机关颁发的单位法人证书或文件的复印件) 支持扩展名：.jpg .png .bmp</h4> -->
              <picture-upload ref="imgUpload" v-model="allData.AgencyInformation.form.idcardPositivePic" :action="fileUploadUrl" :type="20"  class="picuter" list-type="picture-card" :max-file-size="2" :limit="6" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item ref="fileUpload" label="法定代表人身份证反面扫描件" prop="idcardReversePic" class="redStar">
              <!-- <h4 class="formText">提示：企业法人营业执照副本复印件(或事业单位主管机关颁发的单位法人证书或文件的复印件) 支持扩展名：.jpg .png .bmp</h4> -->
              <picture-upload ref="imgUpload" v-model="allData.AgencyInformation.form.idcardReversePic" :action="fileUploadUrl" :type="20"  class="picuter" list-type="picture-card" :max-file-size="2" :limit="6" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <el-form-item ref="fileUpload" label="营业执照彩色扫描件扫描件" prop="colorPic" class="redStar">
              <!-- <h4 class="formText">提示：企业法人营业执照副本复印件(或事业单位主管机关颁发的单位法人证书或文件的复印件) 支持扩展名：.jpg .png .bmp</h4> -->
              <picture-upload ref="imgUpload" v-model="allData.AgencyInformation.form.colorPic" :action="fileUploadUrl" :type="20"  class="picuter" list-type="picture-card" :max-file-size="2" :limit="6" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <el-form-item  label="备注" prop="remark">
             <el-input type="textarea" v-model="allData.AgencyInformation.form.remark" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
		</el-form>
	</div>
</template>
<script>
import PictureUpload from "@/components/commons/PictureUpload"
import VerticalTable from '@/components/commons/VerticalTable'
// import StatusButton from '@/components/commons/StatusButton'
import API_PREFIX from '@/api/config'
export default {
  components: {
    PictureUpload,
    VerticalTable,
    // StatusButton
  },
  props:{
    status:{
      type:Number,
    },
    allData:{
      type:Object,
    },
    redactFlag:{//是否可以编辑
      type:Boolean,
      default:true,
    }
  },
  watch:{
    status(curVal){
      if(curVal){
        this.status=curVal;
        this.formALlStatus();
      }
    },
    allData(curVal){
      if(curVal){
        this.allData=curVal
      }
    },
},
	data() {
		return {
      nationalInput: true,
      provinceDisabled: true,
      disabled:true, 
      provinceArr: [
        { value: '0', label: '北京' },
        { value: '1', label: '安徽' },
        { value: '2', label: '江西' },
        { value: '3', label: '江苏' },
        { value: '4', label: '西藏' }
      ],
      options:[],
      statusArr: [],
      personInfo: {
        instName:'1111',
        creditCode:'111111',
        redStar:'111111111',
        address:'1111',
        economicType:'1111',
        regMoney:'1111',
        mngInst:'111',
        linkPhone:'1111',
        email:'111',
        corpName:'1111',
        corpIdCard:'11111',
        itemName1:'111',
        corpIdCard1:'1111',
        itemName2:'1111'
      },
      statusbuttonblotname:[
        {title:'line_80',src:'111'},
        {title:'line_81',src:'111'},
        {title:'line_90',src:'111'},
        ],
      statusAll:{
        form:false,//显示form还是显示表格
        cyzx:true,// 存疑 回头改个名
        cyzxShow:false,// 存疑显示 回头改个名
        formDisabled:false,//表单是否可编辑
      },
      thingVerticalTableTitle: [
        { instName: '单位名称' },
        { creditCode: '统一社会信用代码' },
        { redStar: '所属地区' },
        { address: '机构地址' },
        { economicType: '经济性质 ', regMoney: '注册万元(万元)' },
        { mngInst: '主管部门', linkPhone: '联系电话',},
        { email: '单位邮箱'},
        { corpName: '法定代表人姓名' , corpIdCard: '法定代表人身份证号码' },
        { itemName1: '法定代表人身份证正面扫描件', corpIdCard1: '法定代表人身份证反面扫描件' },
        { itemName2: '营业执照彩色扫描件扫描件' },
        { remark: '备注'}
      ],
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
			// 三套表单校验规则
      rules: {
          instName: [
            { required: true, message: '请输入人员名称', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          creditCode: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          // area: [
          //   { required: true, message: '请输入人员名称', trigger: 'blur' },
          //   { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          // ],
          address: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          economicType: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          regMoney: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          corpName: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          linkPhone: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          corpIdCard:[
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ],
          email:[
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { max: 200, message: '长度最大 2000 个字符', trigger: 'change' }
          ]
      },
		}
  },
  methods: {
    getStatus(status, i) {
      this.statusArr[i] = status
    },
    formALlStatus(){
      switch(this.status){
        case 1: 
        this.statusAll={
            form:false,//显示form还是显示表格
            cyzx:true,// 存疑 回头改个名
            cyzxShow:false,// 存疑显示 回头改个名
            formDisabled:false,//表单是否可编辑
        }
          break;
        case 2:
          this.statusAll={
            form:true,//显示form还是显示表格
            cyzx:false,// 存疑 回头改个名
            cyzxShow:false,// 存疑显示 回头改个名
            formDisabled:false,//表单是否可编辑 true 不可编辑 false可编辑
        }
          break;
        case 3:
           this.statusAll={
            form:false,//显示form还是显示表格
            cyzx:true,// 存疑 回头改个名
            cyzxShow:false,// 存疑显示 回头改个名
            formDisabled:false,//表单是否可编辑
        }
          break;
        case 4:
           this.statusAll={
            form:false,//显示form还是显示表格
            cyzx:true,// 存疑 回头改个名
            cyzxShow:false,// 存疑显示 回头改个名
            formDisabled:false,//表单是否可编辑
        }
          break; 
        case 5:
           this.statusAll={
            form:false,//显示form还是显示表格
            cyzx:true,// 存疑 回头改个名
            cyzxShow:false,// 存疑显示 回头改个名
            formDisabled:false,//表单是否可编辑
        }
          break;
        case 6:
           this.statusAll={
            form:false,//显示form还是显示表格
            cyzx:true,// 存疑石否可一更改 回头改个名
            cyzxShow:true,// 存疑显示 回头改个名
            formDisabled:false,//表单是否可编辑
        }
          break;
        case 7:
          this.statusAll={
            form:false,//显示form还是显示表格
            cyzx:false,// 存疑石否可一更改 回头改个名
            cyzxShow:false,// 存疑显示 回头改个名
            formDisabled:true,//表单是否可编辑
        }
          break;
       
          
          
      }
    },
    // 表单校验
		validataForm() { // 表单校验
			let flag=false;
			this.$refs["form"].validate(valid => {
				if (valid) {
				
					flag=true;
				}
			});
			return flag
		}
  },
  computed: {
    // statusbuttonblotname() {
    //   let slotname
    //   let slotnameArr = []
    //   for (let i = 0; i < 11; i++) {
    //     for (let j = 0; j < 10; j++) {
    //       slotname = `line_${i}${j}`
    //       slotnameArr.push(slotname)
    //     }
    //   }

    //   return slotnameArr
    // }
  },
  mounted() {
    this.formALlStatus()
  },
}
</script>

<style  lang="scss" scoped>
  .pr5 {
      margin-left: 16.7px;
  }
  /deep/ .el-form-item__label {
    white-space: break-spaces;
  }
  .boxtitle{
    font-size: 12px;
    text-align:right;
    color: #18B9F4;
    margin-bottom: 10px;
    // padding-right:18px; 
  }
</style>

