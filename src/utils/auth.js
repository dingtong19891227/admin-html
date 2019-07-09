import Cookies from 'js-cookie'

import apiRole from '@/api/role'

const TokenKey = 'JToken'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {

    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

const loginerKey = 'loginer'

export function getLoginer() {
    var data = window.localStorage.getItem(loginerKey);
    return JSON.parse(data)
}

export function setLoginer(user) {
    return window.localStorage.setItem(loginerKey, JSON.stringify(user))
}

export function removeLoginer() {
    return window.sessionStorage.removeItem(loginerKey)
}
//检测权限
//pageId:页签编号
//operId:操作编号
export function checkPermission(pageId, operId) {
    var loginUser = getLoginer();
    if (null == loginUser) {
        throw "无登录用户信息"
    }
    var isHasPermission = false

    if (null == operId) {
        //检测page
        var pageMap = loginUser.pageMap
        if (null != pageMap) {
            var sysId = process.env.SYS_ID
            for (var i in pageMap) {
                if ("all" != i && sysId != i) {
                    continue;
                }
                var model = pageMap[i];
                for (var j in model) {
                    var modelItem = model[j]
                    if (sysId != modelItem.model) {
                        continue;
                    }
                    if (pageId == modelItem.kid) {
                        isHasPermission = true
                        break;
                    }
                }
            }
        }
    } else {
        //检测oper
        var optMap = loginUser.optMap
        if (null != optMap) {
            var opers = optMap[pageId]
            if (null != opers) {
                for (var j in opers) {
                    if (operId == opers[j].pageUrl) {
                        isHasPermission = true
                        break
                    }
                }
            }
        }
    }
    return isHasPermission;
}

//检测tab页签权限
//pageId:页签编号 
export function checkTabPermission(pageId, tabId) {
    var loginUser = getLoginer();
    if (null == loginUser) {
        throw "无登录用户信息"
    }
    var isHasPermission = false

    //检测page
    var pageMap = loginUser.tabMap
    if (null != pageMap) {
        var page = pageMap[pageId]
        if (null != page) {
            for (var i = 0; i < page.length; i++) {
                if (tabId == page[i].kid) {
                    isHasPermission = true
                    break;
                }
            }
        }

    }
    return isHasPermission;
}
 
//检测tab页签权限
//pageId:页签编号 
export function checkIsRole(roleId) {
    var loginUser = getLoginer();
    if (null == loginUser) {
        throw "无登录用户信息"
    }
    var isRole = false

    //检测roles
    var roles = loginUser.roles
    if (null != roles) { 
        for (var i = 0; i < roles.length; i++) {
            if (roleId == roles[i].kid) {
                isRole = true
                break;
            }
        }  
    }
    return isRole;
}
