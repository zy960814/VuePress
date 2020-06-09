import Layout from '@/components/commons/Layout'

/**
 * 法人
 */
const organizationRouter = {
  path: '',
  component: Layout,
  children: [{
    path: '/organization/bump-qualification',
    component: () =>
      import('@/views/organization/bump-qualification'),
  }, {
    path: '/organization/admin-apply',
    component: () =>
      import('@/views/organization/admin-apply'),
    meta: {
      keepAlive: true // 需要缓存
    }
  }, ]
};

export default organizationRouter;