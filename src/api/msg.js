import request from '@/utils/request'

export function fetchMsg(query) {
  return request({
    url: '/msg/list',
    method: 'get',
    params: query
  })
}
