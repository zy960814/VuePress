import axios from 'axios'
import request from '@/utils/request'
import API_PREFIX from './config'

export function login(ticket) {
  return axios.post(
    API_PREFIX.BASIC_DATA + '/createTokenByUserId',
    null,
    {
      headers: {'Authorization': ticket}
      
    }
  )
}

export function getInfo() {
  return request({
    url: API_PREFIX.BASIC_DATA + '/getMenusById',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
