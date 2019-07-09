 import request from '@/utils/request'

 /**
 /* 模块名称
 **/
 var moduleName = "/sysClazz"

 /**
 /* 新建数据字典
 */
 function createSysClazz(data) {
     return request({
         url: moduleName + '/create.do',
         method: 'post',
         params:data
     })
 }
 
 /**
 /* 更新数据字典-
 */
 function updateSysClazz(data) {
     return request({
         url: moduleName + '/modify.do',
         method: 'post',
         params:data
     })
 }
 
 /**
 /* 删除数据字典-
 */
 function deleteSysClazzByIds(ids) {
     return request({
         url: moduleName + '/removeByIds.do',
         method: 'get',
         params:{
         	ids:ids
         }
     })
 }

/**
/* 根据类型获取系统字典数据
*/
function getListByClazzType(clazzType) {
  return request({
    url: '/sysClazz/getListByClazzType.do',
    method: 'post',  
    params:{
    	clazzType:clazzType
    }
  })
}
 
/**
/* 根据名称获取系统字典数据 -搜索
*/
function getList(data) {
  return request({
    url: '/sysClazz/getList.do',
    method: 'post',  
    params:{
		"clazzType":data.clazzType,
    	"name":data.name
    }
  })
}

/**
/* 获取系所有分类
*/
function getClazzTypeList(data) {
  return request({
    url: '/sysClazz/getClazzTypeList.do',
    method: 'post',  
    data
  })
}
 
 
export default  {
	createSysClazz: createSysClazz,
	updateSysClazz: updateSysClazz,
    getListByClazzType: getListByClazzType,  
    getList: getList, 
	getClazzTypeList:getClazzTypeList,
	deleteSysClazzByIds:deleteSysClazzByIds
}