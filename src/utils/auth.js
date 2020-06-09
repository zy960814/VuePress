/**
 * @Author: HuangXuLin
 * @Description: Token 操作工具类
 */
import {LOCAL_STORAGE_KEY} from './const'

export function getToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_KEY);
}

export function setToken(token) {
  return localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN_KEY, token);
}

export function removeToken() {
  return localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN_KEY);
}
