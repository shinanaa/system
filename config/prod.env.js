'use strict'
const useUrl = 'l'
const url = {
  t: 'http://www.netpaper.top:5000/', // 测试
  l: 'http://192.168.1.127/' // 真实
}
module.exports = {
  NODE_ENV: '"production"',
  J_API: url[useUrl]
}
