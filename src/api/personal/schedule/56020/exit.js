import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 文物出境保存基本信息
 */
export function saveApplyA(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/saveApplyA',
    method: 'post',
    data: {data}
  })
}
