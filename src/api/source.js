import request from '@/utils/request'

export function fetchSource(query) {
  return request({
    url: '/source/list',
    method: 'get',
    params: query
  })
}
