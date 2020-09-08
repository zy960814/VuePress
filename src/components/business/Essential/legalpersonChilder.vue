<template>
  <div class="form">
    <el-form ref="form" :model="form" label-position="left" :rules="rules" label-width="100px">
      <el-row style="margin-top: 18px">
        <el-col :span="11">
          <el-form-item label="用户账户" prop="applyItemName" class="redStar">
            <el-input v-model="form.applyItemName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位名称" prop="nationalSecurityName" class="redStar">
            <el-input v-model="form.nationalSecurityName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="统一社会信用代码" prop="province" class="redStar">
            <el-input v-model="form.province"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="所属地区" prop="projectName1" class="redStar">
            <el-col :span="11">
              <el-select v-model="form.projectName" placeholder="请选择活动区域">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-select v-model="form.addRes" placeholder="请选择活动区域">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="7" class="pr5">
                            <el-select v-model="form.addRes" placeholder="请选择活动区域">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
            </el-col>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="单位地址" prop="designPerson">
            <el-input v-model="form.designPerson"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="经济性质" prop="economicNature">
            <el-input v-model="form.economicNature"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="主管部门" prop="memberClass">
            <el-input v-model="form.memberClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item ref="fileUpload" label="营业执照" prop="applyDocument1" class="redStar">
            <h4 class="formText">提示：企业法人营业执照副本复印件(或事业单位主管机关颁发的单位法人证书或文件的复印件) 支持扩展名：.jpg .png .bmp</h4>
            <picture-upload
              ref="imgUpload"
              v-model="form.applyDocument1"
              :action="fileUploadUrl"
              :type="20"
              class="picuter"
              list-type="picture-card"
              :max-file-size="2"
              :limit="6"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="11">
          <el-form-item label="法定代表人" prop="projectSituationIntroduction" class="redStar">
            <el-input v-model="form.projectSituationIntroduction"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="证件号码" prop="number" class="redStar">
            <el-row>
              <el-col :span="7">
                <el-select v-model="form.certificateTypeCode" placeholder="证件类型" @change="search">
                  <el-option
                    v-for="item in certificateTypeCode"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="16" :offset="1">
                <el-input v-model="form.number"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="isCertificateTypeCode">
        <el-col :span="16">
          <el-form-item label="身份证有效期" prop="passDate" class="redStar">
            <el-row>
              <el-col :span="20">
                <el-row>
                  <el-col :span="10">
                    <el-date-picker
                      v-model="form.passDate1"
                      :picker-options="pickerOptionsStart"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="2">
                    <span>至</span>
                  </el-col>
                  <el-col :span="10">
                    <el-date-picker
                      v-if="this.form.permanent == true"
                      disabled
                      v-model="form.passDate2"
                      :picker-options="pickerOptionsEnd"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <el-date-picker
                      v-if="this.form.permanent == false"
                      :picker-options="pickerOptionsEnd"
                      v-model="form.passDate2"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-checkbox v-model="form.permanent" @change="checkBox" class="checkBox">
                  <p>永久</p>
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item ref="fileUpload" label="证件扫描件" prop="compilationBasis1" class="redStar">
            <h4 class="formText">上传扫描证件正面(支持扩展名：.jpg .png .bmp)</h4>
            <picture-upload
              ref="imgUpload"
              v-model="form.compilationBasis"
              :action="fileUploadUrl"
              :type="20"
              class="picuter"
              list-type="picture-card"
              :max-file-size="2"
              :limit="6"
            />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item ref="fileUpload" prop="compilationBasis1" class="redStar">
            <h4 class="formText">上传扫描证件反面(支持扩展名：.jpg .png .bmp)</h4>
            <picture-upload
              ref="imgUpload"
              :action="fileUploadUrl"
              :type="20"
              v-model="form.compilationBasis2"
              class="picuter"
              list-type="picture-card"
              :max-file-size="2"
              :limit="6"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="手机号码" class="redStar" prop="lineChose">
            <el-row>
              <el-col :span="9">
                <el-input v-model="form.lineChose"></el-input>
              </el-col>
              <el-col :span="7" style="margin-left:8px;">
                <el-input v-model="form.certificateNum" placeholder="输入验证码"></el-input>
              </el-col>
              <el-col :span="7" style="margin-left:5px;">
                <el-button size="small" type="primary">发送验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="电子邮箱" prop="technologyMeasure" class="redStar">
            <el-input v-model="form.technologyMeasure"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col>
          <el-form-item label="经办人" prop="handled">
            <el-col :span="1" class="elButton">
              <el-button
                size="small"
                @click="changeTable(1)"
                type="primary"
                icon="el-icon-circle-plus-outline"
              >添加经办人</el-button>
            </el-col>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="序号" min-width="50" prop="date"></el-table-column>
              <el-table-column label="经办人" min-width="100" prop="name"></el-table-column>
              <el-table-column label="身份证号" min-width="180" prop="number1"></el-table-column>
              <el-table-column label="电话" min-width="150" prop="number2"></el-table-column>
              <el-table-column label="邮箱" min-width="180" prop="emit"></el-table-column>
              <el-table-column label="操作" min-width="180" prop="name">
                <template>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click.stop="findWorkOrder(scope.row,$event)"
                  >修改</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click.stop="findWorkOrder(scope.row,$event)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 经办人弹框 -->
    <my-dialog
      width="800px"
      :height=" dialogHeight+ 'px'"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :center="true"
    >
      <el-scrollbar :style="{height: height}">
        <el-card class="box-card" shadow="never" :body-style="{}">
          <div slot="header" class="clearfix">
            <div class="card-head">{{title}}</div>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="left"
          >
            <el-row>
              <el-col :span="14">
                <el-form-item label="经办人" prop="name" class="redStar">
                  <el-input v-model="form.name" class="widthslect"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="证件号码" prop="number" class="redStar">
                  <el-row>
                    <el-col :span="7">
                      <el-select
                        v-model="form.certificateTypeCode"
                        placeholder="证件类型"
                        @change="search"
                      >
                        <el-option
                          v-for="item in certificateTypeCode"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="16" :offset="1">
                      <el-form-item prop="certificateNum" class="redStar">
                        <el-input v-model="form.certificateNum"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="isCertificateTypeCode">
              <el-col :span="20">
                <el-form-item label="身份证有效期" prop="passDate" class="redStar">
                  <el-row>
                    <el-col :span="22">
                      <el-row>
                        <el-col :span="10">
                          <el-date-picker
                            v-model="form.passDate1"
                            :picker-options="pickerOptionsStart"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                        </el-col>
                        <el-col :span="2">
                          <span>至</span>
                        </el-col>
                        <el-col :span="10">
                          <el-date-picker
                            v-if="this.form.permanent == true"
                            disabled
                            v-model="form.passDate2"
                            :picker-options="pickerOptionsEnd"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                          <el-date-picker
                            v-if="this.form.permanent == false"
                            :picker-options="pickerOptionsEnd"
                            v-model="form.passDate2"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="2">
                      <el-checkbox v-model="form.permanent" @change="checkBox" class="checkBox">
                        <p>永久</p>
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="身份证扫描件" prop="region" class="redStar">
                <h4 class="formText">上传身份证正反面扫描件(支持扩展名：.jpg .png .bmp)</h4>
                <picture-upload
                  ref="imgUpload"
                  :action="fileUploadUrl"
                  :type="20"
                  class="picuterNumber"
                  list-type="picture-card"
                  :max-file-size="2"
                  :limit="6"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="授权书扫面件" prop="region" class="redStar">
                  <el-upload
                    class="uploadLeft"
                    :action="fileUploadUrl"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :data="{fieldCode: 'BAWJ', fieldName: '技术文件'}"
                    :file-list="form.technologyDocument"
                    :multiple="false"
                    :limit="1"
                    :on-remove="(file,fileList)=>{return handleRemove (file,fileList,'technologyDocument')}"
                    :on-success="(file,fileList)=>{return fileUploadSuccess (file,fileList,'technologyDocument')}"
                    :on-error="fileUploadError"
                  >
                    <el-button size="small" type="primary">上传授权书扫描</el-button>
                    <el-button size="small" type="primary">模板下载</el-button>
                    <span slot="tip" class="el-upload__tip">支持扩展名：doc / docx / pdf</span>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="手机号码" class="redStar">
                  <el-row>
                    <el-col :span="13">
                      <el-input v-model="form.name"></el-input>
                    </el-col>
                    <el-col :span="7" style="margin-left:5px">
                      <el-input v-model="form.name" placeholder="输入验证码"></el-input>
                    </el-col>
                    <el-col :span="3">
                      <el-button size="small" style="margin-left:5px" type="primary">发送验证码</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="电子邮箱" prop="item" class="redStar">
                  <el-input v-model="form.item"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addUpad">确 定</el-button>
        <el-button size="mini" @click="Goback">取 消</el-button>
      </div>
    </my-dialog>
    <!-- 确定弹框 -->
    <!-- <my-dialog
            width="800px"
            :height="dialogHeight1 + 'px'"
            :visible.sync="isDialogVisible"
            :append-to-body="true"
            :center="true">
            <confirm :applyFormData="applyFormData"></confirm>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="register">确 定</el-button>
                <el-button size="mini" @click="isDialogVisible = false">取 消</el-button>
            </div>
    </my-dialog>-->
  </div>
</template>
<script>
//    import LoginHeader from './Header'
//    import LoginFooter from './Footer'
//    import Confirm from './Confirm'
import MyDialog from '@/components/commons/MyDialog'
import PictureUpload from '@/components/commons/PictureUpload'
import API_PREFIX from '@/api/config'
import { checkMobileSave } from '@/utils/validator'
export default {
  components: {
    // LoginHeader,
    // LoginFooter,
    PictureUpload,
    MyDialog
    // Confirm
  },
  props: {
    height: {
      type: String,
      default: '510px'
    }
  },
  data() {
    return {
      checked: true,
      isCertificateTypeCode: false,
      IsChecked: false,
      dialogVisible: false,
      isDialogVisible: false,
      menuIndex: '2',
      title: '添加经办人',
      applyFormData: {},
      form: {
        applyItemName: '',
        applyPerson: '',
        telNo: '',
        nationalSecurityName: '',
        province: '',
        projectName: '',
        designPerson: '',
        sendOrganization: '',
        economicNature: '',
        applyDocument: '',
        projectSituationIntroduction: '',
        buildNecessary: '',
        number: '',
        certificateTypeCode: '',
        passDate: '',
        lineChose: '',
        technologyMeasure: '',
        handled: '',
        permanent: '',
        checked: true
      },
      fileList: '',
      options: [],
      certificateTypeCode: [
        { value: '1', label: '身份证' },
        { value: '2', label: '港澳居民往来内地通行证' },
        { value: '3', label: '台胞证' },
        { value: '4', label: '护照' },
        { value: '5', label: '外国人居住证或居留许可' },
        { value: '6', label: '外国人永久居留身份证' }
      ],
      tableData: [
        {
          date: '1',
          name: '张靠谱',
          number1: '152221199505212729',
          number2: '13552132211',
          emit: '13552132215@163.com'
        },
        {
          date: '2',
          name: '张李三',
          number1: '100000199105212728',
          number2: '13552132212',
          emit: '13552132215@163.com'
        },
        {
          date: '3',
          name: '王老五',
          number1: '150321199225212727',
          number2: '13552132213',
          emit: '13552132215@163.com'
        },
        {
          date: '4',
          name: '李老四',
          number1: '154321199305212726',
          number2: '13552132214',
          emit: '13552132215@163.com'
        },
        {
          date: '5',
          name: '张靠谱',
          number1: '156321199405212725',
          number2: '13552132210',
          emit: '13552132215@163.com'
        }
      ],

      // 表单校验规则的选用方案
      ruleKey: 'default',
      rules: {
        applyItemName: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        applyPerson: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
        ],
        telNo: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        nationalSecurityName: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        province: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 20, message: '长度最大 20 个字符', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
        ],
        designPerson: [{ required: true, message: ' ', trigger: 'change' }],
        applyDocument: [{ required: true, message: ' ', trigger: 'change' }],
        projectSituationIntroduction: [
          { required: true, message: ' ', trigger: 'blur' },
          { validator: this.validateCertificateNum, trigger: 'change' }
        ],
        buildNecessary: [
          { required: true, message: ' ', trigger: 'blur' },
          { validator: checkMobileSave, trigger: 'blur' }
        ],
        number: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 100, message: '长度最大 100 个字符', trigger: 'blur' }
        ],
        compilationBasis: [
          { required: true, message: ' ', trigger: 'blur' },
          { max: 30, message: '长度最大 30 个字符', trigger: 'blur' }
        ],
        lineChose: [{ required: true, message: ' ', trigger: 'change' }],
        technologyMeasure: [{ required: true, message: ' ', trigger: 'change' }]
      },
      fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
      // 时间设置
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.passDate2
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.passDate1
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      }
    }
  },
  methods: {
    // 点击文件列表中的文件, 下载相关文件
    handlePreview: function(file) {
      console.log('文件预览，下载', file)
    },
    // 文件列表移除某个文件前的回调
    beforeRemove(file) {
      return this.$confirm('确定要移除文件 ' + file.name + ' 吗？', {
        type: 'warning'
      })
    },
    // 文件上传成功的回调
    fileUploadSuccess() {
      // if (response.code === 200) {
      //     // 清除文件必填项校验提示
      //     this.$refs.fileUpload.clearValidate()
      //     const { data } = response
      //     data.uid = file.uid
      //     data.name = data.fileName
      //     this.form[name].push(data)
      // } else {
      //     this.$message({
      //     showClose: true,
      //     message: '文件上传失败',
      //     type: 'error'
      //     })
      // }
    },
    // 文件上传失败的回调
    fileUploadError() {
      this.$message({
        showClose: true,
        message: '文件上传失败。',
        type: 'error'
      })
    },
    // 是否显示证件有效期
    search() {
      this.isCertificateTypeCode =
        this.form.certificateTypeCode === '身份证' ? true : false
    },
    // 修改
    findWorkOrder() {
      this.dialogVisible = true
    },
    // 新增经办人弹框
    changeTable() {
      this.dialogVisible = true
    },
    // 经办人确定
    addUpad() {
      this.dialogVisible = false
    },
    checkBox() {
      if (this.form.permanent == true) {
        this.form.passDate2 = ''
      }
    },
    Goback() {
      this.$router.go(-1) //返回上一层
      this.reFresh = false
    },
    // 注册
    submitForm(form) {
      if (this.form.checked == false) {
        this.IsChecked = true
        return
      } else {
        this.IsChecked = false
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          let form = this.form
          this.applyFormData = JSON.parse(JSON.stringify(form))
          console.log(
            this.applyFormData.passDate,
            'this.applyFormData.passDate'
          )
          if (this.form.certificateTypeCode === '身份证') {
            if (this.form.permanent == true) {
              let picker1 = this.applyFormData.passDate1
              this.applyFormData.passDate = picker1 + '--至--永久'
            } else {
              let picker1 = this.applyFormData.passDate1
              let picker2 = this.applyFormData.passDate2
              this.applyFormData.passDate = picker1 + '--至--' + picker2
            }
          }
          this.applyFormData.certificateTypeCode = this.form.certificateTypeCode
          this.isDialogVisible = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 预览确定
    register() {
      this.isDialogVisible = false
    }
  },
  computed: {
    // 弹出框经办人
    dialogHeight: function() {
      return this.$store.getters.screenHeight > 704
        ? 704
        : this.$store.getters.screenHeight
    },
    //   预览弹框
    dialogHeight1: function() {
      return this.$store.getters.screenHeight > 804
        ? 804
        : this.$store.getters.screenHeight
    }
  }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-checkbox__label {
  margin-top: -8px;
  color: #303133;
}
/deep/ .dialog-footer {
  text-align: right !important;
  margin-right: 8px;
}
/deep/ .el-dialog--center .el-dialog__body {
  padding: 20px 20px 10px !important;
}
.el-scrollbar {
  height: 100%;
  text-align: center;
  .checkBox {
    margin-top: -8px;
    p {
      color: #303133;
    }
  }
  .form {
    width: 100%;
    margin: 0 auto;
    // padding: 20px 0;
    min-height: 495px;
    header {
      border-bottom: 1px solid #b71c1c;
      color: #b71c1c;
    }
    .picuter {
      text-align: left;
    }
    .picButton {
      text-align: left;
    }
    .elButton {
      text-align: left;
      margin: 5px 0;
    }
  }

  /deep/ .el-input__inner::placeholder {
    font-size: 6px;
  }
  /deep/ .el-checkbox {
    color: #606266 !important;
  }

  footer {
    text-align: center;
    margin-top: 10px;
    p {
      color: #606266 !important;
    }
    span {
      color: #3a7bf7;
    }
  }
  /deep/ .el-checkbox__label {
    p {
      margin: 0px;
      padding: 5px;
    }
  }
  .footerBottom {
    height: 20px;
    font-size: 12px;
    color: #f56c6c !important;
    margin: 0;
    padding-right: 130px;
    // text-align: center;
  }
  .footerText {
    height: 30px;
    background-color: #b71c1c;
    p {
      margin: 0px;
      font-size: 12px;
      color: #ffffff;
      line-height: 30px;
      text-align: center;
    }
  }
}
.el-divider--horizontal {
  margin: 10px 0 !important;
}
.pr5 {
  margin-left: 5px;
}
.uploadLeft {
  text-align: left;
}
.formText {
  text-align: left;
  color: #b71c1c;
  font-size: 8px;
  margin: 0px;
}
.el-upload__tip {
  margin-left: 20px;
}
.el-form {
  padding: 0;
}

// /deep/ .el-form-item--small.el-form-item{
//     margin-bottom: 8px;
// }
.el-select,
.el-date-editor.el-input,
/deep/ .el-date-editor--daterange.el-input__inner {
  width: 100%;
}

.spilt .el-form-item--small.el-form-item {
  margin-bottom: 0;
}

//   经办人弹框
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
.card-head {
  margin: 10px 0;
}
/deep/ .el-form-item--small.el-form-item {
  margin-bottom: 8px;
}
.picuterNumber,
.uploadLeft {
  text-align: left;
}
</style>


