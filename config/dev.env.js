'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const useUrl = 'l'
const url = {
  t: 'http://192.168.1.127/', // 测试
  l: 'http://192.168.1.81/' // 真实
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  J_API: url[useUrl]
})
