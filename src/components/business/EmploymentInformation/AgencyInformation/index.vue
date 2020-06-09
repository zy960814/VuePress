<template>
	<div class="box">
    <div class="verticalTable">
      <vertical-table
        style="width:100%;"
        :verticalTableData="allData.AgencyInformation.form"
        :verticalTableTitle="thingVerticalTableTitle"
        width="150px">
        <template v-if="showInfo" v-slot:[statusbuttonblotname[k]]="scope" v-for="(item,k) in statusbuttonblotname" >
            {{scope.colValue}}
          <status-button v-if="sxg!='ProvincialBureau'" class="fr" :initStatus="0" @getStatus="getStatus($event,k)" :key="k"></status-button>
        </template>
      </vertical-table>
    </div>
	</div>
</template>
<script>
import VerticalTable from '@/components/commons/VerticalTable'
import StatusButton from '@/components/commons/StatusButton'
export default {
  components: {
    VerticalTable,
    StatusButton
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
    },
    sxg:{
      type:String,
      default:'',
    },
    showInfo:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    status(curVal){
      if(curVal){
        this.status=curVal;
      }
    },
    allData(curVal){
      if(curVal){
        console.log(curVal);
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
		}
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
    getStatus(status, i) {
      this.statusArr[i] = status
    },
  },
  computed: {
    statusbuttonblotname() {
      let slotname
      let slotnameArr = []
      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 10; j++) {
          slotname = `line_${i}${j}`
          slotnameArr.push(slotname)
        }
      }
      return slotnameArr
    }
  },
  mounted() {
    console.log(this.allData,'111111')
  },
}
</script>

<style  lang="scss" scoped>
  .pr5 {
      margin-left: 16.7px;
  }
  .boxtitle{
    font-size: 12px;
    text-align:right;
    color: #18B9F4;
    margin-bottom: 10px;
    // padding-right:18px; 
  }
</style>

