import qs from 'qs'
import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 报表查询
 */
export function queryReport(queryParams, pathVariable) {
  return request({
    url: API_PREFIX.APPRAISAL + '/report-form/' + pathVariable,
    method: 'post',
    data: qs.stringify(queryParams)
  });
}

/**
 * 报表导出
 */
export function exportReport(params) {
  return request({
    url: API_PREFIX.APPRAISAL + '/export-excel',
    method: 'post',
    responseType: 'blob',
    data: params
  });
}
