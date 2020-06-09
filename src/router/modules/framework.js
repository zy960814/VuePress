import Layout from '@/components/commons/Layout'

/**
 * 框架
 */
const frameworkRouter = {
  path: '',
  component: Layout,
  children: [
    // 系统通知
    {
      path: 'framework/systematic-notification',
      component: () =>
        import('@/views/framework/systematic-notification'),
    },
    // 标准规范
    {
      path: '/framework/standard-specification',
      component: () => 
        import('@/views/framework/standard-specification')
    },
    // 法律法规
    {
      path: '/framework/policy',
      component: () => 
        import('@/views/framework/policy')
    },
    // 业务通知 
    {
      path: '/framework/business-notice',
      component: () =>
        import('@/views/framework/business-notice')
    },
    // 工作提醒
    {
      path: '/framework/reminder-work',
      // redirect: 'test',
      component: () => import('@/views/framework/reminder-work')
    },
  ]
};

export default frameworkRouter;
