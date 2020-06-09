import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 获取站点未办结的复出境事项信息列表
 */
export function queryApplyCList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/queryApplyCList',
    method: 'post',
    data
  })
}

/**
 * 获取复出境展览事项详情
 */
export function getApplyCeDetail(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/getApplyCeDetail',
    method: 'post',
    data
  })
}

/**
 * 获取复出境个人携带申请事项详情
 */
export function getApplyCpDetail(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/getApplyCpDetail',
    method: 'post',
    data
  })
}

/**
 * 根据复出境事项 ID 查询临时进境事项信息 ID
 */
export function getBTempBizId(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/getBTempBizId',
    method: 'post',
    data
  })
}

/**
 * 站点审批操作
 */
export function approval(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/approval',
    method: 'post',
    data
  })
}

/**
 * 获取站点事项未审批的文物数量
 */
export function getNoApprovalNum(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getNoApprovalNum',
    method: 'post',
    data
  })
}

/**
 * 站点批量审批
 */
export function batchApproval(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/batchApproval',
    method: 'post',
    data
  })
}

/**
 * 站点重新分办操作
 */
export function againBranch(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/againBranch',
    method: 'post',
    data
  })
}

/**
 * 获取事项的单证类型
 */
export function getCertificateType(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getCertificateType',
    method: 'post',
    data
  })
}

/**
 * 站点办结操作
 */
export function tieUp(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/tieUp',
    method: 'post',
    data
  })
}

/**
 * 查询复出境展览可以选择的事项信息
 */
export function querySelectableBExhibitionList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/bizCroCrUpdate/querySelectableBExhibitionList',
    method: 'post',
    data
  })
}

/**
 * 查询可以选择的文物信息
 */
export function querySelectableBCroCrList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/bizCroCrUpdate/querySelectableBCroCrList',
    method: 'post',
    data
  })
}
