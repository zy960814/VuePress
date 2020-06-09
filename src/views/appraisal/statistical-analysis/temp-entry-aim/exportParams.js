export default function (queryParams, subtitle) {
  return {
    className: 'net.cdftech.appraisal.culturalrelics.controller.ReportFormController',
    methodName: 'reportForm2',
    args: [{
      code: 0,
      val: queryParams.beginDate,
      type: 'java.lang.String'
    }, {
      code: 0,
      val: queryParams.endDate,
      type: 'java.lang.String'
    }],
    data: 'data',
    fields: [
      'appraisal_name',
      'wwcj_geren',
      'lscj_zhanlan',
      'lsjj_zhanlan',
      'shoucang',
      'paimai',
      'xiaoshou',
      'xiufu',
      'keyan',
      'zhanlan',
      'qita',
      'total'
    ],
    header: [{
      col: ['文物临时进境目的情况'],
      title: true,
      bgColor: false,
      border: false
    }, {
      col: [subtitle],
      bgColor: false,
      border: false
    }, {
      col: ['进出境管理处', '文物出境', '文物临时出境', '文物临时进境', null, null, null, null, null, null, null, '合计']
    }, {
      col: [null, '个人携带', '展览', '展览', '个人携带', null, null, null, null, null, null, null]
    }, {
      col: [null, null, null, null, '收藏', '拍卖', '销售', '修复', '科研', '展览', '其他', null]
    }],
    merge: [
      [0, 0, 0, 11],
      [1, 1, 0, 11],
      [2, 4, 0, 0],
      [2, 2, 3, 10],
      [2, 4, 11, 11],
      [3, 4, 1, 1],
      [3, 4, 2, 2],
      [3, 4, 3, 3],
      [3, 3, 4, 10]
    ],
    colWidth: [35, 20, 20, 14, -1, -1, -1, -1, -1, -1, -1, 12]
  }
}
