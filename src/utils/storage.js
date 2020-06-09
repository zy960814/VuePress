/**
 * @Author: HuangXuLin
 * @Description: 封装操作本地存储 LocalStorage 的方法
 */
const storage = {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export default storage;
