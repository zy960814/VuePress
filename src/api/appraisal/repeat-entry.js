import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 获取站点未办结的复进境事项信息列表
 */
export function queryApplyEList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/queryApplyEList',
    method: 'post',
    data
  })
}

/**
 * 获取复进境展览事项详情
 */
export function getApplyEeDetail(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/getApplyEeDetail',
    method: 'post',
    data
  })
}

/**
 * 根据复进境事项 ID 查询临时出境事项信息 ID
 */
export function getDTempBizId(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/getDTempBizId',
    method: 'post',
    data
  })
}

/**
 * 预约办理接受预约、拒绝预约
 */
export function handleAppointment(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/appointment',
    method: 'post',
    data: {data}
  })
}

/**
 * 查看预约通知书
 */
export function getAppointmentNotice(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getAppointmentNotice',
    method: 'post',
    data
  })
}

/**
 * 查看受理通知书
 */
export function getAcceptNotice(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getAcceptNotice',
    method: 'post',
    data
  })
}

/**
 * 站点办理受理操作
 */
export function appraisalAccept(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/accept',
    method: 'post',
    data: {data}
  })
}

/**
 * 登记文物信息
 */
export function regCulturalRelic(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/relicRegister',
    method: 'post',
    data
  })
}

/**
 * 1、通过事项查询文物是否登记完毕
 * 2、通过事项设置文物一键登记
 */
export function registerAll(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/isRegisterAll',
    method: 'post',
    data
  })
}

/**
 * 查询文物分办人员列表
 */
export function findBranchPerson() {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/findBranchPerson',
    method: 'post'
  })
}

/**
 * 站点分办操作
 */
export function branch(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/branch',
    method: 'post',
    data
  })
}

/**
 * 站点查验、鉴定操作
 */
export function inspection(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/inspection',
    method: 'post',
    data
  })
}

/**
 * 获取鉴定查验信息
 */
export function getBizCroAppraiseOpinion(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getBizCroAppraiseOpinion',
    method: 'post',
    data
  })
}

/**
 * 根据操作用户查询文物的查验信息
 */
export function queryBizCrInspectList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/queryBizCrInspectList',
    method: 'post',
    data
  })
}

/**
 * 获取站点事项未鉴定查验的文物数量
 */
export function getNoInspectionNum(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getNoInspectionNum',
    method: 'post',
    data
  })
}

/**
 * 站点批量查验/鉴定操作
 */
export function batchInspection(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/batchInspection',
    method: 'post',
    data
  })
}

/**
 * 获取审批信息
 */
export function getBizCroApproval(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/getBizCroApproval',
    method: 'post',
    data
  })
}

/**
 * 查询文物的查验意见
 */
export function findBizCroAppraiseHistory(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/findBizCroAppraiseHistorys',
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
export function querySelectableDExhibitionList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/bizCroCrUpdate/querySelectableDExhibitionList',
    method: 'post',
    data
  })
}

/**
 * 查询复出(进)境可以选择的文物信息
 */
export function querySelectableDCroCrList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/bizCroCrUpdate/querySelectableDCroCrList',
    method: 'post',
    data
  })
}
