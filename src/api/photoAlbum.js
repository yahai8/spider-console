import request from '@/utils/request'

export function fetchPhotoAlbum(query) {
  return request({
    url: '/photoAlbum/list',
    method: 'get',
    params: query
  })
}
