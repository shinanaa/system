import Http from 'common/js/request'

export function getUserList (userInfo) {
  const data = {
    mc: userInfo.mc,
    zt: userInfo.zt,
    jsid: userInfo.jsid,
    qid: userInfo.qid,
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
    xh: editParams.xh,
    zt: editParams.zt,
    bmid: editParams.bmid,
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
    xh: addParams.xh,
    zt: addParams.zt,
    bmid: addParams.bmid,
    yhjsid: addParams.yhjsid
  }
  return Http.postRequest(addParams.url, data)
}

export function getUserItem (getInfo) {
  const data = {
    yhid: getInfo.yhid
  }
  return Http.postRequest(getInfo.url, data)
}

export function deleteUsers (info) {
  const data = {
    userids: info.userids
  }
  return Http.postRequest(info.url, data)
}

export function getUserTree (url, zt) {
  const data = {
    zt: zt
  }
  return Http.postRequest(url, data)
}

export function getUserModule (info) {
  const data = {
    yhid: info.yhid,
    jsid: info.jsid
  }
  return Http.postRequest(info.url, data)
}

export function getUserRole (info) {
  const data = {
    yhid: info.yhid
  }
  return Http.postRequest(info.url, data)
}

export function getMouldLink (url) {
  return Http.postRequest(url)
}
