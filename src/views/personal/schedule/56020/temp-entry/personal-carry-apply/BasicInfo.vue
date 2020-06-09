<template>
  <apply-form-item data="基本信息">
    <el-form
        ref="form"
        :model="form"
        label-position="left"
        :rules="rules[ruleKey]"
        label-width="100px"
    >
      <el-row class="spilt" style="margin-top: 0">
        <el-col :span="24">
          <el-form-item label="申请事项名称" prop="itemName" class="redStar">
            <el-input v-model="form.itemName" placeholder="申请事项名称建议包含便于查询检索的关键信息"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style="margin-top: 18px">
        <el-col :span="11">
          <el-form-item label="携运人" prop="carryPerson" class="redStar">
            <el-input v-model="form.carryPerson" placeholder="请填写个人姓名或单位名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="国籍" prop="nationalityCode" class="redStar">
            <el-select v-model="form.nationalityCode" filterable placeholder="请选择" value>
              <el-option
                  v-for="item in options.nationality"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="证件类型" prop="certificateTypeCode" class="redStar">
            <el-select v-model="form.certificateTypeCode" placeholder="请选择" value>
              <el-option
                  v-for="item in options.certificateType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="证件号码" prop="certificateNum" class="redStar">
            <el-input v-model="form.certificateNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系方式" prop="telNo" class="redStar">
            <el-input v-model="form.telNo" placeholder="请准确填写手机号，以便后续联系"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="spilt">
        <el-col :span="24">
          <el-form-item label="住所" prop="address" class="redStar">
            <el-input v-model="form.address" placeholder="请准确填写个人住址或单位地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="11">
          <el-form-item label="进境目的" prop="crEntryAimCode" class="redStar">
            <el-select v-model="form.crEntryAimCode" placeholder="请选择" value>
              <el-option
                  v-for="item in options.custPurpose"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="进境时间" prop="entryDate" class="redStar">
            <el-date-picker
                v-model="form.entryDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="进境海关" prop="customs" class="redStar" style="margin-bottom: 0">
            <el-input v-model="form.customs"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="审核机构" prop="appraisalId" class="redStar" style="margin-bottom: 0">
            <el-select v-model="form.appraisalId" placeholder="请选择" value>
              <el-option
                  v-for="item in options.auditAgency"
                  :key="item.appraisalId"
                  :label="item.appraisalName"
                  :value="item.appraisalId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import {queryDictionary} from '@/api/basic'
  import {getAuditAgencyDic} from '@/api/personal/schedule/56020/temp-entry'
  import {checkMobileSave, checkIdCardNum} from '@/utils/validator'

  export default {
    components: {
      ApplyFormItem
    },
    data() {
      // 身份证号码校验
      const validateIdNum = (rule, value, callback) => {
        const certificate = this.options.certificateType.find(item => {
          return item.code === this.form.certificateTypeCode
        });
        if (
          certificate &&
          (certificate.name === '身份证' || certificate.name === '临时身份证')
        ) {
          checkIdCardNum(rule, value, callback)
        } else {
          callback()
        }
      };
      // 证件号码校验
      const validateCertificateNum = (rule, value, callback) => {
        if (this.ruleKey === 'save') {
          if (value.length === 0) {
            callback()
          } else {
            validateIdNum(rule, value, callback)
          }
        } else {
          validateIdNum(rule, value, callback)
        }
      };
      return {
        options: {
          nationality: [],
          certificateType: [],
          custPurpose: [],
          auditAgency: [] // 审核机构数据字典
        },
        // 携运人信息
        form: {
          id: null,
          itemName: '',
          carryPerson: '',
          nationalityCode: '',
          nationalityName: '',
          certificateTypeCode: '',
          certificateTypeName: '',
          certificateNum: '',
          telNo: '',
          address: '',
          crEntryAimCode: '',
          crEntryAimName: '',
          entryDate: '',
          customs: '',
          appraisalId: '',
          appraisalName: ''
        },
        // 表单校验规则的选用方案
        ruleKey: 'default',
        // 三套表单校验规则
        rules: {
          default: {},
          save: {
            itemName: [
              {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
            ],
            carryPerson: [
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            certificateNum: [
              {max: 20, message: '长度最大 20 个字符', trigger: 'blur'},
              {validator: validateCertificateNum, trigger: 'change'}
            ],
            telNo: [{validator: checkMobileSave, trigger: 'change'}],
            address: [
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            customs: [{max: 30, message: '长度最大 30 个字符', trigger: 'blur'}]
          },
          submit: {
            itemName: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
            ],
            carryPerson: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            nationalityCode: [
              {required: true, message: ' ', trigger: 'change'}
            ],
            certificateTypeCode: [
              {required: true, message: ' ', trigger: 'change'}
            ],
            certificateNum: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 20, message: '长度最大 20 个字符', trigger: 'blur'},
              {validator: validateCertificateNum, trigger: 'change'}
            ],
            telNo: [
              {required: true, message: ' ', trigger: 'blur'},
              {validator: checkMobileSave, trigger: 'blur'}
            ],
            address: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            crEntryAimCode: [{required: true, message: ' ', trigger: 'change'}],
            entryDate: [{required: true, message: ' ', trigger: 'change'}],
            customs: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 30, message: '长度最大 30 个字符', trigger: 'blur'}
            ],
            appraisalId: [{required: true, message: ' ', trigger: 'change'}]
          }
        }
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      // 初始化数据
      initData() {
        // 查询国籍信息
        queryDictionary('Country').then(
          ({data}) => (this.options.nationality = data)
        );
        // 查询证件类型
        queryDictionary('IDCardType').then(
          ({data}) => (this.options.certificateType = data)
        );
        // 文物进境目的
        queryDictionary('custPurpose').then(
          ({data}) => (this.options.custPurpose = data)
        );
        // 查询审核机构数据字典
        getAuditAgencyDic().then(({data}) => (this.options.auditAgency = data))
      },
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
                // 国籍字典项处理
                const nationality = this.options.nationality.find(item => {
                  return item.code === this.form.nationalityCode
                });
                this.form.nationalityName = nationality ? nationality.name : '';
                // 证件类型字典项处理
                const certificate = this.options.certificateType.find(item => {
                  return item.code === this.form.certificateTypeCode
                });
                this.form.certificateTypeName = certificate ? certificate.name : '';
                // 审核机构字典项处理
                const appraisal = this.options.auditAgency.find(item => {
                  return item.appraisalId === this.form.appraisalId
                });
                this.form.appraisalName = appraisal ? appraisal.appraisalName : '';
                // 进境目的字典项处理
                const crEntryAim = this.options.custPurpose.find(item => {
                  return item.code === this.form.crEntryAimCode
                });
                this.form.crEntryAimName = crEntryAim ? crEntryAim.name : '';
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
      // 设置数据
      setData(data) {
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = data[key];
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 0 18px;
  }

  .el-divider--horizontal {
    margin: 18px 0;
  }

  .el-select,
  .el-date-editor.el-input,
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }

  .spilt .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
</style>
