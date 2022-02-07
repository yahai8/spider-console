import request from '@/utils/request'

export function fetchLog(query) {
  return request({
    url: '/log/list',
    method: 'get',
    params: query
  })
}
