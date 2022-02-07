import axios from 'axios'
import { baseUrl } from './api.config'

export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + url).then(res => {
      if (res.data.code === 200) {
        resolve(res.data)
      }
    }).catch(err => {
      if (err.message.includes('timeout')) {
        // 请求超时
      }
      reject(err)
    }).finally(() => {
      // 请求结束
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post('http://muyahai.cn/login/getUserInfo', params).then(res => {
      if (res.data.code === 200) {
        resolve(res.data)
      }
    }).catch(err => {
      if (err.message.includes('timeout')) {
        // 请求超时
      }
      reject(err)
    }).finally(() => {
      // 请求结束
    })
  })
}
