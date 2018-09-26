///日期时间格式化
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
Date.prototype.format=function(time){
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(time)){
        time = time.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(time)){
            time = time.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return time;
};
export default {
    setCookie:function(key,value,time){
        if(!time){
            time = 1.5*3600*1000;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + time);
        value=encodeURIComponent(value);
        var hostname = location.hostname;
        if(hostname.indexOf('gaodun.com')>-1){
            hostname = '.gaodun.com';
        }
        document.cookie = key + "=" + value + "; domain=" + hostname +";expires=" + exp.toString();
        
   },
   getCookie:function(name){
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
            return decodeURIComponent(arr[2]);
        }
        else{
            return null;
        }
    },
    delCookie:function(name) {
        this.setCookie(name, "", -1);  
    },
    //传入时间 2018-04-23 16：00
    convertStamp:function(time){
        var date = new Date(time);
        return date.getTime();
    },
    convertTime:function(day,time){
          return new Date(day).getFullYear() + "-" + parseInt(new Date(day).getMonth() + 1) + "-" +
          new Date(day).getDate() + " " + time;
         
    },
    scrollTo(id){
        var _id = document.getElementById(id);
        window.scrollTo(0,_id.offsetTop);
    },

    //focus到表单输入框
    focusInput(id){
        document.getElementById(id).focus();
        document.getElementById(id).blur();
        document.getElementById(id).focus();
    }    
    
}