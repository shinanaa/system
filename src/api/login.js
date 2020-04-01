import Http from 'common/js/request'

export function loginByUsername (userInfo) {
  const data = {
    userName: userInfo.userName,
    password: userInfo.password
  }
  return Http.postRequest(userInfo.url, data)
}
export function logout (url) {
  return Http.postRequest(url)
}
export function changePwd (pwdInfo) {
  console.log(pwdInfo)
  const data = {
    oldpassword: pwdInfo.oldPwd,
    newpassword: pwdInfo.newPwd,
    confirmpassword: pwdInfo.surePwd
  }
  return Http.postRequest(pwdInfo.url, data)
}
// 根据用户信息来获取功能列表
export function getPluginList (getInfo) {
  const data = {
    yhid: getInfo.yhid,
    jsid: getInfo.jsid,
    mkid: getInfo.mkid
  }
  return Http.postRequest(getInfo.url, data)
}
