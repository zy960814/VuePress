import {login, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    loginInit: false,  // 标识用户是否已完成登录初始化、菜单信息是否已加载
    menuList: [],
    authTabsInfo: {},
    accessTabs: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_LOGIN_INIT: (state, loginInit) => {
      state.loginInit = loginInit;
    },
    SET_MENU_LIST: (state, menuList) => {
      state.menuList = menuList;
    },
    SET_AUTH_TABS_INFO: (state, authTabsInfo) => {
      state.authTabsInfo = authTabsInfo;
    },
    SET_ACCESS_TABS: (state, tabKey) => {
      state.accessTabs = state.authTabsInfo[tabKey];
    }
  },

  actions: {

    // 获取用户信息
    getInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(({data}) => {
          commit('SET_MENU_LIST', data.menu);
          commit('SET_AUTH_TABS_INFO', data.tab);
          commit('SET_LOGIN_INIT', true);  // 登录初始化完成
          resolve();
        }).catch(error => {
          reject(error);
        })
      });
    },

    // 设置当前页面可访问的 TAB 页签
    setAccessTabs({commit}, tabKey) {
      commit('SET_ACCESS_TABS', tabKey);
    },

    // 退出登录
    logOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_MENU_LIST', []);
        commit('SET_LOGIN_INIT', false);  // 重置登录初始化信息
        removeToken();
        resolve();
      });
    },

    // 用户名登录
    login({commit}, ticket) {
      return new Promise((resolve, reject) => {
        login(ticket).then(({data}) => {
          if (data.code === 200) {
            commit('SET_TOKEN', data.data.token);
            setToken(data.data.token);
          } else {
            reject(data.msg);
          }
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 模拟登录
    mockLogin({commit}, token) {
      commit('SET_TOKEN', token);
      setToken(token);
    }
  }
};

export default user
