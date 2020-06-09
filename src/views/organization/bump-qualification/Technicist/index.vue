<template>
	<div id="technicist">
		<div class="header">
      <div v-if="showBtn&&redactFlag" class="elButton">
        <el-button size="small" @click="changeTable(1)" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
      </div>
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
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" class="operativeButton"  @click.stop="findWorkOrder" v-if="scope.row.finishFlag==='1' || !redactFlag " >查看附件</el-button>
              <el-button type="primary" plain size="mini" class="operativeButton"  @click="editForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag" >修改</el-button>
              <el-button type="primary" plain size="mini" class="operativeButton"  @click="delelteForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag"  >删除</el-button>
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
        <!-- <el-row>
          <div v-if="showBtn&&redactFlag">
            备注 <el-input v-model="allData.Technicist.remark" />
          </div>
          <div v-else>
            备注 {{allData.Technicist.remark?allData.Technicist.remark:''}}
          </div>
        </el-row> -->
		<my-dialog width="800px" class="boxCard_dialog" :height='dialogHeight + "px"' center :visible.sync="dialogFormVisibleType"  :append-to-body="false">
      <select-dialog ref='SelectDialog2' :pageTabsData="pageTabsData1" title="添加单位技术人员构成" @handle-select="handleSelect" :height='dialogHeight + "px"'>
        <template #body_1>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <duty-allocation :propsData='propsData' :childData='childData' ref="dutyAllocation"/>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <technical-backbone ref="technicalBackbone" :propsData='propsData' :childData1='childData1'/>
          </el-scrollbar>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisibleType = false">取消</el-button>
      </span>
		</my-dialog>
	</div>
</template>
<script>
import MyDialog from '@/components/commons/MyDialog'
import SelectDialog from "@/components/commons/SelectDialog";
// import PageTabs from '@/components/commons/PageTabs'
import API_PREFIX from '@/api/config'
import DutyAllocation from './components/DutyAllocation'
import TechnicalBackbone from './components/TechnicalBackbone'
export default {
	components: {
		MyDialog,
    // PageTabs,
    SelectDialog,
    DutyAllocation,
    TechnicalBackbone
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
    }
  },
  watch:{
    status(curVal){
      if(curVal){
        this.status=curVal;
        this.PersonneAdd();
        this.btnstatus();
      }
    },
    allData(curVal){
      if(curVal){
        this.allData=curVal;
        this.PersonneAdd();
      }
    },
  },
  data() {
    return {
      title: '添加单位技术人员构成',
      nowIndex:'',
      dialogFormVisibleType:false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
			form: {
        provinceList:[],
      },
      showBtn:false,
      editFlag:false,
      childData:null,
      childData1:null,
      childData2:null,
			options:[],
			// 选中的菜单项（基本信息/工程概况...）
      selectMenuItem: '',
      // 切换按钮数据
      pageTabsData1: {
        tabs: [
          {
            title: '选择责任设计师/工程师/监理师',
            num: ''
          },
          {
            title: '添加其他专业技术骨干',
            num: ''
          }
        ]
      },
      rules:{},
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
    if( this.allData.renyuan){
      this.tableData = this.allData.renyuan
    }
    this.PersonneAdd();
  },
  methods: {
    changeTable() {
      this.editFlag=false;
      this.dialogFormVisibleType = true;
      if(this.$refs.SelectDialog2){
        this.$refs.SelectDialog2.handleSelect('1');
      }
      this.form={
        provinceList:[],
      };
      this.nowIndex='';
      this.childData={};
      this.childData1=null;
      this.childData2=null;
      
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
    findWorkOrder() {},
    confirm(){
      if(this.$refs.SelectDialog2.selectMenuItem =='1'){
        if(!this.childData2){
          window.alert('请选择人员')
          return;
        }
        if(this.editFlag){
          this.$set(this.allData.Technicist.tableData, this.nowIndex, {...this.childData2,finishFlag:'0'})
        }else{
          this.allData.Technicist.tableData.push({...this.childData2,finishFlag:'0'}); 
        }
        this.dialogFormVisibleType = false;
      }else{
        // form2 校验
         let flag = this.$refs.technicalBackbone.validataForm();
       if(flag){
          this.dialogFormVisibleType = false;
          if(this.editFlag){
            this.allData.Technicist.tableData[this.nowIndex]={...this.childData2,finishFlag:'0'};
          }else{
            this.allData.Technicist.tableData.push({...this.childData2,finishFlag:'0'}); 
          }
       }
      }
      this.allData.reryuan=this.allData.Technicist.tableData;
      this.PersonneAdd();
    },
    //子组件传过来的数据进行保存
    propsData(value){
      if(!value) return
      this.childData2=value;
    },
		handleSelect(key) {
      this.selectMenuItem = key
    },
    editForm(obj,index) { //编辑表单
      this.nowIndex=index;
      this.form={...obj};
      this.dialogFormVisibleType = true;
      this.editFlag=true;
      if(obj.qualificationType=='其他技术骨干'){
        this.$ref.SelectDialog2.handleSelect(2);
        this.childData={...obj};
        this.childData1=null;
        this.childData2={...obj};
      }else{
        this.$ref.SelectDialog2.handleSelect(1);
        this.childData=null;
        this.childData1={...obj};
        this.childData2={...obj};
      }
     
    },
    delelteForm(obj,index) { //删除表单
      let flag=window.confirm(); //确定true 取消 false
      console.log(flag);
      if(flag){
        this.allData.Technicist.tableData = this.allData.Technicist.tableData.filter((item,index1)=>index!=index1);
      }
    },
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log(file)

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
      return this.$confirm('确定要移除文件 ' + file.name + ' 吗？', {
        type: 'warning'
      })
    },
    // 文件列表移除了某个文件的回调
    handleRemove(file, fileList, name) {
      this.form[name] = fileList
    },
    // 文件上传成功的回调
    fileUploadSuccess(response, file, name) {
      if (response.code === 200) {
        // 清除文件必填项校验提示
        this.$refs.fileUpload.clearValidate()
        const { data } = response
        data.uid = file.uid
        data.name = data.fileName
        this.form[name].push(data)
      } else {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        })
      }
    },
    // 文件上传失败的回调
    fileUploadError() {
      this.$message({
        showClose: true,
        message: '文件上传失败。',
        type: 'error'
      })
    },
    beforeUpload(file) {
      const fileExt = file.name.replace(/.+\./, '')
      // 判断文件格式doc / docx / pdf
      if (['doc', 'docx', 'pdf'].indexOf(fileExt.toLowerCase()) === -1) {
        this.$alert('请上传后缀名为 doc、docx、pdf的文件', {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
        return false
      }
      // 判断文件大小
      if (file.size > 1 * 1024 * 1024 * 1024) {
        this.$alert(`上传的文件大小不能超过 800M`, {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
        return false
      }
      // this.disabled = this.fileList && this.fileList.length === this.limit
    },
    // 初始化 unitPersonnelArr
    unitPersonnelArrInit(){
    this.unitPersonnelArr=[{
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
      }]
    },
    // 单位技术人员构成计数
    PersonneAdd(){
      this.unitPersonnelArrInit()
      this.allData.Technicist.tableData.forEach(item => {
        switch(item.qualificationType){
          case "责任设计师":
            this.unitPersonnelArr[0].num++;
            if(item.perTypeCode==='1'){// 判断是否返聘人员的条件
              this.unitPersonnelArr[0].fpNum++;
            }
          break;
          case "责任工程师":
             this.unitPersonnelArr[1].num++;
             if(item.perTypeCode==='1'){// 判断是否返聘人员的条件
              this.unitPersonnelArr[0].fpNum++;
            }
          break;
          case "责任监理师":
             this.unitPersonnelArr[2].num++;
             if(item.perTypeCode==='1'){// 判断是否返聘人员的条件
              this.unitPersonnelArr[0].fpNum++;
            }
          break;
          case "其他技术骨干":
             this.unitPersonnelArr[3].num++;
          break;
          default: break;
        }
      });
      console.log( this.unitPersonnelArr)
      // this.unitPersonnelArr=JSON.parse(JSON.stringify(this.unitPersonnelArr))
    },
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

