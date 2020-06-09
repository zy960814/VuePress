<template>
  <div class="content">
    <el-form
      ref="form"
      :rules="rules['submit']"
      :model="form"
      label-position="left"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程对象名称" prop="projectName" class="redStar">
            <el-input v-model="form.projectName" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="所在地" prop="province">
            <el-select v-model="form.province" clearable placeholder="选择省">
              <el-option
                v-for="item in provinceArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="labelZero" prop="city">
            <el-select v-model="form.city" clearable placeholder="选择市">
              <el-option
                v-for="item in cityArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="labelZero" prop="area">
            <el-select v-model="form.area" clearable placeholder="选择区">
              <el-option
                v-for="item in areaArr"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="使用管理单位" prop="managerCompany" class="redStar">
            <el-input v-model="form.managerCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="上级主管部门" prop="executiveDepartment" class="redStar">
            <el-input v-model="form.executiveDepartment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="文物保护单位名称" prop="relicCompanyName" class="redStar">
            <el-input v-model="form.relicCompanyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="单位类型" prop="companyType" class="redStar">
            <el-input v-model="form.companyType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="公布批次及编号" prop="batchNo" class="redStar">
            <el-input v-model="form.batchNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文物保护单位简介" prop="companyInstroduction" class="redStar">
            <el-input v-model="form.companyInstroduction"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="clear-float table">
        <span class="tableTitle">历次保护修缮及经费补助情况</span>
        <el-button type="primary" class="tableButton" @click="openViewDialog({},'add')">新增</el-button>
      </div>
      <my-dialog
        width="1024px"
        class="boxCard_dialog"
        :height="dialogHeight+'px'"
        :visible.sync="dialogVisible"
        append-to-body
      >
        <select-dialog :pageTabsData="pageTabsData" title="新增">
          <template #body_1>
            <el-scrollbar :style="{height: height_self}">
              <div style="margin:0 10px;">
                <project-situation
                  :height_self="height_self"
                  ref="projectSituation"
                  :projectForm="projectForm"
                />
              </div>
            </el-scrollbar>
          </template>
        </select-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </span>
      </my-dialog>
      <el-table ref="table" :data="tableData" border>
        <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="year" label="年份"></el-table-column>
        <el-table-column prop="projectSubject" label="工程对象"></el-table-column>
        <el-table-column prop="relicExplore" label="维修或考古发掘内容"></el-table-column>
        <el-table-column prop="fundsSubsidy" label="经费补助(万元)"></el-table-column>
        <el-table-column width="120" fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <table-button @button-click="openViewDialog(scope.row, 'modify')" button-name="编辑" />
            <table-button @button-click="handleDel(scope.row)" button-name="删除" />
          </template>
        </el-table-column>
      </el-table>

      <el-row style="margin-top:18px;">
        <el-col :span="24">
          <el-form-item label="工程项目内容" prop="projectContent" class="redStar">
            <el-input v-model="form.projectContent" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程立项的必要性" prop="projectNecessary" class="redStar">
            <el-input v-model="form.projectNecessary" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工程项目计划" prop="projectPlan" class="redStar">
            <el-input v-model="form.projectPlan" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工程经费总估算" prop="projectFundsEstimate" class="redStar">
            <el-input placeholder="请输入工程经费总结算" v-model="form.projectFundsEstimate">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="前期勘察设计经费" prop="surveyFunds" class="redStar">
            <el-input placeholder="请输入前期勘察设计经费" v-model="form.surveyFunds">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工程实施经费" prop="projectFunds" class="redStar">
            <el-input placeholder="请输入工程实施经费" v-model="form.projectFunds">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="附件" prop="enclosure" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '附件'}"
              :file-list="form.enclosure"
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
        <el-col :span="24">
          <el-form-item label="项目计划申报单位" prop="applyCompany" class="redStar">
            <el-input placeholder v-model="form.applyCompany"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="联系人" prop="contacts" class="redStar">
            <el-input placeholder v-model="form.contacts"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="电话" prop="telNo" class="redStar">
            <el-input placeholder v-model="form.telNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="填报时间" prop="fillInTime" class="redStar">
            <el-date-picker
              v-model="form.fillInTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import API_PREFIX from '@/api/config'
import TableButton from '@/components/commons/TableButton'
import MyDialog from '@/components/commons/MyDialog'
import ProjectSituation from './ProjectSituation'
import SelectDialog from '@/components/commons/SelectDialog'
import { checkMobileSave } from '@/utils/validator'
export default {
  name: 'DetailInformation',
  components: { TableButton, MyDialog, ProjectSituation, SelectDialog },
  props: {
    detailForm: {
      type: Object
    },
    applyType: {
      type: String
    }
  },
  data() {
    return {
      projectForm: [],
      // 切换按钮数据
      pageTabsData: {
        tabs: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      dialogVisible: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        projectName: '',
        province: '',
        city: '',
        area: '',
        managerCompany: '',
        executiveDepartment: '',
        relicCompanyName: '',
        companyType: '',
        batchNo: '',
        companyInstroduction: '',
        projectContent: '',
        projectNecessary: '',
        projectPlan: '',
        projectFundsEstimate: '',
        surveyFunds: '',
        projectFunds: '',
        enclosure: [],
        applyCompany: '',
        contacts: '',
        telNo: '',
        fillInTime: ''
      },
      tableData: [
        {
          index: 1,
          year: '公元前500年',
          projectSubject: '孤山集文化调研',
          relicExplore: '水下村落探索',
          fundsSubsidy: '10万'
        },
        {
          index: 2,
          year: '公元前500年',
          projectSubject: '孤山集文化调研',
          relicExplore: '水下村落探索',
          fundsSubsidy: '10万'
        },
        {
          index: 3,
          year: '公元前500年',
          projectSubject: '孤山集文化调研',
          relicExplore: '水下村落探索',
          fundsSubsidy: '10万'
        },
        {
          index: 4,
          year: '公元前500年',
          projectSubject: '孤山集文化调研',
          relicExplore: '水下村落探索',
          fundsSubsidy: '10万'
        },
        {
          index: 5,
          year: '公元前500年',
          projectSubject: '孤山集文化调研',
          relicExplore: '水下村落探索',
          fundsSubsidy: '10万'
        },
        {
          index: 6,
          year: '公元前500年',
          projectSubject: '孤山集文化调研',
          relicExplore: '水下村落探索',
          fundsSubsidy: '10万'
        }
      ],
      executiveDepartmentArr: [
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
      cityArr: [
        {
          value: '0',
          label: '北京市'
        },
        {
          value: '1',
          label: '天津市'
        },
        {
          value: '2',
          label: '上容市'
        },
        {
          value: '3',
          label: '瓜州市'
        },
        {
          value: '4',
          label: '飞羽市'
        }
      ],
      areaArr: [
        {
          value: '0',
          label: '西城区'
        },
        {
          value: '1',
          label: '东城区'
        },
        {
          value: '2',
          label: '顺义区'
        },
        {
          value: '3',
          label: '昌平区'
        },
        {
          value: '4',
          label: '朝阳区'
        }
      ],

      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        submit: {
          projectName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          managerCompany: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          executiveDepartment: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          relicCompanyName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          companyType: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 10, message: '长度最大 10 个字符', trigger: 'blur' }
          ],
          batchNo: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          companyInstroduction: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectContent: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectNecessary: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectPlan: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectFundsEstimate: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          surveyFunds: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          projectFunds: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          // enclosure: [{ required: true, message: ' ', trigger: 'blur' }],
          applyCompany: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          contacts: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 60, message: '长度最大 60 个字符', trigger: 'blur' }
          ],
          telNo: [
            { required: true, message: ' ', trigger: 'blur' },
            { validator: checkMobileSave, trigger: 'change' }
          ],
          fillInTime: [
            {
              required: true,
              message: ' ',
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  created() {
    this.form = this.detailForm
  },
  watch: {
    detailForm: function(val) {
      this.form = val
    }
  },
  computed: {
    height_self() {
      return this.$store.getters.screenHeight > 1200
        ? `1067 px`
        : `${this.$store.getters.screenHeight - 133}px`
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    }
  },
  methods: {
    openViewDialog(val, type) {
      console.log(type)
      this.dialogVisible = true
      this.projectForm = val
    },
    handleDel(val) {
      this.tableData.splice(
        this.tableData.findIndex(item => {
          return item.index === val.index
        }),
        1
      )
    },
    //  选择按钮弹框确认
    confirm() {
      Promise.resolve(this.$refs.projectSituation.getFormData()).then(val => {
        this.dialogVisible = false
        this.tableData.push(val)
        this.$set(val, 'index', this.tableData.length)
      })
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
           x.onreadystateblur = function () {
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
    },
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getFormData() {
      this.$refs['form'].clearValidate()
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
.table {
  vertical-align: middle;
  margin-bottom: 5px;
  .tableTitle {
    float: left;
    color: $--color-primary;
    font-size: 14px;
    font-weight: 700;
  }
  .tableButton {
    float: right;
  }
}
</style>
