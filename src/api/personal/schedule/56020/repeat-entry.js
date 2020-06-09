import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 查询复出境展览可以选择的事项信息
 */
export function findSelectableDExhibitionList(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/findSelectableDExhibitionList',
    method: 'post',
    data
  })
}


/**
 * 查询复出(进)境可以选择的文物信息
 */
export function findSelectableDCroCrList(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/findSelectableDCroCrList',
    method: 'post',
    data
  })
}

/**
 * 保存复进境展览事项信息
 */
export function saveApplyEexhibition(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/saveApplyEexhibition',
    method: 'post',
    data: {data}
  })
}

/**
 * 保存复进境展览的文物信息
 */
export function saveAgainEexhibitionAll(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/saveAgainEexhibitionAll',
    method: 'post',
    data
  })
}

/**
 * 文物或复仿制品信息移除后, 二次添加
 */
export function saveAgainEBizCroCr(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/saveAgainEBizCroCr',
    method: 'post',
    data
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
 * 文物或复仿制品列表查询
 */
export function listCulturalRelic(data) {
    return request({
        url: API_PREFIX.PERSONAL + '/bizCroCr/queryBizCroCrList',
        method: 'post',
        data
    })
}

