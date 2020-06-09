import Layout from '@/components/commons/Layout'

/**
 * 个人
 */
const personalRouter = {
  path: '',
  component: Layout,
  children: [{
      path: '/personal/account-settings',
      component: () =>
        import('@/views/personal/account-settings'),
    }, {
      path: '/personal/admin-apply',
      component: () =>
        import('@/views/personal/admin-apply'),
      meta: {
        keepAlive: true // 需要缓存
      }
    }, {
      path: '/personal/archaeologyProject',
      component: () =>
        import('@/views/personal/archaeologyProject')
    }, {
      path: '/personal/admin-apply/handleProcess',
      component: () =>
        import('@/views/personal/admin-apply/handleProcess')
    }, {
      path: '/personal/schedule/56020',
      component: () =>
        import('@/views/personal/schedule/56020'),
    }, {
      path: '/personal/schedule/56020/temp-entry/personal-carry-apply',
      component: () =>
        import('@/views/personal/schedule/56020/temp-entry/personal-carry-apply'),
    }, {
      path: '/personal/schedule/56020/temp-entry/exhibition-apply',
      component: () =>
        import('@/views/personal/schedule/56020/temp-entry/exhibition-apply'),
    }, {
      path: '/personal/schedule/56020/repeat-exit/personal-carry-apply',
      component: () =>
        import('@/views/personal/schedule/56020/repeat-exit/personal-carry-apply'),
    }, {
      path: '/personal/schedule/56020/repeat-exit/exhibition-apply',
      component: () =>
        import('@/views/personal/schedule/56020/repeat-exit/exhibition-apply'),
    }, {
      path: '/personal/schedule/56020/repeat-entry/exhibition-apply',
      component: () =>
        import('@/views/personal/schedule/56020/repeat-entry/exhibition-apply'),
    }, {
      path: '/personal/schedule/56020/temp-exit/exhibition-apply',
      component: () =>
        import('@/views/personal/schedule/56020/temp-exit/exhibition-apply'),
    }, {
      path: '/personal/schedule/56020/exit/personal-carry-apply',
      component: () =>
        import('@/views/personal/schedule/56020/exit/personal-carry-apply'),
    }, {
      path: '/personal/schedule/56004',
      component: () =>
        import('@/views/personal/schedule/56004'),
    }, {
      path: '/personal/schedule/56005',
      component: () =>
        import('@/views/personal/schedule/56005'),
    }, {
      path: '/personal/schedule/56006',
      component: () =>
        import('@/views/personal/schedule/56006'),
    }, {
      path: '/personal/schedule/56012',
      component: () =>
        import('@/views/personal/schedule/56012'),
    }, {
      path: '/personal/schedule/56010',
      component: () =>
        import('@/views/personal/schedule/56010'),
    },
    {
      path: '/personal/schedule/56014/56014_a',
      component: () =>
        import('@/views/personal/schedule/56014/56014_a'),
    }, {
      path: '/personal/schedule/56014/56014_b',
      component: () =>
        import('@/views/personal/schedule/56014/56014_b'),
    },



    {
      path: '/personal/schedule/56014/rescue',
      component: () =>
        import('@/views/personal/schedule/56014/rescue'),
    }, {
      path: '/personal/schedule/56014/financing',
      component: () =>
        import('@/views/personal/schedule/56014/financing'),
    }, {
      path: '/personal/schedule/56014/p_approvalplan',
      component: () =>
        import('@/views/personal/schedule/56014/p_approvalplan'),
    }, {
      path: '/personal/schedule/56014/n_approvalplan',
      component: () =>
        import('@/views/personal/schedule/56014/n_approvalplan'),
    }, {
      path: '/personal/schedule/56014/p_reportCRB',
      component: () =>
        import('@/views/personal/schedule/56014/p_reportCRB'),
    }, {
      path: '/personal/schedule/56014/n_reportCRB',
      component: () =>
        import('@/views/personal/schedule/56014/n_reportCRB'),
    },



    {
      path: '/personal/schedule/56009',
      component: () =>
        import('@/views/personal/schedule/56009'),
    }, {
      path: '/personal/schedule/56013',
      component: () =>
        import('@/views/personal/schedule/56013'),
    }, {
      path: '/personal/schedule/56008/majorMatter',
      component: () =>
        import('@/views/personal/schedule/56008/majorMatter'),
    }, {
      path: '/personal/schedule/56008/commonMatter',
      component: () =>
        import('@/views/personal/schedule/56008/commonMatter'),
    }, {
      path: '/personal/schedule/56022/n_protectPlan',
      component: () =>
        import('@/views/personal/schedule/56022/n_protectPlan'),
    }, {
      path: '/personal/schedule/56022/p_protectPlan',
      component: () =>
        import('@/views/personal/schedule/56022/p_protectPlan'),
    }, {
      path: '/personal/schedule/56015/repairPlan',
      component: () =>
        import('@/views/personal/schedule/56015/repairPlan'),
    }, {
      path: '/personal/schedule/56015/copyPlan',
      component: () =>
        import('@/views/personal/schedule/56015/copyPlan'),
    }, {
      path: '/personal/schedule/56015/rubbingsPlan',
      component: () =>
        import('@/views/personal/schedule/56015/rubbingsPlan'),
    }, {
      path: '/personal/schedule/56016',
      component: () =>
        import('@/views/personal/schedule/56016'),
    }, {
      path: '/personal/schedule/56017',
      component: () =>
        import('@/views/personal/schedule/56017'),
    }, {
      path: '/personal/schedule/56019',
      component: () =>
        import('@/views/personal/schedule/56019'),
    }, {
      path: '/personal/schedule/56011/culturalRelics',
      component: () =>
        import('@/views/personal/schedule/56011/culturalRelics'),
    }, {
      path: '/personal/schedule/56011/alteration',
      component: () =>
        import('@/views/personal/schedule/56011/alteration'),
    }, {
      path: '/personal/schedule/repairPlan',
      component: () =>
        import('@/views/personal/schedule/repairPlan'),
    }, {
      path: '/personal/schedule/protectPlan',
      component: () =>
        import('@/views/personal/schedule/protectPlan'),
    },
    {
      path: '/components/business/midtermReport',
      component: () =>
        import('@/components/business/midtermReport'),
    },
    {
      path: '/components/business/closingtermReport',
      component: () =>
        import('@/components/business/closingtermReport'),
    }
  ]
};

export default personalRouter;