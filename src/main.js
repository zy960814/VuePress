import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();

import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS resets

import ElementUI from 'element-ui';
import './styles/index.scss' // Common CSS

import App from './App.vue'
import * as filters from './filters'
import router from './router'
import store from './store'
import './icons'
import importDirective from '@/utils/directive'
// 注册指令
importDirective(Vue); // 或 Vue.use(importDirective)

import {init} from './utils/init'

init();

Vue.use(ElementUI, {
  size: 'small'
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
