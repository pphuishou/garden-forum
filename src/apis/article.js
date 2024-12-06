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

