import * as types from '../mutation-types'
import {ERR_CODE} from 'common/js/config'
import {loginByUsername, logout} from '@/api/login'
import {getToken, setToken, removeToken} from 'common/js/cache'

const user = {
  state: {
    mc: '',
    roles: '平台管理员',
    token: getToken()
  },
  mutations: {
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_USER_NAME] (state, mc) {
      state.mc = mc
    }
  },
  actions: {
    LoginByUsername ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then((res) => {
          const data = res
          if (data.errcode === ERR_CODE) {
            commit(types.SET_TOKEN, data.authorization)
            commit(types.SET_USER_NAME, data.mc)
            setToken(data.authorization)
            // 还需提交用户的当前角色,后端未开发功能
          }
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logOut ({commit, state}, url) {
      return new Promise((resolve, reject) => {
        logout(url).then((res) => {
          console.log(res)
          commit(types.SET_TOKEN, '')
          commit(types.SET_USER_NAME, '')
          removeToken()
          resolve()
        })
      })
    }
  }
}

export default user
