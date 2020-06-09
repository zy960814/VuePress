<template>
  <div>
    <sub-title data="项目信息"/>
    <vertical-table
        title="基本信息"
        :verticalTableData="basicData"
        :verticalTableTitle="basicTitle"
        width="180px"
    ></vertical-table>
    <vertical-table
        title="工程概况"
        borderTitle="none"
        :verticalTableData="extData"
        :verticalTableTitle="extTitle"
        width="180px"
    ></vertical-table>
  </div>
</template>

<script>
  import SubTitle from '@/components/commons/SubTitle'
  import VerticalTable from '@/components/commons/VerticalTable'

  export default {
    components: {
      SubTitle,
      VerticalTable
    },
    props: {
      basicData: {
        type: Object,
        require: true
      },
      extData: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        basicTitle: [
          {projectName: '项目名称'},
          {planName: '方案名称'},
          {planType: '方案编制方式'},
          {designPerson: '方案编制单位'},
          {qualityType: '资质类型'},
          {level: '级别'},
          {businessRange: '业务范围'},
          {chargePerson: '方案编制负责人'},
          {chargeQualityType: '专业资格类型'},
          {qualityNum: '专业证书编号'},
          {sendOrganization: '报送单位 '},
          {otherIntroduction: '其他说明'}
        ],
        extTitle: [
          {projectSituationIntroduction: '工程概况说明'},
          {buildNecessary: '建设的必要性'},
          {compilationBasis: '编制依据'},
          {lineChose: '线路选择'},
          {technologyMeasure: '文物保护技术措施'},
          {emergencyMeasure: '文物保护应急措施'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
