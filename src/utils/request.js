/**
 * @Author: HuangXuLin
 * @Description: 网络请求工具类
 */
import axios from 'axios'
import store from '@/store'

axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL: '',
  timeout: 300 * 1000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    store.dispatch('loadingCountIncrease');  // 添加加载动画
    // if (store.getters.token) {
    //   // 给每一个请求添加 Token
    //   config.headers['Authorization'] = 'Bearer ' + store.getters.token;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 提示错误信息
function promptErrorMsg(errIndex) {
  const errMessages = [
    '当前系统出现异常，请您联系系统管理员来排查此问题。',
    '当前网络连接失败，请检查设备的网络连接是否正常。'
  ];
  store.dispatch('promptErrorMsg', errMessages[errIndex]);
}

// 响应拦截器
service.interceptors.response.use(
  response => {
    store.dispatch('loadingCountReduce');  // 移除加载动画
    if (response.headers['content-type'] === 'application/json') {
      const result = response.data;
      if (result.code) {
        if (result.code !== 200) {
          switch (result.code) {
            case 401:
              // 退出登录
              return Promise.reject('Token expired');
            case 403:
              // 权限不足
              return Promise.reject('No permission');
            case 302:
              // 未登录
              window.location.href = result.url;
              return
          }
          promptErrorMsg(0);
          return Promise.reject(new Error(result.msg));
        }
        return result;
      } else {  // Blob
        const reader = new FileReader();
        reader.onload = () => {
          store.dispatch('promptErrorMsg', JSON.parse(reader.result).msg);
        };
        reader.readAsText(result);
        return Promise.reject();
      }
    }
    return response;
  },
  error => {
    store.dispatch('loadingCountReduce');  // 移除加载动画
    const {response} = error;
    let errIndex = 1;
    if (response) {
      switch (response.status) {
        case 401:
          // 退出登录
          return Promise.reject('Token expired');
        case 403:
          // 权限不足
          return Promise.reject('No permission');
      }
      errIndex = 0;
    }
    promptErrorMsg(errIndex);
    return Promise.reject(error);
  }
);

export default service
