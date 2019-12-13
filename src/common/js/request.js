import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {getToken} from 'common/js/cache'

import { J_API } from '../../../config/dev.env'
import i from './i'

// 拦截器
// 请求拦截器
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.data['authorization'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

const Http = {
  postRequest: function (url, param) {
    param = param && typeof param === 'object' ? param : {}
    url = J_API + i[url].url
    const config = {
      url: url,
      method: 'post',
      transformRequest: [function (param) {
        return qs.stringify(param)
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    config.data = param
    console.log(config)
    return axios(config)
  },
  getReuest: function (url, param) {
    param = param && typeof param === 'object' ? param : {}
    url = J_API + i[url].url
    const config = {
      url: url,
      method: 'get',
      transformRequest: [function (param) {
        return qs.stringify(param)
      }]
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest'
      // }
    }
    config.data = param
    return axios(config)
  }
}
export default Http
