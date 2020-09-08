import Layout from '@/components/commons/Layout'

/**
 * 法人
 */
const organizationRouter = {
  path: '',
  component: Layout,
  children: [
    {
      path: '/organization/bump-qualification',
      component: () =>
        import('@/views/organization/bump-qualification'),
    }
  ]
};

export default organizationRouter;
