<template>
  <div>
    <el-table :data="allData.HistoricReservation.tableData" style="width: 100%">
      <el-table-column label="序号" width="50" prop="date" ></el-table-column>
      <el-table-column label="项目名称(方案名称)" min-width="100" prop="projectName" ></el-table-column>
      <el-table-column label="项目类型" min-width="150" prop="itemCode" >
        <template slot-scope="scope">
          {{scope.row.itemCode==='1'?"勘察设计项目":(scope.row.itemCode==='2'?"施工项目":'监理项目')}}
        </template>
      </el-table-column>
      <el-table-column label="工程级别" min-width="150" prop="projectLevel" ></el-table-column>
      <el-table-column label="文物保护单位名称" min-width="150" prop="protectDepart" ></el-table-column>
      <el-table-column label="文物保护单位级别" min-width="150" prop="protectionDepartLevel" ></el-table-column>
      <el-table-column label="文物类型" min-width="150" prop="protectionDepartLevel" ></el-table-column>
      <el-table-column label="批准部门" min-width="150" prop="approvalDepart" ></el-table-column>
      <el-table-column label="批准文号" min-width="150" prop="approvalNo" ></el-table-column>
      <el-table-column label="开工日期" min-width="150" prop="startTime" ></el-table-column>
      <el-table-column label="验收日期" min-width="150" prop="finishTime" ></el-table-column>
      <el-table-column label="审核" min-width="150" prop="shenhe"  v-if="status>=6&&redactFlag">
        <template slot-scope="scope" :disabled="status>6">
          <el-select  @change='change(scope.row)' v-model='scope.row.selectValue'>
            <el-option label="已核" value="1"></el-option>
            <el-option label="存疑" value="2"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="118" fixed="right" prop="name" >
        <template>
          <el-button type="primary" plain size="mini" class="operativeButton" @click.stop="findWorkOrder">查看附件</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      default: "480px"
    },
    addProject:{
      type:Function
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
    // var valifinishTime = (rule, value, callback) => {
    //   if (new Date(value) < new Date(this.form.startTime)) {
    //     callback(new Error("不得早于开工日期"));
    //   } else if (new Date(value) > new Date() && this.projectType == 2) {
    //     callback(new Error("不得晚于当前时间"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
    
    };
  },
  methods: {
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight;
    }
  }
};
</script>
<style  lang="scss" scoped>
.el-select,
.el-date-editor.el-input,
/deep/ .el-date-editor--daterange.el-input__inner {
  width: 100%;
}
.elButton {
  margin-bottom: 5px;
}
/deep/ .el-form-item__label {
  white-space: break-spaces;
}
.el-upload__tip {
  margin-left: 15px;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.dialog-footer {
  padding: 20px;
  padding-top: 10px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/ .el-dialog__wrapper.boxCard_dialog .el-card .el-card__body{
      padding: 12px 0 12px 12px!important;
}
/deep/ .el-scrollbar__wrap{
  padding-right:12px; 
}
.boxCard_dialog{
    z-index: 10001 !important;
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

