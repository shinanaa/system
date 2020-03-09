'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const useUrl = 't'
const url = {
  t: 'http://www.netpaper.top:5000/', // 测试
  l: 'http://192.168.1.81/' // 真实
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  J_API: url[useUrl]
})
