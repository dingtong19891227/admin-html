 import request from '@/utils/request'

 /**
 /* 模块名称
 **/
 var moduleName = "/sysProcessType"
 export default  {
	getList: getList,
	removeById: removeById,
	createSysProcessType: createSysProcessType,
	updateSysProcessType: updateSysProcessType,
	getProcessList:getProcessList,
	toTreeData:toTreeData,
	detailsById:detailsById
}
 // 循环出父节点
function toTreeData(data) {
// 建立个树形结构,需要定义个最顶层的父节点，pid是0
  let processTypeList = data.processTypeList;
  let parent = [];
  if (processTypeList.length > 0) {
    for (let i = 0; i < processTypeList.length; i++) {
     // if (data[i].parentId === '0') {
        //初始化根节点
        let obj = {
          name: processTypeList[i].name,
          type: "type",
          id: processTypeList[i].kid,
          children: []
        };
        //获取
        parent.push(obj);
     // }
    }
    children(parent);
  }

//递归寻求树
  function children(parent) {
  	let lists = [];
  	let processList = data.processList;
  	  for (let m = 0; m < parent.length;m++) {
        //父节点
        for (let n = 0; n < processList.length; n++) {
        	 if (parent[m].id === processList[n].typeId) {
        	 	lists.push(processList[n]);
        	 }
        }
     }
    if (lists.length>0) {
      for (let i = 0; i < parent.length; i++) {
        //父节点
        for (let j = 0; j < lists.length; j++) {
          //查找子节点
          if (parent[i].id === lists[j].typeId) {
          	let status = lists[j].status;
          	let name;
          	if(status==-1){
          		name = "停"
          	}else if(status==1){
          		name = "启"
          	}else{
          		name = "稿"
          	}
            let objj = {
              name: "【"+name+"】"+lists[j].name+"V-"+lists[j].version,
              type: "process",
              id: lists[j].kid,
              status:status,
              children: []
            };
            parent[i].children.push(objj);
            children(parent[i].children);
          }
        }
      }
    }
  }

  return parent;
}
 /**
  * 查询所有类型，基本信息，版本
  */
 function getProcessList() {
  return request({
       url: moduleName + '/getProcessList.do',
       method: 'post',  
       params:{
    	  "name":""
    }
  })
}
 /**
  * 根据查询列表
  */
 function getList() {
  return request({
       url: moduleName + '/getList.do',
       method: 'post',  
       params:{
    	  "name":""
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
 /* 新建流程类型
 */
 function createSysProcessType(data) {
     return request({
         url: moduleName + '/create.do',
         method: 'post',
         params:data
     })
 }
  /**
 /* 更新流程类型
 */
 function updateSysProcessType(data) {
     return request({
         url: moduleName + '/modify.do',
         method: 'post',
         params:data
     })
 }
 /**
  * 根据kid查找详细信息
  */
 function detailsById(kid){
 	  return request({
         url: moduleName + '/detail.do',
         method: 'get',
         params:{
         	kid:kid
         }
     })
 }
