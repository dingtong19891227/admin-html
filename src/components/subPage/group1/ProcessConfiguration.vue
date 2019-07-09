<template>
	<div class="process-manage">
		<div class="view-top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
				<el-breadcrumb-item>流程管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="process-left">
			<div class="process-type-top">
				<span>流程列表</span>
				<i class="el-icon-circle-plus" @click="handleCreate()"></i>
			</div>
			<div class="process-type-middle">
				<el-input placeholder="输入关键字进行过滤" v-model="filterText" type="hidden"> </el-input>
				<el-tree class="filter-tree" :data="processList" :props="defaultProps" default-expand-all:filter-node-method="filterNode"
				 @node-click="handleNodeClick" ref="tree2">
					<span slot-scope="{data }">
						<span>{{data.name }}</span>
						<div v-if="data.type==='type'">
							<span style="float:right;margin-top:-16px;margin-right:-30px;">
								<i class="el-icon-circle-plus" @click.stop="addProcsss()" title="流程基本信息添加"></i>
							</span>
						</div>
						<div v-else>
							<div v-if="data.status==='-1'">
								<span style="float:right;margin-top:-16px;margin-right:-30px;">
									<i class="el-icon-upload2" @click.stop="updateProcsssStatus()" title="流程启动"></i>&nbsp;&nbsp;&nbsp;
									<i class="el-icon-delete" @click.stop="copyProcsss()" title="流程复制"></i>
								</span>
							</div>
							<div v-if="data.status==='1'">
								<span style="float:right;margin-top:-16px;margin-right:-30px;">
									<i class="el-icon-download" @click.stop="updateProcsssStatus()" title="流程暂停"></i>&nbsp;&nbsp;&nbsp;
									<i class="el-icon-document" @click.stop="copyProcsss()" title="流程复制"></i>
								</span>
							</div>
							<div v-else>
								<span style="float:right;margin-top:-16px;margin-right:-50px;">
									<i class="el-icon-upload" @click.stop="updateProcsssStatus()" title="流程启动"></i>&nbsp;&nbsp;&nbsp;
									<i class="el-icon-document" @click.stop="deleteProcsss()" title="流程删除"></i>
								</span>
							</div>
						</div>
					</span>
				</el-tree>
			</div>
		</div>
		<div class="process-right">
			<el-main style="background-color: #ffffff;width:100%;padding: 0;">
				<div class="org-edit" v-if="processDiv" style="margin-left:12px;">
					<div class="dep-content">
						<el-tabs v-model="activeName">
							<el-tab-pane label="基本信息" name="first" style="width:60%;">
								<el-form ref="defaultProps" :model="processDetails" :rules="ProcessRules" label-width="80px">
									<span style="position: absolute;left: 0;top: 15px;color: red;">*</span>
									<el-form-item label="流程名称">
										<el-input v-model="processDetails.name" placeholder="请输入流程名称"></el-input>
									</el-form-item>
									<span style="position: absolute;left: 0;top: 77px;color: red;">*</span>
									<el-form-item label="流程版本">
										<el-input v-model="processDetails.version" placeholder="请输入流程版本"></el-input>
									</el-form-item>
									<el-form-item label="流程类型">
										<el-radio v-model="processDetails.type" type="radio" :label="1">业务</el-radio>
										<el-radio v-model="processDetails.type" type="radio" :label="-1">管理</el-radio>
									</el-form-item>
									<el-form-item label="启用时间">
										<el-date-picker v-model="processDetails.startTime" type="date" placeholder="选择日期">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="停用时间">
										<el-date-picker v-model="processDetails.stopTime" type="date" placeholder="选择日期">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="流程说明">
										<el-input type="textarea" v-model="processDetails.remark" placeholder="请输入流程说明"></el-input>
									</el-form-item>
									<el-form-item style="float: right;">
										<el-button type="primary" @click="submitProcess()" class="org-info-submit" size="small">应用</el-button>
									</el-form-item>
								</el-form>
							</el-tab-pane>
							<el-tab-pane label="节点信息" name="second" v-if="tabShow">
								<div class="node-left">
									<el-table :data="tableData" style="width: 100%" <!--:default-sort="{prop: 'date', order: 'descending'}" -->>
										<!--<el-table-column prop="userNum" label="工号" sortable width="180">
	                  </el-table-column>
	                  <el-table-column prop="name" label="姓名" sortable width="180">
	                  </el-table-column>
	                  <el-table-column prop="telephone" label="手机号">
	                  </el-table-column>
	                  <el-table-column label="部门" :formatter="changeAdress">
	                  </el-table-column>
	                  <el-table-column prop="status" label="状态" :formatter="changeStatus">
	                  </el-table-column>-->
									</el-table>
								</div>
								<div class="node-right"></div>
								<el-table :data="tableData" style="width: 100%" <!--:default-sort="{prop: 'date', order: 'descending'}" -->>
									<!--<el-table-column prop="userNum" label="工号" sortable width="180">
	                  </el-table-column>
	                  <el-table-column prop="name" label="姓名" sortable width="180">
	                  </el-table-column>
	                  <el-table-column prop="telephone" label="手机号">
	                  </el-table-column>
	                  <el-table-column label="部门" :formatter="changeAdress">
	                  </el-table-column>
	                  <el-table-column prop="status" label="状态" :formatter="changeStatus">
	                  </el-table-column>-->
								</el-table>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</el-main>
		</div>
		<div class="company-bottom">
			<el-dialog append-to-body :title="dialogTitle" :visible.sync="dialogFormVisible" class='content  max' width="480px"
			 :close-on-click-modal="false">
				<el-form class="basic full" :rules="ProcessTypeRules" ref="dataForm" :model="tempProcessType" size="small"
				 label-width="120px">
					<el-row :gutter="24">
						<el-col :span="22">
							<el-form-item label="类型名称:" prop="name">
								<el-input class="filter-item" v-model="tempProcessType.name" placeholder="请输入公司名称">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-button type="primary" @click="saveProcessType()" size="small">保存</el-button>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import sysProcessType from '@/api/sysProcessType'
	import sysProcess from '@/api/sysProcess'
	export default {
		name: 'process-manage',
		data() {
			return {
				dialogTitle: "新建类型",
				dialogFormVisible: false,
				ProcessTypeRules: {
					name: [{
						required: true,
						message: '请输入类型名称',
						trigger: 'change'
					}]
				},
				tempProcessType: {
					name: ''
				},
				filterText: '',
				processList: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				processDiv: false,
				processDetails: {
					type_id: '',
					name: '',
					type: "-1",
					version: '',
					remark: '',
					stopTime: '',
					startTime: ''
				},
				ProcessRules: {
					name: [{
						required: true,
						message: '请输入流程名称',
						trigger: 'change'
					}],
					version: [{
						required: true,
						message: '请输入流程版本',
						trigger: 'change'
					}]
				},
				tableData: {

				},
				activeName: 'first',
				tabShow: true,
			}
		},
		created() {
			//类型列表展示
			sysProcessType.getProcessList().then(res => {
				if (res.status == 200) {
					//表示服务器端响应成功
					let parent = [];
					this.processList = sysProcessType.toTreeData(res.data.data);
				}
			});
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		methods: {
			findProcessTypeList() {
				sysProcessType.getProcessList().then(res => {
					if (res.status == 200) {
						//表示服务器端响应成功
						let parent = [];
						this.processList = sysProcessType.toTreeData(res.data.data);
					}
				});
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			//类型添加
			handleCreate() {
				this.dialogFormVisible = true;
				// this.resetTemp()
				this.dialogStatus = 'create'
				this.kid = null
				this.dialogTitle = '新建类型'
				this.handleOpenEdit()
			},
			//类型更新
			handleUpdate(row) {
				this.activeName = "baseInfo"
				this.dialogStatus = 'update'
				this.dialogTitle = '编辑类型'
				this.tempProcessType = Object.assign({}, row)
				this.kid = row.kid
				this.dialogFormVisible = true
				this.processDiv = false
			},
			handleOpenEdit() {
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			//类型添加修改
			saveProcessType() {
				this.$refs['dataForm'].validate((valid) => {
					const data = {
						kid: this.kid,
						name: this.tempProcessType.name
					}
					if (valid) {
						if (this.dialogStatus == 'create') {
							sysProcessType.createSysProcessType(data).then(res => {
								if (res) {
									this.dialogFormVisible = false;
									this.$message({
										showClose: true,
										message: res.data.message,
										type: 'success'
									});
									this.findProcessTypeList();
								}
							});
						} else {
							sysProcessType.updateSysProcessType(data).then(res => {
								if (res) {
									this.dialogFormVisible = false
									this.$message({
										showClose: true,
										message: res.data.message,
										type: 'success'
									});
									this.findProcessTypeList();
								}
							})
						}
					}
				})
			},
			//类型列表展示
			handleNodeClick(node) {
				if (node.type === 'type') {
					sysProcessType.detailsById(node.id).then(res => { //查询流程类型信息
						if (res.status === 200) {
							this.handleUpdate(res.data.data);
						}
					})
				} else {
					sysProcess.detailsById(node.id).then(res => { //查询流程基本信心信息
						if (res.status === 200) {
							this.addProcsss();
							this.processDetails = res.data.data;
						}
					})
				}
			},
			//流程基本信息添加
			addProcsss() {
				this.processDiv = true
				this.processDetails.kid = ''
				this.processDetails.name = ''
				this.processDetails.version = ''
				this.processDetails.remark = ''
				this.processDetails.type = -1
			},
			//流程状态更改
			updateProcsssStatus() {

			},
			//流程删除
			deleteProcsss() {
				//物理删除
			},
			//流程基本信息添加/修改
			submitProcess() {

			}
		}
	}
</script>

<style scoped="scoped">
	.process-left {
		float: left;
		height: 1000px;
		width: 20%;
		border: 1px solid #D7D7D7;
	}

	.process-left .process-type-top {
		height: 42px;
		line-height: 42px;
		border: 1px solid #D7D7D7;
	}

	.process-left .process-type-top span {
		float: left;
		margin-left: 12px;
		font-size: 14px;
	}

	.process-left .process-type-top i {
		float: right;
		margin-top: 8px;
		margin-right: 12px;
		font-size: 24px;
	}

	.process-right {
		float: right;
		width: 80%;
		border: 1px solid #D7D7D7;
	}

	.node-left {
		width: 40%;
		float: left;
		border: 1px solid #D7D7D7;
	}

	.node-right {
		width: 60%;
		float: right;
		border: 1px solid #D7D7D7;
	}
</style>
