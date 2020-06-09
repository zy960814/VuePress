<template>
	<div>
    <el-row>
      <el-col>
        <el-col :span="5" class="elButton" v-if="btnShow&&redactFlag">
          <el-button size="small"  type="primary" icon="el-icon-circle-plus-outline" disabled = "disabled" v-if="allData.HistoricReservation.tableData.length==0">添加</el-button>
          <el-button size="small" @click="changeTable" type="primary" icon="el-icon-circle-plus-outline" v-if="allData.HistoricReservation.tableData.length>0">添加</el-button>
        </el-col>
        <el-table :data="allData.ScholarshipPrize.tableData" style="width: 100%">
          <el-table-column label="序号" width="50" prop="date" ></el-table-column>
          <el-table-column label="获奖名称" min-width="100" prop="awardsName" ></el-table-column>
          <el-table-column label="获奖年份" min-width="150" prop="awardsYear" ></el-table-column>
          <el-table-column label="评比单位" min-width="150" prop="ratingDepart" ></el-table-column>
          <el-table-column label="相关项目" min-width="150" prop="awardsInfo" ></el-table-column>
          <el-table-column label="审核" min-width="150" prop="shenhe"  v-if=" status >= 6&&redactFlag">
            <template slot-scope="scope" :disabled=" status > 6">
              <el-select  @change='change(scope.row)' v-model='scope.row.selectValue'>
                <el-option label="已核" value="1"></el-option>
                <el-option label="存疑" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="118"  prop="name" >
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" class="operativeButton" @click.stop="findWorkOrder" v-if="scope.row.finishFlag==='1' || !redactFlag " >查看附件</el-button>
                <el-button type="primary" plain size="mini" class="operativeButton" @click="editForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag" >修改</el-button>
                <el-button type="primary" plain size="mini" class="operativeButton" @click="delelteForm(scope.row,scope.$index)" v-if="scope.row.finishFlag==='0' && redactFlag"  >删除</el-button>
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
    <my-dialog width="800px" class="boxCard_dialog" :height='dialogHeight + "px"' center :visible.sync="dialogFormVisibleType"  :append-to-body="true">
      <el-card shadow="never">
        <div slot="header">添加获奖信息</div>
        <el-scrollbar :style="{height: (dialogHeight - 135) + 'px'}">
          <el-form
            ref="scholar"
            :rules="rules"
            :model="form"
            label-position="left"
            label-width="130px"
            :show-message="false">
            <el-row>
              <el-col :span="11">
                <el-form-item label="相关项目" prop="awardsInfo" class="redStar">
                  <el-select v-model="form.awardsInfo" placeholder="请选择" >
                    <el-option
                      v-for="(item,index) in allData.HistoricReservation.tableData"
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
                <el-form-item label="评比单位" prop="ratingDepart" class="redStar">
                  <el-input v-model="form.ratingDepart" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="获奖年份" prop="awardsYear" class="redStar">
                  <el-date-picker
                    v-model="form.awardsYear"
                    format="yyyy 年"
                    type="year"
                    placeholder="选择年"
                    :picker-options='pickerOptions'
                    value-format="yyyy">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="获奖名称" prop="awardsName" class="redStar">
                  <el-input v-model="form.awardsName" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item ref="fileUpload" label="获奖证明文件扫描件" prop="technologyDocument" class="redStar">
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
                    <span slot="tip" class="el-upload__tip">支持扩展名：pdf/ jpg / png / bmp</span>
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
    changeTable() {
      this.editFlag=false,
      this.nowIndex='',
      this.form={ // 重置表单

      }
      this.dialogFormVisibleType = true
    },
    findWorkOrder() {},
    editForm(obj,index) { //编辑表单
      console.log(obj);
      this.nowIndex=index;
      this.form={...obj};
      this.editFlag=true,
      this.dialogFormVisibleType = true
    },
    delelteForm(obj,index) { //删除表单
      let flag=window.confirm();
      console.log(flag);
      if(flag){
        this.allData.ScholarshipPrize.tableData = this.allData.ScholarshipPrize.tableData.filter((item,index1)=>index!=index1);
      }
    },
    confirm(){
      console.log(this.form,'form')
      this.$refs['scholar'].validate(vaild=>{
        if(vaild){
          let tableData=this.allData.ScholarshipPrize.tableData
          if(this.editFlag){
            this.$set(tableData, this.nowIndex, {...this.form,finishFlag:'0'})
          }else{
            tableData.push(
              {...this.form,editFlag:true,finishFlag:'0'}
            )
          }
          this.dialogFormVisibleType = false;
        }
      })
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

