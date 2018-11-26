"use strict";
cc._RF.push(module, 'c0b26/WRpFNeqjSyUkpnSAy', 'DateUtil');
// scripts/Common/Tool/DateUtil.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateUtil = function () {
    function DateUtil() {
        _classCallCheck(this, DateUtil);
    }

    _createClass(DateUtil, [{
        key: "dateFormat",
        value: function dateFormat(fmt, date) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds //毫秒
                () };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }return fmt;
        }

        /**
         * 是否是昨天
         * @param theDate
         * @returns {boolean}
         */

    }, {
        key: "isYestday",
        value: function isYestday(theDate) {
            var date = new Date(); //当前时间
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
            var yestday = new Date(today - 24 * 3600 * 1000).getTime();
            return theDate.getTime() < today && yestday <= theDate.getTime();
        }

        /**
         * 是否是今天
         * @param str
         * @returns {boolean}
         */

    }, {
        key: "isToday",
        value: function isToday(str) {
            var d = new Date(str.replace(/-/g, "/"));
            var todaysDate = new Date();
            return d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
        }

        /**
         * 今天数字值
         */

    }, {
        key: "todayValue",
        value: function todayValue() {
            var date = new Date(); //当前时间
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
        }

        /**
         * 今天数字值
         */

    }, {
        key: "todayDate",
        value: function todayDate() {
            var date = new Date();
            return date.toDateString();
        }
    }, {
        key: "isInToday",
        value: function isInToday(str) {
            var d = new Date(str);
            var newDate = new Date();

            return d.toDateString() === newDate.toDateString();
        }

        /**
         * 当前时间戳
         * @returns {Object}
         */

    }, {
        key: "currentTimeStamp",
        value: function currentTimeStamp() {
            return new Date().valueOf();
        }
    }]);

    return DateUtil;
}(); //end class

module.exports = DateUtil;

cc._RF.pop();