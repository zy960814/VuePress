<template>
	<div>
    <el-row>
      <el-col>
        <el-table :data="allData.ScholarshipPrize.tableData" style="width: 100%">
          <el-table-column label="序号" width="50" prop="date" ></el-table-column>
          <el-table-column label="获奖名称" min-width="100" prop="awardsName" ></el-table-column>
          <el-table-column label="获奖年份" min-width="150" prop="awardsYear" ></el-table-column>
          <el-table-column label="评比单位" min-width="150" prop="ratingDepart" ></el-table-column>
          <el-table-column label="相关项目" min-width="150" prop="awardsInfo" ></el-table-column>
          <el-table-column label="审核" min-width="150" prop="shenhe"  v-if="status>=6&&redactFlag">
            <template slot-scope="scope" :disabled="status>6">
              <el-select  @change='change(scope.row)' v-model='scope.row.selectValue'>
                <el-option label="已核" value="1"></el-option>
                <el-option label="存疑" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="118"  prop="name" >
              <template>
                <el-button type="primary" plain size="mini" class="operativeButton" @click.stop="findWorkOrder">查看附件</el-button>
                </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="remarkBox">
      <div class="remarkText">
        <p>备注</p> 
      </div>
      <div class="tableBox">
        111
        {{allData.Technicist.remark?allData.Technicist.remark:''}}
        <!-- <el-input type="textarea" v-model="allData.Technicist.remark" /> -->
      </div>
    </el-row>
	</div>
</template>
<script>
import API_PREFIX from '@/api/config'
export default {
  components: {
  },
  props: {
		height: {
			type: String,
			default: '400px'
    },
    status:{
      type: Number,
			// default: false
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
        this.allData=curVal
      }
    },
  },
  data() {
    return {
      pickerOptions:{
				disabledDate:(time)=>{return time.getTime() > Date.now()}
      },
      btnShow:false,
      disabled: true,
      dialogFormVisibleType:false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      form: {
        ratingDepart: '',
        awardsInfo: '',
        value3: '',
        editFormFlag:false,
        nowIndex:'',
      },
      options: [],
      rules:{
        ratingDepart:[
          { required: true, message: '请选择相关项目', trigger: 'change' },
        ], //相关项目 必填  下拉
        awardsInfo:[
          { required: true, message: '请输入评比单位', trigger: 'change' },
          { min: 0, max: 200, message: '', trigger: 'change' }
        ], //评比单位 必填
        awardsYear:[
          { required: true, message: '请选择获奖年份', trigger: 'change' },
        ], // 获奖年份
        awardsName:[
          { required: true, message: '请输入获奖名称', trigger: 'change' },
          { min: 0, max: 200, message: '', trigger: 'change' }
        ], // 获奖名称
        technologyDocument:[],// 图片
      },
    };
  },
  methods: {
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 415
        ? 415
        : this.$store.getters.screenHeight;
    }
  },
  mounted() {
    // this.changeTable()
  },
};
</script>
<style  lang="scss" scoped>
  .el-select, .el-date-editor.el-input,
    /deep/ .el-date-editor--daterange.el-input__inner {
      width: 100%;
  }
  .elButton {
    margin-bottom: 5px;
  }
  .el-upload__tip{
    margin-left: 15px;
  }
  /deep/ .el-dialog--center .el-dialog__footer{
    text-align: right;
    padding: 10px 20px 15px 0;
  }
  .card-head {
      margin: 10px 0;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  /deep/ .el-dialog--center .el-dialog__body{
    padding: 25px 25px 15px;
  }
  .remarkBox {
      margin-top: 10px;
      .remarkText , .remarkTextP {
        width: 150px;
        font-size: 12px;
        float: left;
      }
      .remarkText {
        margin: 0;
        background: #f2f2f2;
        padding: 5px 0;
        text-align:center;
        border: 1px solid gray;
      }
      .remarkTextP {
        background-color: #fff;
        padding: 6px 0;

      }
      .tableBoxInput {
        width: calc(100% - 150px);
        float: right;
      }
      .tableBox {
        border: 1px solid gray;
        border-left: none;
        padding: 17px 5px;
        font-size: 12px;
        margin: 0;
        width: calc(100% - 150px);
        float: right;
      }
  }
</style>

