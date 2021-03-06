<template>
  <div class="deal-with">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物复进境受理</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertL_one>
        <span style="font-size: 12px">
          <i class="el-icon-time" style="margin-right: 3px"></i>本事项承诺办结时限为20个工作日（委托评估、专家评审时间除外）
        </span>
        </template>
        <template #titleInsertR_one>
          <el-button @click="submit" type="primary">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </template>
        <template #titleInsertR_two>
          <el-link @click="dialogVisible = true" type="primary" class="fr">流程跟踪</el-link>
        </template>
        <template #body>
          <div class="scrollBox" :style="{height: contentHeight}">
            <!-- 基本信息 -->
            <basic-info :data="basicInfoData"/>
            <!-- 展览信息 -->
            <exhibition-info :data="exhibitionInfoData"/>
            <!-- 文物或复仿制品信息 -->
            <cultural-relic-info/>
            <apply-form-item data="预约" class="hxl_item">
              <appointment-notice/>
            </apply-form-item>
            <apply-form-item data="受理" class="hxl_item">
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
          </div>
        </template>
      </apply-form>
    </el-card>
  </div>
</template>

<script>
  import PageTabs from '@/components/commons/PageTabs'
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import BasicInfo from '@/components/business/appraisal/repeat-entry/BasicInfo'
  import ExhibitionInfo from '@/components/business/appraisal/repeat-entry/ExhibitionInfo'
  import CulturalRelicInfo from '@/components/business/appraisal/temp-entry/CulturalRelicInfo'
  import CommonLanguage from '@/components/commons/CommonLanguage'
  import ApplyForm from '@/components/commons/ApplyForm'
  import {
    getApplyEeDetail,
    handleAppointment,
    getAcceptNotice,
    appraisalAccept
  } from '@/api/appraisal/repeat-entry'
  import AllowAcceptance from './AllowAcceptance'
  import RefuseAcceptance from './RefuseAcceptance'
  import MaterialCorrection from './MaterialCorrection'
  import AppointmentNotice from './AppointmentNotice'

  export default {
    components: {
      PageTabs,
      ApplyFormItem,
      BasicInfo,
      ExhibitionInfo,
      CulturalRelicInfo,
      CommonLanguage,
      ApplyForm,
      AllowAcceptance,
      RefuseAcceptance,
      MaterialCorrection,
      AppointmentNotice
    },
    data() {
      return {
        titleData: [],
        // 基本信息表格数据
        basicInfoData: {},
        // 展览信息表格数据
        exhibitionInfoData: {},
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
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 240 : 281) + 'px)'
      }
    },
    watch: {
      acceptIndex: function () {
        this.acceptNotice.situation = '';
        this.acceptNotice.remark = '';
      }
    },
    mounted() {
      this.titleData = ['基本信息', '展览信息', '文物或复仿制品信息', '预约', '受理'];
      getApplyEeDetail({itemId: this.$route.query.id}).then(({data}) => {
          data.exhibitionTime = data.termStart + ' 至 ' + data.termEnd;
          this.basicInfoData = data;
          this.exhibitionInfoData = data;
      });
      // 查询受理通知书
      getAcceptNotice({itemId: this.$route.query.id}).then(({data}) => this.acceptNotice = data);
      // 设置预约调整 itemId
      this.form.itemId = this.$route.query.id;
    },
    methods: {
      // 锚点点击事件
      itemClick(tab) {
        let nodes = document.querySelectorAll('.hxl_item');
        document.querySelector('.scrollBox').scrollTop = nodes[+tab.index].offsetTop - nodes[0].offsetTop;
      },
      // 受理、预约调整 TAB 切换
      handleSelect(tabIndex) {
        this.handleIndex = tabIndex;
      },
      // 常用语下拉框
      language(value) {
        this.form.remark += value;
      },
      // 提交数据
      submit() {
        if (this.handleIndex === '1') { // 受理
          this.$refs[`accept_${this.acceptIndex}`].getData().then(formData => {
            formData.noticeType = this.acceptIndex;
            appraisalAccept(formData).then(() => {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.go(-1);
            })
          });
        } else { // 预约调整
          this.$refs['form'].validate(valid => {
            if (valid) {
              handleAppointment(this.form).then(() => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$router.push('/appraisal/repeat-entry?tab=2');
              });
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .deal-with {
    /deep/ .el-card__header {
      padding-bottom: 10px;
    }

    /deep/ .el-card__body {
      padding: 10px;

      .yy_time.el-date-editor.el-input, .yy_time.el-date-editor.el-input__inner {
        width: 277px;
      }

      .bl_place .el-radio {
        width: 123px;
      }

      .detail_addr {
        flex: 1;
        margin-left: 11px;
      }
    }
  }
</style>
