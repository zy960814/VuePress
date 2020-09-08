<template>
	<div class="qualification">
    <el-row>
      <el-col>
          <el-table :data="allData.QualificationInformation.tableData" style="width: 100%">
            <el-table-column label="序号" width="50" prop="date" ></el-table-column>
            <el-table-column label="资格类型" min-width="100" prop="qualificationLevel" ></el-table-column>
            <el-table-column label="业务范围" min-width="150" prop="qualRangeName" ></el-table-column>
            <el-table-column label="批准部门" min-width="150" prop="approvalDepartment" ></el-table-column>
            <el-table-column label="批准文号" min-width="150" prop="approvalSymbol" ></el-table-column>
            <el-table-column label="资质有效期" min-width="150" prop="quaStartTime" ></el-table-column>
            <el-table-column label="审核" min-width="150" prop="shenhe"  v-if="status>=6&&redactFlag">
              <template slot-scope="scope" :disabled="status>6">
                <el-select  @change='change(scope.row)' v-model='scope.row.selectValue'>
                  <el-option label="已核" value="1"></el-option>
                  <el-option label="存疑" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="118" prop="name" fixed="right">
              <template >
                <el-button type="primary" plain size="mini" class="operativeButton"  @click.stop="findWorkOrder">查看附件</el-button>
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

export default {
	components: {
		
  },
  props: {
		height: {
			type: String,
			default: '500px'
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
		
		}
  },
  computed: {
    dialogHeight(){
        // return 400
       return this.$store.getters.screenHeight > 569
        ? 569
        : this.$store.getters.screenHeight
    },
  },
  mounted() {
  },
	methods: {
	}
}
</script>
<style  lang="scss" scoped>
  .el-select, .el-date-editor.el-input,
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
  .linkBottom /deep/ .el-checkbox__input{
    vertical-align: top;
    padding-top: 3px;
    font-size: 12px;
  }
  .linkBottom /deep/ .el-checkbox__label{
    vertical-align: top;
    font-size: 12px;
  }
  .checkBox /deep/ .el-checkbox__label {
    line-height: 10px;
  }
  .elButton {
    margin-bottom: 5px;
  }
  .explain{
    padding: 0px 0 10px 18px;
    font-size: 12px;
    color: #18B9F4;
  }
  .el-upload__tip{
    margin-left: 15px;
  }
  .card-head {
      margin: 10px 0;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  /deep/ .el-form-item__label {
    white-space: normal !important;
    line-height: 15px;
  }
  /deep/ .el-dialog__wrapper.boxCard_dialog .el-card .el-card__body{
    padding: 10px 0px 5px 0px !important;
  }
  .linkBottom /deep/ .el-form-item--small.el-form-item{
    margin-bottom: 0px;
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

