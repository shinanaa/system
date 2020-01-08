import Http from 'common/js/request'

export function getDepartmentList (params) {
  const data = {
    bmid: params.bmid,
    jsid: params.jsid,
    mc: params.mc,
    zt: params.zt,
    pageSize: params.pageSize,
    pageNo: params.pageCurrent
  }
  return Http.postRequest(params.url, data)
}

export function editDepartmentItem (editParams) {
  const data = {
    mc: editParams.mc,
    dm: editParams.dm,
    zt: editParams.zt,
    jb: editParams.jb,
    xh: editParams.xh,
    sjbmid: editParams.sjbmid,
    sjbmmc: editParams.sjbmmc,
    bmid: editParams.bmid
  }
  return Http.postRequest(editParams.url, data)
}

export function addDepartmentItem (addParams) {
  const data = {
    mc: addParams.mc,
    dm: addParams.dm,
    zt: addParams.zt,
    jb: addParams.jb,
    xh: addParams.xh,
    sjbmid: addParams.sjbmid,
    sjbmmc: addParams.sjbmmc
  }
  return Http.postRequest(addParams.url, data)
}

export function deleteDepartmentItem (deleteParams) {
  const data = {
    bmid: deleteParams.bmid
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getDepartmentTree (url) {
  return Http.postRequest(url)
}

export function getDepartmentPersonTree (url) {
  return Http.postRequest(url)
}
