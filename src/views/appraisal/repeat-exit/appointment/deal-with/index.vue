<template>
  <div class="deal-with">
    <el-card class="box-card" shadow="never">
      <div slot="header">文物临时进境复出境预约</div>
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
            <exhibition-info v-if="$route.query.type !== 'personal'" :data="exhibitionInfoData"/>
            <!-- 文物或复仿制品信息 -->
            <cultural-relic-info/>
            <!-- 预约 -->
            <appointment-form ref="appointmentForm" :item-id="$route.query.id"/>
          </div>
        </template>
      </apply-form>
    </el-card>
  </div>
</template>

<script>
  import BasicInfo from '@/components/business/appraisal/repeat-exit/BasicInfo'
  import ExhibitionInfo from '@/components/business/appraisal/temp-entry/ExhibitionInfo'
  import CulturalRelicInfo from '@/components/business/appraisal/temp-entry/CulturalRelicInfo'
  import ApplyForm from '@/components/commons/ApplyForm'
  import {handleAppointment} from '@/api/appraisal/temp-entry'
  import {getApplyCeDetail, getApplyCpDetail} from '@/api/appraisal/repeat-exit'
  import AppointmentForm from '@/components/business/approval-process/AppointmentForm'

  export default {
    components: {
      BasicInfo,
      ExhibitionInfo,
      CulturalRelicInfo,
      ApplyForm,
      AppointmentForm
    },
    data() {
      return {
        titleData: [],
        // 基本信息表格数据
        basicInfoData: {},
        // 展览信息表格数据
        exhibitionInfoData: {}
      }
    },
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 240 : 281) + 'px)'
      }
    },
    mounted() {
      const itemType = this.$route.query.type || 'exhibition';
      switch (itemType) {
        case 'exhibition':  // 临时进境展览事项查询
          this.titleData = ['基本信息', '展览信息', '文物或复仿制品信息', '预约'];
          getApplyCeDetail({itemId: this.$route.query.id}).then(({data}) => {
            data.exhibitionTime = data.termStart + ' 至 ' + data.termEnd;
            this.basicInfoData = data;
            this.exhibitionInfoData = data;
          });
          break;
        case 'personal':  // 临时进境个人携带查询
          this.titleData = ['基本信息', '文物或复仿制品信息', '预约'];
          getApplyCpDetail({itemId: this.$route.query.id}).then(({data}) => {
            this.basicInfoData = data;
          });
          break
      }
    },
    methods: {
      // 锚点点击事件
      itemClick(tab) {
        let nodes = document.querySelectorAll('.hxl_item');
        document.querySelector('.scrollBox').scrollTop = nodes[+tab.index].offsetTop - nodes[0].offsetTop;
      },
      // 提交数据
      submit() {
        this.$refs.appointmentForm.getData().then(data => {
          handleAppointment(data).then(() => {
            this.$router.go(-1);
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          })
        })
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
    }
  }
</style>
