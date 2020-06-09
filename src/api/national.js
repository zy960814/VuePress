import request from '@/utils/request'
import API_PREFIX from './config'
//查询待办
export function searchWaitHandle(data) {
    return request({
        url: API_PREFIX.NATIONAL + '/CRUD/findBizRegulatoryPendingDisposal',
        method: 'post',
        data
    })
}
//查询已办
export function searchAlreadyHandle(data) {
    return request({
        url: API_PREFIX.NATIONAL + '/CRUD/findBizRegulatoryProcessed',
        method: 'post',
        data
    })
}
// 查询详情
export function waitDetail(crId) {
    return request({
        url: API_PREFIX.NATIONAL + `/CRUD/findJgJgxwCheckAction?crId=${crId}`,
        method: 'post',

    })
}
// 全部重新生成
export function randomPersions(num, superviseItemImplementCode) {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/randomPersionsAndItem?num=${num}&superviseItemImplementCode=${superviseItemImplementCode}`,
        method: 'post',

    })
}
// 生成随机仅生成监管人员
export function randomPersion(num, superviseItemImplementCode) {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/randomPersion?num=${num}&superviseItemImplementCode=${superviseItemImplementCode}`,
        method: 'post',
    })
}
// 生成随机生成监管对象
export function randomItem() {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/randomItem`,
        method: 'post',
    })
}
// 任务下发
export function assignJob(data) {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/assignJob`,
        method: 'post',
        data
    })
}
// 保存
export function saveTask(data) {
    return request({
        url: API_PREFIX.NATIONAL + `/CRUD/saveJgJgxwCheckAction`,
        method: 'post',
        data
    })
}
// 系统编码查询下拉接口
export function superviseType(classCode) {
    return request({
        url: API_PREFIX.BASIC_DATA + `/sys/code/findSysCodeName?classCode=${classCode}`,
        method: 'post',
    })
}
// 自定义待办列表保存
export function saveDynamic(data) {
    return request({
        url: API_PREFIX.BASIC_DATA + `/BizuserAccountDynamic/saveBizuserAccountDynamic`,
        method: 'post',
        data
    })
}
// 自定义列表查询
export function findDynamic(supervise) {
    return request({
        url: API_PREFIX.BASIC_DATA + `/BizuserAccountDynamic/findBizuserAccountDynamic?tableType=${supervise}`,
        method: 'post'
    })
}
// 查询监管事项清单接口
export function findRegulatoryLocal() {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/findRegulatoryLocal`,
        method: 'post'
    })
}
// 分页查询-满足监管事项检查人员
export function findPersionsPage(data, superviseItemImplementCode) {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/findPersionsPage?superviseItemImplementCode=${superviseItemImplementCode}`,
        method: 'post',
        data
    })
}
// 填报人员事项提交
export function subJgJgxwCheckAction(data) {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/subJgJgxwCheckAction`,
        method: 'post',
        data
    })
}
// 填报人员新建事项本地保存
export function saveReguJgJgxwCheckAction(data) {
    return request({
        url: API_PREFIX.NATIONAL + `/JGRandom/saveReguJgJgxwCheckAction`,
        method: 'post',
        data
    })
}