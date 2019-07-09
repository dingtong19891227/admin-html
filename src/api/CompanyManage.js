 import request from '@/utils/request'

 /**
 /* 模块名称
 **/
 var moduleName = "/sysCompany"
 export default  {
	getList: getList,
	getGrid:getGrid,
	removeById: removeById,
	createSysCompany: createSysCompany,
	updateSysCompany: updateSysCompany
}
 /**
  * 根据名称，简称查询列表
  */
 function getList(data) {
  return request({
       url: moduleName + '/getList.do',
       method: 'post',  
       params:{
    	  "name":data.name
    }
  })
}
  /**
  * 根据名称，简称查询列表  有分页
  */
 function getGrid(data) {
  return request({
       url: moduleName + '/getGrid.do',
       method: 'post',  
       params:data
  })
}
 /**
 /* 根据kid删除
 */
 function removeById(kid) {
     return request({
         url: moduleName + '/removeById.do',
         method: 'get',
         params:{
         	kid:kid
         }
     })
 }
  /**
 /* 新建公司
 */
 function createSysCompany(data) {
     return request({
         url: moduleName + '/create.do',
         method: 'post',
         params:data
     })
 }
  /**
 /* 更新公司
 */
 function updateSysCompany(data) {
     return request({
         url: moduleName + '/modify.do',
         method: 'post',
         params:data
     })
 }