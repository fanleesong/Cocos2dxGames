(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/VersionUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4d498r2d89GS7vwb8+NI7rn', 'VersionUtil', __filename);
// scripts/Common/Tool/VersionUtil.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VersionUtil = function () {
    function VersionUtil() {
        _classCallCheck(this, VersionUtil);
    }

    /**
     * 版本字符串比较
     * @param versionStr1
     * @param versionStr2
     * @returns {boolean}
     */


    _createClass(VersionUtil, null, [{
        key: "compare",
        value: function compare(versionStr1, versionStr2) {
            var versionData1 = VersionUtil.getVersionData(versionStr1);
            var versionData2 = VersionUtil.getVersionData(versionStr2);

            if (versionData1.totalVersion > versionData2.totalVersion) return true;
            if (versionData1.totalVersion = versionData2.totalVersion) return versionData1.childVersion >= versionData2.childVersion;

            return false;
        }

        /**
         * 获取版本数据
         * @param versionStr 版本字符串
         * @returns {*}
         * @private
         */

    }, {
        key: "getVersionData",
        value: function getVersionData(versionStr) {
            if (versionStr === undefined || versionStr === null || versionStr === "") return null;
            var versionArr = versionStr.split(".");
            if (versionArr.length < 2) return null;

            return {
                totalVersion: parseInt(versionArr[0]),
                childVersion: parseInt(versionArr[1])
            };
        }
    }]);

    return VersionUtil;
}(); //end class

module.exports = VersionUtil;

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
        //# sourceMappingURL=VersionUtil.js.map
        