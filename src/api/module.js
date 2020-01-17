import Http from 'common/js/request'

export function getModuleList (userInfo) {
  const data = {
    mc: userInfo.mc,
    zt: userInfo.zt,
    pageSize: userInfo.pageSize,
    pageNo: userInfo.pageCurrent
  }
  return Http.postRequest(userInfo.url, data)
}

// 获取或删除单条数据
export function getMoudleItem (params) {
  const data = {
    mkid: params.mkid
  }
  return Http.postRequest(params.url, data)
}

export function editModuleItem (editParams) {
  const data = {
    mc: editParams.mc,
    dm: editParams.dm,
    tb: editParams.tb,
    xh: editParams.xh,
    zt: editParams.zt,
    mkid: editParams.mkid
  }
  return Http.postRequest(editParams.url, data)
}

export function addModuleItem (addParams) {
  const data = {
    mc: addParams.mc,
    dm: addParams.dm,
    tb: addParams.tb,
    xh: addParams.xh,
    zt: addParams.zt
  }
  return Http.postRequest(addParams.url, data)
}

export function getModuleTree (url, zt) {
  const data = {
    zt
  }
  return Http.postRequest(url, data)
}
