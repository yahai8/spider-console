import request from '@/utils/request'

export function fetchComment(query) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: query
  })
}
