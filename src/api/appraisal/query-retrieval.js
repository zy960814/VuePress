import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 查询检索 - 文物出境事项列表查询
 */
export function findStationBizList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/findStationBizList',
    method: 'post',
    data
  })
}

/**
 * 查询检索 - 文物出境事项列表查询
 */
export function findStationCroList(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/findStationCroList',
    method: 'post',
    data
  })
}
