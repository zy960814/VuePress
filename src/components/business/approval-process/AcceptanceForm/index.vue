<template>
  <apply-form-item data="受理" class="hxl_item" style="height: 659px">
    <page-tabs
        :pageTabsData="pageTabsData"
        @handle-select="handleSelect"
        style="margin-bottom: 18px"></page-tabs>
    <template v-if="handleIndex === '1'">
      <div style="text-align: center; margin-bottom: 18px">
        <el-radio v-model="acceptIndex" label="1">准予受理</el-radio>
        <el-radio v-model="acceptIndex" label="2">不予受理</el-radio>
        <el-radio v-model="acceptIndex" label="3">材料补正</el-radio>
      </div>
      <allow-acceptance ref="accept_1" :data="acceptNotice" v-if="acceptIndex === '1'"/>
      <refuse-acceptance ref="accept_2" :data="acceptNotice" v-else-if="acceptIndex === '2'"/>
      <material-correction ref="accept_3" :data="acceptNotice" v-else/>
    </template>
    <template v-else>
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="110px">
        <div class="clear-float" style="padding: 0 10px">
          <el-form-item label="预约时间" prop="dealDay" class="redStar fl mr-10">
            <el-date-picker
                class="yy_time"
                v-model="form.dealDay"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label-width="0" prop="dealTime" class="fl">
            <el-select v-model="form.dealTime" placeholder="时间">
              <el-option label="上午工作时间" value="上午工作时间"></el-option>
              <el-option label="下午工作时间" value="下午工作时间"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: left; padding: 0 10px">
          <el-form-item label="办理地点" class="redStar bl_place">
            <el-radio v-model="form.position" label="窗口办理">窗口办理</el-radio>
            <el-radio v-model="form.position" label="上门办理">上门办理</el-radio>
          </el-form-item>
          <el-form-item label-width="0" prop="adress" class="detail_addr">
            <el-input v-model="form.adress" placeholder="具体地址"></el-input>
          </el-form-item>
        </div>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 9px">
            <common-language @language="language"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="办理意见" prop="remark" class="redStar">
            <el-input
                type="textarea"
                :rows="4"
                v-model="form.remark"
                placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </template>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import PageTabs from '@/components/commons/PageTabs'
  import CommonLanguage from '@/components/commons/CommonLanguage'
  import AllowAcceptance from '@/components/business/approval-process/AllowAcceptance'
  import RefuseAcceptance from '@/components/business/approval-process/RefuseAcceptance'
  import MaterialCorrection from '@/components/business/approval-process/MaterialCorrection'
  import {handleAppointment, getAcceptNotice, appraisalAccept} from '@/api/appraisal/temp-entry'

  export default {
    components: {
      ApplyFormItem,
      PageTabs,
      CommonLanguage,
      AllowAcceptance,
      RefuseAcceptance,
      MaterialCorrection
    },
    props: {
      itemId: String
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '受理',
            num: ''
          }, {
            title: '预约调整',
            num: ''
          }]
        },
        handleIndex: '1', // 1受理, 2预约调整
        acceptIndex: '1', // 1准予受理, 2不予受理, 3材料补正
        acceptNotice: {}, // 受理通知书信息
        form: {
          id: null,
          itemId: '',
          type: '1',
          dealDay: '',
          dealTime: '',
          position: '窗口办理',
          adress: '',
          remark: ''
        },
        rules: {
          dealDay: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          dealTime: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          adress: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      acceptIndex: function () {
        this.acceptNotice.situation = '';
        this.acceptNotice.remark = '';
      }
    },
    mounted() {
      // 查询受理通知书
      getAcceptNotice({itemId: this.itemId}).then(({data}) => this.acceptNotice = data);
    },
    methods: {
      // 受理、预约调整 TAB 切换
      handleSelect(tabIndex) {
        this.handleIndex = tabIndex;
      },
      // 常用语下拉框
      language(value) {
        this.form.remark += value;
      },
      submitData() {
        if (this.handleIndex === '1') { // 受理
          this.$refs[`accept_${this.acceptIndex}`].getData().then(formData => {
            formData.noticeType = this.acceptIndex;
            appraisalAccept(formData).then(() => {
              this.$router.go(-1);
              this.$message({
                message: '提交成功',
                type: 'success'
              });
            })
          });
        } else { // 预约调整
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.form.itemId = this.itemId;
              handleAppointment(this.form).then(() => {
                this.$router.go(-1);
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
              });
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .yy_time.el-date-editor.el-input,
  /deep/ .yy_time.el-date-editor.el-input__inner {
    width: 277px;
  }

  .bl_place .el-radio {
    width: 123px;
  }

  .detail_addr {
    flex: 1;
    margin-left: 11px;
  }
</style>
