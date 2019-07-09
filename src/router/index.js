import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home1'
import CompanyManage from '@/components/subPage/group1/CompanyManage'
import task from '@/components/subPage/group1/task'
import EmployeeInfo from "@/components/subPage/group1/EmployeeInfo";
import PowerManage from '@/components/subPage/group1/PowerManage'
import ClazzManage from '@/components/subPage/group1/ClazzManage'
import ProcessConfiguration from '@/components/subPage/group1/ProcessConfiguration'
import ProductManage from '@/components/subPage/group1/ProductManage'
import Orgpage from "../components/subPage/group1/OrgpageManage";

Vue.use(Router)

export default new Router({
  routes: [
    {// 登录页
      path: '/',
      name: 'Login',
      component: Login
    }, {// OA首页
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [ {// 员工管理-员工信息页面
        path: '/EmployeeInfo',
        name: 'EmployeeInfo',
        component: EmployeeInfo
      }, {// 部门管理
        path: '/Orgpage',
        name: 'Orgpage',
        component: Orgpage
      }, {// 权限管理
        path: '/PowerManage',
        name: 'PowerManage',
        component: PowerManage
      }, {// 公司管理
        path: '/CompanyManage',
        name: 'CompanyManage',
        component: CompanyManage
      }, {// 流程配置
        path: '/ProcessConfiguration',
        name: 'ProcessConfiguration',
        component: ProcessConfiguration
      }, {// 产品管理
        path: '/ProductManage',
        name: 'ProductManage',
        component: ProductManage
      }, {// 数据字典
        path: '/ClazzManage',
        name: 'ClazzManage',
        component: ClazzManage
      }]
    },
    {// 员工管理
      path: '/task',
      name: 'task',
      component: task
    },
  ],
	mode:'history'
})
