/**
 * @Author: HuangXuLin
 * @Description: 公共方法抽取
 */

import printJS from 'print-js'

/**
 * Base64 编码解码
 */
export const Base64 = require('js-base64').Base64;

/**
 * 获取 URL 链接的参数值
 *
 * @param name 参数名称
 * @param url 链接地址, 默认值为当前页面地址
 * @returns {*} 参数值
 */
export function getQueryString(name, url) {
  const temp = (url || location.href).split('?');
  if (temp.length > 1) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = temp[1].match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
  }
  return null;
}

/**
 * 获取祖先组件的属性/方法
 *
 * @param vueComponent 当前组件（VUE实例）
 * @param attrName 属性名或方法名
 */
export function getAncestorAttr(vueComponent, attrName) {
  if (vueComponent.hasOwnProperty('$parent')) {
    vueComponent = vueComponent.$parent;
    if (vueComponent) {
      return vueComponent.hasOwnProperty(attrName)
        ? vueComponent[attrName]
        : getAncestorAttr(vueComponent, attrName);
    }
  }
  return null;
}

/**
 * @Author: HuangXuLin
 * @Description: ElementUI Table 报表打印
 *
 * @param id DOM ID
 */
export function print(id) {
  let html = '';
  const dom = document.querySelector('#' + id);
  let title = dom.querySelector('.hxl__title');
  if (title != null) {
    html += '<h1>';
    html += title.innerText;
    html += '</h1>';
  }
  let subtitle = dom.querySelector('.hxl__subtitle');
  if (subtitle != null) {
    html += '<div>';
    html += subtitle.innerText;
    html += '</div>';
  }
  html += '<table>';
  const thead = dom.querySelector('.el-table__header-wrapper thead');
  if (thead != null) {
    // 适配滚动条, 打印时去除白边占位
    let trs = thead.querySelectorAll('tr');
    for (let i = 0; i < trs.length; i++) {
      html += '<tr>';
      let ths = trs[i].querySelectorAll('th');
      let tempDiv = document.createElement('div');
      tempDiv.innerHTML = trs[i].innerHTML;
      let trCell = tempDiv.querySelectorAll('.cell');
      for (let j = 0; j < trCell.length; j++) {
        html += '<th colspan="' + ths[j].colSpan + '" rowspan="' + ths[j].rowSpan + '">';
        html += trCell[j].innerText;
        html += '</th>';
      }
      html += '</tr>';
    }
    // html += thead.innerHTML;
  }
  const tbody = dom.querySelector('.el-table__body-wrapper tbody');
  if (tbody != null) {
    html += tbody.innerHTML;
  }
  html += '</table>';
  const div = document.createElement('div');
  const printDOMID = 'hxl__printDOMElement';
  div.id = printDOMID;
  div.innerHTML = html;
  document.querySelector('body').appendChild(div);
  printJS({
    printable: printDOMID,
    type: 'html',
    scanStyles: false,
    style: `
      h1 {
        margin: 0;
        font-size: 16px;
        text-align: center;
        margin-bottom: 10px
      }
      div {
        text-align: center;
        font-size: 14px;
        margin-bottom: 5px
      }
      table {
        border-collapse: collapse;
        border: 1px solid black;
        font-size: 14px;
        margin: 0 auto
      }
      th, td {
        border: 1px solid black;
        padding: 0 5px;
        text-align: center
      }
    `
  });
  div.remove();
}
