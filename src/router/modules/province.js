import Layout from '@/components/commons/Layout'

/**
 * 省局用户
 */
const provinceRouter = {
  path: '',
  component: Layout,
  children: [{
      path: 'province/opinions-provincial',
      component: () =>
        import('@/views/province/opinions-provincial')
    }, {
      path: '/province/plan-apply',
      component: () =>
        import('@/views/province/plan-apply'),
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/province/admin-apply',
      component: () =>
        import('@/views/province/admin-apply'),
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: 'province/opinions-provincial/Opinions',
      component: () =>
        import('@/views/province/opinions-provincial/Opinions')
    },
    // 基础资料
    // 涉案文物鉴定评估机构名单
    {
      path: 'province/initial-value/appraisal',
      component: () =>
        import('@/views/province/initial-value/Appraisal')
    },
    // 民间收藏文物鉴定试点单位名单
    {
      path: 'province/initial-value/authenticate',
      component: () =>
        import('@/views/province/initial-value/Authenticate')
    },
    // 全国重点文物保护单位名单cultural
    {
      path: 'province/initial-value/preservation',
      component: () =>
        import('@/views/province/initial-value/Preservation')
    },
    // 馆藏文物cultural Collect
    {
      path: 'province/initial-value/cultural',
      component: () =>
        import('@/views/province/initial-value/Cultural')
    },
    // 历史文化名村
    {
      path: 'province/initial-value/village',
      component: () =>
        import('@/views/province/initial-value/Village')
    },
    // 资格人员
    {
      path: 'province/initial-value/supervision',
      component: () =>
        import('@/views/province/initial-value/Supervision')
    },
    // 革命文物保护利用片区分县名单
    {
      path: 'province/initial-value/revolution',
      component: () =>
        import('@/views/province/initial-value/Revolution')
    },
    // 上海市民间收藏文物鉴定咨询推荐单位名单
    {
      path: 'province/initial-value/recommend',
      component: () =>
        import('@/views/province/initial-value/Recommend')
    },
    // 中国历史文化街区名单
    {
      path: 'province/initial-value/mj',
      component: () =>
        import('@/views/province/initial-value/MJ')
    },
    // 国家文物进出境审核管理处名单
    {
      path: 'province/initial-value/management',
      component: () =>
        import('@/views/province/initial-value/Management')
    },
    // 外国被盗文物数据库
    {
      path: 'province/initial-value/gwbdwwsjk',
      component: () =>
        import('@/views/province/initial-value/Gwbdwwsjk')
    },
    // 全国收藏单位数据库 Collect
    {
      path: 'province/initial-value/collect',
      component: () =>
        import('@/views/province/initial-value/Collect')
    },
    // 全国文物商店/文物拍卖企业名单 cul_protection
    {
      path: 'province/initial-value/companies',
      component: () =>
        import('@/views/province/initial-value/Companies')
    },
    // 全国文物保护工程资质单位数据库 cultureheritage
    {
      path: 'province/initial-value/cul_protection',
      component: () =>
        import('@/views/province/initial-value/Cul_protection')
    },
    // 中国世界文化遗产名录 dataBasiChildren
    {
      path: 'province/initial-value/cultureheritage',
      component: () =>
        import('@/views/province/initial-value/Cultureheritage')
    },
    // 中国历史文化名城名单 dataBasiChildren
    {
      path: 'province/initial-value/dataBasiChildren',
      component: () =>
        import('@/views/province/initial-value/DataBasiChildren')
    },
    // 中国历史文化名镇名单 dataBasiChildren
    {
      path: 'province/initial-value/dataBasiChildrenTwo',
      component: () =>
        import('@/views/province/initial-value/DataBasiChildrenTwo')
    },
    // 考古发掘资质单位数据库
    {
      path: 'province/initial-value/excavation',
      component: () =>
        import('@/views/province/initial-value/Excavation')
    },
    // 考古发掘项目负责人数据库
    {
      path: 'province/initial-value/excavationpeople',
      component: () =>
        import('@/views/province/initial-value/Excavationpeople')
    },
    // 行政许可 - 许可事项
    {
      path: '/province/admin-license/licensing-items',
      component: () =>
        import('@/views/province/admin-license/licensing-items')
    },
    // 行政许可 - 查询检索
    {
      path: '/province/query-retrieve',
      component: () =>
        import('@/views/province/query-retrieve')
    },
    // 行业管理 - 保护规划
    {
      path: '/province/industry-manage/conservation-programme',
      component: () =>
        import('@/views/province/industry-manage/conservation-programme')
    },
    // 统计分析 - 文物本体统计 
    {
      path: '/province/statistical-analysis/cr-noumenon',
      component: () =>
        import('@/views/province/statistical-analysis/cr-noumenon')
    },
    // 统计分析 - 日常工作情况统计  
    {
      path: '/province/statistical-analysis/routine',
      component: () =>
        import('@/views/province/statistical-analysis/routine')
    },
    // 统计分析 - 审批咨询情况统计 
    {
      path: '/province/statistical-analysis/approval-consultation',
      component: () =>
        import('@/views/province/statistical-analysis/approval-consultation')
    },
    //  统计分析 - 申报事项情况统计
    {
      path: '/province/statistical-analysis/declaration-items',
      component: () =>
        import('@/views/province/statistical-analysis/declaration-items')
    }
  ]
};

export default provinceRouter;