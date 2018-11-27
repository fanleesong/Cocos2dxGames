"use strict";
cc._RF.push(module, '78b113v+BZJWor5VjrZa8pL', 'UserDataSaver');
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