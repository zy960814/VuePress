export default function (queryParams, subtitle) {
  return {
    className: 'net.cdftech.appraisal.culturalrelics.controller.ReportFormController',
    methodName: 'reportForm3',
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
      'texture',
      'wwcjCount',
      'wwfcjCount',
      'wwlscjCount',
      'wwfjjCount',
      'wwjzcjCount',
      'total'
    ],
    header: [{
      col: ['进出境文物质地情况'],
      title: true,
      bgColor: false,
      border: false
    }, {
      col: [subtitle],
      bgColor: false,
      border: false
    }, {
      col: [
        '文物质地',
        '文物出境（不含复出境）',
        '文物临时进境复出境',
        '文物临时出境',
        '文物临时出境复进境',
        '文物禁止出境',
        '合计'
      ]
    }],
    merge: [
      [0, 0, 0, 6],
      [1, 1, 0, 6]
    ],
    colWidth: [15, 25, 25, 20, 25, 20, 10]
  }
}
