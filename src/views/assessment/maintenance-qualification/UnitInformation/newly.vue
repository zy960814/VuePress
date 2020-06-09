<template>
  <div>
    <el-form
      ref="scholar"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="70px"
      :show-message="false">
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位名称" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="电话" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="法人代表" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="注册资金" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位性质" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="自制人员数量" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="地址" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="省别" prop="awardsInfo"  >
            <el-select v-model="form.awardsInfo" placeholder="请选择" >
              <el-option
                v-for="(item,index) in tableData1"
                :key="index"
                :label="item.projectName"
                :value="item.projectName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="相关项目" prop="awardsInfo"  >
            <el-select v-model="form.awardsInfo" placeholder="请选择" >
              <el-option
                v-for="(item,index) in tableData1"
                :key="index"
                :label="item.projectName"
                :value="item.projectName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="勘察资质">
            <div>
              <el-checkbox-group
                v-model="addradio.radio"
                :max="1">
                <el-checkbox v-for="city in kancha" :label="city.key" :key="city.key">{{city.val}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <el-select style="width: 100%"  multiple placeholder="请选择资质范围" v-model="addradio.Range">
              <el-option
                v-for="(item,key) in Range"
                :key="key"
                :value="item.key"
                :label="item.val">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="施工资质" >
            <div>
              <el-checkbox-group
                v-model="addradio.radio1"
                :max="1">
                <el-checkbox v-for="city in shigong" :label="city.key" :key="city.key">{{city.val}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <el-select style="width: 100%"  multiple placeholder="请选择资质范围" v-model="addradio.Range1">
              <el-option
                v-for="(item,key) in Range"
                :key="key"
                :value="item.key"
                :label="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="监理资质">
            <div>
              <el-checkbox-group
                v-model="addradio.radio2"
                :max="1">
                <el-checkbox v-for="city in jianli" :label="city.key" :key="city.key">{{city.val}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <el-select style="width: 100%" multiple placeholder="请选择资质范围" v-model="addradio.Range2">
              <el-option
                v-for="(item,key) in Range"
                :key="key"
                :value="item.key"
                :label="item.val">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  const kancha = [
    {	val:"勘察甲级",	key:"1"},
    {	val:"勘察乙级",	key:"4"},
    {	val:"勘察丙级", key:"5"},
  ];
  const shigong = [
    {	val:"施工一级",	key:"2"},
    {	val:"施工二级",	key:"6"},
    {	val:"施工三级", key:"7"},
  ];
  const jianli = [
    {	val:"勘察甲级",	key:"3"},
    {	val:"勘察乙级",	key:"8"},
    {	val:"勘察丙级", key:"9"},
  ];
import API_PREFIX from "@/api/config";
export default {
  components: {},
  props: {
    height: {
      type: String,
      default: "430px"
    },
    propsData: {
      type: Function
    },
  },
  data() {
    return {
      checkList:[],
      kancha:kancha,
      jianli:jianli,
      shigong:shigong,
      pickerOptions:{
				disabledDate:(time)=>{return time.getTime() > Date.now()}
      },
      totalCount: 200,
      title: "添加单位技术人员构成",
      dialogFormVisibleType: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      addradio:{
        radio:[],
        Range:[],
        radio1:[],
        Range1:[],
        radio2:[],
        Range2:[],
      },
      tableData1:[],
      tableData: [
        {
          business: "责任设计师:文物保护规划,古建筑",
          certificateNo: "ZRSJ20150053;",
          checkStatus: null,
          dateBirth: null,
          docType: {},
          finishFlag: "1",
          id: "8a8086a170f610870171e97c30240311",
          instName: "北京诗琴园林设计有限公司（测试11）",
          name: "毕毅",
          newInstId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
          organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
          otherFlag: null,
          perRangeCode: "责任设计师:1,责任设计师:2",
          perTypeCode: "1",
          qualificationType: "责任设计师",
          rehireAfterRetirement: "0",
          userId: "71DC4522-13B9-4D6D-9C26-56496FE4357E"
        },
        {
          business: "考古",
          certificateNo: "设计师",
          checkStatus: null,
          dateBirth: "2020",
          docType: {},
          finishFlag: "1",
          id: "8a8086a170f610870171e97c30250312",
          instName: "北京诗琴园林设计有限公司（测试11）",
          name: "李丽",
          newInstId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
          organizationInfoId: "f2d233e1-cdbd-4954-80fe-e0908c1d16fd",
          otherFlag: null,
          perRangeCode: null,
          perTypeCode: null,
          qualificationType: "其他技术骨干",
          rehireAfterRetirement: null,
          userId: null
        }
      ],
      tableData2: [
        {
          business:
            "责任设计师:古建筑,古文化遗址古墓葬,近现代重要史迹及代表性建筑",
          certificateNo: "",
          dateBirth: null,
          name: "阿布都艾尼·阿不都拉",
          new_inst_name: null,
          num: "1",
          perRangeCode: "责任设计师:2,责任设计师:5,责任设计师:6",
          perTypeCode: "1",
          qualificationType: "责任设计师",
          userId: "9F23715D-9C74-4023-BD17-62F59EC00A3C"
        },
        {
          business: "责任工程师:古建筑,石窟寺和石刻,壁画(含彩塑)",
          certificateNo: "ZRGC20151293;",
          dateBirth: null,
          name: "阿尔史体",
          new_inst_name: "常熟古建园林股份有限公司（测试11）",
          num: "2",
          perRangeCode: "责任工程师:2,责任工程师:3,责任工程师:4",
          perTypeCode: "2",
          qualificationType: "责任工程师",
          userId: "D2C0EE64-399B-4E6F-B08A-C8C1E02CC8BA"
        }
      ],

      Range:[
        {	val:" 文物保护规划",	key:"1"	},
        { val:"古建筑",	key:"2"	},
        {	val:"石窟寺和石刻",key:"3"	},
        { val:"壁画",	key:"4"},
        { val:"古文化遗址古墓群",	key:"5"},
        {	val:"近现代重要史迹及代表性建筑",	key:"6"},
        { val:"石窟寺和石刻保护(限石窟寺保护)",	key:"7"},
        {	val:"石窟寺和石刻保护(限石刻保护)",	key:"8"},
        { val:"壁画保护(含彩画)(限壁画保护)",	key:"9"	},
        {	val:"壁画保护(含彩画)(限彩画保护)",	key:"10"	},
        {	val:"古文化遗址古墓葬保护(限古遗址保护)",	key:"11"},
        {	val:"古文化遗址古墓葬保护(限古墓葬保护)",	key:"12"},
        {	val:"其他",	key:"13"},
        {	val:"彩塑",	key:"14"}
      ],
      checkData: null,
      form: {
        provinceList: [],
        province: [],
        radio: "2",
        nationalSecurityName: ""
      },
      queryParams: {
        pageNation: {
          currentPage: 1,
          pageSize: 20
        }
      },
      options: [],
      rules: {
        nationalSecurityName: [
          // { required: true, message: '请输入人员名称', trigger: 'change' },
          // { min: 0, max: 200, message: '', trigger: 'change' }
        ], //人员名称 必填 长度小于200
        technologyDocument: [],
        technologyDocument0: [],
        technologyDocument1: [],
        technologyDocument2: []
      },
    };
  },
  mounted() {},
  methods: {
    
  }
};
</script>
<style  lang="scss" scoped>
  /deep/.el-select,
  /deep/.el-date-editor.el-input,
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
 /deep/ .el-form-item__label {
  white-space: normal !important;
  line-height: 15px;
}
</style>

