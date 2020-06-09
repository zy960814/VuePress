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
          <el-form-item label="姓名" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="身份证号" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位名称" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="联系电话" prop="ratingDepart"  >
            <el-input v-model="form.ratingDepart" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位资质">
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
    </el-form>
  </div>
</template>
<script>
  const kancha = [
    {	val:"责任设计师",	key:"1"},
    {	val:"责任工程师",	key:"4"},
    {	val:"责任监理师", key:"5"},
  ];
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
    childData: {
      type: Object
    }
  },
  watch: {
    childData(value) {
      console.log(value, 222222);
      if (!value) {
        this.form = {
          provinceList: [],
          province: [],
          radio: "2",
          nationalSecurityName: ""
        };
        this.$refs.form1.resetFields();
      } else {
        this.form = {
          ...value
        };
      }
    }
  },
  data() {
    return {
      checkList:[],
      kancha:kancha,
      addradio:{
        radio:[],
        Range:[],
      },
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
      form: {
        provinceList: [],
        province: [],
        radio: "2",
        nationalSecurityName: ""
      },
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
    //选择人员职称List
    changeprovinceList(provinceList) {
      console.log(provinceList);
    },
    // 选择业务范围
    changeprovince(province) {
      console.log(province);
    },
  }
};
</script>
<style  lang="scss" scoped>
  /deep/.el-select,
  /deep/.el-date-editor.el-input,
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }

.el-upload__tip {
  margin-left: 15px;
}
.linklabel /deep/ .el-form-item__label {
  white-space: normal !important;
  line-height: 15px;
}
.bottomlike /deep/ .el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
/deep/ .applyFormItem {
  padding: 0px !important;
}
/deep/ .el-checkbox__input {
  font-size: 12px;
}
/deep/ .el-checkbox__label {
  font-size: 12px;
}
.bottomLine {
  border-bottom: 1px solid #e5e5e5;
  margin-top: 10px;
  margin-bottom: 3px;
}
// .row_1 {
//   // display: inline-block;
//   margin: 0 auto;

//   .keyword {
//     width: 400px;
//   }

//   /deep/ .el-date-editor.el-input__inner {
//     width: 260px;
//   }

//   /deep/ .el-input-group__prepend {
//     width: 128px;
//     background-color: #fff;

//     .el-input__inner {
//       width: 131px;
//     }
//   }
// }
// .header_button_two {
//   margin-top: -6px;
//   vertical-align: middle;
//   height: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-right: 12px;
//   padding-left: 20px;
//   // border-bottom: 1px solid #e6ebf5;
// }
</style>

