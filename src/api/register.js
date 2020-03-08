import request from '@/utils/request'

export function register (username, password) {
  let data = { 'username': username, 'password': password }
  return request({
    url: '/chat/auth/register',
    data,
    method: 'post'
  })
}
