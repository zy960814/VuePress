export default function (queryParams, subtitle) {
  return {
    className: 'net.cdftech.appraisal.culturalrelics.controller.ReportFormController',
    methodName: 'reportForm1',
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
      'taoqi',
      'ciqi',
      'boli',
      'tongqi',
      'shiqi',
      'yuqi',
      'zhuanwa',
      'zhumu',
      'sizhi',
      'qiqi',
      'guyajiao',
      'tieqi',
      'jinqi',
      'yinqi',
      'pige',
      'zhizhi',
      'qita',
      'total'
    ],
    header: [{
      col: ['文物临时进境许可失效情况'],
      title: true,
      bgColor: false,
      border: false
    }, {
      col: [subtitle],
      bgColor: false,
      border: false
    }, {
      col: [
        '进出境管理处',
        '陶器',
        '瓷器',
        '玻璃',
        '铜器',
        '石器',
        '玉器',
        '砖瓦',
        '竹木',
        '丝织',
        '漆器',
        '骨牙角',
        '铁器',
        '金器',
        '银器',
        '皮革',
        '纸质',
        '其他',
        '合计'
      ]
    }],
    merge: [
      [0, 0, 0, 18],
      [1, 1, 0, 18]
    ],
    colWidth: [35]
  }
}
