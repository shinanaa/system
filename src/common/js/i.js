const i = {
  loginOn: { url: 'portal/login' },
  logOut: { url: 'portal/logout' },
  changePwd: { url: 'gateway/system/system/user/updatePassword' },
  // 用户管理
  getUserDepartmentTree: { url: 'gateway/system/system/department/departmentTreeByQuery' }, // 用户条件查询使用
  getUserById: { url: 'gateway/system/system/user/queryUserById' },
  getUserInfo: { url: 'gateway/system/system/user/queryAllUserWithPage' }, // 分页获取用户数据
  editUserInfo: { url: 'gateway/system/system/user/updateUser' },
  addUserInfo: { url: 'gateway/system/system/user/insertUser' },
  deleteUserInfo: { url: 'gateway/system/system/user/deleteUser' },
  deleteUsers: { url: 'gateway/system/system/user/deleteUsers' },
  // 模块管理
  getModuleTree: { url: 'gateway/system/system/module/queryModuleList' },
  getModuleById: { url: 'gateway/system/system/module/queryModuleById' },
  getModuleInfo: { url: 'gateway/system/system/module/queryModuleListPage' },
  addModuleInfo: { url: 'gateway/system/system/module/saveModule' },
  editModuleInfo: { url: 'gateway/system/system/module/updateModule' },
  deleteModuleInfo: { url: 'gateway/system/system/module/deleteModuleById' },
  // 功能管理
  getPluginTree: { url: 'gateway/system/system/plugin/moudlePluginTree' },
  getPluginList: {url: 'gateway/system/system/plugin/queryPluginList'},
  getPluginInfo: { url: 'gateway/system/system/plugin/queryPluginListPage' },
  getPluginById: { url: 'gateway/system/system/plugin/queryPluginById' },
  addPluginInfo: { url: 'gateway/system/system/plugin/savePlugin' },
  editPluginInfo: { url: 'gateway/system/system/plugin/updatePlugin' },
  deletePluginInfo: { url: 'gateway/system/system/plugin/deletePluginById' },
  // 角色管理
  getRoleTree: { url: 'gateway/system/system/role/queryRoleList' },
  getRoleInfo: { url: 'gateway/system/system/role/queryRoleListPage' },
  getRoleById: { url: 'gateway/system/system/role/queryRoleById' },
  addRoleInfo: { url: 'gateway/system/system/role/saveRole' },
  editRoleInfo: { url: 'gateway/system/system/role/updateRole' },
  deleteRoleInfo: { url: 'gateway/system/system/role/deleteRoleById' },
  changeRole: { url: 'gateway/system/system/role/switchRole' },
  // 日志管理
  getLogInfo: { url: 'gateway/system/system/log/queryLogListPage' },
  // 通知公告
  getNoticeInfo: { url: 'gateway/system/system/notice/queryNoticeListPage' },
  getNoticeById: { url: 'gateway/system/system/notice/queryNoticeById' },
  addNoticeInfo: { url: 'gateway/system/system/notice/saveNoticeInfo' },
  editNoticeInfo: { url: 'gateway/system/system/notice/updateNotice' },
  deleteNoticeInfo: { url: 'gateway/system/system/notice/deleteNoticeById' },
  uploadImage: { url: 'gateway/system/system/file/upImage' },
  // 部门管理
  getDepartmentTree: { url: 'gateway/system/system/department/queryDepartmentTree' },
  getDepartmentPersonTree: { url: 'gateway/system/system/department/queryDepartmentPersonTree' },
  getDepartmentInfo: { url: 'gateway/system/system/department/queryDepartmentListPage' },
  getDepartmentById: { url: 'gateway/system/system/department/queryDepartmentById' },
  addDepartmentInfo: { url: 'gateway/system/system/department/saveDepartment' },
  editDepartmentInfo: { url: 'gateway/system/system/department/updateDepartment' },
  deleteDepartmentInfo: { url: 'gateway/system/system/department/deleteDepartmentById' }
}

export default i
