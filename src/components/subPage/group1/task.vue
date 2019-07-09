<template>
	<div class="task">
		<div class="view-top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">多生物特征</el-breadcrumb-item>
				<el-breadcrumb-item>任务比对</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="view-content">
			<div class="operate-div">
				<el-row>
					<el-col :span="17">
						<div class="grid-content">
							<el-form :inline="true" :model="searchParams" class="demo-form-inline">
								<el-form-item>
									<el-input v-model="searchParams.YSYWBH" placeholder="业务编号" clearable ></el-input>
								</el-form-item>
								
								<el-form-item>
									<el-button type="primary" @click="onSubmit" class="search-button">查询</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content">
							<div>
								<!-- <router-link to="EmployeeInfo" class="operate-btn creat-btn"></router-link> -->
								<span class="operate-btn creat-btn" @click="creatEmployee"></span>
								<span class="operate-btn import-btn"></span>
								<span class="operate-btn export-btn"></span>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="data-table-div">
				<el-table :data="tableData" stripe style="width: 100%" :default-sort="{prop:'userNum',order: 'descending'}">
					<el-table-column type="selection" width="55" prop="kid">
					</el-table-column>
					<el-table-column prop="userNum" label="工号" sortable width="180">
					</el-table-column>
					<el-table-column prop="name" label="姓名" sortable width="180">
						<template scope="scope">
							<el-button type="text"  @click="editEmployee(scope.row)">{{ scope.row.name }}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="sex" label="性别" sortable width="180">
					</el-table-column>
					<el-table-column prop="telephone" label="手机号" sortable width="180">
					</el-table-column>
					<el-table-column prop="deptId" label="部门/岗位" sortable width="180">
						<template slot-scope="scope">
						<el-select v-model="scope.row.deptId">
							<el-option
							v-for="item in scope.row.deptLs"
							:key="item.deptId"
							:label="item.deptName"
							:value="item.deptId">
							</el-option>
						</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="employmentTime" label="入职时间" sortable width="180">
					</el-table-column>
					<el-table-column prop="roleId" label="角色" sortable width="180">
						<template slot-scope="scope">
						<el-select v-model="scope.row.roleId">
							<el-option
							v-for="item in scope.row.roleLs"
							:key="item.roleId"
							:label="item.roleName"
							:value="item.roleId">
							</el-option>
						</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="incumStatusName" label="在职状态" sortable width="180">
					</el-table-column>
					<el-table-column prop="birthday" label="出生日期" sortable width="180">
					</el-table-column>
					<el-table-column prop="marriageName" label="婚育情况" sortable width="180">
					</el-table-column>
					<el-table-column prop="inServiceAge" label="司内工龄(年)" sortable width="180">
					</el-table-column>
					<el-table-column prop="highestEducationName" label="学历" sortable width="180">
					</el-table-column>
					<el-table-column prop="leaveTime" label="离职时间" sortable width="180">
					</el-table-column>
					<el-table-column prop="operate" label="操作" width="180" fixed="right">
						<template slot-scope="scope">
							<!-- <el-button class="check-btn"></el-button>
							<el-button class="edit-btn"></el-button> -->
							<el-button class="del-icon" @click="doUpdateStatue(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-div">
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="searchParams.pageNum"
                                   :page-sizes="[10, 20, 30, 40,50]" :page-size="searchParams.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="totals">
                    </el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	  import EmployeeManage from "@/api/EmployeeManage"
	  import toTreeData from "@/api/sysOrg"
	  import {initOrgInfos} from "@/api/sysOrg"
	  import sysClazz from '@/api/sysClazz'
	  import CompanyManage from '@/api/CompanyManage'
	export default {

		name: 'employee-manage',
		data() {
			return {
				// 顶部操作框下拉选项
				searchParams: {
					YSYWBH: '',
					
					pageNum: 1,
					pageSize: 10,
				},
				companyList: [],
				orgList: [],
				postList: [],
				incumStatusList: [],
				// table数据
				tableData: [],
				options: [],
				defaultProps: {
					label: 'label',
					id: 'id',
					children: 'children',
				},
				//公司list用
				fromData: {
					name: ''
				},
				
				totals:0
			};
		},
		methods: {
			creatEmployee(){
				this.$router.push({path:'/EmployeeInfo'});
			},
			editEmployee(data){
				this.$router.push({name:'EmployeeInfo',params:data});
			},
			// 查询按钮
			onSubmit() {
				EmployeeManage.queryUserInfos(this.searchParams).then(response => {
					if (response.status == 200) {
						//表示服务器端响应成功
						this.tableData=response.data.data;
						this.totals = response.data.totalCount;
					}
				}).catch((error) => {
					console.log(error)
				})
				
			},
			doUpdateStatue(data){
				this.$confirm('将该员工进行离职操作, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					EmployeeManage.updateUserStatus(data).then(response => {
						if (response.status == 200) {
							this.$message.success("操作成功");
						}
					}).catch((error) => {
						this.$message.error("操作失败");
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});          
				});
			
			},
			// 分页插件
			handleSizeChange(val) {
				this.searchParams.pageSize = val;
				this.onSubmit();
			},
			handleCurrentChange(val) {
				this.searchParams.pageNum = val;
				this.onSubmit();
			}
		},
		mounted() {
			//部门tree
			initOrgInfos().then(response => {
				if (response.status == 200) {
				//表示服务器端响应成功
				let treeList = response.data.data;
				let parent = [];
				this.options = toTreeData(treeList);
				}
			}),
			//在职状态list
			sysClazz.getListByClazzType("incum").then(response => {
				if (response) {
					this.incumStatusList = response.data.data;
				}
			}),
			//岗位list
			sysClazz.getListByClazzType("post").then(response => {
				if (response) {
					this.postList = response.data.data;
				}
			}),
			//公司list
			CompanyManage.getList(this.fromData).then(res => {
			    if (res) {
			        this.companyList = res.data.data;
			    }
			}),
			//打开页面初始化查询
			this.onSubmit();
		}
	}
</script>

<style scoped>

</style>
