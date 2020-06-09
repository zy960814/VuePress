/**
 * @Author: HuangXuLin
 * @Description: 文件下载
 */

import FileSaver from 'file-saver'

const mimeTypeMap = [{
  extension: '.xlsx',
  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}];

/*
 * @param responseData  待下载的二进制数据
 * @param fileName      下载后的文件名
 * @param mimeType      下载文件的 Mime 类型的索引
 */
export default function (responseData, fileName, mimeTypeIndex) {
  var blob = new Blob([responseData], {
    type: mimeTypeMap[mimeTypeIndex].mimeType
  });
  FileSaver.saveAs(blob, fileName + mimeTypeMap[mimeTypeIndex].extension);
}
