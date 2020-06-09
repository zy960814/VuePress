/**
 * @Author: HuangXuLin
 * @Description: 时间格式化函数
 *
 * @param date       字符串/时间戳/Date
 * @param pattern    yyyy-MM-dd、yy-M-d H:m:s
 * @returns {string}
 */
export function dateFormat(date, pattern) {
  if (arguments.length === 0) {
    return null;
  }
  let mDate;
  if (typeof date === 'object') {
    mDate = date;
  } else {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/');
    } else if (typeof time === 'number' && date.toString().length === 10) {
      date = date * 1000;
    }
    mDate = new Date(date);
  }
  return mDate.format(pattern);
}
