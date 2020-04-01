import Http from 'common/js/request'

export function getCrouselInfo (params) {
  const data = {
    mc: params.mc,
    zt: params.zt,
    pageSize: params.pageSize,
    pageNo: params.pageCurrent
  }
  return Http.postRequest(params.url, data)
}

export function getCrouselItem (getInfo) {
  const data = {
    lbid: getInfo.lbid
  }
  return Http.postRequest(getInfo.url, data)
}

export function deleteCrouselItem (getInfo) {
  const data = {
    lbid: getInfo.lbid
  }
  return Http.postRequest(getInfo.url, data)
}

export function addCrouselItem (params) {
  const data = {
    mc: params.mc,
    dm: params.dm,
    tpwj: params.tpwj,
    xh: params.xh,
    zt: params.zt
  }
  return Http.postRequest(params.url, data)
}

export function editCrouselItem (params) {
  const data = {
    mc: params.mc,
    dm: params.dm,
    tpwj: params.tpwj,
    xh: params.xh,
    zt: params.zt,
    lbid: params.lbid
  }
  return Http.postRequest(params.url, data)
}

export function uploadFile (info, url) {
  return Http.postFile(url, info)
}
