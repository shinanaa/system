'use strict'
const useUrl = 't'
const url = {
  t: 'http://www.netpaper.top:5000/', // 真实
  l: 'http://192.168.1.127/' // 测试
}
module.exports = {
  NODE_ENV: '"production"',
  J_API: url[useUrl]
}
