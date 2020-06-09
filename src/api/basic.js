import request from '@/utils/request'
import API_PREFIX from './config'

/**
 * 查询数据字典信息
 *
 * @param classCode
 *
 *   Country            国籍
 *   IDCardType         证件类型
 *   CustPurpose        进境目的
 *   CrLevelCode        文物级别
 *   ScrRelicType       进出境文物类别
 *   ScrRelicQuality    进出境文物质地
 *
 *  @param parentId (可以不传)
 */
export function queryDictionary(classCode, parentId) {
  return request({
    url: API_PREFIX.BASIC_DATA + '/sys/code/find',
    method: 'post',
    data: {
      classCode,
      parentId
    }
  })
}

/**
 * 保存动态表格列字段数据
 */
export function saveDynamicCol(data) {
  return request({
    url: API_PREFIX.BASIC_DATA + '/BizuserAccountDynamic/saveBizuserAccountDynamic',
    method: 'post',
    data
  })
}

/**
 * 查询动态表格列字段数据
 */
export function queryDynamicCol(tableType) {
  return request({
    url: `${API_PREFIX.BASIC_DATA}/BizuserAccountDynamic/findBizuserAccountDynamic?tableType=${tableType}`,
    method: 'post'
  })
}

/**
 * 删除动态表格列字段数据
 */
export function delDynamicCol(data) {
  return request({
    url: API_PREFIX.BASIC_DATA + '/BizuserAccountDynamic/delBizuserAccountDynamic',
    method: 'post',
    data
  })
}

// 常用语查询
export function findLanguage() {
  return request({
    url: API_PREFIX.BASIC_DATA + `/bizuseraccountphrase/find`,
    method: 'get'
  })
}

// 常用语添加
export function addLanguage(data) {
  return request({
    url: API_PREFIX.BASIC_DATA + `/bizuseraccountphrase/add`,
    method: 'post',
    data
  })
}

// 常用语删除
export function deleteLanguage(data) {
  return request({
    url: API_PREFIX.BASIC_DATA + `/bizuseraccountphrase/delete`,
    method: 'post',
    data
  })
}

// 常用语移动
export function moveLanguage(data) {
  return request({
    url: API_PREFIX.BASIC_DATA + `/bizuseraccountphrase/move`,
    method: 'post',
    data
  })
}
