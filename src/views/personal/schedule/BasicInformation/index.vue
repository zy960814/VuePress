<template>
  <apply-form-item data="基本信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <nationalsecurity-dialog
        ref="nationalsecurityDialog"
        :noTabs="true"
        :nationalSecurityNameStr="'全国重点文物保护单位'"
        v-if="applyType=='56004'"
        :heightSelectCut="174"
      />
      <nationalsecurity-dialog
        ref="nationalsecurityDialog"
        :nationalSecurityNameStr="'全国重点文物保护单位'"
        v-if="applyType=='56005'"
        applyType="56005"
      />
      <nationalsecurity-dialog
        ref="nationalsecurityDialog"
        :noTabs="true"
        :nationalSecurityNameStr="'全国重点文物保护单位'"
        v-if="applyType=='56012'"
      />
      <nationalsecurity-ten ref="nationalsecurityDialog" v-if="applyType=='56010'" />
      <nationalsecurity-dialog
        ref="nationalsecurityDialog"
        :noTabs="true"
        :nationalSecurityNameStr="'全国重点文物保护单位'"
        v-if="applyType=='n_approvalplan'||applyType=='56014_a'|| applyType==='p_approvalplan'|| applyType==='financing'|| applyType==='p_protectPlan'||applyType==='p_protectPlan'|| applyType==='rescue'||applyType==='n_reportCRB'||applyType==='p_reportCRB'||applyType==='n_protectPlan'"
        :heightSelectCut="174"
      />
      <el-row
        v-if="applyType==='56004'|| applyType==='56005'|| applyType==='56010'|| applyType==='56012'
        || applyType==='n_approvalplan'||applyType=='56014_a'|| applyType==='p_approvalplan'
        || applyType==='financing'|| applyType==='p_protectPlan'|| applyType==='rescue'||applyType==='n_reportCRB'
        ||applyType==='p_reportCRB'||applyType==='n_protectPlan'"
      >
        <el-col :span="11">
          <el-form-item
            label="是否是革命文物"
            prop="isRevolutionRelic"
            class="redStar"
            :class="{zeroMargin:zeroFlag}"
          >
            <el-radio v-model="form.isRevolutionRelic" label="1">是</el-radio>
            <el-radio v-model="form.isRevolutionRelic" label="2">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="applyType=='56004'|| applyType==='56005'|| applyType==='56012'
        || applyType==='n_approvalplan'||applyType=='56014_a'|| applyType==='p_approvalplan'|| applyType==='financing'
        || applyType==='rescue'||applyType==='n_reportCRB'||applyType==='p_reportCRB'||applyType==='n_protectPlan'"
      >
        <el-col :span="11">
          <el-form-item
            label="是否是世界遗产"
            prop="worldHeritage"
            class="redStar"
            style="margin-bottom:0px;"
          >
            <el-radio v-model="form.worldHeritage" label="1">是</el-radio>
            <el-radio v-model="form.worldHeritage" label="2">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="showApplyTitle">
        <el-row class="spilt">
          <el-col :span="11">
            <el-form-item label="申报类型" prop="applyType_56014_part1" class="redStar">
              <el-input v-model="form.applyType_56014_part1" placeholder disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" v-if="applyType==='56014_a'||applyType==='56014_b'">
            <el-form-item label prop="applyType_56014_part2" class="redStar">
              <el-select v-model="form.applyType_56014_part2" clearable placeholder>
                <el-option
                  v-for="item in applyTypeArr_56014"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-divider v-if="showDivider"></el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item label="申请文件标题" prop="applyDocumentTitle" class="redStar">
            <el-input v-model="form.applyDocumentTitle" placeholder="建议包含项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请文号" prop="applyDocumentNum_part1" class="redStar">
                <el-input v-model="form.applyDocumentNum_part1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="labelZero" prop="applyDocumentNum_part2">
                <div class="inpuWidthBox">
                  <span style="line-height:32px;margin-left:5px">〔</span>
                  <el-date-picker
                    class="inpuWidth"
                    format="yyyy"
                    value-format="yyyy"
                    v-model="form.applyDocumentNum_part2"
                    type="year"
                    placeholder="选择年"
                  ></el-date-picker>
                  <span style="line-height:32px">〕</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="labelZero" prop="applyDocumentNum_part3">
                <ul>
                  <li class="fl">
                    <el-input v-model="form.applyDocumentNum_part3"></el-input>
                  </li>
                  <li class="fl" style="line-height:32px;">号</li>
                </ul>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="申请文件" prop="applyDocument" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '申请文件'}"
              :file-list="form.applyDocument"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'applyDocument')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'applyDocument')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="font-size:12px">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="报送单位" prop="applyPerson" class="redStar">
            <el-input v-model="form.applyPerson" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="经办人" prop="handlePerson" class="redStar">
            <el-select v-model="form.handlePerson" clearable placeholder="请填写经办人的个人姓名">
              <el-option
                v-for="item in handlePersonArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.handlePerson" placeholder="请填写经办人的个人姓名"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系方式" prop="telNo" class="redStar" style="margin-bottom:0px;">
            <el-input v-model="form.telNo" placeholder="请填写经办人的联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import API_PREFIX from '@/api/config'
import NationalsecurityDialog from '@/components/business/NationalsecurityDialog'
import NationalsecurityTen from '@/components/business/Nationalsecurity10'
import {
  checkMobileSave,
  checkMobileSubmit,
  checkFiveNumSave,
  checkFiveNumSubmit
} from '@/utils/validator'
export default {
  name: 'BasicInformation',
  components: {
    ApplyFormItem,
    NationalsecurityDialog,
    NationalsecurityTen
  },
  props: {
    applyType: {
      type: String
    }
  },
  data() {
    return {
      zeroFlag: false,
      // 是否展示基本信息里的分割线
      showDivider: true,
      // 是否展示申报类型行
      showApplyTitle: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        isRevolutionRelic: '2',
        worldHeritage: '2',
        applyType_56014_part1: '',
        applyType_56014_part2: '',
        applyPerson: '岱宗夫',
        handlePerson: '谢云流',
        telNo: '',
        applyDocumentNo: '',
        applyDocumentNum_part1: '',
        applyDocumentNum_part2: '',
        applyDocumentNum_part3: '',
        applyDocumentTitle: '',
        applyDocument: []
      },
      handlePersonArr: [
        {
          value: '0',
          label: '谢云流'
        },
        {
          value: '1',
          label: '李重茂'
        },
        {
          value: '2',
          label: '叶英'
        },
        {
          value: '3',
          label: '曲云'
        },
        {
          value: '4',
          label: '莫雨'
        }
      ],
      provinceArr: [
        {
          value: '0',
          label: '安徽'
        },
        {
          value: '1',
          label: '西藏'
        },
        {
          value: '2',
          label: '云南'
        },
        {
          value: '3',
          label: '广州'
        },
        {
          value: '4',
          label: '新疆'
        }
      ],
      // 56014_a申报类型下拉框
      applyTypeArr_56014_a: [
        {
          value: '0',
          label: '项目计划（立项）已获批（国家文物局审批事项）'
        },
        {
          value: '1',
          label: '项目计划（立项）已获批（省级文物局审批事项）'
        },
        {
          value: '2',
          label: '不申请中央财政补贴资金'
        },
        {
          value: '3',
          label: '抢救性工程'
        }
      ],
      // 56014_b申报类型下拉框
      applyTypeArr_56014_b: [
        {
          value: '0',
          label: '国家文物局审批事项'
        },
        {
          value: '1',
          label: '省级文物局审批事项'
        }
      ],
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          applyType_56014_part1: [
            // { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          applyType_56014_part2: [
            // { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ],
          applyPerson: [
            // { required: true, message: ' ', trigger: 'change' },
            // { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          handlePerson: [
            // { required: true, message: ' ', trigger: 'change' },
            // { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          telNo: [
            { validator: checkMobileSave, trigger: 'change' }
            // { required: true, message: ' ', trigger: 'change' },
            // { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          applyDocumentNum_part1: [
            // { required: true, message: ' ', trigger: 'change' },
            { max: 10, message: '长度最大 10 个字符', trigger: 'change' }
          ],
          applyDocumentNum_part2: [
            // {
            //   required: true,
            //   message: '请选择日期',
            //   trigger: 'change'
            // }
          ],
          applyDocumentNum_part3: [
            { validator: checkFiveNumSave, trigger: 'change' }
            // { required: true, message: ' ', trigger: 'change' },
            // { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          applyDocumentTitle: [
            // { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
          // applyDocument: [
          //   { required: true, message: '请上传备案文件', trigger: 'change' }
          // ]
        },
        submit: {
          isRevolutionRelic: [
            {
              required: true,
              message: '请选择是否是革命文物',
              trigger: 'change'
            }
          ],
          worldHeritage: [
            {
              required: true,
              message: '请选择是否是世界遗产',
              trigger: 'change'
            }
          ],
          applyType_56014_part1: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'change' }
          ],
          applyType_56014_part2: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 100, message: '长度最大 100 个字符', trigger: 'change' }
          ],
          applyPerson: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          handlePerson: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          telNo: [
            { validator: checkMobileSubmit, trigger: 'change' },
            { required: true, message: ' ', trigger: 'change' }
            // { max: 60, message: '长度最大 60 个字符', trigger: 'change' }
          ],
          applyDocumentNum_part1: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 10, message: '长度最大 10 个字符', trigger: 'change' }
          ],
          applyDocumentNum_part2: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ],
          applyDocumentNum_part3: [
            { validator: checkFiveNumSubmit, trigger: 'change' },
            { required: true, message: ' ', trigger: 'change' }
          ],
          applyDocumentTitle: [
            { required: true, message: ' ', trigger: 'change' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'change' }
          ]
          // applyDocument: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ]
        }
      }
    }
  },
  mounted() {
    console.log(this.form)
  },
  watch: {
    // 申报类型输入框文字
    applyType: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        if (newValue === '56006') {
          this.showDivider = false
        } else if (newValue === '56013') {
          this.showDivider = false
        } else if (newValue === '56009') {
          this.showDivider = false
        } else if (newValue === '56010') {
          this.zeroFlag = true
        } else if (newValue === 'majorMatter') {
          this.showApplyTitle = true
          this.form.applyType_56014_part1 = '重大事项：考古工作方案或规划'
        } else if (newValue === '56014_a') {
          this.showApplyTitle = true
          this.form.applyType_56014_part1 = '全国重点文物保护单位修缮项目审批'
        } else if (newValue === '56014_b') {
          this.showApplyTitle = true
          this.form.applyType_56014_part1 =
            '全国重点文物保护单位安全防护工程项目审批'
        } else if (newValue === 'n_protectPlan') {
          this.showApplyTitle = true
          this.form.applyType_56014_part1 = '国家文物局审批事项'
        } else if (newValue === 'p_protectPlan') {
          this.showApplyTitle = true
          this.form.applyType_56014_part1 = '省级文物局审批事项'
        } else {
          this.showApplyTitle = false
          this.form.applyType_56014_part1 = ''
        }
      },
      immediate: true
    }
  },
  computed: {
    applyTypeArr_56014() {
      let arr = []
      if (this.applyType === '56014_a') {
        arr = this.applyTypeArr_56014_a
      } else if (this.applyType === '56014_a') {
        arr = this.applyTypeArr_56014_b
      }
      return arr
    }
  },
  methods: {
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
.zeroMargin {
  margin-bottom: 0;
}
.labelZero {
  /deep/.el-form-item__content {
    margin-left: 0px !important;
  }
}
.el-divider--horizontal {
  margin: 18px 0;
}
.inpuWidthBox {
  width: 100%;
}
.inpuWidth {
  width: calc(100% - 40px) !important;
}
</style>
