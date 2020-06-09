import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/commons/Layout'

/*
 * Vue-router 在 3.1 之后把 $router.push() 方法改为了 Promise
 * 所以 $router.push() 如果没有回调函数, 使用该方法做路由跳转时就会报错
 * [NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

// 引入各个模块的路由
import appraisalRouter from './modules/appraisal'
import assessmentRouter from './modules/assessment'
import customsRouter from './modules/customs'
import expertRouter from './modules/expert'
import nationalRouter from './modules/national'
import organizationRouter from './modules/organization'
import personalRouter from './modules/personal'
import provinceRouter from './modules/province'
import frameworkRouter from './modules/framework'
import v2Router from './modules/v2'

export default new Router({
  routes: [
    // 跳转页面
    {
      path: '/redirect/:path*',
      component: () => import('@/views/redirect')
    },

    // 登录页面
    {
      path: '/login',
      // redirect: 'test',
      component: () => import('@/views/login')
    },
    // 法人注册页面
    {
      path: '/RegisterLPStep',
      // redirect: 'test',
      component: () => import('@/views/login/RegisterLPStep')
    },
    // 个人注册页面
    {
      path: '/IndividualRegistration',
      // redirect: 'test',
      component: () => import('@/views/login/IndividualRegistration')
    },
    // 白皮书页面
    {
      path: '/Bps',
      // redirect: 'test',
      component: () => import('@/views/login/Bps')
    },
    // 404页面
    {
      path: '/404',
      component: () => import('@/views/error/404'),
    },

    {
      path: '/',
      component: Layout,
      redirect: 'dashboard',
      children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard')
      }, {
        path: 'testDrag',
        component: () => import('@/views/testDrag'),
      }, {
        path: 'myDrag_myTable',
        component: () => import('@/views/testDrag/myDrag_myTable'),
      }, {
        path: 'sortTable_elTable',
        component: () => import('@/views/testDrag/sortTable_elTable'),
      }, {
        path: 'sortTable_Mytable',
        component: () => import('@/views/testDrag/sortTable_Mytable'),
      }, {
        path: 'testDragInstance',
        component: () => import('@/views/testDrag/testDragInstance'),
      }]
    },

    nationalRouter, // 国局用户
    provinceRouter, // 省局用户
    appraisalRouter, // 进出境审核管理处
    assessmentRouter, // 评估机构
    customsRouter, // 海关
    expertRouter, // 专家
    organizationRouter, // 法人
    personalRouter, // 个人
    frameworkRouter, //框架

    ...v2Router, // 二期适配

    // 测试页面
    {
      path: '/test',
      component: () => import('@/views/test')
    },

    {
      path: '*',
      redirect: '/404'
    }
  ]
});
