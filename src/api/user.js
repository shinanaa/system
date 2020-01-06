import Http from 'common/js/request'

export function getUserList (userInfo) {
  const data = {
    dm: userInfo.dm,
    mc: userInfo.mc,
    zt: userInfo.zt,
    jsid: userInfo.jsid,
    pageSize: userInfo.pageSize,
    pageNo: userInfo.pageCurrent
  }
  return Http.postRequest(userInfo.url, data)
}

export function editUserItem (editParams) {
  const data = {
    dm: editParams.dm,
    mm: editParams.mm,
    mc: editParams.mc,
    zt: editParams.zt,
    yhjsid: editParams.yhjsid,
    yhid: editParams.yhid
  }
  return Http.postRequest(editParams.url, data)
}

export function addUserItem (addParams) {
  const data = {
    dm: addParams.dm,
    mm: addParams.mm,
    mc: addParams.mc,
    zt: addParams.zt,
    yhjsid: addParams.yhjsid
  }
  return Http.postRequest(addParams.url, data)
}

export function deleteUserItem (deleteParams) {
  const data = {
    yhid: deleteParams.yhid
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getUserTree (url) {
  return Http.postRequest(url)
}
