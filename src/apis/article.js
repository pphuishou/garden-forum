import { request } from '@/utils';

// 获取频道列表
export function reqChannelList() {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

// 新增文章
export function reqAddArticle(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}
/**图片上传接口
 * method !! 没有S
 */
export function reqUploadImage(data) {
  return request({
    url: '/upload',
    method: 'POST',
    data
  })
}

// 获取文章列表
export function reqArticleList(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}
// 删除单条数据
export function reqdDelItem(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'delete',

  })
}
// 获取文章详情
export function reqArticleDetail(target) {
  return request({
    method: 'GET',
    url: `/mp/articles/${target}`,
  })
}
// 编辑文章
export function reqUpdateArticle(data) {
  return request({
    method: 'PUT',
    url: `/mp/articles/${data.id}`,
    data
  })
}

