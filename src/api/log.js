import Http from 'common/js/request'

export function getLogList (getInfo) {
  const data = {
    lx: getInfo.lx,
    ksrq: getInfo.ksrq,
    jsrq: getInfo.jsrq,
    pageSize: getInfo.pageSize,
    pageNo: getInfo.pageNo
  }
  return Http.postRequest(getInfo.url, data)
}
