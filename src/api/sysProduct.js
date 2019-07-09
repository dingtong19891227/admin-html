 import request from '@/utils/request'

/**
 /* 模块名称
 **/
var moduleName = "/sysProductType";

/**
 * 初始化产品分类信息
 */
function getAllProductType(data) {
  return request({
    url: moduleName + "/getAllProductType.do",
    method: "post",
	data
  })
}

/**
 * 添加产品分类信息
 */
function addProductType(data) {
     return request({
         url: moduleName + '/create.do',
         method: 'post',
         params:data
     })
 }
 

/**
 /* 更新数据字典-
 */
 function updateProductType(data) {
     return request({
         url: moduleName + '/modify.do',
         method: 'post',
         params:data
     })
 }
 
 //删除产品分类信息
 export function deleteProductType(data) {
   return request({
     url: moduleName + "/removeById.do",
     method: "get",
     params: {
       kid: data
     }
   })
 }
 
 // 循环出父节点
function toTreeData(data) {
 // 建立个树形结构,需要定义个最顶层的父节点，pid是0
   let parent = [];
   console.log(data)
   if (data.length > 0) {
		for (let i = 0; i < data.length; i++) {
		   if (data[i].parentId === '0') {
				//初始化根节点
				let obj = {
					   label: data[i].name,
					   id: data[i].kid,
					   children: [],
					   parentid: data[i].parentId,
					   parentname: '',
					   remark: data[i].remark,
					   model:data[i].model//用于权限模块填充
				};
				//获取
				parent.push(obj);
			}
		 }
		 children(parent);
   }
 
	//递归寻求树
   function children(parent) {
		 if (data.length > 0) {
			   for (let i = 0; i < parent.length; i++) {
					 //父节点
					 for (let j = 0; j < data.length; j++) {
						   //查找子节点
						   if (parent[i].id === data[j].parentId) {
								 let obj = {
									   label: data[j].name,
									   id: data[j].kid,
									   children: [],
									   parentid: data[j].parentId,
									   parentname: parent[i].label,
									   remark: data[j].remark,
									   model:data[j].model
								 };
								 parent[i].children.push(obj);
						   }
					 }
					 children(parent[i].children);
			   }
		 }
   }
   return parent;
}


export default  {
	getAllProductType: getAllProductType,
	addProductType: addProductType,
    updateProductType: updateProductType,  
    deleteProductType: deleteProductType, 
	toTreeData:toTreeData
}