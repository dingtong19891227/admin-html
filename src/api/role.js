import request from '@/utils/request'

var modelName = "/sysRole";

/**
 /*
 /* 获取所有角色信息
 /*
 */
function getAllRole() {
  return request({
    url: modelName + '/getAllList.do',
    method: 'get'
  })
}


/**
 /*
 /* 获取所有权限信息
 /*
 */
function getAllSysPage() {
  return request({
    url: '/sysPage/getAllList.do',
    method: 'get'
  })
}

/**
 /*
 /* 根据角色编号获取对应的权限信息
 /*
 */
function getSysPageByRoleId(roleId) {
  return request({
    url: '/sysPage/getListAllByRoleId.do',
    method: 'get',
    roleId: roleId
  })
}


/**
 /*
 /* 获取详情数据
 /*
 */
function getDetailById(roleId) {
  return request({
    url: '/role/getById.do',
    method: 'post',
    params: {
      kid: roleId,
    }
  })
}


/**
 /*
 /* 新建角色信息
 /*
 */
function createRole(data) {
  return request({
    url: '/role/create.do',
    method: 'post',
    data
  })
}


/**
 /*
 /* 更新角色基本信息
 /*
 */
function updateRole(data) {
  return request({
    url: modelName+'/modify.do',
    method: 'post',
    data
  })
}


/**
 /*
 /* 批量添加权限信息
 /*
 */
function savePages(data) {
  return request({
    url: modelName+'/addPageForRole.do',
    method: 'post',
   data
  })
}

/**
 /*
 /* 删除角色信息
 /*
 */
function deleteRole(roleId) {
  return request({
    url: '/role/deleteById.do',
    method: 'get',
    params: {
      "kid": roleId
    }
  })
}

/**
 * 删除角色权限信息
 * @param data
 */
function deletePages(data) {
  return request({
    url: modelName+'/removeByRoleIdAndPageId.do',
    method: 'get',
    params: data
  })
}

export default {
  getAllRole: getAllRole,
  getAllSysPage: getAllSysPage,
  getSysPageByRoleId: getSysPageByRoleId,
  getDetailById: getDetailById,
  createRole: createRole,
  updateRole: updateRole,
  savePages: savePages,
  deleteRole: deleteRole,
  deletePages:deletePages,

  roleType: {
    "collegeAdmin": "role-04",      //学院管理员
    "schoolAdmin": "role-03",       //校管理员
    "estateAdmin": "role-05",       //物业管理员
    "estate": "role-06",            //物业
    "admin": "role-admin",          //管理员
    "sysAdmin": "role-sysadmin",    //超级管理员
  },

}
