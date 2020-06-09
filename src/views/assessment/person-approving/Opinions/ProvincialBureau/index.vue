<template>
	<div  class="content">
    <vertical-table
        style="width:100%;"
        :verticalTableData="allData.ProvincialBureau.form"
        :verticalTableTitle="thingVerticalTableTitle"
        width="150px">
        <template v-for="(item,k) in statusbuttonblotname">
          <img :src="item.src" :key='k' :slot="item.title"/>
        </template>
      </vertical-table>
      <!-- <div>备注 {{allData.ProvincialBureau.form.remark}}</div> -->
	</div>
</template>
<script>
// import PictureUpload from "@/components/commons/PictureUpload"
import VerticalTable from '@/components/commons/VerticalTable'
export default {
  components: {
    // PictureUpload
    VerticalTable
  },
  props:{
    status:{
      type:Number,
    },
    allData:{
      type:Object,
    },
  },
  watch:{
    status(curVal){
      if(curVal){
        this.status=curVal
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
       thingVerticalTableTitle: [
        { opinionContent: '省局意见' },
        { isIllegal: '是否有违法或安全质量事故信息' },
        { economicType: '违法或安全质量事故信息' },
        { technologyDocument: '相关记录文件扫描件' },
        { economicPeople: ' 省局联系人',economicPeoplePhone:'联系电话'},
        { technologyDocument1:'附件'},
        { remark: '备注'}
      ],
      statusbuttonblotname:[ 
        {title:'line_30',src:'111'},
        {title:'line_50',src:'111'},
      ]
		}
  },
  methods: {
      // 表单校验
		validataForm() { // 表单校验
			let flag=false;
			this.$refs["form"].validate(valid => {
				if (valid) {
				
					flag=true;
				}
			});
			return flag
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
}
</script>

<style  lang="scss" scoped>
  .pr5 {
      margin-left: 16.7px;
  }
  /deep/.el-form-item__label {
    white-space: break-spaces;
  }
</style>

