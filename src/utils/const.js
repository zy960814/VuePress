/**
 * @Author: HuangXuLin
 * @Description: 本地存储LocalStorage的键值
 */
export const LOCAL_STORAGE_KEY = {
  TOKEN_KEY: 'token',
  SIDEBAR_STATUS: 'sidebar_status',
  MENU_STYLE: 'menu_style',
  THEME_COLOR: 'theme_color'
};

/**
 * 应用配置
 */
const APP_CONFIG = {
  SSO_HOST: 'http://abc.huangxulin.cn:8077',
  SSO_AUTH_URL: 'http://abc.huangxulin.cn:8077/sso'
};

if (process.env.NODE_ENV === 'test') {
  // 测试环境

} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  APP_CONFIG.SSO_HOST = 'xxx.com';
}

export default APP_CONFIG;
