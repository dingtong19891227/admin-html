 import axios from 'axios'
 import {
     Message,MessageBox
 }
 from 'element-ui'
 import {
     getToken, setToken
 }
 from '@/utils/auth'


 // create an axios instance
 const service = axios.create({
     baseURL: /*process.env.BASE_API, // api的base_url*/ "http://localhost:9090",
     timeout: 5000 // request timeout
 });

 // request interceptor
 /*service.interceptors.request.use(config => {
     // Do something before request is sent
     if (getToken()) {
         config.headers['QxToken'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
     }

     return config
 }, error => {
     // Do something with request error
     //console.log(error) // for debug
     Promise.reject(error)
 });*/

 // respone interceptor
 /*service.interceptors.response.use(
     response => {
         /**
          * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
          * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
          */
         /*const res = response.data;
         if (response.status === 200) {
             if (1 === res.result) {
                 var jtoken = response.headers['QxToken'];
                 var refjtoken = response.headers['refjtoken'];
                 if (null !== jtoken && (typeof jtoken !== 'undefined')) {
                     setToken(jtoken);
                 } else if (null !== refjtoken && (typeof refjtoken !== 'undefined')) {
                     setToken(refjtoken);
                 }
                 return res;
             } else {
                 Message({
                     message: res.message || "操作失败",
                     type: 'error',
                     center: true,
                 });
                 return null
             }
         }
     }, error => {
         var status = error.response.status
         if (status == "401") {
             MessageBox.confirm('登录超时，可以取消继续留在该页面，或者重新登录', '确定登出', {
                 confirmButtonText: '重新登录',
                 cancelButtonText: '取消',
                 type: 'warning'
             }).then(() => {
                 //store.dispatch('FedLogOut').then(() => {
                     location.reload(); // 为了重新实例化vue-router对象 避免bug
                 //});
             })
         } else {
             Message({
                 message: "操作失败,code:" + status,
                 type: 'error',
                 center: true,
             });
         }
         return Promise.reject(error);
     });*/

 export default service
