import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 查询页签待办数量
 */
export function queryBizTodoCount(data) {
  return request({
    url: API_PREFIX.APPRAISAL + '/culturalRelicsAppraisal/queryBizTodoCount',
    method: 'post',
    data
  })
}

