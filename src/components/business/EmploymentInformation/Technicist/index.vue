<template>
	<div id="technicist">
		<div class="header">
      <div class="pull-right color-blue">
        <span >技术人员总数：{{allData.Technicist.tableData.length}}</span>
      </div>
		</div>
				<el-table :data="allData.Technicist.tableData" style="width: 100%">
					<el-table-column label="序号" width="50" prop="date" ></el-table-column>
					<el-table-column label="人员姓名" min-width="100" prop="name" ></el-table-column>
					<el-table-column label="出生年份" min-width="150" prop="dateBirth" ></el-table-column>
					<el-table-column label="资格类型" min-width="150" prop="business" ></el-table-column>
					<el-table-column label="业务证书编号(专业职称)" min-width="150" prop="certificateNo" ></el-table-column>
          <el-table-column label="审核" min-width="150" prop="shenhe"  v-if="status>=6&&redactFlag">
            <template slot-scope="scope" :disabled="status>6">
              <el-select  @change='change(scope.row)' v-model='scope.row.selectValue'>
                <el-option label="已核" value="1"></el-option>
                <el-option label="存疑" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
					<el-table-column label="操作" width="118"  prop="" >
            <template>
              <el-button type="primary" plain size="mini" class="operativeButton"  @click.stop="findWorkOrder">查看附件</el-button>
            
            </template>
					</el-table-column>
				</el-table>
				<el-row>
						<el-col class="flexBox">
              <div v-for="(item,index) in unitPersonnelArr" :key='index' class="PersonnelBox">
              <div class="PersonnelBoxLeft">
                <span>{{item.qualificationType}}</span>
                <span class="font12" v-if="item.fpNum!==null">返聘人员：{{item.fpNum}}</span>
              </div>
              <div class="PersonnelBoxRight">
                {{item.num}}
              </div>
            </div>
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

export default {
	components: {
    // PageTabs,
    
  },
  props: {
		height: {
			type: String,
			default: '430px'
    },
    status:{
      type: Number,
			// default: false
    },
    allData:{
      type:Object,
    },
    redactFlag:{
      type:Boolean,
      default:true
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
      title: '添加单位技术人员构成',
      // 单位构成人员数据
      unitPersonnelArr:[{
        qualificationType:'责任设计师',
        num:0,
        fpNum:0,
      },{
        qualificationType:'责任工程师',
        num:0,
        fpNum:0,
      },{
        qualificationType:'责任监理师',
        num:0,
        fpNum:0,
      },{
        qualificationType:'其他技术骨干',
        num:0,
        fpNum:null,
      }],
    };
  },
  mounted() {
  
  },
  methods: {
  },
   computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 985
        ? 985
        : this.$store.getters.screenHeight;
    }
  }
};
</script>
<style  lang="scss" scoped>
  #technicist{
  /deep/ .el-dialog__wrapper.boxCard_dialog .el-card .el-card__body{
      padding: 12px 0 12px 12px!important;
    }
  } 
  /deep/ .el-scrollbar__wrap{
      padding-right:12px; 
    }
  .elButton {
    margin-bottom: 5px;
    float: left;
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
  .flexBox{
    display: flex;
    justify-content: space-between;
    flex-flow:  row nowrap;
    margin: 10px 0 0px 0;
    height: 60px;
  }
  .PersonnelBox{
    border:1px solid #909399;
    border-radius: 4px;
    width: 20%;
    height: 100%;
    padding: 5px;
    display: flex;
    flex-wrap: nowrap;
  }
  .PersonnelBoxLeft{
      border-right:1px solid #909399;
      width: 62.5%;
      display: flex;
      flex-direction:column;
      justify-content:space-around;
      font-size:12px; 
      color: #606266;
      .font12{
        font-size: 12px
      }
    }
    .PersonnelBoxRight{
      padding-left: 10px;
      width: 37.5%;
      display: flex;
      flex-direction:column;
      justify-content:space-around;
      // font-weight: bolder;
      font-size: 15px;
      color: #606266;
    }
    .pull-right{
      // text-align: right;
      margin: 10px 0;
      float:right;
    }
    .color-blue{
      color:#18B9F4;
      font-size: 12px;
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

