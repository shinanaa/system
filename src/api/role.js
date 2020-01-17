import Http from 'common/js/request'

export function getRoleList (userInfo) {
  const data = {
    mc: userInfo.mc,
    zt: userInfo.zt,
    pageSize: userInfo.pageSize,
    pageNo: userInfo.pageCurrent
  }
  return Http.postRequest(userInfo.url, data)
}

export function getRoleItem (getInfo) {
  const data = {
    jsid: getInfo.jsid
  }
  return Http.postRequest(getInfo.url, data)
}

export function editRoleItem (editParams) {
  const data = {
    mc: editParams.mc,
    dm: editParams.dm,
    xh: editParams.xh,
    zt: editParams.zt,
    jsid: editParams.jsid,
    jsgnid: editParams.jsgnid,
    userids: editParams.userids
  }
  return Http.postRequest(editParams.url, data)
}

export function addRoleItem (addParams) {
  const data = {
    mc: addParams.mc,
    dm: addParams.dm,
    xh: addParams.xh,
    zt: addParams.zt,
    jsgnid: addParams.jsgnid,
    userids: addParams.userids
  }
  return Http.postRequest(addParams.url, data)
}

export function deleteRoleItem (deleteParams) {
  const data = {
    jsid: deleteParams.jsid
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getRoleTree (url, zt) {
  const data = {
    zt
  }
  return Http.postRequest(url, data)
}
