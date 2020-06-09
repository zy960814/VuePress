import Layout from '@/components/commons/Layout'

/**
 * 国局用户
 */
const nationalRouter = {
  path: '',
  component: Layout,
  children: [
    // 行业执法监管任务信息-司领导列表页
    {
      name: 'adminLaw',
      path: '/national/industry-regulation/admin-law',
      component: () => import('@/views/national/industry-regulation/admin-law'),
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    // 行业执法监管任务信息-司领导任务调整
    {
      name: 'taskAdjust',
      path: '/national/industry-regulation/admin-law/task-adjust',
      component: () => import('@/views/national/industry-regulation/admin-law/task-adjust')
    },
    // 行业执法监管任务信息-检察人员列表页
    {
      name: 'adminlawtask',
      path: '/national/industry-regulation/adminlaw-task',
      component: () => import('@/views/national/industry-regulation/adminlaw-task')
    },
    // 行业执法监管任务信息填报（信息填报—系统自动生成任务）
    {
      name: 'tableFillinSys',
      path: '/national/industry-regulation/adminlaw-task/messagefillin-sys',
      component: () => import('@/views/national/industry-regulation/adminlaw-task/messageFillin-sys')
    },
    // 行业执法监管任务信息填报（信息填报—检查人员新建任务）
    {
      name: 'tableFillinPerson',
      path: '/national/industry-regulation/adminlaw-task/messagefillin-personal',
      component: () => import('@/views/national/industry-regulation/adminlaw-task/messageFillin-personal')
    },
    // 行业执法监管 - 在线监管 -综合分析评价
    {
      path: '/national/industry-regulation/comprehensive-assessment',
      component: () => import('@/views/national/industry-regulation/comprehensive-assessment')
    },
    // 行业执法监管任务信息-审核人员列表页
    {
      name: 'adminlawaudit',
      path: '/national/industry-regulation/adminlaw-audit',
      component: () => import('@/views/national/industry-regulation/adminlaw-audit')
    },
    // 行业执法监管任务信息-审核人员信息审核
    {
      name: 'messageAudit',
      path: '/national/industry-regulation/adminlaw-audit/message-audit',
      component: () => import('@/views/national/industry-regulation/adminlaw-audit/message-audit')
    },
    // 从业信息维护-文保司意见审核
    {
      name: 'national-audit',
      path: '/national/national-audit',
      component: () => import('@/views/national/national-audit')
    },
    {
      name: 'national-audit',
      path: '/national/national-audit/Opinions',
      component: () => import('@/views/national/national-audit/Opinions')
    },
    // 基础资料
    // 涉案文物鉴定评估机构名单
    {
      path: 'national/initial-value/appraisal',
      component: () =>
        import('@/views/national/initial-value/Appraisal')
    },
    // 民间收藏文物鉴定试点单位名单
    {
      path: 'national/initial-value/authenticate',
      component: () =>
        import('@/views/national/initial-value/Authenticate')
    },
    // 全国重点文物保护单位名单cultural
    {
      path: 'national/initial-value/preservation',
      component: () =>
        import('@/views/national/initial-value/Preservation')
    },
    // 馆藏文物cultural Collect
    {
      path: 'national/initial-value/cultural',
      component: () =>
        import('@/views/national/initial-value/Cultural')
    },
    // 历史文化名村
    {
      path: 'national/initial-value/village',
      component: () =>
        import('@/views/national/initial-value/Village')
    },
    // 资格人员
    {
      path: 'national/initial-value/supervision',
      component: () =>
        import('@/views/national/initial-value/Supervision')
    },
    // 革命文物保护利用片区分县名单
    {
      path: 'national/initial-value/revolution',
      component: () =>
        import('@/views/national/initial-value/Revolution')
    },
    // 上海市民间收藏文物鉴定咨询推荐单位名单
    {
      path: 'national/initial-value/recommend',
      component: () =>
        import('@/views/national/initial-value/Recommend')
    },
    // 中国历史文化街区名单
    {
      path: 'national/initial-value/mj',
      component: () =>
        import('@/views/national/initial-value/MJ')
    },
    // 国家文物进出境审核管理处名单
    {
      path: 'national/initial-value/management',
      component: () =>
        import('@/views/national/initial-value/Management')
    },
    // 外国被盗文物数据库
    {
      path: 'national/initial-value/gwbdwwsjk',
      component: () =>
        import('@/views/national/initial-value/Gwbdwwsjk')
    },
    // 全国收藏单位数据库 Collect
    {
      path: 'national/initial-value/collect',
      component: () =>
        import('@/views/national/initial-value/Collect')
    },
    // 全国文物商店/文物拍卖企业名单 cul_protection
    {
      path: 'national/initial-value/companies',
      component: () =>
        import('@/views/national/initial-value/Companies')
    },
    // 全国文物保护工程资质单位数据库 cultureheritage
    {
      path: 'national/initial-value/cul_protection',
      component: () =>
        import('@/views/national/initial-value/Cul_protection')
    },
    // 中国世界文化遗产名录 dataBasiChildren
    {
      path: 'national/initial-value/cultureheritage',
      component: () =>
        import('@/views/national/initial-value/Cultureheritage')
    },
    // 中国历史文化名城名单 dataBasiChildren
    {
      path: 'national/initial-value/dataBasiChildren',
      component: () =>
        import('@/views/national/initial-value/DataBasiChildren')
    },
    // 中国历史文化名镇名单 dataBasiChildren
    {
      path: 'national/initial-value/dataBasiChildrenTwo',
      component: () =>
        import('@/views/national/initial-value/DataBasiChildrenTwo')
    },
    // 考古发掘资质单位数据库
    {
      path: 'national/initial-value/excavation',
      component: () =>
        import('@/views/national/initial-value/Excavation')
    },
    // 考古发掘项目负责人数据库
    {
      path: 'national/initial-value/excavationpeople',
      component: () =>
        import('@/views/national/initial-value/Excavationpeople')
    },
    // 行政许可 - 许可事项
    {
      path: '/national/admin-license/licensing-items',
      component: () =>
        import('@/views/national/admin-license/licensing-items')
    },
    // 行政许可 - 许可事项 - 办理
    {
      path: '/national/admin-license/licensing-items/deal-with',
      component: () =>
        import('@/views/national/admin-license/licensing-items/deal-with')
    },

    // 行业管理 - 文物出境许可督办
    {
      path: '/national/industry-manage/cr-exit-permission',
      component: () =>
        import('@/views/national/industry-manage/cr-exit-permission')
    },

    // 统计分析 - 文物进出境统计
    {
      path: '/national/statistical-analysis/entry-exit-cr',
      component: () =>
        import('@/views/national/statistical-analysis/entry-exit-cr')
    },
    // 统计分析 - 文物本体统计  
    {
      path: '/national/statistical-analysis/cr-noumenon',
      component: () =>
        import('@/views/national/statistical-analysis/cr-noumenon')
    },
    // 统计分析 - 审批事项统计  
    {
      path: '/national/statistical-analysis/approval-items',
      component: () =>
        import('@/views/national/statistical-analysis/approval-items')
    },
    // 统计分析 - 日常工作情况   
    {
      path: '/national/statistical-analysis/routine',
      component: () =>
        import('@/views/national/statistical-analysis/routine')
    },
    // 统计分析 - 审批咨询情况统计   
    {
      path: '/national/statistical-analysis/approval-consultation',
      component: () =>
        import('@/views/national/statistical-analysis/approval-consultation')
    },
    // 行政许可 - 查询检索
    {
      path: '/national/query-retrieve',
      component: () =>
        import('@/views/national/query-retrieve')
    },
    // 行业管理 - 查询检索
    {
      path: '/national/industry-manage/query-retrieve',
      component: () =>
        import('@/views/national/industry-manage/query-retrieve')
    },
    // 行业管理 - 文保单位修缮年度
    {
      path: '/national/industry-manage/bump-unit',
      component: () =>
        import('@/views/national/industry-manage/bump-unit')
    },
    //  行业管理 - 文物安全防护年度计划
    {
      path: '/national/industry-manage/relics-security',
      component: () =>
        import('@/views/national/industry-manage/relics-security')
    },
    //  行业管理 - 保护规划
    {
      path: '/national/industry-manage/conservation-programme',
      component: () =>
        import('@/views/national/industry-manage/conservation-programme')
    },
    //  行政许可-公示
    {
      path: '/national/admin-license/inannounce',
      component: () =>
        import('@/views/national/admin-license/Inannounce')
    }
  ]
};

export default nationalRouter;
