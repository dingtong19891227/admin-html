 import request from '@/utils/request'

 /**
 /* 模块名称
 **/
 var moduleName = "/sysProcess"
 export default  {
	getList: getList,
	removeById: removeById,
	createSysProcess: createSysProcess,
	updateSysProcess: updateSysProcess,
	detailsById:detailsById
}
 /**
  * 根据查询列表
  */
 function getList(data) {
  return request({
       url: moduleName + '/getList.do',
       method: 'post',  
       params:{
    	  "typeId":data
    }
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
 /* 新建流程基本信息
 */
 function createSysProcess(data) {
     return request({
         url: moduleName + '/create.do',
         method: 'post',
         params:data
     })
 }
  /**
 /* 更新流程基本信息
 */
 function updateSysProcess(data) {
     return request({
         url: moduleName + '/modify.do',
         method: 'post',
         params:data
     })
 }
  /**
 /* 根据id查询基本信息
 */
 function detailsById(kid) {
     return request({
         url: moduleName + '/detail.do',
         method: 'get',
         params:{
         	kid:kid
         }
     })
 }