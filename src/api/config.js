/**
 * @Author: HuangXuLin
 * @Description: 网络请求的 ContentPath 配置
 */
const GATEWAY_URL = 'http://192.168.1.180:9998';

// 联调测试修改此地址 修改C:\Windows\System32\drivers\etc\host 将 client.ncha.gov.cn 指向联调人后端地址
const API_PREFIX = {
  BASIC_DATA: `${GATEWAY_URL}/framework`, //8081 基础数据服务
  USER: 'http://abc.huangxulin.cn:8015', //8015 用户相关
  FILE_SERVICE: 'http://192.168.1.140:9080', //9080 文件服务
  NATIONAL: `${GATEWAY_URL}/national`, //8030 国家局
  PROVINCE: `${GATEWAY_URL}/province`, //8045 省局
  APPRAISAL: `${GATEWAY_URL}/appraisal`, //8005 进出境站点
  ASSESSMENT: `${GATEWAY_URL}/assessment`, //8010 评估机构
  EXPERT: `${GATEWAY_URL}/expert`, //8025 专家
  CUSTOMS: `${GATEWAY_URL}/customs`, //8020 海关
  ORGANIZATION: `${GATEWAY_URL}/organization`, //8035 法人
  PERSONAL: `${GATEWAY_URL}/personal` //8040 个人
};

// 测试环境
if (process.env.NODE_ENV === 'test') {
  API_PREFIX.USER = 'http://client.ncha.gov.cn:9998';
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  API_PREFIX.USER = 'http://gl.ncha.gov.cn:8769';
}

/* HuangXuLin 的开发配置, 请勿修改此部分内容 */
// if (process.env.VUE_APP_DEVELOPER === 'hxl') {
//   API_PREFIX.BASIC_DATA = 'http://192.168.1.140:8082'; //8082 基础数据服务
//   API_PREFIX.USER = 'http://abc.huangxulin.cn:8015'; //8015 用户相关
//   API_PREFIX.FILE_SERVICE = 'http://192.168.1.140:9080'; //9080 文件服务
//   API_PREFIX.NATIONAL = 'http://192.168.1.166:8030'; //8030 国家局
//   API_PREFIX.PROVINCE = 'http://192.168.1.140:8045'; //8045 省局
//   API_PREFIX.APPRAISAL = 'http://192.168.1.140:8005'; //8005 进出境站点
//   API_PREFIX.ASSESSMENT = 'http://192.168.1.140:8010'; //8010 评估机构
//   API_PREFIX.EXPERT = 'http://192.168.1.140:8025'; //8025 专家
//   API_PREFIX.CUSTOMS = 'http://192.168.1.140:8020'; //8020 海关
//   API_PREFIX.ORGANIZATION = 'http://192.168.1.140:8035'; //8035 法人
//   API_PREFIX.PERSONAL = 'http://192.168.1.140:8040'; //8040 个人
// }

// if (process.env.VUE_APP_DEVELOPER === 'hxl') {
//   API_PREFIX.BASIC_DATA = 'http://abc.huangxulin.cn:8082'; //8082 基础数据服务
//   API_PREFIX.USER = 'http://abc.huangxulin.cn:8015'; //8015 用户相关
//   API_PREFIX.FILE_SERVICE = 'http://192.168.1.140:9080'; //9080 文件服务
//   API_PREFIX.NATIONAL = 'http://192.168.1.166:8030'; //8030 国家局
//   API_PREFIX.PROVINCE = 'http://192.168.1.140:8045'; //8045 省局
//   API_PREFIX.APPRAISAL = 'http://abc.huangxulin.cn:8005'; //8005 进出境站点
//   API_PREFIX.ASSESSMENT = 'http://192.168.1.140:8010'; //8010 评估机构
//   API_PREFIX.EXPERT = 'http://192.168.1.140:8025'; //8025 专家
//   API_PREFIX.CUSTOMS = 'http://192.168.1.140:8020'; //8020 海关
//   API_PREFIX.ORGANIZATION = 'http://192.168.1.140:8035'; //8035 法人
//   API_PREFIX.PERSONAL = 'http://abc.huangxulin.cn:8040'; //8040 个人
// }

export default API_PREFIX;
