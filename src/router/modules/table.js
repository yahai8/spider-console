/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '多功能表格',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '好友信息' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '说说内容' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: '评论信息' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '说说相关图片' }
    },
    {
      path: 'msg',
      component: () => import('@/views/table/msg/index'),
      name: 'msg',
      meta: { title: '空间留言' }
    },
    {
      path: 'photoAlbum',
      component: () => import('@/views/table/photoAlbum'),
      name: 'photoAlbum',
      meta: { title: '相册' }
    },
    {
      path: 'photo',
      component: () => import('@/views/table/photo'),
      name: 'photo',
      meta: { title: '相册图片' }
    }
  ]
}
export default tableRouter
