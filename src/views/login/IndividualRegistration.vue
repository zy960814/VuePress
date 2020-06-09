<template>
    <el-scrollbar>
        <login-header :activeIndex="menuIndex"/>
        <div class="form">
            <header>
                <h4>个人注册</h4>
                <div class="warn">
                    <p  >
                        <i class="el-icon-bell"></i>为提升账号安全和信任级别，请务必准确填写本人的证件信息。
                    </p>
                </div>
            </header>
            <nav>
                <el-form ref="form" :model="form" label-position="left" :rules="rules" label-width="100px">
                    <el-row style="margin-top: 18px">
                        <el-col :span="11">
                            <el-form-item label="用户账户" prop="applyItemName" class="redStar">
                                <el-input v-model="form.applyItemName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="账号密码" prop="applyPerson" class="redStar">
                                <el-input v-model="form.applyPerson" placeholder="6~16位字符、至少包含数字、字母(区分大小写)及特殊字符包含两个特殊符号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="确认密码" prop="telNo" class="redStar">
                                <el-input v-model="form.telNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="个人姓名" prop="nationalSecurityName" class="redStar">
                                <el-input v-model="form.nationalSecurityName" ></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="证件号码" prop="number" class="redStar">
                                <el-row>
                                    <el-col :span="7">
                                        <el-select v-model="form.certificateTypeCode" placeholder="证件类型"  @change="search">
                                            <el-option
                                                 v-for="item in certificateTypeCode"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.label">
                                            </el-option>
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
                        <el-col :span="14">
                            <el-form-item label="身份证有效期" prop="passDate" class="redStar">
                                <el-row>
                                    <el-col :span="20">
                                        <el-row>
                                            <el-col :span="11">
                                                <el-date-picker
                                                    v-model="form.passDate1"
                                                    type="date"
                                                    :picker-options="pickerOptionsStart"
                                                    placeholder="选择日期"
                                                    format="yyyy 年 MM 月 dd 日"
                                                    value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :span="1" >
                                                <span>至</span>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-date-picker
                                                    v-if="this.form.permanent == true"
                                                    :picker-options="pickerOptionsEnd"
                                                    disabled
                                                    v-model="form.passDate2"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    format="yyyy 年 MM 月 dd 日"
                                                    value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                                <el-date-picker
                                                    v-if="this.form.permanent == false"
                                                    :picker-options="pickerOptionsEnd"
                                                    v-model="form.passDate2"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    format="yyyy 年 MM 月 dd 日"
                                                    value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="1" :offset="1">
                                        <el-checkbox v-model="form.permanent" @change="checkBox" class="checkBox"><p>永久</p></el-checkbox>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="所属地区" class="redStar" pros="area">
                                <el-col :span="11">
                                    <el-select v-model="form.province" placeholder="请选择活动区域" >
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="11"  :offset="2">
                                    <el-select v-model="form.city" placeholder="请选择活动区域">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <!-- <el-col :span="7" class="pr5">
                                    <el-select v-model="form.region" placeholder="请选择活动区域">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="通信地址" prop="designPerson" class="redStar">
                                <el-input v-model="form.designPerson"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="手机号码" class="redStar" prop="lineChose">
                                <el-row>
                                    <el-col :span="10">
                                        <el-input v-model="form.lineChose"></el-input>
                                    </el-col>
                                    <el-col :span="7" style="margin-left:5px;">
                                        <el-input v-model="form.certificateNum" placeholder="输入验证码"></el-input>
                                    </el-col>
                                    <el-col :span="6" style="margin-left:4px;">
                                        <el-button size="small" type="primary">发送验证码</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" >
                            <el-form-item label="电子邮箱" prop="technologyMeasure" class="redStar">
                                <el-input v-model="form.technologyMeasure" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                </el-form>
            </nav>
            <footer class="footer">
                <div style="height:45px;">
                    <el-checkbox v-model="form.checked"><p>我已阅读并同意<span @click="toBps"> 《注册协议和隐私条款》</span></p></el-checkbox>
                    <p class="footerBottom" v-show="IsChecked">请勾选阅读并同意</p>
                </div>
                
                <div>
                    <el-button size="small" type="primary" @click="submitForm('form')">注册</el-button>
                    <el-button size="small" >重置</el-button>
                </div>
            </footer>

        </div>
        <div class="footerText">
            <p>本系统为国家文物局政务服务系统，请自觉遵守国家有关法律、法规和政策，不发布、不传播危害国家安全、危害社会公共利益和社会稳定、违反社会公德的有害信息，抵制一切违法、法规行为。</p>
        </div>
        <login-footer/>
        <!-- 注册弹框 -->
        <my-dialog  
            width="800px"
            :height="dialogHeight1 + 'px'"
            :visible.sync="isDialogVisible"
            :append-to-body="true"
            :center="true">
            <IndivConfirm :applyFormData="applyFormData"></IndivConfirm>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="register">确 定</el-button>
                <el-button size="mini" @click="isDialogVisible = false">取 消</el-button>
            </div>
        </my-dialog>
    </el-scrollbar>
</template>
<script>
   import LoginHeader from './Header'
   import LoginFooter from './Footer'
   import IndivConfirm from './IndivConfirm'
   import MyDialog from '@/components/commons/MyDialog'
   import API_PREFIX from '@/api/config'
export default {
    components: {
        LoginHeader,
        LoginFooter,
        MyDialog,
        IndivConfirm
    },
    data() {
        return {
            checked: '',
            IsChecked: false,
            isCertificateTypeCode: false,
            isDialogVisible: false,
            menuIndex: '2',
            form: {
                applyItemName: '',
                applyPerson: '',
                telNo: '',
                nationalSecurityName: '', 
                certificateTypeCode: '',
                passDate: '',
                projectName1: '',
                designPerson: '',
                lineChose: '',
                technologyMeasure: '',
                permanent: '',
                checked: true,
            },
            options:[

            ],
            applyFormData: {},
            certificateTypeCode:[
                {value: '1', label: '身份证'},
                {value: '2', label: '港澳居民往来内地通行证'},
                {value: '3', label: '台胞证'},
                {value: '4', label: '护照'},
                {value: '5', label: '外国人居住证或居留许可'},
                {value: '6', label: '外国人永久居留身份证'}
            ],
            // 表单校验规则的选用方案
            ruleKey: 'default',
            rules: {
                applyItemName:[
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                applyPerson: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
                ],
                telNo:[
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                nationalSecurityName: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                item: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                province: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                number: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                // passDate: [
                //     {required: true, message: ' ', trigger: 'blur'},
                //     {max: 20, message: '长度最大 20 个字符', trigger: 'blur'} 
                // ],
                projectName1: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                designPerson: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
                ],
                carryPerson: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
                ],
                lineChose: [
                    {required: true, message: ' ', trigger: 'change'}
                ],
                technologyMeasure: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {validator: this.validateCertificateNum, trigger: 'change'}
                ],
                address: [
                    {required: true, message: ' ', trigger: 'blur'},
                    {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
                ],
            },
            fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
            // 时间设置
            pickerOptionsStart: {
                disabledDate: time => {
                let endDateVal = this.form.passDate2;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.form.passDate1;
                    if (beginDateVal) {
                        return (
                        time.getTime() <
                        new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
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
        search(){
            this.isCertificateTypeCode= this.form.certificateTypeCode === '身份证' ? true : false;
        },
        // 跳转白皮书
        toBps(){
            this.$router.push('/Bps')
        },
        checkBox(){
            if(this.form.permanent == true){
                this.form.passDate2 = ''
            }
        },
        // 注册
        submitForm(form) {
            if(this.form.checked == false){
                this.IsChecked = true;
                return;
            }else {
                this.IsChecked = false;
            }
           
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let form = this.form;
                    this.applyFormData = JSON.parse(JSON.stringify(form))
                    if(this.form.certificateTypeCode === '身份证'){
                        if(this.form.permanent == true){
                            let picker1 = this.applyFormData.passDate1;
                            this.applyFormData.passDate = picker1 + '--至--永久'
                        }else {
                            let picker1 = this.applyFormData.passDate1;
                            let picker2 = this.applyFormData.passDate2;
                            this.applyFormData.passDate = picker1 +'--至--' +  picker2
                        }
                    }
                    this.applyFormData.certificateTypeCode = this.form.certificateTypeCode
                    this.isDialogVisible = true
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // / 预览确定
        register(){
            this.isDialogVisible = false
        },
    },
    mounted(){
        this.search();
        
    },
    computed: {
        //   预览弹框
        dialogHeight1: function () {
            return this.$store.getters.screenHeight > 804 ? 804 : this.$store.getters.screenHeight;
        }
    },
}
</script>
<style  lang="scss" scoped>
    .el-scrollbar {
        height: 100%;
        text-align: center;
        .form {
            width: 75%;
            margin: 0 auto;
            padding: 20px 0;
            min-height: 495px;
            header {
                border-bottom: 1px solid #B71C1C;
                color: #B71C1C;
                h4 {
                    margin: 10px;
                }
                .warn {
                    font-size: 12px;
                    height: 25px;
                    // line-height: 20px;
                    color: #303133;
                    .iconBell{
                        width: 20px;
                        height: 20px;
                        background-color: red;
                    }
                    p{
                        margin: 0px;
                    }
                }
            }
            .checkBox{
                margin-top: -8px;
                p {
                    color: #303133;

                }
            }

        }

        /deep/ .el-input__inner::placeholder{
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
            /deep/ .el-checkbox__label{
                p {
                    margin: 0px;
                    padding: 5px;
                }
            }
            .footerBottom{
                height: 20px;
                font-size: 12px;
                color: #f56c6c !important;
                margin: 0;
                padding-right: 130px;
                // text-align: center;
            }
        }
        .footerText{
            height: 30px;
            background-color: #B71C1C;
            p{
                margin: 0px;
                font-size: 12px;
                color: #ffffff;
                line-height: 30px;
                text-align: center;
            }
        }
    }
        .el-divider--horizontal {
            margin: 10px 0!important;
        }
        .pr5 {
            margin-left: 5px;
        }
        .uploadLeft{
            text-align: left;
        }
        .formText{
            text-align: left;
            color: #B71C1C;
            font-size: 8px;
            margin: 0px;
        }
        .el-upload__tip{
            margin-left: 20px;
        }
        .el-form {
            padding: 0;
        }
        
        
        // /deep/ .el-form-item--small.el-form-item{
        //     margin-bottom: 8px;
        // }
        .el-select, .el-date-editor.el-input,
        /deep/ .el-date-editor--daterange.el-input__inner {
            width: 100%;
        }

        .spilt .el-form-item--small.el-form-item {
            margin-bottom: 0;
        }
        /deep/ .el-dialog--center .el-dialog__footer{
            text-align: right!important;
            margin-right: 8px;
        }
</style>


