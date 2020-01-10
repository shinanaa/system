import Http from 'common/js/request'

export function getDepartmentList (params) {
  const data = {
    mc: params.mc,
    dm: params.dm,
    zt: params.zt,
    pageSize: params.pageSize,
    pageNo: params.pageCurrent
  }
  return Http.postRequest(params.url, data)
}

export function getDepartmentItem (params) {
  const data = {
    bmid: params.bmid
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
    mc: addParams.name,
    dm: addParams.code,
    zt: addParams.state,
    jb: addParams.level,
    xh: addParams.order,
    sjbmid: addParams.heightDepartment
  }
  return Http.postRequest(addParams.url, data)
}

export function deleteDepartmentItem (deleteParams) {
  const data = {
    bmid: deleteParams.bmid
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getDepartmentData (url) {
  return Http.postRequest(url)
}

export function getDepartmentPersonTree (url) {
  return Http.postRequest(url)
}
