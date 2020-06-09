<template>
  <el-card shadow="never">
    <div slot="header">文物出境许可</div>
    <div class="body">
      <page-locations ref="anchor" :data="changeList"/>
      <el-scrollbar :style="{height: height}">
        <div style="padding: 0 15px 15px">

          <!-- 基本信息 -->
          <gray-title :data="{changeList, idIndex:'0'}"/>
          <!-- 垂直表格 -->
          <vertical-table
              :verticalTableData="basicMessage"
              :verticalTableTitle="verticalTableTitle"
              width="150px"
          ></vertical-table>
          <!-- 办理流程 -->
          <gray-title :data="{changeList, idIndex:'1', linkName:'查看流程图'}" @click="showFlowChart"/>
          <paragraph :textData="textData1"/>
          <!-- 办理材料目录 -->
          <gray-title :data="{changeList,idIndex:'2'}"/>
          <material-table :materialTable="materialTable"/>
          <!-- 禁止性要求 -->
          <gray-title :data="{changeList,idIndex:'3'}"/>
          <paragraph :textData="textData3" :identFlag="false"/>
          <!-- 受理条件 -->
          <gray-title :data="{changeList,idIndex:'4'}"/>
          <paragraph :textData="textData4" :identFlag="false"/>
          <!-- 收费标准 -->
          <gray-title :data="{changeList,idIndex:'5'}"/>
          <paragraph :textData="textData5" :identFlag="false"/>
          <!-- 设定依据 -->
          <gray-title :data="{changeList,idIndex:'6'}"/>
          <paragraph :textData="textData6"/>
          <!-- 常见问题 -->
          <gray-title :data="{changeList,idIndex:'7'}"/>
          <paragraph :textData="textData7.text1" :identFlag="false"/>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog
        :fullscreen="true"
        :visible.sync="dialogVisible">
      <div style="text-align: center">
        <img :src="basicMessage.filePath" alt="">
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import VerticalTable from "@/components/commons/VerticalTable"
  import PageLocations from "@/components/business/PageLocations"
  import GrayTitle from "@/components/business/GrayTitle"
  import Paragraph from "@/components/business/Paragraph"
  import MaterialTable from "./MaterialTable"
  import {crExitPermit} from '@/api/personal/schedule/56020/temp-entry'

  export default {
    components: {
      VerticalTable,
      PageLocations,
      GrayTitle,
      Paragraph,
      MaterialTable
    },
    props: {
      height: String
    },
    data() {
      return {
        // 流程图对话框
        dialogVisible: false,
        // 竖形表格数据
        basicMessage: {
          // 事项类型
          itemType: '',
          // 办件类型
          projectType: '',
          // 实施主体
          implementationSubject: '',
          // 行政层级
          administrativeLevel: '',
          // 决定机构
          decisionMechanism: '',
          // 审查类型
          examineType: '',
          // 申请主体
          applySubject: '',
          // 受理机构
          acceptInstitution: '',
          // 承诺办结时限
          commitmentDeadline: '',
          // 法定办结时限
          statutoryDeadline: '',
          // 是否收费
          charge: '',
          // 到办事现场次数
          projectSceneNumber: '',
          // 数量限制
          quantitativeLimitation: '',
          // 适用范围
          applicationRang: '',
          // 审批结果及送达方式
          projectResult: '',
          // 办理进程和结果查询
          handleProcess: '',
          // 咨询方式
          consultingWay: '',
          // 监管投诉渠道
          complaintChannels: '',
          // 办理时间
          processTime: '',
          // 办理地点
          processAddress: ''
        },
        // 竖形表格标题数据(一个对象为一行的标题)
        verticalTableTitle: [
          {itemType: "事项类型", projectType: "办证类型"},
          {implementationSubject: "实施主体", administrativeLevel: "行政层级"},
          {decisionMechanism: "决定机构", examineType: "审查类型"},
          {applySubject: "申请主体", acceptInstitution: "受理机构"},
          {commitmentDeadline: "承诺办结时限", statutoryDeadline: "法定办结时限"},
          {charge: "是否收费", projectSceneNumber: "到办事现场次数"},
          {quantitativeLimitation: "数量限制", applicationRang: "适用范围"},
          {projectResult: "审批结果及送达方式", handleProcess: "办理进程和结果查询"},
          {consultingWay: "咨询方式"},
          {complaintChannels: "监管投诉渠道"},
          {processTime: "办理时间"},
          {processAddress: "办理地点"}
        ],
        // 横向表格数据
        materialTable: [],
        // 锚点按钮及灰色标题数据
        changeList: [
          "基本信息",
          "办理流程",
          "办理材料目录",
          "禁止性要求",
          "受理条件",
          "收费标准",
          "设定依据",
          "常见问题"
        ],
        //   段落1内容（办理流程）
        textData1: [],
        // 禁止性要求
        textData3: [],
        // 受理条件
        textData4: [],
        // 收费标准
        textData5: [],
        // 设定依据
        textData6: [],
        // 常见问题
        textData7: {
          text1: []
        }
      };
    },
    watch: {
      $route() {
        this.anchorLocation();
      }
    },
    mounted() {
      crExitPermit({
        itemId: '2'
      }).then(({data}) => {
        // 1、基本信息赋值
        this.basicMessage = data;
        // 2、办理流程
        this.textData1.push(data.processPath);
        // 3、办理材料目录
        const materialData = data.approvalItemGuideComs;
        if (materialData) {
          for (let i = 0; i < materialData.length; i++) {
            this.materialTable.push({
              materialName: materialData[i].materialsType,
              materialPrototype: '',
              originWay: '',
              paperMaterial: '',
              paperNecessary: ''
            });
            const detailData = materialData[i].materials;
            for (let j = 0; j < detailData.length; j++) {
              this.materialTable.push({
                materialName: detailData[j].materialsName,
                materialPrototype: detailData[j].materialsSample,
                originWay: detailData[j].materialsChannel,
                paperMaterial: detailData[j].paperMaterials,
                paperNecessary: detailData[j].materialsNecessity
              });
            }
          }
        }
        // 4、禁止性要求
        this.textData3.push(data.prohibitiveRequirementsStyle);
        // 5、受理条件
        this.textData4.push(data.acceptCondition);
        // 6、收费标准
        this.textData5.push(data.chargeNorm);
        // 7、设定依据
        this.textData6.push(data.setGistStyle);
        // 8、常见问题
        this.textData7.text1.push(data.commonQuestionStyle);

        this.anchorLocation();
      });
    },
    methods: {
      // 锚点定位
      anchorLocation() {
        if (this.$route.query.type === '2') {
          this.$nextTick(() => this.$refs.anchor.scroll(7));
        }
      },
      // 查看流程图
      showFlowChart() {
        this.dialogVisible = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  /deep/ .el-card__header {
    font-size: 18px;
    font-weight: bold;
    line-height: 32px;
  }

  /deep/ .el-card__body {
    padding: 0 !important;

    .body {
      color: #000000;
    }

    // 文物出境许可行
    .header {
      padding: 8px 0;
      text-align: center;
      font-size: 16px;
    }

    // 基本信息行样式
    .basicMessage {
      text-align: left;
      font-size: 15px;
      font-weight: 700;
      margin: 10px 0;
      padding: 10px;
      background-color: #F2F2F2;
    }
  }
</style>
