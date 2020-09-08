<template>
  <div class="content">
    <apply-form-item data="基本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormData"
        :verticalTableTitle="basicInformationTitle"
        width="150px"
      >
        <template #line_50="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
    <apply-form-item data="文物或标本信息">
      <vertical-table
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="relicSpecimenTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>
    <apply-form-item data="工程设计方案信息">
      <vertical-table
        title="基本信息"
        style="width:100%;"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="basicMessageTitle"
        width="150px"
      ></vertical-table>
    </apply-form-item>
    <apply-form-item data="申请材料">
      <vertical-table
        style="width:100%;"
        borderTitle="none"
        :verticalTableData="applyFormDataInner"
        :verticalTableTitle="applyMaterialTitle"
        width="150px"
      >
        <template #line_00="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_10="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_20="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
        <template #line_30="scope">
          <el-link type="primary" v-if="scope.colValue[0]">{{scope.colValue[0].name}}</el-link>
          <el-link type="primary" v-else>{{ }}</el-link>
        </template>
      </vertical-table>
    </apply-form-item>
  </div>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import VerticalTable from '@/components/commons/VerticalTable'
export default {
  name: 'ConfirmMessage',
  components: { ApplyFormItem, VerticalTable },
  props: {
    height: {
      type: String,
      default: '400px'
    },
    applyFormData: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      basicInformationTitle: [
        { applyItemName: '申请事项名称' },
        { applyPerson: '申请人', handlePerson: '经办人 ' },
        { telNo: '联系方式', '': '' },
        { applyDocumentNo: '申请文件号', '': '' },
        { applyDocumentTitle: '申请文件标题' },
        { applyDocument: '申请文件' }
      ],
      // 文物或标本信息
      relicSpecimenTitle: [
        { relicSpecimenName: '文物或标本名称', '': '' },
        { geographyLocation: '地理位置信息', '': '' },
        { detailInstroduction: '详细介绍' }
      ],
      // 境外鉴定项目信息
      basicMessageTitle: [
        { projectName: '项目名称' },
        { applyPurposeResult: '申请目的及缘由' },
        { jwjcjgmc: '境外检测机构名称' },
        { jcjglocation: '境外检测机构所在地' },
        { jwjcjggk: '境外检测机构概况' },
        { fundsSource: '经费来源' },
        { funds: '经费金额', '': '' },
        { bzdw: '编制单位', '': '' },
        { bsdw: '报送单位', '': '' },
        { otherIntroduction: '其他说明' }
      ],
      // 立项批复文件
      immediatelyReplayTitle: [
        { replayDocumentTitle: '批复文件标题' },
        { replayDocumentNo: '批复文号' },
        { approvalResponse: '立项批复文件' }
      ],
      //申请材料
      applyMaterialTitle: [
        { cjwwjzrbbqd: '出境文物及自然标本清单' },
        {
          hzkgdcktfjhyjxmdpzwj: '合作考古调查、勘探、发掘或研究项目的批准文件'
        },
        { swwjyj: '考古发掘项目所在地的省级文物行政部门出具的意见' },
        { other: '其他' }
      ]
      // applyFormData: {
      //   applyItemName: '周口店遗址修复工程',
      //   applyPerson: '王大锤',
      //   handlePerson: '李复',
      //   telNo: '123800877345',
      //   applyDocumentNo: 'al_12398294',
      //   applyDocumentTitle: '元朝平底瓷碗',
      //   applyDocument: '北京市文物局申请文件.docx',
      //   nationalSecurityName: '北京市文物局',
      //   province: '河北省',
      //   projectName: '周口店遗址项目',
      //   designPerson: '周埕',
      //   sendOrganization: '河北省文物局',
      //   otherIntroduction: '',
      //   projectSituationIntroduction: '文物二期处理进行中',
      //   buildNecessary: '必要',
      //   compilationBasis: '文物二期修复细则',
      //   lineChose: '三线',
      //   technologyMeasure: '数字扫描',
      //   emergencyMeasure: '封',
      //   technologyDocument: '北京市文物局申请文件.docx',
      //   assessmentReport: '北京市文物局申请文件.docx',
      //   protectPlan: '北京市文物局申请文件.docx',
      //   relicReport: '北京市文物局申请文件.docx',
      //   other: '北京市文物局申请文件.docx'
      // }
    }
  },
  computed: {
    applyFormDataInner() {
      return this.applyFormData
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
</style>
