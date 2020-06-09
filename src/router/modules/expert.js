import Layout from '@/components/commons/Layout'

/**
 * 专家
 */
const expertRouter = {
  path: '',
  component: Layout,
  children: [
    // 方案评审
    {
      path: 'expert/scheme-appraisal',
      component: () =>
        import('@/views/expert/scheme-appraisal'),
    },
    // 专家审核
    {
      path: 'expert/scheme-appraisal/Check',
      component: () =>
        import('@/views/expert/scheme-appraisal/Check'),
    },
    // 工作统计
    {
      path: '/expert/work-statistics',
      component: () =>
        import('@/views/expert/work-statistics'),
    }
  ]
};

export default expertRouter;
