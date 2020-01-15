import axios from 'axios'
// import qs from 'qs'
import Http from 'common/js/request'

export function getNoticeInfo (unitInfo) {
  const data = {
    lx: unitInfo.type,
    bt: unitInfo.title,
    zt: unitInfo.state,
    pageSize: unitInfo.pageSize,
    pageNo: unitInfo.pageCurrent
  }
  return Http.postRequest(unitInfo.url, data)
}

export function addNoticeItem (addParams) {
  const data = {
    lx: addParams.lx,
    bt: addParams.bt,
    ly: addParams.ly,
    nr: addParams.nr,
    tpwj: addParams.tpwj,
    fjwj: addParams.fjwj,
    zt: addParams.zt,
    users: addParams.users
  }
  return Http.postRequest(addParams.url, data)
}

export function editNoticeItem (editParams) {
  const data = {
    lx: editParams.lx,
    bt: editParams.bt,
    ly: editParams.ly,
    nr: editParams.nr,
    tpwj: editParams.tpwj,
    fjwj: editParams.fjwj,
    zt: editParams.zt,
    users: editParams.users,
    tzggid: editParams.tzggid
  }
  return Http.postRequest(editParams.url, data)
}

export function deleteNoticeItem (deleteParams) {
  const data = {
    tzggid: deleteParams.noticeId
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getNoticeItem (getInfo) {
  const data = {
    tzggid: getInfo.noticeId
  }
  return Http.postRequest(getInfo.url, data)
}

export function uploadImg (info, url) {
  const config = {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data: info,
    timeout: 20000
  }
  console.log(config)
  return axios(config)
}

// export function uploadImg (data, url) {
//   return axios.post(url, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
// }
