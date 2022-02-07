import request from '@/utils/request'

export function fetchPhoto(query) {
  return request({
    url: '/photo/list',
    method: 'get',
    params: query
  })
}
