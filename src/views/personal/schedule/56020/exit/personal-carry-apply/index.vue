<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">文物出境个人携带申请</div>
    <apply-form :data="titleData" @tab-click="itemClick">
      <template #titleInsertL_one>
        <span style="font-size: 12px">
          <i class="el-icon-time" style="margin-right: 3px"></i>本事项承诺办结时限为20个工作日（委托评估、专家评审时间除外）
        </span>
      </template>
      <template #titleInsertR_one>
        <el-button @click="saveOrSubmit('save')" type="primary">保存</el-button>
        <el-button @click="saveOrSubmit('submit')" type="primary">提交</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </template>
      <template #titleInsertR_two>
        <el-link @click="dialogVisible = true" type="primary" class="fr">办事指南</el-link>
      </template>
      <template #body>
        <div class="scrollBox" :style="{height: contentHeight}">
          <basic-info ref="basicInfo" class="hxl_item"/>
          <cultural-relic-info ref="culturalRelicInfo" class="hxl_item"/>
        </div>
      </template>
    </apply-form>
    <!-- 办事指南查看对话框 -->
    <!-- <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible">
      <business-guide :height="(dialogHeight - 185) + 'px'"/>
    </my-dialog>-->
  </el-card>
</template>

<script>
  import ApplyForm from '@/components/commons/ApplyForm'
  import BasicInfo from './BasicInfo'
  import CulturalRelicInfo from '@/components/business/CulturalRelicInfo'
  import {saveApplyA} from '@/api/personal/schedule/56020/exit'
  import {submitExhibitionInfo} from '@/api/personal/schedule/56020/temp-entry'
  // import MyDialog from '@/components/commons/MyDialog'
  // import BusinessGuide from './BusinessGuide'

  export default {
    components: {
      ApplyForm,
      BasicInfo,
      CulturalRelicInfo
      // MyDialog,
      // BusinessGuide
    },
    data() {
      return {
        titleData: ['基本信息', '文物或复仿制品信息'],
        dialogKey: 0,
        dialogVisible: false
      }
    },
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 238 : 279) + 'px)'
      },
      // 弹出框
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 1200 ? 1200 : this.$store.getters.screenHeight
      }
    },
    mounted() {
      this.$store.dispatch('setTempEntryItemId', null);
      this.$store.dispatch('setTempEntryApplyCurrItem', {
        id: null,
        listQuery: false, // 是否列表查询
        detailQuery: false // 是否详情查询
      })
    },
    methods: {
      // 锚点点击事件
      itemClick(tab) {
        let nodes = document.querySelectorAll('.hxl_item');
        document.querySelector('.scrollBox').scrollTop = nodes[+tab.index].offsetTop - nodes[0].offsetTop;
      },
      /**
       * 点击保存或者提交按钮
       * @param type: [save, submit]
       */
      saveOrSubmit(type) {
        Promise.all([this.$refs.basicInfo.getData(type)]).then(values => {
          const data = Object.assign(...values);
          data.itemId = this.$store.state._20.tempEntryItemId;
          switch (type) {
            case 'save':
              saveApplyA(data).then(({data}) => {
                // 保存事项ID
                this.$refs.basicInfo.setId(data.id);
                this.$store.dispatch('setTempEntryItemId', data.itemId);
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              });
              break;
            case 'submit':
              submitExhibitionInfo({
                data,
                itemCode: '56020A'
              }).then(() => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$router.push('/personal/admin-apply')
              });
              break
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box-card {
    /deep/ .el-card__header {
      text-align: center;
      padding: 12px;
      font-weight: bold;
    }

    /deep/ .el-card__body {
      padding: 12px;
      padding-top: 0;

      .opt_btn {
        text-align: right;
      }

      .scrollBox {
        overflow-y: auto;
        padding-right: 1px;
      }
    }
  }
</style>
