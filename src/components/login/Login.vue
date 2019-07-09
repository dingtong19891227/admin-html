<template>
	<div class="login-page-container">
		<div class="login-container-div">
			<div class="login-top-white">
				<div class="login-top-line"></div>
				<div class="login-top-div">
					<div class="login-logo-div">
						<div class="login-img"></div>
						<div class="login-img-arc"></div>
					</div>
				</div>
			</div>
			<div class="login-bg">
				<div class="login-form">
					<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
						<h3 class="login-title">系统登录</h3>
						<el-form-item prop="account" style="margin-bottom: 8%;">
							<el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入您的用户名/身份证号" class="login-input"></el-input>
							<span class="el-input__prefix"><i class="el-input__icon el-icon-date"></i></span>
						</el-form-item>
						<el-form-item prop="checkPass" style="margin-bottom: 8%;">
							<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入您的密码" class="login-input"></el-input>
							<span class="el-input__prefix"><i class="el-input__icon el-icon-date"></i></span>
						</el-form-item>
						<el-form-item style="margin-bottom: 8%;">
							<el-input type="text" auto-complete="off" v-model="ruleForm2.vcode" placeholder="请输入右侧验证码" class="v-code-input login-input"></el-input>
							<span class="el-input__prefix"><i class="el-input__icon el-icon-date"></i></span>
							<span class="random-span" @click="changeNum">{{ vNum }}</span>
						</el-form-item>
						<el-form-item style="width:100%;margin-top: 30px;">
							<el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining" class="login-btn">用户登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="login-footer">
				多生物特征融合应用
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				logining: false,
				ruleForm2: {
					account: '',
					checkPass: '',
					vcode:''
				},
				rules2: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
					],
					checkPass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
					],
					vcode: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
					]
				},
				checked: true,
				// 4位随机数
				vNum:4567
			};
		},
		methods: {
			handleSubmit2(ev) {
				var _this = this;
				_this.$refs.ruleForm2.validate((valid) => {
					if (valid) {
						_this.logining = true;
						var loginParams = {
							username: this.ruleForm2.account,
							password: this.ruleForm2.checkPass,
							vcode: this.ruleForm2.vcode
						};
						if(loginParams.vcode != "" && loginParams.vcode.length == 4 && loginParams.vcode == this.vNum){
							// 调用登录接口
							_this.logining = false;
							sessionStorage.setItem('user', JSON.stringify(loginParams));
							_this.$router.push({
								path: '/home'
							});
							return;
						}
						_this.logining = false;
						_this.$alert('请输入正确的验证码！', '提示信息', {
							confirmButtonText: '确定'
						});
						this.changeNum();
						return;
					} else {
						_this.$alert('用户名或密码错误！', '提示信息', {
							confirmButtonText: '确定'
						});
						return false;
					}
				});
			},
			changeNum(){// 切换4位验证码
				var value = Math.floor(Math.random()*4000+1000);
				this.vNum = value;
			}
		},
		created(){
			// 切换4位验证码
			this.changeNum();
		}
	}
</script>

<style scoped>
	.login-container-div{position: absolute;width: 100%;height: 100%;top: 0;}
	.login-top-white{width: 100%;background: white;position: absolute;height: 170px;box-shadow: 0 0 5px #888;z-index: 20;}
	.login-top-div{max-width: 1200px;width: 100%;padding-left: 10%;}
	.login-top-line{width: 100%;height: 30px;background-color: #f3f3f3;}
	.login-logo-div{max-width: 1200px;width: 100%;margin: 0 auto;height: 110px;padding-top: 30px;}
	.login-img{width: 475px;height: 60px;background: url(../../assets/image/logo.png) no-repeat left center;background-size: contain;}
	.login-img-arc{max-width: 1200px;width: 100%;height: 60px;background: url(../../assets/image/login-arc.png) no-repeat left center;background-size: contain;position: relative;top: 20px;}
	.login-bg{width: 100%;height: 100%;background: url(../../assets/image/login-bg.png) no-repeat center center;background-size: cover;padding-top: 170px;padding-bottom: 136px;position: relative;z-index: 10;}
	.login-footer{width: 100%;height: 100px;background-color: white;line-height: 100px;font-size: 12px;text-align: center;position: absolute;bottom: 0;z-index: 20;}
	.login-form{max-width: 1200px;width: 100%;margin: 0 auto;position: relative;}
	.login-container {-webkit-border-radius: 10px;border-radius: 10px;-moz-border-radius: 10px;background-clip: padding-box;width: 323px;background: #fff;border: 1px solid #eaeaea;box-shadow: 0 5px 2px #333;position: absolute;margin-top: 2%;right: 5%;padding: 15px;}
	.login-title{text-align: center;font-size: 18px;color: #333333;font-family: "microsoft yahei";line-height: 300%;}
	.v-code-input{width: 180px;}
	.random-span{border: 3px solid #666;font-family: "STXingkai";font-size: 16px;padding: 5px 15px;margin-left: 20px;border-radius: 5px;cursor: pointer;-webkit-user-select: none;}
	.login-btn{background-color: #294e9f;color: white;outline: none;border: none;border-radius: 30px;box-shadow: 0 3px 2px #aaa;}
</style>
