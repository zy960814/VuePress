import Layout from '@/components/commons/Layout'

/**
 * 评估机构
 */
const assessmentRouter = {
  path: '',
  component: Layout,
  children: [
    // 方案评审
    {
      path: 'assessment/scheme-appraisal',
      component: () =>
        import('@/views/assessment/scheme-appraisal'),
    },
    // 专家审核
    {
      path: 'assessment/scheme-appraisal/Check',
      component: () =>
        import('@/views/assessment/scheme-appraisal/Check'),
    },
    // 备案信息审核
    {
      path: 'assessment/archival-information',
      component: () =>
        import('@/views/assessment/archival-information'),
    },
    // 资质信息审核
    {
      path: 'assessment/person-approving',
      component: () =>
        import('@/views/assessment/person-approving'),
    },
    {
      path: 'assessment/person-approving/Opinions',
      component: () =>
        import('@/views/assessment/person-approving/Opinions'),
    },
    // 工作统计
    {
      path: '/assessment/work-statistics',
      component: () =>
        import('@/views/assessment/work-statistics'),
    },
    // 文保资质信息维护
    {
      path: '/assessment/maintenance-qualification',
      component: () =>
        import('@/views/assessment/maintenance-qualification'),
    }
  ]
};

export default assessmentRouter;
