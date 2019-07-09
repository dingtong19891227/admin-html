/**
 * Created by xzj on 2018-03-10.
 */


import common from '@/utils/common'

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/*小数*/
export function validateDecimal(str) {
  const reg = /^\d+(\.\d+)?$/
  return reg.test(str)
}

/*整数*/
export function validateInt(str) {
  const reg = /^\d+$/
  return reg.test(str)
}

/* 手机号*/
export function validatPhone(str) {

  str = common.trim(str)

  const reg = /^[0-9]{11}$/

  return reg.test(str)
}
 

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function  validator (rule, value, callback) { 
 
    if (value){

      //带小数点的数字格式验证
      if('decimal' == rule.type &&  !validateDecimal(value)){
  
        return callback(new Error( ));
      }

      //验证整数
      if('int' == rule.type && !validateInt(value)){

        return callback(new Error( ));
      }


      //最大值验证
      if('max' == rule.type &&  value > rule.max ){
  
        return callback(new Error( ));
      }

      //最小值验证
      if('min' == rule.type &&  value < rule.min ){
  
        return callback(new Error( ));
      }

  
      //手机号格式验证
      if('phone' == rule.type &&  !validatPhone(value)){
 
        rule.message = rule.message || "手机号格式有误"

        return callback(new Error( ));
      }


      //网址格式验证
      if('url' == rule.type &&  !validateURL(value)){
 
        rule.message = rule.message ||  "网址格式有误,请以http://或https://开头"

        return callback(new Error( ));
      }


      //密码验证 匹配6-20位字母数字和下划线组成。
      if('password' == rule.type){
        if( 32 > value.length && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(value)){

          rule.message = rule.message ||  "6-20位字母数字和下划线组成,至少包括两种"

          return callback(new Error( ));
        }
      }
 
      //密码验证 匹配6-20位字母数字和下划线组成。
      if('password' == rule.type){
        if( 32 > value.length && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(value)){

          rule.message = rule.message ||  "6-20位字母数字和下划线组成,至少包括两种"

          return callback(new Error( ));
        }
      }


  
      //字符串最大长度
      if('maxlength' == rule.type && validateInt(rule.length) ){
   
          if(value.length > rule.length){
 
              rule.message = rule.message || "最多输入"+rule.length + "个字符"

              return callback(new Error( ));
          } 

      }

  
      //字符串最小长度
      if('minlength' == rule.type && validateInt(rule.length) ){
    
          if(value.length < rule.length){
 
              rule.message = rule.message || "最少输入"+rule.length + "个字符"

              return callback(new Error( ));
          } 

      }


    }

    callback();

}
