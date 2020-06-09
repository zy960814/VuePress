import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 文物出境查验列表查询
 */
export function queryApplyAList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/queryApplyAList',
    method: 'post',
    data
  })
}

/**
 * 文物出境详情查询
 */
export function getApplyApDetail(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/getApplyApDetail',
    method: 'post',
    data
  })
}

/**
 * 查询文物或复仿制品的详情及鉴定信息
 */
export function queryBizCrInspectList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/queryBizCrInspectList',
    method: 'post',
    data
  })
}
