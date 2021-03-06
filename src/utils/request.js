import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const axiosRequest = axios.create({
  timeout: 5000
})

// request拦截器
axiosRequest.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken()
    config.headers['Content-Type'] = 'application/json'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
axiosRequest.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axiosRequest
