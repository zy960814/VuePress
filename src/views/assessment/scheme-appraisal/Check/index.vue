<template>
 <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">全国重点文物保护单位原址保护措施审批申请</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertR_one>
          <el-button @click="saveOrSubmit('save')" type="primary">保存</el-button>
          <el-button @click="saveOrSubmit('submit')" type="primary">提交</el-button>
          <el-button @click="$router.go(-1)" >返回</el-button>
        </template>
        
        <template #body>
          <div class="scrollBox" :style="{height: contentHeight}">
            <apply-form-item data="评审意见" class="hxl_item " >
              <EvaOpinionCard :cardList='cardList'></EvaOpinionCard>
            </apply-form-item>
            <ReviewParticipate  ref="reviewParticipate" :name='allChildNname[applyCode]'>
             <div slot="reviewContent">
                 <el-form>
                    <el-form-item ref="fileUpload" label-width="70PX" label="意见" prop="technologyDocument" class="redStar">
                        <el-upload
                          :action="fileUploadUrl"
                          :on-preview="handlePreview"
                          :before-remove="beforeRemove"
                          :data="{fieldCode: 'BAWJ', fieldName: '意见'}"
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
                    <el-form-item label-width="70PX" label="评审结论">
                        <el-select  v-model="form.psjl">
                          <el-option value='1'>通过 </el-option>
                          <el-option value='0'>不通过 </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="70PX" label="备注">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                 </el-form>
             </div>
            </ReviewParticipate>
          </div>
        </template>
      </apply-form>
    </el-card>
  </div>
</template>
<script>
import ApplyForm from '@/components/commons/ApplyForm'
import EvaOpinionCard from "@/views/commons/AdminApproval/EvaluationOpinions/EvaOpinionCard";
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
// import ConfirmMessage from '@/components/business/ConfirmMessage_04051012'
import ReviewParticipate from '@/components/business/Expert/reviewParticipate'
import API_PREFIX from '@/api/config'
// import ConfirmMessage from './ConfirmMessage'
//  申请表组件
// 专家意见评审组件  
// 父传子组件 
export default {
  components: {
    ApplyForm,
    ApplyFormItem,
    EvaOpinionCard,
    // ConfirmMessage,
    ReviewParticipate,
    
  },
  props: {},
  data() {
    return {
      applyCode:'',
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      titleData: ['材料信息', '评审意见'],
      form:{
        remark:'',
        psjl:'',
        technologyDocument:[]
      },
       allChildNname:{
        '56004':"原址保护措施专家评审意见表",
        '56005':'保护范围涉建专家评审意见表',
        '56008-a':'考古工作计划专家评审意见表',
        '56008-b':'考古一般事项专家评审意见表',
        '56009':'考古工作计划专家评审意见表',
        '56010':'省保单位迁拆专家评审意见表',
        '56012':'建控地带涉建专家评审意见表',
        '56013':'文物境外鉴定专家评审意见表',
        '56014-a':'抢救工程方案专家评审意见表',
        '56014-b':'自筹资金方案专家评审意见表',
        '56014-c':'方案审批专家评审意见表',
        '56014-3-a':'方案审批专家评审意见表',
        '56022-a':'保护规划方案专家评审意见表',
        '56014-d':'方案审批专家评审意见表',
        '56022-b':'保护规划方案专家评审意见表',
        '56014-3-b':'方案审批专家评审意见表',
        '56011-a':'文保资质申请专家评审意见表',
        '56011-b':'文物保护工程方案专家评审意见表',
        '56015-a':'馆藏一级文物修复申请专家评审意见表',
        '56015-b':'馆藏一级文物复制申请专家评审意见表',
        '56015-c':'馆藏一级文物拓印申请专家评审意见表',
        '56016':'中国博物馆展览协会交流专业委员会专家函审意见表',
        '56019':'原址保护措施专家评审意见表',
        'safety':'考古一般事项专家评审意见表',
        'fixplan':'原址保护措施专家评审意见表',
      },
      parmas:{},
      cardList:[
         {
          expertType: '专家姓名',
          expert: '张磊',
          result: '通过',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 1,
          flagButtonTwo: 1
        },
        {
          expertType: '专家姓名',
          expert: '张磊',
          result: '待评审',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 2,
          flagButtonTwo: 2
        },
        {
          expertType: '专家姓名',
          expert: '张磊',
          result: '拒绝评审',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 1,
          flagButtonTwo: 0
        },
      ],
    }
  },
  methods: {
    saveOrSubmit(value) {
      if(value=='submit'){
        console.log('submit');
        let flag=this.$refs[this.applyCode].validateForm();
        if(flag){
           this.parmas.a=this.$refs[this.applyCode].getMyFormData();
          // 调接口
        }
      }else if(value=='save'){
        console.log('save');
        this.parmas.a=this.$refs[this.applyCode].getMyFormData();
        // 调接口
      }
    },
   // 锚点点击事件
    itemClick(tab) {
      console.log(+tab.index);
      let nodes = document.querySelectorAll('.hxl_item');
      console.log(nodes[0].offsetTop);
      document.querySelector('.scrollBox').scrollTop =
        nodes[+tab.index].offsetTop - nodes[0].offsetTop
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
    contentHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 235 : 279) +
        'px)'
      )
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 815
        ? 815
        : this.$store.getters.screenHeight
    }
  },
  beforeMount(){
    this.applyCode=this.$route.query.applyCode
  },
  mounted() {
    // todo 获取url参数
    // let applyCode = '56004' 
    // let applyId 

  },
}
</script>

<style  lang="scss" scoped>
  /deep/ .el-form-item__label {
    white-space: normal !important;
    line-height: 15px;
  }
  /deep/ .el-card__body {
    // padding: 12px;
    padding-top: 0px;
  }
</style>

