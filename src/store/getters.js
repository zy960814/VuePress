const getters = {

  // 侧边栏状态: 展开、收起
  sidebar: state => state.app.sidebar,

  // 菜单风格
  menuStyle: state => state.app.menuStyle,

  // 主容器显示隐藏
  showMainContainer: state => state.app.showMainContainer,

  // // 浏览器窗口宽度
  screenWidth: state => state.app.screenWidth,
  // // 浏览器窗口高度
  screenHeight: state => state.app.screenHeight,

  // 标识用户是否已完成登录初始化、路由权限信息是否已加载
  loginInit: state => state.user.loginInit,
  // 用户 token
  token: state => state.user.token,
  // 菜单列表
  menuList: state => state.user.menuList,
  // 当前已授权的 TAB 页签信息
  accessTabs: state => state.user.accessTabs,

  // 是否显示加载动画
  loading: state => state.app.loadingCount > 0,

  // 二期系统 Token
  v2Token: state => state.app.v2Token

};
export default getters
