/**
 * 获取排序类型 
 */
function getSortType(typeStr) {

    return typeStr == 'descending' ? "DESC" : "ASC"
}

function trim(str) {
    if (null === str || '' === str) {

        return ''

    }
    return str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, '');
}

function isBlank(str) {

    if (typeof str === 'undefined') {

        return true

    }

    if (null === str || '' === str) {

        return true

    }


    if (typeof str === 'string') {

        return trim(str) === "" || trim(str) == null;

    }

    return false
}

//手机显示方式,例:188 2563 6963
function toPhone(str) {

    if (isBlank(str)) {
        return "";
    }

    str = trim(str);

    var result = '';

    for (var i = 0; i < str.length; i++) {

        if (i == 3 || i == 7) {

            result += " ";
        }
        result += str[i];
    }

    return result;
}


//手机显示方式,例:188 2563 6963
function getPhone(str) {

    return trim(str);

}
//转金额显示,','分隔
function toMoneyStr(num, fixedNum) {

    if (null == num || '' == num) { 
        num = 0
    }
    
    if (null != fixedNum && fixedNum > 0) { 
        num = num.toFixed(fixedNum);
    }
    num = parseFloat(num)
    num = num.toLocaleString();
    return num;

}

//是否图片
function isImage(file) {

    return file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp';

}

 
Date.prototype.addDays = function(days) {
 
    this.setTime(this.getTime() + 3600 * 1000 * 24 * days);
  
}


Date.prototype.addMonths = function(months) { 
    var yearChange =  parseInt(months/12)    
    months = months % 12  
    var thisYear = this.getFullYear() + yearChange; 
    var thisMonth = this.getMonth() + 1 + months 
    var thisDay = this.getDate() 
    if(thisMonth < 0){ 
        thisMonth = thisMonth + 12 
        thisYear = thisYear - 1  
    }
    else if(thisMonth > 12){ 
        thisMonth = thisMonth - 12 
        thisYear = thisYear + 1 
    }
 
    this.setFullYear(thisYear);
    this.setMonth(thisMonth-1);
    this.setDate(thisDay);  
}
 

export default {
    isBlank: isBlank,
    trim: trim,
    getSortType: getSortType,
    toPhone: toPhone,
    getPhone: getPhone,
    toMoneyStr:toMoneyStr,

    isImage: isImage,

}
