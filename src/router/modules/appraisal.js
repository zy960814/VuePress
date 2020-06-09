import Layout from '@/components/commons/Layout'

/**
 * 进出境审核管理处
 */
const appraisalRouter = {
  path: '',
  component: Layout,
  children: [{
    // 文物临时进境查验
    path: '/appraisal/temp-entry',
    component: () =>
      import('@/views/appraisal/temp-entry')
  }, {
    // 文物临时进境查验 - 预约 - 办理
    path: '/appraisal/temp-entry/appointment/deal-with',
    component: () =>
      import('@/views/appraisal/temp-entry/appointment/deal-with')
  }, {
    // 文物临时进境查验 - 受理 - 办理
    path: '/appraisal/temp-entry/acceptance/deal-with',
    component: () =>
      import('@/views/appraisal/temp-entry/acceptance/deal-with')
  }, {
    // 文物临时进境查验 - 登记分办 - 修改展览申请
    path: '/appraisal/temp-entry/register/modify/exhibition-apply',
    component: () =>
      import('@/views/appraisal/temp-entry/register/modify/exhibition-apply')
  }, {
    // 文物临时进境查验 - 登记分办 - 修改个人携带申请
    path: '/appraisal/temp-entry/register/modify/personal-carry-apply',
    component: () =>
      import('@/views/appraisal/temp-entry/register/modify/personal-carry-apply')
  }, {
    // 文物临时进境查验 - 查验 - 办理
    path: '/appraisal/temp-entry/inspection/deal-with',
    component: () =>
      import('@/views/appraisal/temp-entry/inspection/deal-with')
  }, {
    // 文物临时进境查验 - 审批 - 办理
    path: '/appraisal/temp-entry/approval/deal-with',
    component: () =>
      import('@/views/appraisal/temp-entry/approval/deal-with')
  }, {
    // 文物临时进境复出境查验
    path: '/appraisal/repeat-exit',
    component: () =>
      import('@/views/appraisal/repeat-exit')
  }, {
    // 文物临时进境复出境查验 - 预约 - 办理
    path: '/appraisal/repeat-exit/appointment/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-exit/appointment/deal-with')
  }, {
    // 文物临时进境复出境查验 - 受理 - 办理
    path: '/appraisal/repeat-exit/acceptance/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-exit/acceptance/deal-with')
  }, {
    // 文物临时进境复出境查验 - 登记分办 - 修改展览申请
    path: '/appraisal/repeat-exit/register/modify/exhibition-apply',
    component: () =>
      import('@/views/appraisal/repeat-exit/register/modify/exhibition-apply')
  }, {
    // 文物临时进境复出境查验 - 登记分办 - 修改个人携带申请
    path: '/appraisal/repeat-exit/register/modify/personal-carry-apply',
    component: () =>
      import('@/views/appraisal/repeat-exit/register/modify/personal-carry-apply')
  }, {
    // 文物临时进境复出境查验 - 查验 - 办理
    path: '/appraisal/repeat-exit/inspection/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-exit/inspection/deal-with')
  }, {
    // 文物临时进境复出境查验 - 审批 - 办理
    path: '/appraisal/repeat-exit/approval/deal-with',
    component: () =>
        import('@/views/appraisal/repeat-exit/approval/deal-with')
  }, {
    // 文物临时出境查验
    path: '/appraisal/temp-exit',
    component: () =>
      import('@/views/appraisal/temp-exit')
  }, {
    // 文物临时出境查验 - 预约 - 办理
    path: '/appraisal/temp-exit/appointment/deal-with',
    component: () =>
      import('@/views/appraisal/temp-exit/appointment/deal-with')
  }, {
    // 文物临时出境查验 - 受理 - 办理
    path: '/appraisal/temp-exit/acceptance/deal-with',
    component: () =>
      import('@/views/appraisal/temp-exit/acceptance/deal-with')
  }, {
    // 文物临时出境查验 - 登记分办 - 修改展览申请
    path: '/appraisal/temp-exit/register/modify/exhibition-apply',
    component: () =>
      import('@/views/appraisal/temp-exit/register/modify/exhibition-apply')
  }, {
    // 文物临时出境查验 - 查验 - 办理
    path: '/appraisal/temp-exit/inspection/deal-with',
    component: () =>
      import('@/views/appraisal/temp-exit/inspection/deal-with')
  }, {
    // 文物临时出境查验 - 审批 - 办理
    path: '/appraisal/temp-exit/approval/deal-with',
    component: () =>
      import('@/views/appraisal/temp-exit/approval/deal-with')
  }, {
    // 文物出境许可
    path: '/appraisal/exit',
    component: () =>
      import('@/views/appraisal/exit')
  }, {
    // 文物复进境查验
    path: '/appraisal/repeat-entry',
    component: () =>
      import('@/views/appraisal/repeat-entry')
  }, {
    // 文物临时出境复进境查验 - 预约 - 办理
    path: '/appraisal/repeat-entry/appointment/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-entry/appointment/deal-with')
  }, {
    // 文物临时出境复进境查验 - 受理 - 办理
    path: '/appraisal/repeat-entry/acceptance/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-entry/acceptance/deal-with')
  }, {
    // 文物临时出境复进境查验 - 登记分办 - 修改展览申请
    path: '/appraisal/repeat-entry/register/modify/exhibition-apply',
    component: () =>
      import('@/views/appraisal/repeat-entry/register/modify/exhibition-apply')
  }, {
    // 文物临时出境复进境查验 - 查验 - 办理
    path: '/appraisal/repeat-entry/inspection/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-entry/inspection/deal-with')
  }, {
    // 文物临时出境复进境查验 - 审批 - 办理
    path: '/appraisal/repeat-entry/approval/deal-with',
    component: () =>
      import('@/views/appraisal/repeat-entry/approval/deal-with')
  }, {
    // 文物出境 - 预约 - 办理
    path: '/appraisal/exit/appointment/deal-with',
    component: () =>
      import('@/views/appraisal/exit/appointment/deal-with')
  }, {
    // 文物出境 - 预约 - 办理
    path: '/appraisal/exit/appointment/deal-with',
    component: () =>
      import('@/views/appraisal/exit/appointment/deal-with')
  }, {
    // 文物出境 - 受理 - 办理
    path: '/appraisal/exit/acceptance/deal-with',
    component: () =>
      import('@/views/appraisal/exit/acceptance/deal-with')
  }, {
    // 文物出境 - 登记分办 - 修改个人携带申请信息
    path: '/appraisal/exit/register/modify/personal-carry-apply',
    component: () =>
      import('@/views/appraisal/exit/register/modify/personal-carry-apply')
  }, {
    // 文物出境 - 鉴定 - 办理
    path: '/appraisal/exit/appraisal/deal-with',
    component: () =>
      import('@/views/appraisal/exit/appraisal/deal-with')
  }, {
    // 文物出境 - 审批 - 办理
    path: '/appraisal/exit/approval/deal-with',
    component: () =>
      import('@/views/appraisal/exit/approval/deal-with')
  },
    {
      // 查询检索
      path: '/appraisal/query-retrieval',
      component: () =>
        import('@/views/appraisal/query-retrieval')
    },


    {
      // 统计分析 - 进出境文物情况
      path: '/appraisal/statistical-analysis/entry-exit-cr',
      component: () =>
        import('@/views/appraisal/statistical-analysis/entry-exit-cr')
    }, {
      // 统计分析 - 进出境文物质地情况
      path: '/appraisal/statistical-analysis/entry-exit-texture',
      component: () =>
        import('@/views/appraisal/statistical-analysis/entry-exit-texture')
    }, {
      // 统计分析 - 进出境审批情况
      path: '/appraisal/statistical-analysis/entry-exit-approval',
      component: () =>
        import('@/views/appraisal/statistical-analysis/entry-exit-approval')
    }, {
      // 统计分析 - 临时进境许可失效情况统计报表
      path: '/appraisal/statistical-analysis/entry-permission-invalid',
      component: () =>
        import('@/views/appraisal/statistical-analysis/entry-permission-invalid')
    }, {
      // 统计分析 - 临时进境许可失效情况统计报表
      path: '/appraisal/statistical-analysis/temp-entry-aim',
      component: () =>
        import('@/views/appraisal/statistical-analysis/temp-entry-aim')
    }, {
      // 统计分析 - 临时进境文物失效和延期情况
      path: '/appraisal/statistical-analysis/temp-entry-delay',
      component: () =>
        import('@/views/appraisal/statistical-analysis/temp-entry-delay')
    }]
};

export default appraisalRouter;
