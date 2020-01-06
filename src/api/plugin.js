import Http from 'common/js/request'

export function getPluginList (pluginInfo) {
  const data = {
    mcjc: pluginInfo.mcjc,
    mkid: pluginInfo.mkid,
    zt: pluginInfo.zt,
    pageSize: pluginInfo.pageSize,
    pageNo: pluginInfo.pageCurrent
  }
  return Http.postRequest(pluginInfo.url, data)
}

export function editPluginItem (editParams) {
  const data = {
    mcjc: editParams.mcjc,
    dm: editParams.dm,
    mcqc: editParams.mcqc,
    dz: editParams.dz,
    tb: editParams.tb,
    xh: editParams.xh,
    zt: editParams.zt,
    mkid: editParams.mkid,
    gnid: editParams.gnid
  }
  return Http.postRequest(editParams.url, data)
}

export function addPluginItem (addParams) {
  const data = {
    mkid: addParams.mkid,
    mcjc: addParams.mcjc,
    dm: addParams.dm,
    mcqc: addParams.mcqc,
    dz: addParams.dz,
    tb: addParams.tb,
    xh: addParams.xh,
    zt: addParams.zt,
    gnid: addParams.gnid
  }
  return Http.postRequest(addParams.url, data)
}

export function deletePluginItem (deleteParams) {
  const data = {
    gnid: deleteParams.gnid
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getPluginTree (url) {
  return Http.postRequest(url)
}
