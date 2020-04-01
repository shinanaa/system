import Http from 'common/js/request'
import {ERR_CODE} from 'common/js/config'
import {getRoleTree} from '@/api/role'
import {getDepartmentData} from '@/api/department'
import {getUserTree} from '@/api/user'

// 获取角色列表
export function getRoleList (list, zt) {
  getRoleTree('getRoleTree', zt).then((res) => {
    if (res.errcode === ERR_CODE) {
      console.log(res)
      let roleList = res.list
      roleList.map((item) => {
        let roleItem = {}
        roleItem.label = item.mc
        roleItem.value = item.jsid
        list.push(roleItem)
      })
    } else {
      return false
    }
  })
}

// 获取用户管理条件查询部门树
export function getUserDepartmentTree (zt) {
  const p = new Promise(function (resolve, reject) {
    getUserTree('getUserDepartmentTree', zt).then((res) => {
      if (res.errcode === ERR_CODE) {
        console.log(res.list)
        resolve(res.list)
      }
    }).catch((err) => {
      reject(err)
    })
  })
  return p
}

// 获取部门树
export function getDepartmentTree () {
  const p = new Promise(function (resolve, reject) {
    getDepartmentData('getDepartmentTree').then((res) => {
      if (res.errcode === ERR_CODE) {
        resolve(res.list)
      }
    }).catch((err) => {
      reject(err)
    })
  })
  return p
}

// 获取部门人员树
export function getDepartmentPersonTree (url) {
  const p = new Promise(function (resolve, reject) {
    getUserTree(url).then((res) => {
      if (res.errcode === ERR_CODE) {
        console.log(res.list)
        resolve(res.list)
      }
    }).catch((err) => {
      reject(err)
    })
  })
  return p
}

// 获取模块功能列表
export function getPluginTree () {
  const p = new Promise(function (resolve, reject) {
    getUserTree('getPluginTree').then((res) => {
      if (res.errcode === ERR_CODE) {
        resolve(res.list)
      }
    }).catch((err) => {
      reject(err)
    })
  })
  return p
}

export function uploadFile (info, url) {
  return Http.postFile(url, info)
}
