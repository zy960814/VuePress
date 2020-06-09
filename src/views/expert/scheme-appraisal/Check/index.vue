<template>
 <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header">全国重点文物保护单位原址保护措施审批</div>
      <apply-form :data="titleData" @tab-click="itemClick">
        <template #titleInsertR_one>
          <el-button @click="saveOrSubmit('save')" type="primary">保存</el-button>
          <el-button @click="saveOrSubmit('submit')" type="primary">提交</el-button>
          <el-button @click="$router.go(-1)" >返回</el-button>
        </template>
        <template #body>
          <div class="scrollBox" :style="{height: contentHeight}">
            <ReviewParticipate  ref="reviewParticipate" :name='allChildNname[apprCode]'>
              <div slot="reviewContent">
                <!-- <apply-form-item data="保护规划方案专家评审意见表" class="hxl_item " > -->
                  <Expert56004
                    applyType="56004"
                    class="hxl_item"
                    v-if="apprCode=='56004'"
                    ref='56004'>
                  </Expert56004>
                <!-- </apply-form-item> -->

                <Expert56005
                  class="hxl_item"
                  applyType="56005"
                  v-if="apprCode=='56005'">
                </Expert56005>

                <Expert56008a 
                  class="hxl_item"
                  applyType="56008a"
                  v-if="apprCode=='56008-a'">
                </Expert56008a>

                <Expert56009
                  class="hxl_item"
                  applyType="56009"
                  v-if="apprCode=='56009'">
                </Expert56009>
                <expert56010
                  class="hxl_item"
                  applyType="56010"
                  v-if="apprCode=='56010'">
                </expert56010>
                <expert56012
                  class="hxl_item"
                  applyType="56012"
                  v-if="apprCode=='56012'">
                </expert56012>
                <expert56013
                  class="hxl_item"
                  applyType="56013"
                  v-if="apprCode=='56013'">
                </expert56013>
                <Expert56014a
                  class="hxl_item"
                  applyType="56014a"
                  v-if="apprCode=='56014-a'">
                </Expert56014a>
                <Expert56014b
                  class="hxl_item"
                  applyType="56014b"
                  v-if="apprCode=='56014-b'">
                </Expert56014b>
                <Expert56014c
                  class="hxl_item"
                  applyType="56014c"
                  v-if="apprCode=='56014-c'">
                </Expert56014c>
                <Expert560143a
                  class="hxl_item"
                  applyType="560143a"
                  v-if="apprCode=='56014-3-a'">
                </Expert560143a>
                <Expert56022a
                  class="hxl_item"
                  applyType="56022a"
                  v-if="apprCode=='56022-a'"
                  >
                </Expert56022a>
                <Expert56014d
                  class="hxl_item"
                  applyType="56014d"
                  v-if="apprCode=='56014-d'">
                </Expert56014d>
                <Expert56022b
                  class="hxl_item"
                  applyType="56022b"
                  v-if="apprCode=='56022-b'">
                </Expert56022b>
                <expert560143b
                  class="hxl_item"
                  applyType="560143b"
                  v-if="apprCode=='56014-3-b'">
                </expert560143b>
                <Expert56011a
                  class="hxl_item"
                  applyType="56011a"
                  v-if="apprCode=='56011-a'">
                </Expert56011a>
                <Expert56011b
                  class="hxl_item"
                  applyType="56011b"
                  v-if="apprCode=='56011-b'">
                </Expert56011b>
                <Expert56015a
                  class="hxl_item"
                  applyType="56015a"
                  v-if="apprCode=='56015-a'">
                </Expert56015a>
                <Expert56015b
                  class="hxl_item"
                  applyType="56015b"
                  v-if="apprCode=='56015-b'">
                </Expert56015b>
                <Expert56015c
                  class="hxl_item"
                  applyType="56015c"
                  v-if="apprCode=='56015-c'">
                </Expert56015c>
                <Expert56019
                  class="hxl_item"
                  applyType="56019"
                  v-if="apprCode=='56019'">
                </Expert56019>
                <Expert56008b
                  class="hxl_item"
                  applyType="56008b"
                  v-if="apprCode=='56008-b'">
                </Expert56008b>
                <Expert56016
                  class="hxl_item"
                  applyType="56016"
                  v-if="apprCode=='56016'">
                </Expert56016>
                <Safety
                  class="hxl_item"
                  applyType="safety"
                  v-if="apprCode=='safety'">
                </Safety>
                <Fixplan
                  class="hxl_item"
                  applyType="fixplan"
                  v-if="apprCode=='fixplan'">
                </Fixplan>
              </div>
            </ReviewParticipate>
            <div class="hxl_item">
              1111111
            </div>
          </div>
        </template>
      </apply-form>
    </el-card>
  </div>
</template>
<script>
import ApplyForm from '@/components/commons/ApplyForm'
// import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
// import ConfirmMessage from '@/components/business/ConfirmMessage_04051012'
import ReviewParticipate from '@/components/business/Expert/reviewParticipate'
import Expert56004 from '@/components/business/Expert/expert_56004'
import Expert56005 from '@/components/business/Expert/expert_56005'
import Expert56008a from '@/components/business/Expert/expert_56008a'
import Expert56008b from '@/components/business/Expert/expert_56008b'
import Expert56009 from '@/components/business/Expert/expert_56009'
import Expert56010 from '@/components/business/Expert/expert_56010'
import Expert56012 from '@/components/business/Expert/expert_56012'
import Expert56013 from '@/components/business/Expert/expert_56013'
import Expert56014a from '@/components/business/Expert/expert_56014a'
import Expert56014b from '@/components/business/Expert/expert_56014b'
import Expert56014c from '@/components/business/Expert/expert_56014c'
import Expert560143a from '@/components/business/Expert/expert_56014_3a'
import Expert560143b from '@/components/business/Expert/expert_56014_3b'
import Expert56022a from '@/components/business/Expert/expert_56022a'
import Expert56022b from '@/components/business/Expert/expert_56022b'
import Expert56014d from '@/components/business/Expert/expert_56014d'
import Expert56011a from '@/components/business/Expert/expert_56011a'
import Expert56011b from '@/components/business/Expert/expert_56011b'
import Expert56015a from '@/components/business/Expert/expert_56015a'
import Expert56015b from '@/components/business/Expert/expert_56015b'
import Expert56015c from '@/components/business/Expert/expert_56015c'
import Expert56016 from '@/components/business/Expert/expert_56016'
import Expert56019 from '@/components/business/Expert/expert_56019'
import Safety from '@/components/business/Expert/safety'
import Fixplan from '@/components/business/Expert/fixplan'
//  申请表组件
// 专家意见评审组件  
// 父传子组件 
export default {
  components: {
    ApplyForm,
    // ConfirmMessage,
    ReviewParticipate,
    Expert56004,
    Expert56005,
    Expert56008a,
    Expert56008b,
    Expert56009,
    Expert56010,
    Expert56012,
    Expert56013,
    Expert56014a,
    Expert56014b,
    Expert56014c,
    Expert560143a,
    Expert56022a,
    Expert56014d,
    Expert56022b,
    Expert560143b,
    Expert56011a,
    Expert56011b,
    Expert56015a,
    Expert56015b,
    Expert56015c,
    Expert56016,
    Expert56019,
    Safety,Fixplan
  },
  props: {},
  data() {
    return {
      apprCode:'',
      titleData: ['材料信息', '评审意见'],
      allChildNname:{
        '56004':"原址保护措施专家评审意见表",
        '56005':'保护范围涉建专家评审意见表',
        '56008-a':'考古工作计划专家评审意见表',
        '56008-b':'考古一般事项专家评审意见表',
        '56009':'考古工作计划专家评审意见表',
        '56010':'省保单位迁拆专家评审意见表',
        '56012':'建控地带涉建专家评审意见表',
        '56013':'文物境外鉴定专家评审意见表',
        '56014-a':'抢救工程方案专家评审意见表',
        '56014-b':'自筹资金方案专家评审意见表',
        '56014-c':'方案审批专家评审意见表',
        '56014-3-a':'方案审批专家评审意见表',
        '56022-a':'保护规划方案专家评审意见表',
        '56014-d':'方案审批专家评审意见表',
        '56022-b':'保护规划方案专家评审意见表',
        '56014-3-b':'方案审批专家评审意见表',
        '56011-a':'文保资质申请专家评审意见表',
        '56011-b':'文物保护工程方案专家评审意见表',
        '56015-a':'馆藏一级文物修复申请专家评审意见表',
        '56015-b':'馆藏一级文物复制申请专家评审意见表',
        '56015-c':'馆藏一级文物拓印申请专家评审意见表',
        '56016':'中国博物馆展览协会交流专业委员会专家函审意见表',
        '56019':'原址保护措施专家评审意见表',
        'safety':'考古一般事项专家评审意见表',
        'fixplan':'原址保护措施专家评审意见表',
      },
      parmas:{},
    }
  },
  methods: {
    saveOrSubmit(value) {
      if(value=='submit'){
        console.log('submit');
        let flag=this.$refs[this.apprCode].validateForm();
        if(flag){
           this.parmas.a=this.$refs[this.apprCode].getMyFormData();
          // 调接口
        }
      }else if(value=='save'){
        console.log('save');
        this.parmas.a=this.$refs[this.apprCode].getMyFormData();
        // 调接口
      }
    },
   // 锚点点击事件
    itemClick(tab) {
      console.log(+tab.index);
      let nodes = document.querySelectorAll('.hxl_item');
      console.log(nodes[0].offsetTop);
      document.querySelector('.scrollBox').scrollTop =
        nodes[+tab.index].offsetTop - nodes[0].offsetTop
    },
  },
  computed: {
    contentHeight: function() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 235 : 279) +
        'px)'
      )
    },
    dialogHeight() {
      return this.$store.getters.screenHeight > 815
        ? 815
        : this.$store.getters.screenHeight
    }
  },
  beforeMount(){
    this.apprCode=this.$route.query.apprCode
  },
  mounted() {
    // todo 获取url参数
    // let applyCode = '56004' 
    // let applyId 

  },
}
</script>

<style  lang="scss" scoped>
  /deep/ .el-form-item__label {
    white-space: normal !important;
    line-height: 15px;
  }
  /deep/ .el-card__body {
    // padding: 12px;
    padding-top: 0px;
  }
</style>

