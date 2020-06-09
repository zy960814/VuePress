/**
 * 适配二期页面
 */
import V2 from '@/views/v2'

const v2Router = [{
  path: '',
  component: V2,
  children: [{
    // 省局 - 备案模块
    path: '/v2/province/record',
    component: () => import('@/views/v2/province/record')
  }, {
    // 协会 - 备案角色
    path: '/v2/assessment/record',
    component: () => import('@/views/v2/assessment/record')
  }, {
    // 国家局 - 备案角色
    path: '/v2/national/record',
    component: () => import('@/views/v2/national/record')
  }]
}];

export default v2Router;
