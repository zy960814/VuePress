import request from '@/utils/request'
import API_PREFIX from '@/api/config'

/**
 * 查询复出境展览可以选择的事项信息
 */
export function findSelectableBExhibitionList(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/findSelectableBExhibitionList',
    method: 'post',
    data
  })
}


/**
 * 查询复出(进)境可以选择的文物信息
 */
export function findSelectableBCroCrList(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/findSelectableBCroCrList',
    method: 'post',
    data
  })
}

/**
 * 保存复出境展览事项信息
 */
export function saveApplyCexhibition(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/saveApplyCexhibition',
    method: 'post',
    data: {data}
  })
}

/**
 * 保存复出境(展览)的文物信息
 */
export function saveAgainCexhibitionAll(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/saveAgainCexhibitionAll',
    method: 'post',
    data
  })
}

/**
 * 文物或复仿制品信息移除后, 二次添加
 */
export function saveAgainCBizCroCr(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroCr/saveAgainCBizCroCr',
    method: 'post',
    data
  })
}

/**
 * 保存复出境(个人携带申请)的文物信息
 */
export function saveApplyCpersonal(data) {
  return request({
    url: API_PREFIX.PERSONAL + '/bizCroItem/saveApplyCpersonal',
    method: 'post',
    data: {data}
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
