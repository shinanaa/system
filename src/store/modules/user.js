import * as types from '../mutation-types'
import {ERR_CODE} from 'common/js/config'
import {loginByUsername, logout} from '@/api/login'
import {getToken, setToken, removeToken, getUserRole, setUserRole, removeUserRole, getUserRoleId, setUserRoleId, removeUserRoleId, getUserLogin, setUserLogin, removeUserLogin, getUserName, setUserName, removeUserName} from 'common/js/cache'

const user = {
  state: {
    token: getToken(),
    role: getUserRole(),
    roleId: getUserRoleId(),
    userLogin: getUserLogin(),
    userName: getUserName()
  },
  mutations: {
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_USER_LOGIN] (state, userLogin) {
      state.userLogin = userLogin
    },
    [types.SET_USER_NAME] (state, mc) {
      state.userName = mc
    },
    [types.SET_ROUTER] (state, moduleList) {
      state.moduleList = moduleList
    },
    [types.SET_USER_ROLE] (state, role) {
      state.role = role
    },
    [types.SET_USER_ROLE_ID] (state, roleId) {
      state.roleId = roleId
    }
  },
  actions: {
    changeRole ({commit}, role) {
      commit(types.SET_USER_ROLE_ID, role.jsid)
      commit(types.SET_USER_ROLE, role.mc)
      setUserRole(role.mc)
      setUserRoleId(role.jsid)
    },
    LoginByUsername ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then((res) => {
          console.log(res)
          const data = res
          if (data.errcode === ERR_CODE) {
            commit(types.SET_TOKEN, data.authorization)
            commit(types.SET_USER_NAME, data.mc)
            commit(types.SET_USER_LOGIN, data.yhid)
            commit(types.SET_USER_ROLE, data.jsmc)
            commit(types.SET_USER_ROLE_ID, data.jsid)
            setToken(data.authorization)
            setUserLogin(data.yhid)
            setUserName(data.mc)
            setUserRole(data.jsmc)
            setUserRoleId(data.jsid)
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
          commit(types.SET_USER_LOGIN, '')
          commit(types.SET_USER_ROLE, '')
          commit(types.SET_USER_ROLE_ID, '')
          removeToken()
          removeUserLogin()
          removeUserName()
          removeUserRole()
          removeUserRoleId()
          resolve()
        })
      })
    }
  }
}

export default user
