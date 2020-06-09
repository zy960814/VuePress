<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">文物临时进境登记</div>
    <apply-form :data="titleData" @tab-click="itemClick">
      <template #titleInsertL_one>
        <span style="font-size: 12px">
          <i class="el-icon-time" style="margin-right: 3px"></i>本事项承诺办结时限为20个工作日（委托评估、专家评审时间除外）
        </span>
      </template>
      <template #titleInsertR_one>
        <el-button @click="saveOrSubmit('submit')" type="primary">保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </template>
      <template #titleInsertR_two>
        <el-link @click="dialogVisible = true" type="primary" class="fr">办事指南</el-link>
      </template>
      <template #body>
        <div class="scrollBox" :style="{height: contentHeight}">
          <basic-info ref="basicInfo" class="hxl_item"/>
          <exhibition-info ref="exhibitionInfo" class="hxl_item"/>
          <cultural-relic-info ref="culturalRelicInfo" class="hxl_item"/>
        </div>
      </template>
    </apply-form>
    <!-- 办事指南查看对话框 -->
    <my-dialog
        width="1124px"
        :height="dialogHeight + 'px'"
        @open="dialogKey += 1"
        :visible.sync="dialogVisible"
    >
      <business-guide :height="(dialogHeight - 185) + 'px'"/>
    </my-dialog>
  </el-card>
</template>

<script>
  import ApplyForm from '@/components/commons/ApplyForm'
  import BasicInfo from '@/views/personal/schedule/56020/temp-entry/exhibition-apply/BasicInfo'
  import ExhibitionInfo from '@/views/personal/schedule/56020/temp-entry/exhibition-apply/ExhibitionInfo'
  import CulturalRelicInfo from '@/components/business/CulturalRelicInfo'
  import {saveExhibitionInfo, listCulturalRelic} from '@/api/personal/schedule/56020/temp-entry'
  import MyDialog from '@/components/commons/MyDialog'
  import BusinessGuide from '@/views/personal/schedule/56020/temp-entry/exhibition-apply/BusinessGuide'
  import {getApplyBeDetail} from '@/api/appraisal/temp-entry'

  export default {
    components: {
      ApplyForm,
      ExhibitionInfo,
      BasicInfo,
      CulturalRelicInfo,
      MyDialog,
      BusinessGuide
    },
    data() {
      return {
        titleData: ['基本信息', '展览信息', '文物或复仿制品信息'],
        dialogKey: 0,
        dialogVisible: false,
        queryParams: {
          condition: {
            itemId: ''
          },
          pagination: {
            currentPage: 1,
            pageSize: 1
          },
          sort: {}
        }
      }
    },
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 235 : 276) + 'px)'
      },
      // 弹出框
      dialogHeight: function () {
        return this.$store.getters.screenHeight > 1200 ? 1200 : this.$store.getters.screenHeight
      }
    },
    mounted() {
      const itemId = this.$route.query.id;
      // 临时进境展览事项查询
      getApplyBeDetail({itemId}).then(({data}) => {
        // 文件回显, 数据适配
        data.docType[0].name = data.docType[0].fileName;
        this.$refs.basicInfo.setData(data);
        this.$refs.exhibitionInfo.setData(data);
        // 文物或复仿制品信息查询
        this.$store.dispatch('setTempEntryItemId', itemId);
        this.$refs.culturalRelicInfo.search();
      });
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
        Promise.all([
          this.$refs.basicInfo.getData(type),
          this.$refs.exhibitionInfo.getData(type)
        ]).then(values => {
          if (this.$store.state._20.tempEntryItemId != null) {
            this.queryParams.condition.itemId = this.$store.state._20.tempEntryItemId;
            listCulturalRelic(this.queryParams).then(result => {
              if (result.data.pagination.totalNum > 0) {
                const data = Object.assign(...values);
                saveExhibitionInfo(data).then(({data}) => {
                  // 保存事项ID
                  this.$store.dispatch('setTempEntryItemId', data.itemId);
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.go(-1);
                })
              } else {
                this.$store.dispatch('promptWarningMsg', '请添加文物或复仿制品信息');
              }
            });
          } else {
            this.$store.dispatch('promptWarningMsg', '请添加文物或复仿制品信息');
          }
        })
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1
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
      padding-top: 0px;

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
