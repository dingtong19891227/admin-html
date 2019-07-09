import request from '../utils/request'

/**
 /* 模块名称
 **/
var moduleName = "/sysUser";
export default {
  queryUserInfos: queryUserInfos,
  queryUserInfosByDeptId:queryUserInfosByDeptId,
  queryUserInfosByRoleId:queryUserInfosByRoleId,
  updateUserStatus : updateUserStatus,
  createUser : createUser,
}

/**
 * 列表查询
 * @param data
 */
export function queryUserInfos(data) {
  return request({
    url: moduleName + "/getGrid.do",
    method: "post",
    data,
  })
}

/**
 * 根据id修改员工在职状态
 * @param data
 */
export function updateUserStatus(data) {
  return request({
    url: moduleName + "/updateStatusById.do",
    method: "post",
    params:  {
      kid : data.kid,
      status : 'incum-005',  //incum-005离职
    },
  })
}

/**
 * 根据部门id查询员工信息
 * @param data
 */
export function queryUserInfosByDeptId(data) {
  return request({
    url: moduleName + "/getUserByDeptId.do",
    method: "post",
    data
  })
}

/**
 * 根据角色id来查询员工信息
 * @param data
 */
function queryUserInfosByRoleId(data) {
  return request({
    url: moduleName + "/getUserByRoleId.do",
    method: "get",
    params: {
      roleId:data
    }
  })
}

/**
 * 添加员工
 * @param data
 */
export function createUser(data) {
  return request({
    url: moduleName + "/create.do",
    method: "post",
    data,
  })
}


