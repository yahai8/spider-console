import request from '@/utils/request'

export function fetchFriend(query) {
  return request({
    url: '/friend/list',
    method: 'get',
    params: query
  })
}
