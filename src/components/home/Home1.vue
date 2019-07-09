<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark logo-img-col">
              <div class="logo-img">
                <img src="../../assets/home/logo.png"><!--用户头像-->
              </div>
              <div class="user-do">
                <div class="user-info">
                  <span class="user-header-img"></span>
                  <el-dropdown>
                    <el-button type="text" class="user-name">
                      默小伟<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>用户信息</el-dropdown-item>
                      <el-dropdown-item>用户信息</el-dropdown-item>
                      <el-dropdown-item>用户信息</el-dropdown-item>
                      <el-dropdown-item>用户信息</el-dropdown-item>
                      <el-dropdown-item>用户信息</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="notice"><i class="el-icon-news"></i></div>
                <div class="help"><i class="el-icon-bell"></i></div>
                <div class="login-out"><i class="el-icon-edit-outline"></i></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="6%">
          <!-- 左侧导航栏 -->
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo left-nav" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title"></span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click='showView(1-1)'>员工管理</el-menu-item>
                <el-menu-item index="1-2" @click='showView(1-2)'>部门管理</el-menu-item>
                <el-menu-item index="1-3" @click='showView(1-3)'>权限管理</el-menu-item>
                <el-menu-item index="1-4" @click='showView(1-4)'>公司管理</el-menu-item>
                <el-menu-item index="1-5" @click='showView(1-5)'>流程配置</el-menu-item>
                <el-menu-item index="1-6" @click='showView(1-6)'>产品管理</el-menu-item>
                <el-menu-item index="1-7" @click='showView(1-7)'>数据字典</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title"></span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">员工管理</el-menu-item>
                <el-menu-item index="2-2">部门管理</el-menu-item>
                <el-menu-item index="2-3">权限管理</el-menu-item>
                <el-menu-item index="2-4">公司管理</el-menu-item>
                <el-menu-item index="2-5">数据字典</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <p>Copyright 2019 天津XXX信息技术有限公司　　津ICP备00000000号</p>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showView(index) {// 左侧导航触发子页面跳转
        switch (index) {
          case 1 - 1:
            this.$router.push('/EmployeeManage');// 员工管理
            break;
          case 1 - 2:
						this.$router.push('/Orgpage')// 部门管理
            break;
          case 1 - 3:
            this.$router.push('/PowerManage')// 权限管理
            break;
					case 1 - 4:
            this.$router.push('/CompanyManage')// 公司管理
            break;
          case 1 - 5:
            this.$router.push('/ProcessConfiguration')// 流程配置
            break;
					case 1 - 6:
            this.$router.push('/ProductManage')// 产品管理
            break;
          case 1 - 7:
            this.$router.push('/ClazzManage')// 数据字典
            break;
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home,
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    position: relative;
    z-index: 2000;
    background-color: #353652;
  }

  .el-header,
  .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }

  .el-footer p {
    font-size: 12px;
    color: #5C6165;
  }

  .el-aside {
    background-color: #353652;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow-x: hidden;
    border-right: 1px solid #676171;
  }

  .el-main {
    background-color: #f1f1f1;
    color: #333;
    text-align: center;
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu--collapse {
    margin: 0;
    width: 100%;
  }

  .logo-img-col {
    overflow: hidden;
    border-bottom: 1px solid #676171;
  }

  .logo-img {
    padding: 12px 0 0 20px;
    height: 60px;
    float: left;
    color: white;
  }

  .logo-img img {
    width: 100%;
  }

  .user-do {
    float: right;
    width: 360px;
    height: 60px;
    overflow: hidden;
    text-align: right;
  }

  .user-info {
    width: 160px;
    min-width: 160px;
    height: 60px;
    display: inline-block;
    line-height: 60px;
    vertical-align: top;
  }

  .user-header-img {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: salmon;
    border-radius: 30px;
    border: 1px solid white;
    vertical-align: middle;
    margin-right: 10px;
  }

  .user-name {
    color: white;
  }

  .el-dropdown {
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }

  .el-dropdown button {
    background-color: none;
  }

  .notice,
  .help,
  .login-out {
    width: 60px;
    height: 60px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    border-left: 1px solid #534E8E;
  }

  .notice i,
  .help i,
  .login-out i {
    position: absolute;
    top: 50%;
    left: 55%;
    margin-top: -8px;
    margin-left: -8px;
    color: white;
  }

  /* .notice:hover,
    .help:hover,
    .login-out:hover {
        background-color: #325422;
    } */

  .el-dropdown-menu {
    top: 50px !important;
  }

  .left-nav {
    background: none;
    border: none;
  }

  .el-submenu__title i {
    color: white;
  }

  .el-menu--popup-right-start {
    margin: 0 !important;
  }
</style>
