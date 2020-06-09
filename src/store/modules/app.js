import Storage from '@/utils/storage'
import {LOCAL_STORAGE_KEY} from '@/utils/const'
import {MessageBox} from 'element-ui'

// 系统全局相关的状态管理
const app = {
  state: {

    // 侧边栏展开收起
    sidebar: {
      opened: Storage.get(LOCAL_STORAGE_KEY.SIDEBAR_STATUS) == null || !!+Storage.get(LOCAL_STORAGE_KEY.SIDEBAR_STATUS)
    },

    // 菜单风格: 0表示纵向菜单，1表示横向菜单，默认使用横向菜单
    menuStyle: Storage.get(LOCAL_STORAGE_KEY.MENU_STYLE) == null ? 1 : Storage.get(LOCAL_STORAGE_KEY.MENU_STYLE),

    // 主容器显示、隐藏，避免横纵菜单切换时页面抖动
    showMainContainer: true,

    // 浏览器窗口宽度
    screenWidth: document.documentElement.clientWidth,
    // 浏览器窗口高度
    screenHeight: document.documentElement.clientHeight,

    // 标识全局是否提示错误信息
    promptErrorMsg: true,

    // 记录正在加载中的请求数量
    loadingCount: 0,

    // 二期系统 Token
    v2Token: null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
      Storage.set(LOCAL_STORAGE_KEY.SIDEBAR_STATUS, state.sidebar.opened ? 1 : 0);
    },
    TOGGLE_MENU_STYLE: state => {
      state.menuStyle = state.menuStyle ^ 1;
      Storage.set(LOCAL_STORAGE_KEY.MENU_STYLE, state.menuStyle);
      if(state.menuStyle === 0) {  // 此处重新加载, 为了兼容横向菜单布局的样式
        location.reload();
      }
    },
    SHOW_MAIN_CONTAINER: (state, isShow) => {
      state.showMainContainer = isShow;
    },
    SCREEN_RESIZE: state => {
      state.screenWidth = document.documentElement.clientWidth;
      state.screenHeight = document.documentElement.clientHeight;
    },
    PROMPT_ERROR_MSG: (state, isPrompt) => {
      state.promptErrorMsg = isPrompt;
    },
    LOADING_COUNT_INCREASE: state => {
      state.loadingCount += 1;
    },
    LOADING_COUNT_REDUCE: state => {
      state.loadingCount -= 1;
    },
    UPDATE_V2_TOKEN: (state, token) => {
      state.v2Token = token;
    }
  },
  actions: {
    toggleSideBar({commit}) {
      commit('TOGGLE_SIDEBAR');
    },
    toggleMenuStyle({commit}) {
      commit('TOGGLE_MENU_STYLE');
    },
    showMainContainer({commit}, isShow) {
      commit('SHOW_MAIN_CONTAINER', isShow);
    },
    screenResize({commit}) {
      commit('SCREEN_RESIZE');
    },
    promptErrorMsg({commit, state}, message) {
      if (state.promptErrorMsg) {
        commit('PROMPT_ERROR_MSG', false);
        MessageBox.alert(message, {
          type: 'error',
          confirmButtonText: '我知道了',
          callback: () => commit('PROMPT_ERROR_MSG', true)
        });
      }
    },
    promptWarningMsg({commit, state}, message) {
      if (state.promptErrorMsg) {
        commit('PROMPT_ERROR_MSG', false);
        MessageBox.alert(message, {
          type: 'warning',
          confirmButtonText: '我知道了',
          callback: () => commit('PROMPT_ERROR_MSG', true)
        });
      }
    },
    loadingCountIncrease({commit}) {
      commit('LOADING_COUNT_INCREASE');
    },
    loadingCountReduce({commit}) {
      commit('LOADING_COUNT_REDUCE');

    },
    updateV2Token({commit}, token) {
      commit('UPDATE_V2_TOKEN', token);
    }
  }
};

export default app
