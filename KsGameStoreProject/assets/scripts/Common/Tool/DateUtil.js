class DateUtil
{


    dateFormat(fmt,date)
    {
        let o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
             };
        if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));

        for(let k in o)
            if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));

            return fmt;
    }



    /**
     * 是否是昨天
     * @param theDate
     * @returns {boolean}
     */
    isYestday(theDate) {
        let date = (new Date());    //当前时间
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
        let yestday = new Date(today - 24*3600*1000).getTime();
        return theDate.getTime() < today && yestday <= theDate.getTime();
    }

    /**
     * 是否是今天
     * @param str
     * @returns {boolean}
     */
    isToday(str) {
        let d = new Date(str.replace(/-/g,"/"));
        let todaysDate = new Date();
        return d.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0);
    }

    /**
     * 今天数字值
     */
    todayValue() {
        let date = (new Date());    //当前时间
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
    }

    /**
     * 今天数字值
     */
    todayDate() {
        let date = new Date();
        return date.toDateString();
    }

    isInToday(str) {
        let d = new Date(str);
        let newDate = new Date();

        return d.toDateString() === newDate.toDateString();
    }

    /**
     * 当前时间戳
     * @returns {Object}
     */
    currentTimeStamp() {
        return  new Date().valueOf();
    }
    
}//end class

module.exports = DateUtil;

