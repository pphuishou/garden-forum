import { request } from  '@/utils'

// 获取token
export function reqToken(data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

// 获取用户信息
export function reqUserInfo() {
  return request({
    url: '/user/profile',
    method: 'get',
  })
}
