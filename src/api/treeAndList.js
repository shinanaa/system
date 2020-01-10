import {ERR_CODE} from 'common/js/config'
import {getRoleTree} from '@/api/role'
import {getDepartmentData} from '@/api/department'

// 获取角色列表
export function getRoleList (list) {
  getRoleTree('getRoleTree').then((res) => {
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

// 获取部门树
export function getDepartmentTree () {
  const p = new Promise(function (resolve, reject) {
    getDepartmentData('getDepartmentTree').then((res) => {
      if (res.errcode === ERR_CODE) {
        let departmentsList = res.list
        departmentsList.map((arr) => {
          if (arr.children.length) {
            arr.children.map((item) => {
              if (item.children.length) {
              } else {
                delete item.children
              }
            })
          } else {
            delete arr.children
          }
        })
        resolve(res.list)
      }
    }).catch((err) => {
      reject(err)
    })
  })
  return p
}
