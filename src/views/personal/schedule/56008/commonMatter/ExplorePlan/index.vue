<template>
  <apply-form-item data="发掘计划及有关情况">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="发掘类别" prop="exploreType" class="redStar">
            <el-input v-model="form.exploreType" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发掘目的及工作方案" prop="workPlan" class="redStar">
            <el-input type="textarea" :rows="3" placeholder="描述不超过2000个汉字" v-model="form.workPlan"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="工作方案或批文" prop="workPlanAndApproval" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '附图'}"
              :file-list="form.workPlanAndApproval"
              :multiple="false"
              :limit="1"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'workPlanAndApproval')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'workPlanAndApproval')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发掘时间" prop="exploreTime" class="redStar">
            <div style="display:flex;justify-content: flex-between;">
              <el-date-picker
                v-model="form.exploreTime"
                type="datetimerange"
                :picker-options="pickerOptionsDate"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="flex:4;margin-right:10px;"
              ></el-date-picker>
              <span style="flex:2">共计 xx 月</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="发掘面积" prop="exploreArea" class="redStar">
            <div style="display:flex;justify-content: flex-between;">
              <el-input v-model="form.exploreArea" placeholder style="flex:8"></el-input>
              <span style="flex:2;margin-left:8px;">平方米</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="墓葬" prop="burial" class="redStar">
            <div style="display:flex;justify-content: flex-between;">
              <el-input v-model="form.burial" placeholder style="flex:10"></el-input>
              <span style="flex:1;margin-left:8px;">度</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div style="display:flex;justify-content: flex-start;">
          <el-form-item label="经费来源" prop="fundsOrigin" class="redStar" style="flex:3">
            <el-input v-model="form.fundsOrigin" placeholder></el-input>
          </el-form-item>
          <el-form-item label prop="fundsOriginOther" class="redStar" style="flex:7">
            <el-input v-model="form.fundsOriginOther" placeholder></el-input>
          </el-form-item>
        </div>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="经费金额（总计）" prop="funds" class="redStar">
            <el-input placeholder="可精确到小数点后四位" v-model="form.funds">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保护技术准备情况" prop="planSituation" style="margin-bottom:0px;">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.planSituation"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import { checkMoneyWanSave, checkMoneyWanSubmit } from '@/utils/validator'
import API_PREFIX from '@/api/config'
export default {
  name: 'ExploreInformation',
  components: {
    ApplyFormItem
  },
  props: {},
  data() {
    return {
      pickerOptionsDate: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      form: {
        exploreType: '',
        workPlan: '',
        workPlanAndApproval: [],
        exploreTime: '',
        exploreArea: '',
        burial: '',
        fundsOrigin: '',
        fundsOriginOther: '',
        funds: '',
        planSituation: ''
      },
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          exploreType: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          workPlan: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          workPlanAndApproval: [],
          exploreTime: [],
          exploreArea: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          burial: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          fundsOrigin: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          fundsOriginOther: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          funds: [{ validator: checkMoneyWanSave, trigger: 'change' }]
        },

        submit: {
          exploreType: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          workPlan: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          workPlanAndApproval: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          exploreTime: [
            {
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          exploreArea: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          burial: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          fundsOrigin: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          fundsOriginOther: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          funds: [{ validator: checkMoneyWanSubmit, trigger: 'change' }]
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log('文件预览，下载', file)

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
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getFormData(type) {
      this.$refs['form'].clearValidate()
      this.ruleKey = type
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              resolve({ ...this.form })
            } else {
              reject()
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding: 0px 20px !important;
}
.radios {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
