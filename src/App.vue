<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	li{list-style: none;}
	#app {
		font-size: 12px;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	/* 设置滚动条的样式 */
	::-webkit-scrollbar {width:6px;height: 10px;}
	::-webkit-scrollbar-thumb {border-radius:10px;background:#676171;-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);}
	::-webkit-scrollbar-thumb:window-inactive {background:#676171;}
	/* 子页面公共样式 */
	.login-input .el-input__inner{padding-left: 35px!important;}
	.view-content{padding: 30px;}
	.view-top{height: 45px;background-color: white;position: relative;}
	.go-back{position: absolute;right: 30px;top: 8px;padding: 8px 20px;border: 1px solid #E2DCE6;border-radius: 5px;cursor: pointer;}
	.operate-div {width: 100%;background-color: white;padding: 15px 20px 0 20px;}
	.operate-btn{width: 115px;height: 40px;display: inline-block;cursor: pointer;margin-left: 15px;}
	.creat-btn{background: url(assets/public/creat-btn.png) no-repeat center center;background-size: contain;}
	.import-btn{background: url(assets/public/import-btn.png) no-repeat center center;background-size: contain;}
	.export-btn{background: url(assets/public/export-btn.png) no-repeat center center;background-size: contain;}
	.del-btn{background: url(assets/public/del-btn.png) no-repeat center center;background-size: contain;}
	
	.el-breadcrumb{line-height: 45px;margin-left: 9px;}
	.el-form{text-align: left;max-width: 1080px;}
	.employee-info-form .el-form{max-width: 100%;}
	.employee-info-form .el-form .el-select{width: 100%;}
	.employee-info-form .el-form .el-form-item__label{font-size: 12px;padding-right: 5px;}
	.el-form .el-form-item{margin-right: 15px;margin-bottom: 20px;}
	.el-form-item .el-select{width: 150px;}
	.el-form-item .text-input input{width: 240px;}
	.el-form-item .el-input input{font-size: 12px;line-height: 40px;}
	.search-button{background: none;color: #554C9D;font-size: 14px;border: none;padding: 0;position: relative;left: -5px;}
	.search-button:hover{background: none;color: #554C9D;font-size: 14px;border: none;}
	.search-button:focus{background: none;color: #554C9D;font-size: 14px;border: none;}
	.data-table-div{width: 100%;background-color: white;margin-top: 30px;}
	.page-div{width: 100%;text-align: right;padding: 25px 20px 25px 0;}
	.el-table th,.el-table td{text-align: center;padding-top: 5px;padding-bottom: 5px;}
	.check-btn,.edit-btn,.del-icon,.creat-icon{border: none;outline: none;}
	.check-btn{width: 28px;height: 28px;background: url(assets/public/check-icon.png) no-repeat center center;background-size: contain;}
	.edit-btn{width: 28px;height: 28px;background: url(assets/public/edit-icon.png) no-repeat center center;background-size: contain;}
	.del-icon{width: 28px;height: 28px;background: url(assets/public/del-icon.png) no-repeat center center;background-size: contain;}
	.creat-icon{width: 28px;height: 28px;background: url(assets/public/creat-icon.png) no-repeat center center;background-size: contain;}
	.el-tree-node.is-expanded>.el-tree-node__children{overflow: hidden;}
	.power-tree .el-tree-node.is-expanded>.el-tree-node__children:nth-child(2)>div{float: left;}
	.employee-info .el-tabs__nav-scroll{background-color: white;padding-left: 20px;}
</style>
<!-- <style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
 -->