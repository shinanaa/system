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
