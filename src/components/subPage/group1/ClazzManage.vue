<template>
	<div class="employee-manage">
		<div class="view-top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>数据字典</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="view-content" v-loading.fullscreen="pageLoading" element-loading-text="加载中……">
			<el-row :gutter="20">
				<el-col :span="6">
					<div class="cs-list-div">
						<div class="cs-list-top">
							数据字典列表
						</div>
						<div class="cs-list">
							<ul class="cs-list-ul">
								<li v-for="(cslist, index) in clazzTypyList" v-on:click="csTabChange(cslist,index)" :data-index="index" :class="{'navActive':index == navActive}">
									{{ cslist.name }}
								</li>
							</ul>
						</div>
					</div>
				</el-col>
				<el-col :span="18">
					<div class="cs-data-div">
						<el-row>
							<el-col :span="16">
								<el-form :inline="true" :model="formInline" class="demo-form-inline">
									<el-form-item style="margin: 0;">
										<el-input v-model="formInline.name" placeholder="请输入名称模糊搜索"></el-input>
									</el-form-item>
									<el-form-item style="margin: 0;">
										<el-button type="primary" icon="el-icon-search" @click="onSubmit(formInline)" title="点击搜索">搜索</el-button>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="8" style="text-align: right;">
								<span class="operate-btn creat-btn" @click="handleCreate()" title="新建数据字典"></span>
								<span class="operate-btn del-btn" @click="DeleteClazz()" title="删除数据字典"></span>
							</el-col>
						</el-row>
						<div class="cs-data-content">
							<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;" :default-sort="{order: 'descending'}" @selection-change="changeFun">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column prop="code" label="编码" >
								</el-table-column>
								<el-table-column prop="name" label="名称" >
								</el-table-column>
								<el-table-column prop="sortNum" label="排序号" >
								</el-table-column>
								<el-table-column prop="remark" label="描述" >
								</el-table-column>
								<el-table-column prop="operate" label="操作" width="200">
									<template slot-scope="scope">
										<el-button class="edit-btn" @click="handleUpdate(scope.row)" title="编辑信息"></el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						
						<el-dialog append-to-body :title="dialogTitle" :visible.sync="dialogFormVisible" class='content  max' width="800px" :close-on-click-modal="false">			  							
							<el-form class="basic full" :rules="clazzRules" ref="dataForm" :model="tempClazz" size="small" label-width="120px">
								<el-row :gutter="24">
									<el-col :span="22">
										<el-form-item label="名称:" prop="name">
											<el-input class="filter-item" v-model="tempClazz.name" placeholder="请输入名称">
											</el-input>
										</el-form-item>
										<el-form-item label="编码:" prop="code">
											<el-input class="filter-item" v-model="tempClazz.code" placeholder="请输入编码" :disabled="isshow">
											</el-input>
										</el-form-item>
										<el-form-item label="排序号:" prop="sortNum">
											<el-input-number v-model="tempClazz.sortNum" label="请输入排序号"></el-input-number>
										</el-form-item>
										<el-form-item label="描述:">
											<el-input type="textarea" v-model="tempClazz.remark" placeholder="请输入描述"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row style="background-color: white;padding: 0 20px 20px 0;">
									<el-col :span="24" style="width: 100%;text-align: right;">
										<el-button type="primary" class="use-btn" @click="saveData()" title="保存信息">保存</el-button>
									</el-col>
								</el-row>
							</el-form>												    
						</el-dialog>						
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import sysClazz from '@/api/sysClazz'
	
	export default {
		name: 'employee-manage',
		data() {
			return {
				isshow:false,
				dialogFormVisible: false,
				pageLoading: false,
				clazzTypyList:[],
				tableData: [],
				formInline: {
					clazzType: '',
					name: ''
				},
				tempClazz: {
				    name: null,
				    code: null,
				    sortNum: null,
				    remark: null
					
				},
				clazzRules: {
				    name: [{
				        required: true,
				        message: '请输入名称',
				        trigger: 'change'
				    }],
				    code: [{
				        required: true,
				        message: '请输入编码',
				        trigger: 'change'
				    }],
				    sortNum: [{
				        required: true,
				        message: '请输入排序号',
				        trigger: 'change'
				    }],
				    remark: [{
				        required: false,
				        message: '请输入描述',
				        trigger: 'change'
				    }]
				},
			    clazzType: '',
				ids:'',
				dialogTitle: "新建数据字典",
				clazzId: null,
				navActive:0//默认第一个分类高亮
			};
		},
		created(){
			this.getClazzTypeList();
		},
		
		methods: {
			getClazzTypeList(){
				//获取所有分类
				sysClazz.getClazzTypeList().then(res => {
				    if (res) {
				        this.clazzTypyList = res.data.data;
						this.formInline.clazzType =  this.clazzTypyList[0].clazzType;
						this.clazzType =  this.clazzTypyList[0].clazzType;
						this.getdata(this.clazzTypyList[0].clazzType);
				    }
				});
			},
					
			//搜索
			onSubmit(aa) {
				//根据名称搜索字典数据 
			    sysClazz.getList(this.formInline).then(res => {
			        if (res) {
			            this.tableData = res.data.data
			        }
			    })
			},
			
			
			//默认按照第一个分类加载列表信息
			getdata(qwe){
				sysClazz.getListByClazzType(qwe).then(res => {
				    if (res) {
				        this.tableData = res.data.data
				    }
				})
			},
			
			
			//获取所有分类
			getClazzTypeData() {
			    sysClazz.getClazzTypeList().then(res => {
			        if (res) {
			            this.clazzTypyList = res.data.data
			        }
			    })
			},
			
		
			//点击分类获取数据
			csTabChange(cslist,index){		
				sysClazz.getListByClazzType(cslist.clazzType).then(res => {
				    if (res) {
				        this.tableData = res.data.data,
						this.formInline.clazzType = cslist.clazzType
				    }
				})
				this.navActive = index;
			},
			
			//点击删除按钮
			DeleteClazz(){
				if(this.ids.length==0){
				    this.$message({
					  message: '请至少选择一条要删除的数据！',
					  type: 'warning'
					});
				}else{
					this.$confirm('此操作将删除所选信息, 是否继续?', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(() => {
					  sysClazz.deleteSysClazzByIds(this.ids).then(res => {
					  	if (res) {
					  		this.$message({
						     showClose: true,
					  		 type: 'success',
					  		 message: '删除成功!'
					  		});
					  	}
						this.getClazzTypeList();
						this.navActive = 0;
					  })
					}).catch(() => {
					  this.$message({
						showClose: true,
						type: 'info',
						message: '已取消删除'
					  });          
					});
				}
			},
			
			//关闭页面
			handleClose(done) {
				this.$confirm('确认关闭？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			  },
			
			
			//获取checkbox选中值
			changeFun(val) {
				this.ids = '';
				for(var i in val){
					this.ids += val[i].kid + ','					
				}
			},
			
			
			//新建数据字典
			handleCreate() {
				this.dialogFormVisible = true;
			    this.dialogStatus = 'create'
			    this.clazzId = null
			    this.dialogTitle = '新建数据字典'
			    this.handleOpenEdit()
				this.tempClazz.code = this.formInline.clazzType
			},
			
			//更新
			handleUpdate(row) {		
				this.isshow = true
			    this.activeName = "baseInfo"
			    this.tempClazz = Object.assign({}, row) // copy obj 
			    this.dialogStatus = 'update'
			    this.dialogTitle = '编辑 - ' + this.tempClazz.name
			    this.clazzId = row.kid
			    this.dialogFormVisible = true
			},
			
			handleOpenEdit() {
			    this.dialogFormVisible = true
			    this.$nextTick(() => {
			        this.$refs['dataForm'].clearValidate()
			    })
			
			},
			
			//保存数据
			saveData() {
				
			    this.$refs['dataForm'].validate((valid) => {			
			        const data = {
						kid:this.clazzId,
						name:this.tempClazz.name,
						code:this.tempClazz.code,
						sortNum:this.tempClazz.sortNum,
						remark:this.tempClazz.remark,
						status:1,
						isSys:-1,
						clazzType:this.formInline.clazzType
					}
					
					if (valid) {
						if (this.dialogStatus == 'create') {
							sysClazz.createSysClazz(data).then(res => {
								if (res) {
									this.dialogFormVisible = false;
									this.$message({
									  showClose: true,
									  message: '保存成功',
									  type: 'success'
									});
								}
								this.getClazzTypeList();
								this.navActive = 0;
							})
						}else{
							sysClazz.updateSysClazz(data).then(res => {
							    if (res) {
							        this.dialogFormVisible = false
							        this.$message({
							          showClose: true,
							          message: '更新成功',
							          type: 'success'
							        });
									this.getClazzTypeList();
									this.navActive = 0;
							    }
							})
						}
			        }
			    })
			},

			
		}
	}
</script>

<style scoped>
	.cs-list-div {
		width: 100%;
		background-color: white;
		box-shadow: 0 0 3px #888;
	}

	.cs-list-top {
		height: 40px;
		line-height: 40px;
		text-align: left;
		padding-left: 10px;
		cursor: default;
	}

	.cs-list-ul li {
		height: 40px;
		line-height: 40px;
		text-align: left;
		padding-left: 20px;
		cursor: pointer;
		box-sizing: border-box;
	}

	.cs-data-div {
		background-color: white;
		width: 100%;
		box-shadow: 0 0 3px #888;
		padding: 15px;
	}
	.demo-form-inline{overflow: hidden;}
	.navActive{background-color: #409EFF;color: white;}
	.use-btn {
		background-color: #554C9D;
		color: white;
		font-size: 14px;
		border: 1px solid #554C9D;
		width: 90px;
		height: 35px;
		line-height: 35px;
		padding: 0;
	}
</style>
