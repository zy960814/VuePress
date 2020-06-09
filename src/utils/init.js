import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router'
import store from '../store'
import theme from './theme'

// import {getToken} from '@/utils/auth'

/**
 * @Author: HuangXuLin
 * @Description: 时间类型原型增强
 */
function datePrototypeEnhance() {
  Date.prototype.format = function (pattern) {
    var fmt = pattern || 'yyyy-MM-dd HH:mm:ss';
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'H+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      'S': this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  };
}

/**
 * @Author: HuangXuLin
 * @Description: 路由守卫
 */
function routeGuard() {

  NProgress.configure({
    showSpinner: false
  });

  // const whiteList = ['/login', '/404', '/test'];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const temp = 1;

    if (temp) {
      next();
    } else if (!store.getters.loginInit) { // 判断当前是否已拉取用户信息
      store.dispatch('getInfo').then(() => {
        store.dispatch('setAccessTabs', to.path);
        next({
          to,
          replace: true
        });
      }).catch(err => {
        store.dispatch('logOut').then(() => {
          if (err) {
            console.error(err);
          }
          next({
            path: '/'
          });
        });
      });
    } else {
      store.dispatch('setAccessTabs', to.path);
      next();
    }

    // if (getToken()) {
    //   if (to.path === '/login') {
    //     // 如果用户已登录跳转主页面
    //     next({path: '/'});
    //     NProgress.done()
    //   } else {
    //     if (!store.getters.loginInit) {  // 判断当前是否已拉取用户信息
    //       store.dispatch('getInfo').then(() => {
    //         next({to, replace: true});
    //       }).catch(err => {
    //         store.dispatch('logOut').then(() => {
    //           if (err) {
    //             console.error(err);
    //           }
    //           next({path: '/'});
    //         });
    //       });
    //     } else {
    //       next();
    //     }
    //   }
    // } else {
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     next(); // 白名单页面, 可直接访问
    //   } else {
    //     // 无权限访问, 跳转登录页
    //     next(`/login?redirect=${to.path}`);
    //     NProgress.done();
    //   }
    // }
  });

  // router.afterEach(() => {
  //   NProgress.done();
  // });
}

/**
 * @Author: HuangXuLin
 * @Description: 注册窗口大小重绘事件
 */
function windowResize() {
  window.onresize = () => store.dispatch('screenResize');
}

/**
 * @Author: HuangXuLin
 * @Description: 初始化操作
 */
export function init() {
  datePrototypeEnhance();
  theme.init();
  routeGuard();
  windowResize();
}