import storage from 'good-storage'

// token
const TOKEN_KEY = 'user-Token'

export function setToken (token) {
  return storage.session.set(TOKEN_KEY, token)
}
export function getToken () {
  return storage.session.get(TOKEN_KEY)
}
export function removeToken () {
  storage.session.remove(TOKEN_KEY)
  return []
}

// 用户登录信息 id
const LOGIN_KEY = 'user-Info'

export function setUserLogin (token) {
  return storage.session.set(LOGIN_KEY, token)
}
export function getUserLogin () {
  return storage.session.get(LOGIN_KEY)
}
export function removeUserLogin () {
  storage.session.remove(LOGIN_KEY)
  return ''
}

// 用户名
const NAME_KEY = 'user-Name'

export function setUserName (name) {
  return storage.session.set(NAME_KEY, name)
}
export function getUserName () {
  return storage.session.get(NAME_KEY)
}
export function removeUserName () {
  storage.session.remove(NAME_KEY)
  return ''
}

// 用户角色
const ROLE_KEY = 'user-Role'

export function setUserRole (name) {
  return storage.session.set(ROLE_KEY, name)
}
export function getUserRole () {
  return storage.session.get(ROLE_KEY)
}
export function removeUserRole () {
  storage.session.remove(ROLE_KEY)
  return ''
}

// 用户角色id
const ROLEID_KEY = 'user-RoleId'

export function setUserRoleId (name) {
  return storage.session.set(ROLEID_KEY, name)
}
export function getUserRoleId () {
  return storage.session.get(ROLEID_KEY)
}
export function removeUserRoleId () {
  storage.session.remove(ROLEID_KEY)
  return ''
}

// 当前模块名称
const CURRENT_MODULE_KEY = 'module-name'
export function setModule (list) {
  return storage.session.set(CURRENT_MODULE_KEY, list)
}
export function getModule () {
  return storage.session.get(CURRENT_MODULE_KEY)
}
export function removeModule () {
  storage.session.remove(CURRENT_MODULE_KEY)
  return ''
}

// 左侧的功能列表
const PLUGIN_LIST_KEY = 'plugin-list'
export function setPluginList (list) {
  return storage.session.set(PLUGIN_LIST_KEY, list)
}
export function getPluginList () {
  return storage.session.get(PLUGIN_LIST_KEY)
}
export function removePluginList () {
  storage.session.remove(PLUGIN_LIST_KEY)
  return []
}
