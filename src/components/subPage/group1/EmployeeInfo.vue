<template>
	<div class="employee-info">
		<div class="view-top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
				<el-breadcrumb-item><router-link to="/EmployeeManage">员工管理</router-link></el-breadcrumb-item>
				<el-breadcrumb-item>{{moduleTitle}}</el-breadcrumb-item>
			</el-breadcrumb>
			<span class="go-back" @click="goBack">返回</span>
		</div>
		<div class="view-content">
			<div class="tab-div">
				<!-- 员工主键 -->
				<el-input v-model="ruleForm.kid" v-if="false"></el-input>

				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="个人资料" name="first" class="employee-info-form" style="background-color: white;padding: 20px;">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<div class="e-info-one">
								<el-row>
									<el-col :span="6">
										<el-form-item label="工号" prop="userNum">
											<el-input v-model="ruleForm.userNum" placeholder="请输入员工工号"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="姓名" prop="name">
											<el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="身份证号" prop="creditCode">
											<el-input v-model="ruleForm.creditCode" placeholder="请输入身份证号"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="在职状况" prop="incumStatus">
											<el-select v-model="ruleForm.incumStatus" placeholder="请选择在职状态" clearable >
												<el-option
												v-for="item in incumStatusList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="性别" prop="sex">
											<el-radio-group v-model="ruleForm.sex">
												<el-radio label="男" value="1"></el-radio>
												<el-radio label="女" value="-1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="民族" prop="nation">
											<el-select v-model="ruleForm.nation" placeholder="请选择民族" clearable>
												<el-option
												v-for="item in nationList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="籍贯" prop="provicneId">
											<el-select v-model="ruleForm.provicneId" placeholder="请选择籍贯" clearable>
												<el-option
												v-for="item in provicneList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="政治面貌" prop="political">
											<el-select v-model="ruleForm.political" placeholder="请选择政治面貌" clearable>
												<el-option
												v-for="item in politicalList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="年龄" prop="age">
											<el-input v-model="ruleForm.age" placeholder="根据身份证号计算" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="联系电话" prop="telephone">
											<el-input v-model="ruleForm.telephone" placeholder="请输入联系电话"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="婚姻情况" prop="marriage">
											<el-select v-model="ruleForm.marriage" placeholder="请选择婚姻情况" clearable>
												<el-option
												v-for="item in marriageList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="生育情况" prop="bear">
											<el-select v-model="ruleForm.bear" placeholder="请选择生育情况" clearable>
												<el-option
												v-for="item in bearList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="户口性质" prop="residence">
											<el-select v-model="ruleForm.residence" placeholder="请选择户口性质" clearable>
												<el-option
												v-for="item in residenceList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="18">
										<el-form-item label="户口所在地">
											<el-row>
												<el-col :span="4" style="padding-right:10px;">
													<el-select v-model="ruleForm.provicne" placeholder="请选择省" clearable>
														<el-option
														v-for="item in provicneList"
														:key="item.kid"
														:label="item.name"
														:value="item.kid">
														</el-option>
													</el-select>
												</el-col>
												<el-col :span="4" style="padding-right:10px;">
													<el-select v-model="ruleForm.city" placeholder="请选择市" clearable>
														<el-option
														v-for="item in cityList"
														:key="item.kid"
														:label="item.name"
														:value="item.kid">
														</el-option>
													</el-select>
												</el-col>
												<el-col :span="4" style="padding-right:10px;">
													<el-select v-model="ruleForm.distract" placeholder="请选择区/县" clearable>
														<el-option
														v-for="item in distractList"
														:key="item.kid"
														:label="item.name"
														:value="item.kid">
														</el-option>
													</el-select>
												</el-col>
												<el-col :span="12">
													<el-input v-model="ruleForm.houseAddress" placeholder="请输入户口详细地址"></el-input>
												</el-col>
											</el-row>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="有效通信地址" prop="contactAddress">
											<el-input v-model="ruleForm.contactAddress" placeholder="请输入有效通信地址"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
							<hr>
							<div class="e-info-two">
								<el-row>
									<el-col :span="6">
										<el-form-item label="毕业时间" prop="graduationTime">
											<el-date-picker type="date" v-model="ruleForm.graduationTime" placeholder="选择毕业时间" style="width: 100%;"></el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="毕业院校" prop="graduationSchools">
											<el-input v-model="ruleForm.graduationSchools" placeholder="请输入毕业院校"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="专业" prop="specialty">
											<el-input v-model="ruleForm.specialty" placeholder="请输入专业"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="最高学历" prop="highestEducation">
											<el-select v-model="ruleForm.highestEducation" placeholder="请选择最高学历" clearable>
												<el-option
												v-for="item in highestEducationList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="资格证书" prop="certificate">
											<el-input v-model="ruleForm.certificate" placeholder="请输入资格证书"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="是否应届" prop="isCurrent">
											<el-radio-group v-model="ruleForm.isCurrent">
												<el-radio label="应届" value="1"></el-radio>
												<el-radio label="往届" value="-1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="就失业证" prop="certificateStatus">
											<el-radio-group v-model="ruleForm.certificateStatus">
												<el-radio label="是" value="1"></el-radio>
												<el-radio label="否" value="-1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="养老保险手册" prop="oldAgeInsuranceManual">
											<el-radio-group v-model="ruleForm.oldAgeInsuranceManual">
												<el-radio label="是" value="1"></el-radio>
												<el-radio label="否" value="-1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="电子邮箱" prop="userEmail">
											<el-input v-model="ruleForm.userEmail" placeholder="请输入电子邮箱"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="司内工龄(年)" prop="inServiceAge">
											<el-input v-model="ruleForm.inServiceAge" placeholder="根据入职时间计算(年)" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="司外工龄(年)" prop="outServiceAge">
											<el-input v-model="ruleForm.outServiceAge" placeholder="请输入司外工龄(年)"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										&nbsp;
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="紧急联系人" prop="linkman">
											<el-input v-model="ruleForm.linkman" placeholder="请输入紧急联系人"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="关系" prop="relation">
											<el-input v-model="ruleForm.relation" placeholder="请输入紧急联系人关系"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="紧急联系人电话" prop="linkTel">
											<el-input v-model="ruleForm.linkTel" placeholder="请输入紧急联系人电话"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										&nbsp;
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item style="width: 100%;text-align: right;">
											<el-button type="primary" class="org-info-submit" @click="saveUser()">应用</el-button>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</el-form>
					</el-tab-pane>
					<el-tab-pane label="入职信息" name="second" class="employee-info-form">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="background-color: white;padding: 20px;">
							<div class="e-info-two">
								<el-row>
									<el-col :span="6">
										<el-form-item label="所属公司" prop="custom">
											<el-select v-model="ruleForm.custom" placeholder="请选择所属公司" clearable>
												<el-option
												v-for="item in orgList"
												:key="item.kid"
												:label="item.name"
												:value="item.kid">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="入职时间">
											<el-col :span="24">
												<el-form-item prop="employmentTime" style="margin: 0;">
													<el-date-picker type="date" v-model="ruleForm.employmentTime" placeholder="选择入职时间" style="width: 100%;"></el-date-picker>
												</el-form-item>
											</el-col>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="定岗时间">
											<el-col :span="24">
												<el-form-item prop="fixedTime" style="margin: 0;">
													<el-date-picker type="date" v-model="ruleForm.fixedTime" placeholder="选择定岗时间" style="width: 100%;"></el-date-picker>
												</el-form-item>
											</el-col>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="转正时间">
											<el-col :span="24">
												<el-form-item prop="correctionTime" style="margin: 0;">
													<el-date-picker type="date" v-model="ruleForm.correctionTime" placeholder="转正时间" style="width: 100%;"></el-date-picker>
												</el-form-item>
											</el-col>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="离职时间">
											<el-col :span="24">
												<el-form-item prop="leaveTime" style="margin: 0;">
													<el-date-picker type="date" v-model="ruleForm.leaveTime" placeholder="选择离职时间" style="width: 100%;"></el-date-picker>
												</el-form-item>
											</el-col>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="技术导师" prop="teachUserId">
											<el-input v-model="ruleForm.teachUserId" placeholder="请输入技术导师"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="代理人资格证" prop="certificateCode">
											<el-input v-model="ruleForm.certificateCode" placeholder="请输入代理人资格证"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										&nbsp;
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item style="width: 100%;text-align: right;">
											<el-button type="primary" class="org-info-submit" @click="saveUser()">应用</el-button>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</el-form>
						<el-row :gutter="20" style="background-color: white;padding: 20px;margin-top: 30px;">
							<el-col :span="12">
								<div class="grid-content">
									<div class="entry-info-top">
										<el-row>
											<el-col :span="22">
												<div class="grid-content" style="text-align: left;">
													<span>专/兼职【部门 / 岗位 】信息列表</span>
												</div>
											</el-col>
											<el-col :span="2">
												<div class="grid-content">
													<el-button class="creat-icon"></el-button>
												</div>
											</el-col>
										</el-row>
										<div class="department">
											<el-table :data="userOrgData" stripe style="width: 100%;margin-top: 20px;">
												<el-table-column prop="deptName" label="部门">
												</el-table-column>
												<el-table-column prop="postName" label="岗位">
												</el-table-column>
												<el-table-column prop="isMain" label="是否主职">
												</el-table-column>
												<el-table-column prop="operate" label="操作">
													<template slot-scope="scope">
														<el-button class="del-icon"></el-button>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content">
									<div class="entry-info-top">
										<el-row>
											<el-col :span="22">
												<div class="grid-content" style="text-align: left;">
													<span>【部门 / 角色 】信息列表</span>
												</div>
											</el-col>
											<el-col :span="2">
												<div class="grid-content">
													<el-button class="creat-icon"></el-button>
												</div>
											</el-col>
										</el-row>
										<div class="department">
											<el-table :data="userRoleData" stripe style="width: 100%;margin-top: 20px;">
												<el-table-column prop="deptName" label="部门">
												</el-table-column>
												<el-table-column prop="roleName" label="角色">
												</el-table-column>
												<el-table-column prop="operate" label="操作">
													<template slot-scope="scope">
														<el-button class="del-icon"></el-button>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="合同信息" name="third" class="employee-info-form">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="background-color: white;padding: 20px;">
							<div class="e-info-two">
								<el-row>
									<el-col :span="11">
										<el-form-item label="档案存放单位" prop="fileDepositing">
											<el-input v-model="ruleForm.fileDepositing" placeholder="档案存放单位"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="2">
										<div style="width: 1px;height: 61px;margin: 0 auto;border-left: 1px solid #E5E0E9;"></div>
									</el-col>
									<el-col :span="11">
										<el-form-item label="档案编号" prop="fileNum">
											<el-input v-model="ruleForm.fileNum" placeholder="档案编号"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="11">
										<el-form-item label="公司历练经历">
											<el-input type="textarea" v-model="ruleForm.experience" placeholder="请输入公司历练经历"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="2">
										<div style="width: 1px;height: 61px;margin: 0 auto;border-left: 1px solid #E5E0E9;"></div>
									</el-col>
									<el-col :span="11">
										<el-form-item label="特殊情况说明">
											<el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入特殊情况说明"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row style="background-color: white;padding: 0 20px 20px 0;">
									<el-col :span="24" style="width: 100%;text-align: right;">
										<el-button type="primary" class="org-info-submit" @click="saveUser()">应用</el-button>
									</el-col>
								</el-row>
							</div>
						</el-form>
						<el-row style="background-color: white;padding: 20px;margin-top: 30px;">
							<el-col :span="24">
								<div class="grid-content">
									<div class="entry-info-top">
										<el-row>
											<el-col :span="22">
												<div class="grid-content" style="text-align: left;">
													<span>劳动合同信息列表</span>
												</div>
											</el-col>
											<el-col :span="2">
												<div class="grid-content">
													<el-button class="creat-icon"></el-button>
												</div>
											</el-col>
										</el-row>
										<div class="department">
											<el-table :data="contractData" stripe style="width: 100%;margin-top: 20px;">
												<el-table-column prop="beginTime" label="合同开始时间">
												</el-table-column>
												<el-table-column prop="endTime" label="合同截止时间">
												</el-table-column>
												<el-table-column prop="remark" label="备注">
												</el-table-column>
												<el-table-column prop="signTime" label="合同签订日期">
												</el-table-column>
												<el-table-column prop="operate" label="操作">
													<template slot-scope="scope">
														<el-button class="del-icon"></el-button>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import EmployeeManage from "@/api/EmployeeManage"
	export default {
		name: 'employee-info',
		data() {
			return {
				activeName: 'first',
				//模块标题
				moduleTitle: '',
				// 表单数据
				ruleForm: {},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				// table数据
				userOrgData: [], //部门岗位
				userRoleData: [], //部门角色
				contractData: [], //劳动合同

				//下拉框列表
				incumStatusList: [],
				nationList: [],
				provicneList: [],
				politicalList: [],
				marriageList: [],
				bearList: [],
				residenceList: [],
				provicneList: [],
				cityList: [],
				distractList: [],
				highestEducationList: [],
				orgList: [],
			};
		},
		methods: {
			// tab切换
			handleClick(tab, event) {
				//console.log(tab, event);
			},
			// 表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//保存
			saveUser(){
				if(this.ruleForm.kid == ''){
					//添加
					EmployeeManage.createUser(this.ruleForm).then(response => {
						if (response.status == 200) {
							//表示服务器端响应成功
							this.tableData=response.data.data;
							this.totals = response.data.totalCount;
						}
					}).catch((error) => {
						console.log(error)
					})
				}else{
					//编辑
				}
				
			},
			// 返回按钮
			goBack(){
				this.$router.push({path:'/EmployeeManage'});
			}
		},
		mounted() {
			this.ruleForm = this.$route.params;
			if(this.ruleForm.kid == ''){
				this.moduleTitle = '新建员工';
			}
			if(this.ruleForm.kid != ''){
				this.moduleTitle = '修改员工';
			}
		}
	}
</script>

<style scoped>
	.e-info-one {
		padding-top: 20px;
	}

	.e-info-two {
		padding-top: 30px;
	}

	.org-info-submit {
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
