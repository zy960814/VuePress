<template>
  <div>
    <el-col :span="1" v-if="showBtn&&redactFlag" class="elButton">
      <el-button size="small" @click="changeTable(1)" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
    </el-col>
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
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" class="operativeButton" @click.stop="findWorkOrder" v-if="scope.row.finishFlag==='1' || !redactFlag " >查看附件</el-button>
          <el-button type="primary" plain size="mini" class="operativeButton" @click="editForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag" >修改</el-button>
          <el-button type="primary" plain size="mini" class="operativeButton"  @click="delelteForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag"  >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="remarkBox" v-if="showBtn&&redactFlag">
      <div class="remarkTextP">
        <p>备注</p> 
      </div>
      <div :span="23" class="tableBoxInput">
        <el-input type="textarea" v-model="allData.Technicist.remark" />
      </div>
    </el-row>
    <el-row v-else class="remarkBox">
      <div class="remarkText">
        <p>备注</p> 
      </div>
      <div class="tableBox">
        111
        {{allData.Technicist.remark?allData.Technicist.remark:''}}
        <!-- <el-input type="textarea" v-model="allData.Technicist.remark" /> -->
      </div>
    </el-row>
    <my-dialog width="1000px" class="boxCard_dialog" :height='dialogHeight + "px"' :visible.sync="dialogFormVisibleType"  :append-to-body="false">
      <select-dialog :pageTabsData="pageTabsData1" title="添加文物保护工程业绩" @handle-select="handleSelect" :height='dialogHeight + "px"' ref='selectDialog'>
        <template #body_1>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <prospective-design ref='history1' :returnFormData="returnFormData"></prospective-design>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <Roadwork ref='history2' :returnFormData="returnFormData"></Roadwork>
          </el-scrollbar>
        </template>
        <template #body_3>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <supervisor ref='history3' :returnFormData="returnFormData"></supervisor>
          </el-scrollbar>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisibleType=false">取消</el-button>
      </span>
    </my-dialog>
  </div>
</template>
<script>

import MyDialog from "@/components/commons/MyDialog";
import ProspectiveDesign from "./ProspectiveDesign"
import Roadwork from './Roadwork'
import Supervisor from './Supervisor'
import SelectDialog from "@/components/commons/SelectDialog";
import API_PREFIX from "@/api/config";
export default {
  components: {
    MyDialog,
    SelectDialog,
    ProspectiveDesign,
    Roadwork,
    Supervisor
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
    }
  },
  watch:{
    status(curVal){
      if(curVal){
        this.status=curVal;
        this.btnstatus();
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
      projectType: 1,
      arrow: false,
      dialogFormVisibleType: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      options: [],
      showBtn:false,
      pageTabsData1: {
        tabs: [
          { title: "勘察设计项目", num: ""},
          { title: "施工项目", num: "" },
          { title: "监理项目", num: "" }
        ]
      },
      form: {
        startTime: "",
        finishTime: "",
        projectLevel: "",
        protectionDepartLevel: ""
      },
      pageTabsData: {
        tabs: [
          {
            title: "勘察设计项目",
            num: ""
          },
          {
            title: "施工项目",
            num: ""
          },
          {
            title: "监理项目",
            num: ""
          }
        ]
      },
      selectMenuItem:'1',
      editFlag:false,
      nowIndex:''
    };
  },
  methods: {
    changeTable() {
      this.dialogFormVisibleType = true;
      this.editFlag=false;
      this.nowIndex=''
    },
    // 保存子组件的数据
    returnFormData(form){
      if(this.editFlag){
      this.$set(this.allData.HistoricReservation.tableData, this.nowIndex, {...this.form,finishFlag:'0'})
      }else{
        this.allData.HistoricReservation.tableData.push({...form,itemCode:this.$refs.selectDialog.selectMenuItem,finshFlag:'0'})
      }
      this.dialogFormVisibleType = false;
    },
    confirm(){
     let selectMenuItem=this.$refs.selectDialog.selectMenuItem
      this.$refs['history'+selectMenuItem].validataForm();
    },
    findWorkOrder() {},
    handleSelect(key) {
      console.log(key,'qqqqqqqqqqqqq')
      this.selectMenuItem = key;
    },
    btnstatus(){
      switch(this.status){
        case 2:
        case 3:
        this.showBtn=true;
          return true;
        case 1:
        case 4:
        case 5:
        case 6:
        case 7:
          this.showBtn=false;
          return false;
      }
    },
    editForm(obj,index) { //编辑表单
      console.log(obj);
      this.nowIndex=index;
      this.form={...obj};
      this.editFlag=true,
      this.dialogFormVisibleType = true
    },
    delelteForm(obj,index) { //删除表单
      let flag=window.confirm(); //确定true 取消 false
      if(flag){
        this.allData.HistoricReservation.tableData = this.allData.QualificationInformation.tableData.filter((item,index1)=>index!=index1);
      }
    },
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log(file);

      /* if (this.fileItemClick) {
           this.fileItemClick = false;
           var loading = this.$loading({
             lock: true,
             text: '正在加载文件，请稍候...',
             spinner: 'el-icon-loading',
             background: 'rgba(0, 0, 0, 0.7)'
           });
           var vue = this;
           var x = new XMLHttpRequest();
           x.onreadystatechange = function () {
             if (x.readyState === 4) {
               loading.close();
               vue.fileItemClick = true;
             }
           };
           x.open("GET", file.url, true);
           x.responseType = 'blob';
           x.onload = function () {
             download(x.response, file.name);
           };
           x.send();
         } else {
           this.$message({
             showClose: true,
             message: '正在下载中，请稍候...'
           });
         }*/
    },
    // 文件列表移除某个文件前的回调
    beforeRemove(file) {
      return this.$confirm("确定要移除文件 " + file.name + " 吗？", {
        type: "warning"
      });
    },
    // 文件列表移除了某个文件的回调
    handleRemove(file, fileList, name) {
      this.form[name] = fileList;
    },
    // 文件上传成功的回调
    fileUploadSuccess(response, file, name) {
      if (response.code === 200) {
        // 清除文件必填项校验提示
        this.$refs.fileUpload.clearValidate();
        const { data } = response;
        data.uid = file.uid;
        data.name = data.fileName;
        this.form[name].push(data);
      } else {
        this.$message({
          showClose: true,
          message: "文件上传失败",
          type: "error"
        });
      }
    },
    // 文件上传失败的回调
    fileUploadError() {
      this.$message({
        showClose: true,
        message: "文件上传失败。",
        type: "error"
      });
    },
    beforeUpload(file) {
      const fileExt = file.name.replace(/.+\./, "");
      // 判断文件格式doc / docx / pdf
      if (["doc", "docx", "pdf"].indexOf(fileExt.toLowerCase()) === -1) {
        this.$alert("请上传后缀名为 doc、docx、pdf的文件", {
          confirmButtonText: "我知道了",
          type: "warning"
        });
        return false;
      }
      // 判断文件大小
      if (file.size > 1 * 1024 * 1024 * 1024) {
        this.$alert(`上传的文件大小不能超过 800M`, {
          confirmButtonText: "我知道了",
          type: "warning"
        });
        return false;
      }
      // this.disabled = this.fileList && this.fileList.length === this.limit
    }
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

