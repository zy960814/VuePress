<template>
	<div class="qualification">
    <el-row>
      <el-col>
          <el-col :span="1" class="elButton" v-if="btnShow&&redactFlag">
            <el-button  size="small" @click="changeTable()" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
          </el-col>
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
            <el-table-column label="操作" width="118" prop="name" >
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" class="operativeButton"  @click.stop="findWorkOrder" v-if="scope.row.finishFlag==='1' || !redactFlag " >查看附件</el-button>
                <el-button type="primary" plain size="mini" class="operativeButton"  @click="editForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag" >修改</el-button>
                <el-button type="primary" plain size="mini" class="operativeButton"  @click="delelteForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag"  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-row class="remarkBox" v-if="btnShow&&redactFlag">
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
      <div v-if="btnShow&&redactFlag">
        备注 <el-input v-model="allData.Technicist.remark" />
      </div>
      <div v-else>
        备注 {{allData.Technicist.remark?allData.Technicist.remark:''}}
      </div>
    </el-row> -->
		<my-dialog width="800px" class="boxCard_dialog" :height='dialogHeight + "px"' :visible.sync="dialogFormVisibleType" :append-to-body="false">
      <el-card shadow="never">
        <div slot="header">添加单位资质信息</div>
        <el-scrollbar :style="{height: (dialogHeight - 130) + 'px'}">
          <div class="explain">填写说明：从业单位可以有多个资质，录入时请逐条添加。如无资质信息可不填写。</div>
          <el-form
            ref="qualification"
            :rules="rules"
            :model="form"
            label-position="left"
            label-width="132px"
            :show-message="false">
            <el-row>
              <el-col :span="11">
                <el-form-item label="现有资格类型" prop="qualificationLevel" class="redStar">
                  <el-select v-model="form.qualificationLevel" placeholder="请选择" >
                    <el-option
                      v-for="(label, key)  in  qualificationLevelOption"
                      :label="label.qualRangeName"
                      :key="key"
                      :value="label.qualRangeName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="linkBottom">
              <el-col :span="24">
                <el-form-item label="现有业务范围" prop="provinceList" class="redStar">
                  <el-checkbox-group  v-model="form.provinceList"  @change='changeProvinceList'>
                    <el-checkbox label='古文化遗址古墓葬'></el-checkbox>
                    <el-checkbox label='古建筑'></el-checkbox>
                    <el-checkbox label='石窟寺和石刻'></el-checkbox>
                    <el-checkbox label='近现代重要史迹及代表性建筑'></el-checkbox>
                    <el-checkbox label='壁画'></el-checkbox>
                    <el-checkbox label='保护规划'></el-checkbox>
                    <el-checkbox label='其他(有特定业务范围的在"其他"中全文填写'></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="otherCheckboxShow">
              <el-col :span="24">
                <el-form-item label="" prop="otherCheckbox" class="redStar">
                  <el-input v-model="form.otherCheckbox" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="批准部门" prop="approvalDepartment" class="redStar">
                  <el-input v-model="form.approvalDepartment" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="批准文号" prop="approvalSymbol" class="redStar">
                  <el-input v-model="form.approvalSymbol" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="证书印发日期" prop="quaStartTime" class="redStar">
                  <el-date-picker
                      v-model="form.quaStartTime"
                      :picker-options="startDateLimit"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="有效期至" prop="quaEndTime" class="redStar">
                  <el-date-picker
                    v-if="this.form.permanent == true"
                    disabled
                    v-model="form.quaEndTime"
                    :picker-options="endDateLimit"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <el-date-picker
                    v-if="this.form.permanent == false"
                    :picker-options="endDateLimit"
                    v-model="form.quaEndTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="1">
                  <el-checkbox v-model="form.permanent" @change="checkBox" class="checkBox"><p>永久</p></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item ref="fileUpload" label="上传现有资质证书正本和完整副本彩色扫描件" prop="technologyDocument" class="redStar">
                  <el-upload
                    :action="fileUploadUrl"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :data="{fieldCode: 'BAWJ', fieldName: '获奖证明文件扫描件'}"
                    :file-list="form.technologyDocument"
                    :multiple="false"
                    :limit="1"
                    :before-upload="beforeUpload"
                    :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
                    :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
                    :on-error="fileUploadError">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip">支持扩展名：pdf / jpg / png / bmp</span>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisibleType = false">取消</el-button>
      </span>
		</my-dialog>
	</div>
</template>
<script>
import MyDialog from '@/components/commons/MyDialog'
import API_PREFIX from '@/api/config'
export default {
	components: {
		MyDialog
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
		return {
			dialogFormVisibleType:false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      otherCheckboxShow:false,
      startDateLimit: this.beginDate(),
      endDateLimit: this.processDate(),
      btnShow:false,
			form: {
        permanent: '',
        qualificationLevel: '',
        qualificationRange: '',
        provinceList: [],
        approvalDepartment: '', 
        approvalSymbol: '',
        quaStartTime: '',
        quaEndTime: '',
			},
      options:[],
      qualificationLevelOption: [
        { qualRangeName: "勘察设计甲级", qualRangeCode: "1" },
        { qualRangeName: "勘察设计乙级", qualRangeCode: "4" },
        { qualRangeName: "勘察设计丙级", qualRangeCode: "5" },
        { qualRangeName: "施工一级", qualRangeCode: "2" },
        { qualRangeName: "施工二级", qualRangeCode: "6" },
        { qualRangeName: "施工三级", qualRangeCode: "7" },
        { qualRangeName: "监理甲级", qualRangeCode: "3" },
        { qualRangeName: "监理乙级", qualRangeCode: "8" },
        { qualRangeName: "监理丙级", qualRangeCode: "9" }
      ],
      
			rules:{
        qualificationLevel: [
           { required: true, message: '请选择相关项目', trigger: 'change'},
        ],
        qualificationRange: [
          { required: true, message: '请选择相关项目',trigger: 'change'},
        ],
        approvalDepartment: [
          { required: true, message: '请选择相关项目' ,trigger: 'change'},
        ],
        approvalSymbol: [
          { required: true, message: '请选择相关项目', trigger: 'change'},
        ],
        quaStartTime: [
          { required: true, message: '请选择相关项目', trigger: 'change'},
        ],
        // quaEndTime: [
        //   { required: true, message: '请选择相关项目', trigger: 'blur' },
        // ],
        otherCheckbox:[
          { required: false, message: '请选择相关项目',trigger: 'change'},
        ],
      },
      rules2:{
        qualificationLevel: [
           { required: true, message: '请选择相关项目', trigger: 'blur' },
        ],
        qualificationRange: [
          { required: true, message: '请选择相关项目', trigger: 'blur' },
        ],
        approvalDepartment: [
          { required: true, message: '请选择相关项目', trigger: 'blur' },
        ],
        approvalSymbol: [
          { required: true, message: '请选择相关项目', trigger: 'blur' },
        ],
        quaStartTime: [
          { required: true, message: '请选择相关项目', trigger: 'blur' },
        ],
        // quaEndTime: [
        //   { required: true, message: '请选择相关项目', trigger: 'blur' },
        // ],
        otherCheckbox:[
          { required: false, message: '请选择相关项目', trigger: 'blur' },
        ],
      },
      nowIndex:'',
      editFlag:'',
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
    change(){

    },
		changeTable(){
      this.nowIndex='';
      this.editFlag=false;
      this.form={
        permanent: '',
        qualificationLevel: '',
        qualificationRange: '',
        provinceList: [],
        approvalDepartment: '', 
        approvalSymbol: '',
        quaStartTime: '',
        quaEndTime: '',
      };
			this.dialogFormVisibleType = true
		},
		findWorkOrder(){

    },
		confirm(){
      this.$refs['qualification'].validate(vaild=>{
        if(vaild){
          let str='';
          let index=this.form.provinceList.indexOf('其他(有特定业务范围的在"其他"中全文填写')
              if(index===-1){
                str=this.form.provinceList.join(',')
              }else{
                str=this.form.provinceList.filter((item,index1)=> index!==index1).join(',')+",其他"+'【' +this.form.otherCheckbox + '】'
              } 
          let startAndEnd = ''
          if(this.form.permanent == true) {
            startAndEnd = this.form.quaStartTime + '- 至 - ' + '永久'
          }else if(this.form.permanent == false){
            startAndEnd = this.form.quaStartTime + '- 至 -' + this.form.quaEndTime
          }
         if(this.editFlag){
            this.$set(this.allData.QualificationInformation.tableData, this.nowIndex, {...this.form,qualRangeName:str,quaStartTime:startAndEnd,finishFlag:'0'})
         }else{
           this.allData.QualificationInformation.tableData.push(
              {...this.form,qualRangeName:str,quaStartTime:startAndEnd,finishFlag:'0'}
            )
          }
            this.dialogFormVisibleType = false;
        }
      })
		},
		checkBox(){
      if(this.form.permanent == true){
        this.form.quaEndTime = ''
      }
    },
    btnstatus(){
      switch(this.status){
        case 2:
        case 3:
          this.btnShow=true;
          return ;
        case 1:
        case 4:
        case 5:
        case 6:
        case 7:
          this.btnShow=false;
          return ;
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
        this.allData.QualificationInformation.tableData = this.allData.QualificationInformation.tableData.filter((item,index1)=>index!=index1);
      }
    },
    // 选择评比单位
    changeProvinceList(provinceList){
      if(provinceList.indexOf('其他(有特定业务范围的在"其他"中全文填写') !=-1){
        this.otherCheckboxShow=true;
        this.rules.otherCheckbox[0].required=true;
      }else{
        this.otherCheckboxShow=false;
        this.rules.otherCheckbox[0].required=true;
      }
			this.getTableData()
    },
    //获取表格数据
		getTableData(){
			console.log('调用表格接口并赋值');
		},
    beginDate() {
      //提出开始时间必须小于今天
      // let self = this;
      return {
        disabledDate(time) {
          return time.getTime() > Date.now(); //开始时间不选时，结束时间最大值小于等于当天
        }
      };
    },
    processDate() {
      //提出结束时间必须大于提出开始时间
      let self = this;
      return {
        disabledDate(time) {
          if (self.form.quaStartTime) {
            return (
              new Date(self.form.quaStartTime).getTime() >
              time.getTime()
            );
          } else {
            return time.getTime() > Date.now();
            //开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
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
  // /deep/ .el-dialog--center .el-dialog__footer{
  //   text-align: right;
  //   padding: 10px 20px 5px 0;
  // }
  .card-head {
      margin: 10px 0;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  // /deep/ .el-dialog--center .el-dialog__body{
  //   padding: 25px 25px 15px;
  // }
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

