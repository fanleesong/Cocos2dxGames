(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/StringUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9db37i2FSRMTIZws1aWbquE', 'StringUtil', __filename);
// scripts/Common/Tool/StringUtil.js

"use strict";

var CryptUtil = require("CryptUtil");
module.exports = {
    replaceString: function replaceString(srcStr, replaceStr) {
        var idx = srcStr.lastIndexOf(replaceStr);
        if (idx >= 0) {
            return srcStr.substr(replaceStr.length, srcStr.length);
        }

        return srcStr;
    },


    /**
     * https转换http
     * @param url
     * @returns {*}
     */
    getHttpURL: function getHttpURL(url) {
        var httpsStr = "https";
        var idx = url.lastIndexOf(httpsStr);
        if (idx >= 0) {
            var subStr = url.substr(httpsStr.length, url.length);
            return "http" + subStr;
        }
        return url;
    },


    /**
     * 0补位
     * @param num
     * @param n
     * @returns {string}
     */
    prefixInteger: function prefixInteger(num, n) {

        return (Array(n).join(0) + num).slice(-n);
    },


    /**
     * 转换音频路径
     * @param audioUrl
     * @returns {*}
     */
    parseAudioUrlToLocalFilePath: function parseAudioUrlToLocalFilePath(audioUrl) {
        // cc.log("[StringUtils]-->转换前-->URL：  " + audioUrl);
        if (audioUrl === null || audioUrl === undefined) return "";
        var url = this.getHttpURL(audioUrl);
        var filePath = jsb.fileUtils.getWritablePath() + cc.ss.GlobalConst.AUDIO_CACHE_PATH + CryptUtil.md5Encode(url) + '.mp3';
        // cc.log("[StringUtils]-->转换后-->URL：  " + CryptUtil.md5Encode(url) + '.mp3');
        return filePath;
    },


    /**
     * 判断非法或者空字符串
     * @param str
     * @returns {boolean}
     */
    isEmpty: function isEmpty(str) {
        return str === null || str === undefined || str === "";
    }
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=StringUtil.js.map
        