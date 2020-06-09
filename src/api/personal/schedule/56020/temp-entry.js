import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 上传临时进境展览文件
 */
export function uploadFile() {
  return request({
    url: API_PREFIX.BASIC_DATA + '/bizTempfile/uploadBexhibitionFile',
    method: 'post'
  })
}

/**
 * 查询审核机构数据字典
 */
export function getAuditAgencyDic() {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/findAppraisals',
    method: 'post'
  })
}

/**
 * 保存展览信息、携运人信息
 */
export function saveExhibitionInfo(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/saveApplyBexhibition',
    method: 'post',
    data: {data}
  })
}

/**
 * 提交展览信息、携运人信息
 */
export function submitExhibitionInfo(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/apprSubmit',
    method: 'post',
    data
  })
}

/**
 * 保存文物或复仿制品信息
 */
export function saveCulturalRelicInfo(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/saveBizCroCr',
    method: 'post',
    data
  })
}

/**
 * 文物或复仿制品列表查询
 */
export function listCulturalRelic(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/queryBizCroCrList',
    method: 'post',
    data
  })
}

/**
 * 文物或复仿制品单条记录查询
 */
export function fetchCulturalRelic(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/getBizCroCrDetail',
    method: 'post',
    data
  })
}

/**
 * 删除文物或复仿制品的某条记录
 */
export function delCulturalRelic(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/deleteBizCroCr',
    method: 'post',
    data
  })
}

/**
 * 办事指南对话框详情
 */
export function crExitPermit(data) {
  return request({
    // __HXL TODO
    url: 'http://192.168.1.115:8020/home/guidance/find',
    method: 'post',
    data
  })
}

/**
 * 获取文物的图片信息
 */
export function getBizCroCrPics(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/getBizCroCrPics',
    method: 'post',
    data
  })
}

/**
 * 保存临时进境个人事项
 */
export function saveApplyBpersonal(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/saveApplyBpersonal',
    method: 'post',
    data: {data}
  })
}
