<template>
  <apply-form-item data="展览信息">
    <el-form
        ref="form"
        :rules="rules[ruleKey]"
        :model="form"
        label-position="left"
        label-width="100px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="展览名称" prop="exhibitionName" class="redStar">
            <div style="display: flex">
              <el-input v-model="form.exhibitionName" :disabled="formDisabled" style="flex: 1"></el-input>
              <el-tooltip
                  :disabled="selectBtnEnabled"
                  effect="dark"
                  content="请先填写申请事项名称并保存"
                  placement="top-end"
              >
                <span style="margin-left: 10px">
                  <el-button :disabled="!selectBtnEnabled" type="primary" @click="selectExInfo">选择</el-button>
                </span>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="展览时间">
            <el-date-picker
                v-model="form.pickerTime"
                type="daterange"
                align="left"
                unlink-panels
                :disabled="formDisabled"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="申报单位">
            <el-input v-model="form.declarationUnit" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="主管单位">
            <el-input v-model="form.msgUnit" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="承办单位">
            <el-input v-model="form.organizer" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="负责人">
            <el-input v-model="form.operator" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="境外机构">
            <el-input v-model="form.overseasUnit" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="展览地点">
            <el-input v-model="form.exhibitionVenue" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="展品来源地">
            <el-input v-model="form.relicsOrigin" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备案文号">
            <el-input v-model="form.recordNumber" :disabled="formDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item ref="fileUpload" label="备案文件" style="margin-bottom: 0">
            <el-upload
                action
                :with-credentials="true"
                :on-preview="handlePreview"
                :file-list="form.docType"
                :multiple="false"
                :limit="1"
                :disabled="formDisabled"
            >
              <el-button size="small" :disabled="formDisabled" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 选择展览信息对话框 -->
    <my-dialog
        width="844px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible"
    >
      <select-exhibition-dialog
          ref="selectExhibition"
          :content-height="dialogHeight"
          :key="dialogKey"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmExInfo">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import API_PREFIX from '@/api/config'
  import MyDialog from '@/components/commons/MyDialog'
  import SelectExhibitionDialog from './SelectExhibitionDialog'
  import {getApplyBeDetail} from '@/api/appraisal/temp-entry'
  import {getAncestorAttr} from '@/utils/common'
  import {saveAgainCexhibitionAll} from '@/api/personal/schedule/56020/repeat-exit'

  export default {
    components: {
      ApplyFormItem,
      MyDialog,
      SelectExhibitionDialog
    },
    data() {
      return {
        formDisabled: true,
        // 展览信息
        form: {
          pickerTime: null,
          id: null,
          itemId: '',
          exhibitionName: '',
          termStart: '',
          termEnd: '',
          declarationUnit: '',
          msgUnit: '',
          organizer: '',
          operator: '',
          overseasUnit: '',
          exhibitionVenue: '',
          relicsOrigin: '',
          recordNumber: '',
          docType: []
        },
        // 表单校验规则的选用方案
        ruleKey: 'default',
        // 三套表单校验规则
        rules: {
          default: {},
          save: {},
          submit: {
            exhibitionName: [{required: true, message: ' ', trigger: 'blur'}]
          }
        },
        dialogKey: 0,
        dialogVisible: false,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: null,
          condition: {
            itemId: '',
            isExhibition: '1'
          }
        }
      }
    },
    computed: {
      // 选择按钮是否可以点击
      selectBtnEnabled: function () {
        return this.$store.state._20.tempEntryItemId != null
        // return true;
      },
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 904 ? 904 : this.$store.getters.screenHeight
      }
    },
    methods: {
      /**
       * 表单校验并获取数据, 提供给父组件使用
       * @param type: [save, submit]
       */
      getData(type) {
        this.$refs['form'].clearValidate();
        this.ruleKey = type;
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.$refs['form'].validate(valid => {
              if (valid) {
                this.form.termStart = this.form.pickerTime ? this.form.pickerTime[0] : '';
                this.form.termEnd = this.form.pickerTime ? this.form.pickerTime[1] : '';
                resolve({...this.form})
              } else {
                reject()
              }
            })
          })
        })
      },
      // 数据保存成功, 设置 id
      setId(id) {
        this.form.id = id
      },
      // 选择展览信息
      selectExInfo() {
        this.dialogVisible = true
      },
      // 确认展览信息
      confirmExInfo() {
        this.$refs.selectExhibition.getData().then(val => {
          this.dialogVisible = false;
          getApplyBeDetail({
            itemId: val.id
          }).then(({data}) => {
            // 处理文件回显
            if (data.docType) {
              for (let i = 0; i < data.docType.length; i++) {
                data.docType[i].name = data.docType[i].fileName
              }
            }
            for (const key in this.form) {
              if (this.form.hasOwnProperty(key) && key !== 'id') {  // 此处ID无需赋值
                this.form[key] = data[key]
              }
            }
            // 处理时间
            this.form.pickerTime = [data.termStart, data.termEnd];
            // 保存事项信息
            saveAgainCexhibitionAll({
              itemId: this.$store.state._20.tempEntryItemId,
              tempId: val.id
            }).then(() => {
              // 设置关联的临时进境事项 ID
              getAncestorAttr(this, 'x_setItemId')(val.id);
            })
          })
        })
      },
      // 文件列表点击事件
      handlePreview(file) {
        window.open(API_PREFIX.FILE_SERVICE + file.url)
      },
      // 设置数据
      setData(data) {
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = data[key]
          }
        }
        this.form.pickerTime = [data.termStart, data.termEnd]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 0 18px;
  }

  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }

  /deep/ .el-upload__tip {
    margin-left: 10px;
    font-size: 14px;
  }

  /deep/ .el-dialog__body {
    padding: 10px 20px 0;
  }
</style>
