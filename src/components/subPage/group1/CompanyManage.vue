<template>
	<div class="company-manage">
		<div class="view-top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
				<el-breadcrumb-item>公司管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="view-content" v-loading.fullscreen="pageLoading" element-loading-text="加载中……">
			<div class="company-top">
				<el-row style="padding: 15px 0;">
					<el-col :span="8" :model="fromData">
						<el-form :inline="true" class="demo-form-inline">
							<el-form-item style="margin: 0 0 0 30px;">
								<el-input v-model="fromData.name" class="text-input" placeholder="请输入名称/简称"></el-input>
								<span class="el-input__suffix" style="cursor: pointer;">
									<span class="el-input__suffix-inner" @click="searchCompany()">
										<i class="el-select__caret el-input__icon el-icon-search"></i>
									</span>
								</span>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="13">
						&nbsp;
					</el-col>
					<el-col :span="3">
						<div>
							<span class="operate-btn creat-btn" @click="handleCreate()"></span>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="company-middle" style="padding: 0 20px;background: white;">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="name" sortable label="公司名称" width="180">
					</el-table-column>
					<el-table-column prop="nickName" label="公司简称">
					</el-table-column>
					<el-table-column prop="socialCreditCode" label="社会统一信用代码/纳锐人识别号" width="280">
					</el-table-column>
					<el-table-column prop="orgCode" label="国家专利代理机构代码">
					</el-table-column>
					<el-table-column prop="bank" label="开户银行">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
					<el-table-column prop="telephone" label="电话" width="130">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
						<template slot-scope='scope'>
							<el-button class="edit-btn" @click="handleUpdate(scope.row)"></el-button>
							<el-button class="del-icon" @click="delectCompany(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-div">
				  <div class="block">
				    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				                   :current-page="fromData.pageNum"
				                   :page-sizes="[10, 20, 30, 40]" :page-size="fromData.pageSize"
				                   layout="total, sizes, prev, pager, next, jumper":total="totals">
				    </el-pagination>
				  </div>
				</div>
			</div>
			<div class="company-bottom">
				<el-dialog append-to-body :title="dialogTitle" :visible.sync="dialogFormVisible" class='content  max' width="1000px"
				 :close-on-click-modal="false">
					<el-form class="basic full" :rules="CompanyRules" ref="dataForm" :model="tempCompany" size="small" label-width="120px">
						<el-row :gutter="24">
							<el-col :span="11">
								<el-form-item label="公司名称:" prop="name">
									<el-input class="filter-item" v-model="tempCompany.name" placeholder="请输入公司名称">
									</el-input>
								</el-form-item>
								</el-col>
								<el-col :span="11">
									<el-form-item label="公司简称:" prop="nickName">
									<el-input class="filter-item" v-model="tempCompany.nickName" placeholder="请输入公司简称">
									</el-input>
								</el-form-item>
								</el-col>
								<el-col :span="11">
									<el-form-item label="社会信用代码:" prop="socialCreditCode">
								<el-input class="filter-item" v-model="tempCompany.socialCreditCode" placeholder="社会信用代码/纳税人识别号">
								</el-input>
								</el-form-item>
								</el-col>
								<el-col :span="11">
								<el-form-item label="国家专利代理机构代码:" prop="orgCode">
									<el-input class="filter-item" v-model="tempCompany.orgCode" placeholder="国家专利代理机构代码">
									</el-input>
								</el-form-item>
								</el-col>
								<el-col :span="11">
								<el-form-item label="开户银行:" prop="bank">
									<el-input class="filter-item" v-model="tempCompany.bank" placeholder="开户银行">
									</el-input>
								</el-form-item>
								</el-col>
								<el-col :span="11">
									<el-form-item label="银行账号:" prop="account">
									<el-input class="filter-item" v-model="tempCompany.account" placeholder="银行账号">
									</el-input>
								</el-form-item>
							</el-col>
								<el-col :span="11">
									<el-form-item label="地址:" prop="address">
									<el-input class="filter-item" v-model="tempCompany.address" placeholder="地址">
									</el-input>
								</el-form-item>
								</el-col>
			
								<el-col :span="11">
								<el-form-item label="电话:" prop="telephone">
									<el-input class="filter-item" v-model="tempCompany.telephone" placeholder="电话">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row style="background-color: white;padding: 0 20px 20px 0;">
							<el-col :span="24" style="width: 100%;text-align: right;">
								<el-button type="primary" class="use-btn" @click="saveData()">保存</el-button>
							</el-col>
						</el-row>
					</el-form>

				</el-dialog>

			</div>
		</div>
	</div>

</template>
<script>
	import CompanyManage from '@/api/CompanyManage'
	export default {
		name: 'employee-manage',
		data() {
			return {
				dialogVisible: false,
				pageLoading: false,
				dialogFormVisible: false,
				dialogTitle: "新建公司",
				tableData: [],
				fromData: {
					name: '',
					pageNum: 1,
					pageSize: 10
				},
				totals:0,
				tempCompany: {
					name: '',
					nickName: '',
					socialCreditCode: '',
					orgCode: '',
					bank: '',
					account: '',
					address: '',
					telephone: ''
				},
				CompanyRules: {
					name: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'change'
					}],
					nickName: [{
						required: true,
						message: '请输入公司简称',
						trigger: 'change'
					}],
					bank: [{
						required: true,
						message: '请输入开户银行',
						trigger: 'change'
					}],
					account: [{
						required: true,
						message: '请输入银行账号',
						trigger: 'change'
					}]
				},
				kid: ''
			}
		},
		created() {
			//列表展示
			CompanyManage.getGrid(this.fromData).then(res => {
				if (res) {
					this.tableData = res.data.data;
					this.totals = res.data.totalCount;
				}
			});

		},
		methods: {
			// 分页插件
			handleSizeChange(val) {
				this.fromData.pageSize = val;
				this.searchCompany();
			},
			handleCurrentChange(val) {
				this.fromData.pageNum = val;
				this.searchCompany();
			},
			//搜索
			searchCompany() {
				//根据名称，简称查询 
				CompanyManage.getGrid(this.fromData).then(res => {
					if (res) {
						this.tableData = res.data.data;
						this.totals = res.data.totalCount;
					}
				})
			},
			//编辑弹窗弹出
			jumpEditWin(row) {
				this.dialogFormVisible = true
			},
			//关闭弹窗页面
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleCreate() {
				this.dialogFormVisible = true;
				// this.resetTemp()
				this.dialogStatus = 'create'
				this.kid = null
				this.dialogTitle = '新建公司'
				this.handleOpenEdit()
			},
			delectCompany(row) {
				//根据kid删除删除
				this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					CompanyManage.removeById(row.kid).then(res => {
						if (res) {
							this.searchCompany();
							this.$message({
								showClose: true,
								type: 'success',
								message: '删除成功!'
							});
						}
					})
				}).catch(() => {
					this.$message({
						showClose: true,
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//更新
			handleUpdate(row) {
				this.activeName = "baseInfo"
				this.dialogStatus = 'update'
				this.dialogTitle = '编辑 - ' + this.tempCompany.name
				this.tempCompany = Object.assign({}, row)
				this.kid = row.kid
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
						kid: this.kid,
						name: this.tempCompany.name,
						nickName: this.tempCompany.nickName,
						socialCreditCode: this.tempCompany.socialCreditCode,
						orgCode: this.tempCompany.orgCode,
						bank: this.tempCompany.bank,
						account: this.tempCompany.account,
						address: this.tempCompany.address,
						telephone: this.tempCompany.telephone
					}
					if (valid) {
						if (this.dialogStatus == 'create') {
							CompanyManage.createSysCompany(data).then(res => {
								if (res) {
									this.searchCompany();
									this.dialogFormVisible = false;
									this.$message({
										showClose: true,
										message: res.data.message,
										type: 'success'
									});
								}
							});
						} else {
							CompanyManage.updateSysCompany(data).then(res => {
								if (res) {
									this.searchCompany();
									this.dialogFormVisible = false
									this.$message({
										showClose: true,
										message: res.data.message,
										type: 'success'
									});
								}
							})
						}
					}
				})
			},
	},
	};
</script>

<style scoped="">
	.company-top {
		margin: 8px 0;
		background-color: #fff;
	}
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
