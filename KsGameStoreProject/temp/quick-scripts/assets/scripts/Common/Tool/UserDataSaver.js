(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/UserDataSaver.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '78b113v+BZJWor5VjrZa8pL', 'UserDataSaver', __filename);
// scripts/Common/Tool/UserDataSaver.js

"use strict";

/**
 * 用户本地数据存储
 */
cc.Class({

    properties: {
        _USER_TAG_PREFIX: "gamestoreUserTag-",
        _USER_BGM_SETTING_PREFIX: "gamestoreBgm-",
        _USER_SOUND_SETTING_PREFIX: "gamestoreSound-"

    },

    onLoad: function onLoad() {},

    setBool: function setBool(key, value) {
        if (value == true) {
            cc.sys.localStorage.setItem(key, "true");
        } else {
            cc.sys.localStorage.setItem(key, "false");
        }
    },

    getBool: function getBool(key) {
        var item = cc.sys.localStorage.getItem(key);
        if (item !== undefined && item !== "" && item !== "undefined" && item !== null) {
            if (item === "false") {
                return false;
            } else if (item === "true") {
                return true;
            }
        }

        return false;
    },

    setString: function setString(key, value) {
        cc.sys.localStorage.setItem(key, value);
    },

    getString: function getString(key) {
        var item = cc.sys.localStorage.getItem(key);
        if (item !== undefined && item !== "" && item !== "undefined" && item !== null) {
            return item;
        }
        return null;
    }

});

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
        //# sourceMappingURL=UserDataSaver.js.map
        