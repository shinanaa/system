const getters = {
  userName: state => state.user.userName,
  role: state => state.user.role,
  roleId: state => state.user.roleId,
  userLogin: state => state.user.userLogin,
  token: state => state.user.token
}
export default getters
