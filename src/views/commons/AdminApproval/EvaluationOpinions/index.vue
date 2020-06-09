<template>
  <apply-form-item data="评审意见">
    <div class="clear-float">
      <el-button type="primary" class="fl">一键复制评审意见</el-button>
      <el-radio-group v-model="type" class="fr">
        <el-radio-button label="card">
          <i class="el-icon-menu"></i>
        </el-radio-button>
        <el-radio-button label="list">
          <i class="el-icon-tickets"></i>
        </el-radio-button>
      </el-radio-group>
    </div>
    <eva-opinion-card v-bind="$attrs" :cardList="cardList" v-if="type==='card'" />
    <eva-opinion-list :cardDetail="cardDetail" v-if="type==='list'" />
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import EvaOpinionCard from './EvaOpinionCard'
import EvaOpinionList from './EvaOpinionList'

export default {
  components: {
    ApplyFormItem,
    EvaOpinionCard,
    EvaOpinionList
  },
  data() {
    return {
      type: 'card', // list
      cardList: [
        {
          expertType: '专家姓名',
          expert: '张磊',
          result: '通过',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 1,
          flagButtonTwo: 1
        },
        {
          expertType: '专家姓名',
          expert: '张磊',
          result: '待评审',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 2,
          flagButtonTwo: 2
        },
        {
          expertType: '专家姓名',
          expert: '张磊',
          result: '拒绝评审',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 1,
          flagButtonTwo: 0
        },
        {
          expertType: '评估机构名称',
          expert: '佑宝斋',
          result: '不通过',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 1,
          flagButtonTwo: 1
        },
        {
          expertType: '评估机构名称',
          expert: '佑宝斋',
          result: '待评审',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 2,
          flagButtonTwo: 2
        },
        {
          expertType: '会审',
          expert: '会审',
          result: '通过',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 1,
          flagButtonTwo: 1
        },
        {
          expertType: '会审',
          expert: '会审',
          result: '待评审',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          flagButtonOne: 3,
          flagButtonTwo: 0
        }
      ],
      cardDetail: [
        {
          expert: '张磊',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          command:
            '《南京历史文化名城保护规划》（2010-2020）在“7.3.3 章节： 重要古墓葬、古遗址”中对南京古墓葬和古遗址有如下控制要求： “规划划定重要古墓葬、古遗址195 处。重要的古墓葬、古遗址需登录建档，档案中应当明确其名称、位置、价值特色、周边环境、文化背景、保护范围以及保护对策。 保护重要的古墓葬、古遗址所在的自然山水环境及其自身的轴线对应关系，重要的的古墓葬、古遗址原则上不得灭失，并按照南京的相关地方法规进行保护。确因重大项目或市政工程建设的需要必须拆除或迁移的，必须通过规划、城市设计、建筑设计、博物馆展示等多种手段，制定各种可能形式的异地保护其历史文化信息的方案，征求规划、文物及相关部门同意后，按原程序审批后方可进行。”',
          paper: '齐全。',
          instroduction: '项目性质、范围和内容清晰、明确。',
          opinion:
            '一、同意万安陵石刻保护亭改造方案。 二、整体布局过于凌乱，若干主题冲淡了万安陵石刻文化主题和陵寝性质；建筑、小品等景观处理，过于现代城市公园化，冲淡了陵园应有的祥和、肃穆氛围。建议进一步减缩。建议按照国家文物局意见要求，进一步缩小硬化、美化区域和范围，进一步研究丘顶清净园亭建筑形式及用材。',
          result: '通过',
          remarks: ''
        },
        {
          expert: '张磊',
          receiveTime: '2020-04-06 17:29:42',
          stayTime: '0',
          command:
            '《南京历史文化名城保护规划》（2010-2020）在“7.3.3 章节： 重要古墓葬、古遗址”中对南京古墓葬和古遗址有如下控制要求： “规划划定重要古墓葬、古遗址195 处。重要的古墓葬、古遗址需登录建档，档案中应当明确其名称、位置、价值特色、周边环境、文化背景、保护范围以及保护对策。 保护重要的古墓葬、古遗址所在的自然山水环境及其自身的轴线对应关系，重要的的古墓葬、古遗址原则上不得灭失，并按照南京的相关地方法规进行保护。确因重大项目或市政工程建设的需要必须拆除或迁移的，必须通过规划、城市设计、建筑设计、博物馆展示等多种手段，制定各种可能形式的异地保护其历史文化信息的方案，征求规划、文物及相关部门同意后，按原程序审批后方可进行。”',
          paper: '齐全。',
          instroduction: '项目性质、范围和内容清晰、明确。',
          opinion:
            '一、同意万安陵石刻保护亭改造方案。 二、整体布局过于凌乱，若干主题冲淡了万安陵石刻文化主题和陵寝性质；建筑、小品等景观处理，过于现代城市公园化，冲淡了陵园应有的祥和、肃穆氛围。建议进一步减缩。建议按照国家文物局意见要求，进一步缩小硬化、美化区域和范围，进一步研究丘顶清净园亭建筑形式及用材。',
          result: '通过',
          remarks: ''
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
