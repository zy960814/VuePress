<template>
  <apply-form-item data="附件信息">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
      validate-on-rule-change
    >
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="演示文件" prop="showDocument" class="redStar">
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '演示文件'}"
              :file-list="form.showDocument"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'showDocument')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'showDocument')}"
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
          <el-form-item
            ref="fileUpload"
            label="计划清单"
            prop="planList"
            class="redStar"
            style="margin-bottom:0;"
          >
            <el-upload
              :action="fileUploadUrl"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :data="{fieldCode: 'BAWJ', fieldName: '计划清单'}"
              :file-list="form.planList"
              :multiple="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'planList')}"
              :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'planList')}"
              :on-error="fileUploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="padding: 0 0px">
        <div style="margin-bottom:5px;" class="clear-float">
          <div style="float:right;">
            <el-tooltip effect="dark" content="请先填写申请事项名称并保存" placement="top-start">
              <span style="margin-right: 10px">
                <el-button type="primary" @click="openViewDialog({},'add')">新增</el-button>
              </span>
            </el-tooltip>
          </div>
          <!-- 提交弹框 -->
          <my-dialog
            width="1024px"
            class="boxCard_dialog"
            :height="dialogHeight+'px'"
            :visible.sync="dialogVisible"
          >
            <select-dialog :pageTabsData="pageTabsData" title="详细信息">
              <template #body_1>
                <el-scrollbar :style="{height: height_self}">
                  <div style="margin:0 10px;">
                    <detail-information
                      :height_self="height_self"
                      ref="detailInformation"
                      :detailForm="detailForm"
                    />
                  </div>
                </el-scrollbar>
              </template>
            </select-dialog>

            <!-- <confirm-message
              :key="Math.random()"
              :height="dialogHeight-138+'px'"
              :applyFormData="applyFormData"
            />-->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirm">确定</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </span>
          </my-dialog>
        </div>
        <el-table ref="table" :data="tableData" border>
          <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
          <el-table-column prop="companyType" label="单位类型"></el-table-column>
          <el-table-column prop="projectName" label="工程对象名称"></el-table-column>
          <el-table-column prop="relicCompanyName" label="文物保护单位名称"></el-table-column>
          <el-table-column width="120" fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <table-button @button-click="openViewDialog(scope.row, 'modify')" button-name="编辑" />
              <table-button @button-click="handleDel(scope.row)" button-name="删除" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="queryParams.pagination.currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import API_PREFIX from '@/api/config'
import TableButton from '@/components/commons/TableButton'
import MyDialog from '@/components/commons/MyDialog'
import DetailInformation from './DetailInformation'
import SelectDialog from '@/components/commons/SelectDialog'

export default {
  name: 'ApplyMaterial',
  components: {
    TableButton,
    ApplyFormItem,
    MyDialog,
    DetailInformation,
    SelectDialog
  },

  data() {
    return {
      detailForm: [],
      heightSelfCut: 173,
      // 切换按钮数据
      pageTabsData: {
        tabs: []
      },
      dialogVisible: false,
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 携运人信息
      form: {
        showDocument: [],
        planList: []
      },
      totalCount: 0,
      queryParams: {
        pagination: {
          currentPage: 1,
          pageSize: 5
        },
        keyword: ''
      },
      tableData: [
        {
          index: 1,
          companyType: '文物保护类',
          projectName: '瞿塘峡岩棺保护工程',
          relicCompanyName: '佑宝斋'
        },
        {
          index: 2,
          companyType: '文物保护类',
          projectName: '瞿塘峡岩棺保护工程',
          relicCompanyName: '佑宝斋'
        },
        {
          index: 3,
          companyType: '文物保护类',
          projectName: '瞿塘峡岩棺保护工程',
          relicCompanyName: '佑宝斋'
        },
        {
          index: 4,
          companyType: '文物保护类',
          projectName: '瞿塘峡岩棺保护工程',
          relicCompanyName: '佑宝斋'
        },
        {
          index: 5,
          companyType: '文物保护类',
          projectName: '瞿塘峡岩棺保护工程',
          relicCompanyName: '佑宝斋'
        }
      ],
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {},
        submit: {
          // showDocument: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ],
          // planList: [
          //   { required: true, message: '请上传申请文件', trigger: 'change' }
          // ]
        }
      }
    }
  },
  mounted() {},
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
      console.log(val)
      console.log(type)
      this.dialogVisible = true
      this.detailForm = val
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
      Promise.resolve(this.$refs.detailInformation.getFormData()).then(val => {
        this.dialogVisible = false
        console.log(val)

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
.cr-info {
  .row_1 {
    margin-bottom: 6px;
  }
}
</style>
