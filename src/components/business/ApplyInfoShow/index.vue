<template>
  <apply-form-item data="申请信息" v-if="applyCode!=undefined">
    <div class="content">
      <Apply56004
        applyType="56004"
        class="hxl_item"
        v-if="applyCode=='56004'"
        :applyFormData="applyFormData_56004"
        ref="56004"
      ></Apply56004>
      <!-- </apply-form-item> -->
      <Apply56005
        class="hxl_item"
        applyType="56005"
        :applyFormData="applyFormData_56005"
        v-if="applyCode=='56005'"
      ></Apply56005>
      <Apply56008a
        class="hxl_item"
        applyType="56008a"
        :applyFormData="applyFormData_56008a"
        v-if="applyCode=='56008-a'"
      ></Apply56008a>

      <Apply56009
        class="hxl_item"
        applyType="56009"
        :applyFormData="applyFormData_56009"
        v-if="applyCode=='56009'"
      ></Apply56009>
      <Apply56010
        class="hxl_item"
        applyType="56010"
        :applyFormData="applyFormData_56010"
        v-if="applyCode=='56010'"
      ></Apply56010>
      <Apply56012
        class="hxl_item"
        applyType="56012"
        :applyFormData="applyFormData_56012"
        v-if="applyCode=='56012'"
      ></Apply56012>
      <Apply56013
        class="hxl_item"
        applyType="56013"
        :applyFormData="applyFormData_56013"
        v-if="applyCode=='56013'"
      ></Apply56013>
      <Apply56014a
        class="hxl_item"
        applyType="56014a"
        :applyFormData="applyFormData_56014a"
        v-if="applyCode=='56014-a'"
      ></Apply56014a>
      <Apply56014b
        class="hxl_item"
        applyType="56014b"
        :applyFormData="applyFormData_56014b"
        v-if="applyCode=='56014-b'"
      ></Apply56014b>
      <Apply56014c
        class="hxl_item"
        applyType="56014c"
        :applyFormData="applyFormData_56014c"
        v-if="applyCode=='56014-c'"
      ></Apply56014c>
      <Apply560143a
        class="hxl_item"
        applyType="560143a"
        :applyFormData="applyFormData_560143a"
        v-if="applyCode=='56014-3-a'"
      ></Apply560143a>
      <Apply56022a
        class="hxl_item"
        applyType="56022a"
        :applyFormData="applyFormData_56022a"
        v-if="applyCode=='56022-a'"
      ></Apply56022a>
      <Apply56014d
        class="hxl_item"
        applyType="56014d"
        :applyFormData="applyFormData_56014d"
        v-if="applyCode=='56014-d'"
      ></Apply56014d>
      <Apply56022b
        class="hxl_item"
        applyType="56022b"
        :applyFormData="applyFormData_56022b"
        v-if="applyCode=='56022-b'"
      ></Apply56022b>
      <Apply560143b
        class="hxl_item"
        applyType="560143b"
        :applyFormData="applyFormData_560143b"
        v-if="applyCode=='56014-3-b'"
      ></Apply560143b>
      <!-- 56011确认页缺失 -->
      <Apply56011a v-if="applyCode=='56011-a'"></Apply56011a>
      <Apply56011b v-if="applyCode=='56011-b'"></Apply56011b>
      <!--    <Apply56011a-->
      <!--      class="hxl_item"-->
      <!--      applyType="56011a"-->
      <!--      v-if="applyCode=='56011-a'">-->
      <!--    </Apply56011a>-->
      <!--    <Apply56011b-->
      <!--      class="hxl_item"-->
      <!--      applyType="56011b"-->
      <!--      v-if="applyCode=='56011-b'">-->
      <!--    </Apply56011b>-->
      <Apply56015a
        class="hxl_item"
        applyType="56015a"
        :applyFormData="applyFormData_56015a"
        v-if="applyCode=='56015-a'"
      ></Apply56015a>
      <Apply56015b
        class="hxl_item"
        applyType="56015b"
        :applyFormData="applyFormData_56015b"
        v-if="applyCode=='56015-b'"
      ></Apply56015b>
      <Apply56015c
        class="hxl_item"
        applyType="56015c"
        :applyFormData="applyFormData_56015c"
        v-if="applyCode=='56015-c'"
      ></Apply56015c>
      <Apply56019
        class="hxl_item"
        applyType="56019"
        :applyFormData="applyFormData_56019"
        v-if="applyCode=='56019'"
      ></Apply56019>
      <!-- 56008-b确认页缺失 -->
      <Apply56008b v-if="applyCode=='56008-b'"></Apply56008b>
      <!--    <Apply56008b-->
      <!--      class="hxl_item"-->
      <!--      applyType="56008b"-->
      <!--      v-if="applyCode=='56008-b'">-->
      <!--    </Apply56008b>-->
      <Apply56016
        class="hxl_item"
        applyType="56016"
        :applyFormData="applyFormData_56016"
        v-if="applyCode=='56016'"
      ></Apply56016>
      <!-- 确认页缺失 -->
      <Safety v-if="applyCode=='safety'"></Safety>
      <Fixplan v-if="applyCode=='fixplan'"></Fixplan>
      <!--    <Safety-->
      <!--      class="hxl_item"-->
      <!--      applyType="safety"-->
      <!--      v-if="applyCode=='safety'">-->
      <!--    </Safety>-->
      <!--    <Fixplan-->
      <!--      class="hxl_item"-->
      <!--      applyType="fixplan"-->
      <!--      v-if="applyCode=='fixplan'">-->
      <!--    </Fixplan>-->
    </div>
  </apply-form-item>
</template>
<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import Apply56004 from '@/components/business/ConfirmMessage56004'
import Apply56005 from '@/components/business/ConfirmMessage56005'
import Apply56008a from '@/components/business/ConfirmMessage56008/majorMatter'
import Apply56008b from '@/views/personal/schedule/56008/commonMatter'
// import Apply56008b from '@/components/business/ConfirmMessage56008b'
import Apply56009 from '@/components/business/ConfirmMessage56009'
import Apply56010 from '@/components/business/ConfirmMessage56010'

import Apply56011a from '@/views/personal/schedule/56011/culturalRelics'
import Apply56011b from '@/views/personal/schedule/56011/culturalRelics'
// import Apply56011a from '@/components/business/ConfirmMessage56011a'
// import Apply56011b from '@/components/business/ConfirmMessage56011b'
import Apply56012 from '@/components/business/ConfirmMessage56012'
import Apply56013 from '@/components/business/ConfirmMessage56013'
import Apply56014a from '@/components/business/ConfirmMessage56014/rescue'
import Apply56014b from '@/components/business/ConfirmMessage56014/financing'
import Apply56014c from '@/components/business/ConfirmMessage56014/n_approvalplan'
import Apply56014d from '@/components/business/ConfirmMessage56014/p_approvalplan'
import Apply560143a from '@/components/business/ConfirmMessage56014/n_reportCRB'
import Apply560143b from '@/components/business/ConfirmMessage56014/p_reportCRB'
import Apply56015a from '@/components/business/ConfirmMessage56015/copyPlan'
import Apply56015b from '@/components/business/ConfirmMessage56015/repairPlan'
import Apply56015c from '@/components/business/ConfirmMessage56015/rubbingsPlan'
import Apply56016 from '@/components/business/ConfirmMessage56016'
import Apply56019 from '@/components/business/ConfirmMessage56019'

import Apply56022a from '@/components/business/ConfirmMessage56022/n_protectPlan'
import Apply56022b from '@/components/business/ConfirmMessage56022/p_protectPlan'
// import Safety from '@/components/business/Apply/safety'
// import Fixplan from '@/components/business/Apply/fixplan'
import Safety from '@/views/personal/schedule/protectPlan'
import Fixplan from '@/views/personal/schedule/repairPlan'
//  申请表组件
// 专家意见评审组件
// 父传子组件
export default {
  components: {
    ApplyFormItem,
    Apply56004,
    Apply56005,
    Apply56008a,
    Apply56008b,
    Apply56009,
    Apply56010,
    Apply56011a,
    Apply56011b,
    Apply56012,
    Apply56013,
    Apply56014a,
    Apply56014b,
    Apply56014c,
    Apply56014d,
    Apply560143a,
    Apply560143b,
    Apply56015a,
    Apply56015b,
    Apply56015c,
    Apply56016,
    Apply56019,
    Apply56022a,
    Apply56022b,
    Safety,
    Fixplan
  },
  props: {
    applyCode: String
  },
  data() {
    return {
      applyFormData_56004: {
        applyDocument: [],
        applyDocumentNo: '120291',
        applyDocumentTitle: '1',
        applyItemName: '1',
        applyPerson: '岱宗夫',
        assessmentReport: [],
        buildNecessary: '1',
        businessRange: '省级',
        chargePerson: '莫雨',
        chargeQualityType: '甲级',
        companyLevel: '甲级',
        compilationBasis: '1',
        designPerson: '博仁有限公司',
        emergencyMeasure: '1',
        handlePerson: '谢云流',
        isRevolutionRelic: '2',
        level: '甲',
        lineChose: '1',
        nationalSecurityName: '周口店遗址',
        other: [],
        otherIntroduction: '1',
        planName: '1',
        planType: '1',
        projectName: '1',
        projectSituationIntroduction: '1',
        protectPlan: [],
        province: '北京',
        qualityNum: '20200429',
        qualityType: '国办',
        relicCategory: '石器',
        relicReport: [],
        sendOrganization: '1',
        technologyDocument: [],
        technologyMeasure: '1',
        telNo: '14789287364',
        worldHeritage: '2'
      },
      applyFormData_56005: {
        applyDocument: [],
        applyDocumentNo: '1202911',
        applyDocumentTitle: '11',
        applyItemName: '1',
        applyPerson: '岱宗夫',
        assessmentReport: [],
        buildNecessary: '1',
        businessRange: '国级',
        chargePerson: '莫雨',
        chargeQualityType: '甲级',
        companyLevel: '甲级',
        compilationBasis: '1',
        designPerson: '博仁有限公司',
        emergencyMeasure: '1',
        handlePerson: '谢云流',
        isRevolutionRelic: '2',
        level: '甲',
        lineChose: '1',
        nationalSecurityName: '周口店遗址',
        other: [],
        otherIntroduction: '1',
        planName: '1',
        planType: '1',
        projectName: '1',
        projectSituationIntroduction: '1',
        protectPlan: [],
        province: '北京',
        qualityNum: '20200429',
        qualityType: '国办',
        relicCategory: '石器',
        relicReport: [],
        sendOrganization: '1',
        technologyDocument: [],
        technologyMeasure: '1',
        telNo: '14789309283',
        worldHeritage: '2'
      },
      applyFormData_56008a: {
        appendix: '1',
        applyDocument: [],
        applyDocumentNo: '120211',
        applyDocumentTitle: '11',
        applyItemName: '1',
        applyPerson: '岱宗夫',
        archaeologyInvestigate: '1',
        archaeologyPlan: [],
        archaeologyWithResearch: '1',
        chronicle: '1',
        companyLevel: '甲级',
        drawingDescribe: '',
        environmentRenovate: '',
        formationCompany: '',
        funds: '',
        generalRules: '',
        handlePerson: '',
        infrastructurePlanning: '',
        isRevolutionRelic: '',
        managerPlanning: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        periodizationPlanning: '',
        principleTarget: '',
        projectName: '',
        protectFunds: '',
        protectPlan: '',
        protectRange: '',
        protestObject: '',
        province: '',
        relicCategory: '',
        remainderPlan: '',
        remainderProtectWithdevelopment: '',
        researchDocument: '',
        researchPlainning: '',
        reserveRules: '',
        securityPlan: '',
        sendOrganization: '',
        showRules: '',
        showUseRulse: '',
        suggestion: '',
        telNo: '',
        workPlan: '',
        worldHeritage: '',
        worthAsscess: ''
      },
      applyFormData_56009: {
        appendix: '',
        applyDocument: [],
        applyDocumentNo: '120211',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '岱宗夫',
        archaeologyInvestigate: '',
        archaeologyPlan: [],
        archaeologyWithResearch: '',
        chronicle: '',
        companyLevel: '甲级',
        drawingDescribe: '',
        environmentRenovate: '',
        formationCompany: '',
        funds: '',
        generalRules: '',
        handlePerson: '谢云流',
        infrastructurePlanning: '',
        isRevolutionRelic: '2',
        managerPlanning: '',
        nationalSecurityName: '周口店遗址',
        other: [],
        otherIntroduction: '',
        periodizationPlanning: '',
        principleTarget: '',
        projectName: '',
        protectFunds: '',
        protectPlan: '',
        protectRange: '',
        protestObject: '',
        province: '北京',
        relicCategory: '石器',
        remainderPlan: '',
        remainderProtectWithdevelopment: '',
        researchDocument: '',
        researchPlainning: '',
        reserveRules: '',
        securityPlan: '',
        sendOrganization: '',
        showRules: '',
        showUseRulse: '',
        suggestion: [],
        telNo: '14789022938',
        workPlan: [],
        worldHeritage: '2',
        worthAsscess: ''
      },
      applyFormData_56010: {
        applyDocument: [],
        applyDocumentNo: '120211',
        applyDocumentTitle: '1',
        applyItemName: '1',
        applyPerson: '岱宗夫',
        assessmentReport: [],
        buildNecessary: '1',
        businessRange: '市级',
        chargePerson: '莫雨',
        chargeQualityType: '甲级',
        compilationBasis: '1',
        designPerson: '',
        emergencyMeasure: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        lineChose: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectName: '',
        projectSituationIntroduction: '',
        protectPlan: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        relicCategory: '',
        relicReport: '',
        sendOrganization: '',
        technologyDocument: '',
        technologyMeasure: '',
        telNo: '',
        worldHeritage: ''
      },
      applyFormData_56012: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        assessmentReport: '',
        buildNecessary: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        compilationBasis: '',
        designPerson: '',
        emergencyMeasure: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        lineChose: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectName: '',
        projectSituationIntroduction: '',
        protectPlan: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        relicCategory: '',
        relicReport: '',
        sendOrganization: '',
        technologyDocument: '',
        technologyMeasure: '',
        telNo: '',
        worldHeritage: ''
      },
      applyFormData_56013: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentNum_part1: '',
        applyDocumentNum_part2: '',
        applyDocumentNum_part3: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        applyPurposeResult: '',
        bsdw: '',
        bzdw: '',
        cjwwjzrbbqd: '',
        detailAddress: '',
        detailInstroduction: '',
        funds: '',
        fundsSource: '',
        fundsSource_part1: '',
        fundsSource_part2: '',
        geographyLocation: '',
        handlePerson: '',
        hzkgdcktfjhyjxmdpzwj: '',
        isRevolutionRelic: '',
        jcjglocation: '',
        jcjglocation_part1: '',
        jcjglocation_part2: '',
        jwjcjggk: '',
        jwjcjgmc: '',
        other: '',
        otherIntroduction: '',
        projectName: '',
        relicSpecimenName: '',
        swwjyj: '',
        telNo: '',
        worldHeritage: ''
      },
      applyFormData_56014a: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        approvalReport: '',
        asscessConclusion: '',
        assessReport: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        damagedStatistics: '',
        departmentOpinion: '',
        designAccording: '',
        designIntroduction: '',
        designPerson: '',
        designTask: '',
        excavateReport: '',
        experimentReport: '',
        explorationReport: '',
        geographicalEnvironment: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectCategory: '',
        projectEstimate: '',
        projectIntroduction: '',
        projectName: '',
        projectProperties: '',
        projectRange: '',
        protectRange: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        rangeScale: '',
        relicCategory: '',
        repairSituation: '',
        reserve: '',
        resultAnalysis: '',
        sendOrganization: '',
        situationDescribe: '',
        telNo: '',
        worldHeritage: '',
        worthEstimate: ''
      },
      applyFormData_56014b: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        approvalReport: '',
        asscessConclusion: '',
        assessReport: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        damagedStatistics: '',
        departmentOpinion: '',
        designAccording: '',
        designIntroduction: '',
        designPerson: '',
        designTask: '',
        excavateReport: '',
        experimentReport: '',
        explorationReport: '',
        geographicalEnvironment: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectCategory: '',
        projectEstimate: '',
        projectIntroduction: '',
        projectName: '',
        projectProperties: '',
        projectRange: '',
        protectRange: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        rangeScale: '',
        relicCategory: '',
        repairSituation: '',
        reserve: '',
        resultAnalysis: '',
        sendOrganization: '',
        situationDescribe: '',
        telNo: '',
        worldHeritage: '',
        worthEstimate: ''
      },
      applyFormData_56014c: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        approvalReport: '',
        approvalResponse: '',
        asscessConclusion: '',
        assessReport: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        damagedStatistics: '',
        departmentOpinion: '',
        designAccording: '',
        designIntroduction: '',
        designPerson: '',
        designTask: '',
        excavateReport: '',
        experimentReport: '',
        explorationReport: '',
        geographicalEnvironment: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectCategory: '',
        projectEstimate: '',
        projectIntroduction: '',
        projectName: '',
        projectProperties: '',
        projectRange: '',
        protectRange: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        rangeScale: '',
        relicCategory: '',
        repairSituation: '',
        replayDocumentNo: '',
        replayDocumentTitle: '',
        replayTime: '',
        reserve: '',
        resultAnalysis: '',
        sendOrganization: '',
        situationDescribe: '',
        telNo: '',
        worldHeritage: '',
        worthEstimate: ''
      },
      applyFormData_560143a: {
        CRBOpinion: '',
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentNum_part1: '',
        applyDocumentNum_part2: '',
        applyDocumentNum_part3: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        companyLocation: '',
        designPerson: '',
        fundsSource: '',
        fundsSource_part1: '',
        fundsSource_part2: '',
        handlePerson: '',
        inspectionReport: '',
        isRevolutionRelic: '',
        level: '',
        materialList: '',
        nationalSecurityName: '',
        other: '',
        otherConstitute: '',
        otherIntroduction: '',
        palnDesign: '',
        palnTime: '',
        planName: '',
        planType: '',
        projectArrange: '',
        projectCategory: '',
        projectConstituteCheckList: '',
        projectEnsure: '',
        projectEstimate: '',
        projectEstimateBook: '',
        projectName: '',
        protectScale: '',
        province: '',
        proxyStatement: '',
        qualityNum: '',
        qualityType: '',
        relicCategory: '',
        reportAndPhoto: '',
        reviewDocument: '',
        riskAssessment: '',
        rulesPromise: '',
        sendOrganization: '',
        taskStatement: '',
        telNo: '',
        worldHeritage: ''
      },
      applyFormData_56022a: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        approvalReport: '',
        asscessConclusion: '',
        assessReport: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        damagedStatistics: '',
        departmentOpinion: '',
        designAccording: '',
        designIntroduction: '',
        designPerson: '',
        designTask: '',
        excavateReport: '',
        experimentReport: '',
        explorationReport: '',
        geographicalEnvironment: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectCategory: '',
        projectEstimate: '',
        projectIntroduction: '',
        projectName: '',
        projectProperties: '',
        projectRange: '',
        protectRange: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        rangeScale: '',
        relicCategory: '',
        repairSituation: '',
        reserve: '',
        resultAnalysis: '',
        sendOrganization: '',
        situationDescribe: '',
        telNo: '',
        worldHeritage: '',
        worthEstimate: ''
      },
      applyFormData_56014d: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        approvalReport: '',
        approvalResponse: '',
        asscessConclusion: '',
        assessReport: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        damagedStatistics: '',
        departmentOpinion: '',
        designAccording: '',
        designIntroduction: '',
        designPerson: '',
        designTask: '',
        excavateReport: '',
        experimentReport: '',
        explorationReport: '',
        geographicalEnvironment: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectCategory: '',
        projectEstimate: '',
        projectIntroduction: '',
        projectName: '',
        projectProperties: '',
        projectRange: '',
        protectRange: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        rangeScale: '',
        relicCategory: '',
        repairSituation: '',
        replayDocumentNo: '',
        replayDocumentTitle: '',
        replayTime: '',
        reserve: '',
        resultAnalysis: '',
        sendOrganization: '',
        situationDescribe: '',
        telNo: '',
        worldHeritage: '',
        worthEstimate: ''
      },
      applyFormData_56022b: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        approvalReport: '',
        asscessConclusion: '',
        assessReport: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        damagedStatistics: '',
        departmentOpinion: '',
        designAccording: '',
        designIntroduction: '',
        designPerson: '',
        designTask: '',
        excavateReport: '',
        experimentReport: '',
        explorationReport: '',
        geographicalEnvironment: '',
        handlePerson: '',
        isRevolutionRelic: '',
        level: '',
        nationalSecurityName: '',
        other: '',
        otherIntroduction: '',
        planName: '',
        planType: '',
        projectCategory: '',
        projectEstimate: '',
        projectIntroduction: '',
        projectName: '',
        projectProperties: '',
        projectRange: '',
        protectRange: '',
        province: '',
        qualityNum: '',
        qualityType: '',
        rangeScale: '',
        relicCategory: '',
        repairSituation: '',
        reserve: '',
        resultAnalysis: '',
        sendOrganization: '',
        situationDescribe: '',
        telNo: '',
        worldHeritage: '',
        worthEstimate: ''
      },
      applyFormData_560143b: {
        CRBOpinion: '',
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyItemName: '',
        applyPerson: '',
        businessRange: '',
        chargePerson: '',
        chargeQualityType: '',
        companyLevel: '',
        companyLocation: '',
        designPerson: '',
        fundsSource: '',
        handlePerson: '',
        inspectionReport: '',
        isRevolutionRelic: '',
        level: '',
        materialList: '',
        nationalSecurityName: '',
        other: '',
        otherConstitute: '',
        otherIntroduction: '',
        palnDesign: '',
        palnTime: '',
        planName: '',
        planType: '',
        projectArrange: '',
        projectCategory: '',
        projectConstituteCheckList: '',
        projectEnsure: '',
        projectEstimate: '',
        projectEstimateBook: '',
        projectName: '',
        protectScale: '',
        province: '',
        proxyStatement: '',
        qualityNum: '',
        qualityType: '',
        relicCategory: '',
        reportAndPhoto: '',
        reviewDocument: '',
        riskAssessment: '',
        rulesPromise: '',
        sendOrganization: '',
        taskStatement: '',
        telNo: '',
        worldHeritage: ''
      },
      applyFormData_56015a: {
        applyDocument: [],
        applyDocumentNo: '120291',
        applyDocumentTitle: '1',
        applyPerson: '1',
        companyAddress: '1',
        handlePerson: '1',
        postCode: '1',
        tableData: [
          {
            integrated: '残',
            preserveStatus: '迄今发现青铜方壶中保存较为完整',
            relicCategory: '青铜器',
            relicLevel: '二级',
            relicName: '莲鹤方壶',
            sumNo: '202004231847'
          },
          {
            integrated: '完',
            preserveStatus: '器具完整',
            relicCategory: '器具',
            relicLevel: '一级',
            relicName: ' 狸猫纹漆食盘',
            sumNo: '202004231854'
          },
          {
            integrated: '完',
            preserveStatus: '缺纹',
            relicCategory: '青铜器',
            relicLevel: '一级',
            relicName: ' 古滇国贮贝器',
            sumNo: '202004231858'
          }
        ],
        telNo: '1'
      },
      applyFormData_56015b: {
        applyDocument: [],
        applyDocumentNo: '120291',
        applyDocumentTitle: '1',
        applyPerson: '1',
        companyAddress: '1',
        handlePerson: '1',
        postCode: '1',
        tableData: [
          {
            integrated: '残',
            preserveStatus: '迄今发现青铜方壶中保存较为完整',
            relicCategory: '青铜器',
            relicLevel: '二级',
            relicName: '莲鹤方壶',
            sumNo: '202004231847'
          },
          {
            integrated: '完',
            preserveStatus: '器具完整',
            relicCategory: '器具',
            relicLevel: '一级',
            relicName: ' 狸猫纹漆食盘',
            sumNo: '202004231854'
          },
          {
            integrated: '完',
            preserveStatus: '缺纹',
            relicCategory: '青铜器',
            relicLevel: '一级',
            relicName: ' 古滇国贮贝器',
            sumNo: '202004231858'
          }
        ],
        telNo: '1'
      },
      applyFormData_56015c: {
        applyDocument: [],
        applyDocumentNo: '120291',
        applyDocumentTitle: '1',
        applyPerson: '1',
        companyAddress: '1',
        handlePerson: '1',
        postCode: '1',
        tableData: [
          {
            integrated: '残',
            preserveStatus: '迄今发现青铜方壶中保存较为完整',
            relicCategory: '青铜器',
            relicLevel: '二级',
            relicName: '莲鹤方壶',
            sumNo: '202004231847'
          },
          {
            integrated: '完',
            preserveStatus: '器具完整',
            relicCategory: '器具',
            relicLevel: '一级',
            relicName: ' 狸猫纹漆食盘',
            sumNo: '202004231854'
          },
          {
            integrated: '完',
            preserveStatus: '缺纹',
            relicCategory: '青铜器',
            relicLevel: '一级',
            relicName: ' 古滇国贮贝器',
            sumNo: '202004231858'
          }
        ],
        telNo: '1'
      },
      applyFormData_56019: {
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyPerson: '',
        collectCompany: '',
        collectTime: '',
        companyAddress: '',
        damagedStatistics: '',
        handlePerson: '',
        integrated: '',
        integratedDetail: '',
        number: '',
        palnDesign: '',
        postCode: '',
        preservation: '',
        proxyStatement: '',
        relicCategory: '',
        relicLevel: '',
        relicName: '',
        relicSource: '',
        repairSituation: '',
        resultAnalysis: '',
        situationDescribe: '',
        size: '',
        sumNo: '',
        taskStatement: '',
        telNo: '',
        texture: '',
        worthEstimate: '',
        years: ''
      },
      applyFormData_56016: {
        abroadCooperation: '',
        applyDocument: '',
        applyDocumentNo: '',
        applyDocumentTitle: '',
        applyPerson: '',
        companyAddress: '',
        exhibitionCountry: '',
        exhibitionName: '',
        exhibitionNum: '',
        exhibitionTime: '',
        fristNum: '',
        handlePerson: '',
        inspectionReport: '',
        materialList: '',
        palnDesign: '',
        postCode: '',
        projectEstimateBook: '',
        proxyStatement: '',
        reportAndPhoto: '',
        riskAssessment: '',
        taskStatement: '',
        telNo: ''
      }
    }
  },
  methods: {},
  computed: {},
  beforeMount() {
    // this.applyCode=this.$route.query.applyCode
  },
  mounted() {
    console.log(this.applyCode)

    // 显示bug，目前不知道scope传值是什么，报数组下标越界
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  white-space: normal !important;
  line-height: 15px;
}
/deep/ .el-card__body {
  // padding: 12px;
  padding-top: 0px;
}
</style>

