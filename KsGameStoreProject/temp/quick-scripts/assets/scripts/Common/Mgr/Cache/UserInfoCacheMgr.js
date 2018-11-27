(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Mgr/Cache/UserInfoCacheMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '25b70pr9SNG8bp/QNOUToaN', 'UserInfoCacheMgr', __filename);
// scripts/Common/Mgr/Cache/UserInfoCacheMgr.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 用户信息缓存Mgr
 */
var UserInfoCacheMgr = function () {
    function UserInfoCacheMgr() {
        _classCallCheck(this, UserInfoCacheMgr);

        this._gameMaxPopBuyDialogPopTimes = 3;
        this._gameStarTips = "";
        this._userId = "";
        this._userName = "";
        this._headIconURL = "";
        this._deviceId = "";
        this._appVersion = "";
        this._currentRunningSceneName = "";
        this._userStarNum = 0;
        this._userLevel = "";
        this._enterGameSceneType = 0;

        this._buyProduct = 0; //是否购买商品
        this._productId = -1; //商品id
        this._productType = -1; //商品类型
    }

    /**
     * 获取转换成json字符串的商品信息
     * @returns {string}
     */


    _createClass(UserInfoCacheMgr, [{
        key: "getUserProductInfoString",
        value: function getUserProductInfoString() {
            var info = {};
            info.gameType = 1; //超级诗词游戏类型
            info.buyProduct = this.buyProduct;
            info.productId = this.productId;
            info.contentType = this.productType;

            return JSON.stringify(info);
        }
    }, {
        key: "toString",
        value: function toString() {
            console.log("[UserInfoCacheMgr]userId:" + this.userId + " == userName:" + this.userName + " == userHeadIconURL:" + this.headIconURL + " == userStarNum:" + this.userStarNum + " == userLevel:" + this.userLevel);
            console.log("[UserInfoCacheMgr]appVersion:" + this.appVersion + " == deviceId:" + this.deviceId);
        }
    }, {
        key: "buyProduct",
        get: function get() {
            return this._buyProduct;
        },
        set: function set(value) {
            this._buyProduct = value;
        }
    }, {
        key: "productId",
        get: function get() {
            return this._productId;
        },
        set: function set(value) {
            this._productId = value;
        }
    }, {
        key: "productType",
        get: function get() {
            return this._productType;
        },
        set: function set(value) {
            this._productType = value;
        }
    }, {
        key: "gameMaxPopBuyDialogPopTimes",
        get: function get() {
            return this._gameMaxPopBuyDialogPopTimes;
        },
        set: function set(value) {
            this._gameMaxPopBuyDialogPopTimes = value;
        }
    }, {
        key: "gameStarTips",
        get: function get() {
            return this._gameStarTips;
        },
        set: function set(value) {
            this._gameStarTips = value;
        }
    }, {
        key: "enterGameSceneType",
        get: function get() {
            return this._enterGameSceneType;
        },
        set: function set(value) {
            this._enterGameSceneType = value;
        }
    }, {
        key: "userId",
        get: function get() {
            return this._userId;
        },
        set: function set(value) {
            this._userId = value;
        }
    }, {
        key: "userName",
        get: function get() {
            return this._userName;
        },
        set: function set(value) {
            this._userName = value;
        }
    }, {
        key: "headIconURL",
        get: function get() {
            return this._headIconURL;
        },
        set: function set(value) {
            this._headIconURL = value;
        }
    }, {
        key: "deviceId",
        get: function get() {
            return this._deviceId;
        },
        set: function set(value) {
            this._deviceId = value;
        }
    }, {
        key: "appVersion",
        get: function get() {
            return this._appVersion;
        },
        set: function set(value) {
            this._appVersion = value;
        }
    }, {
        key: "currentRunningSceneName",
        get: function get() {
            return this._currentRunningSceneName;
        },
        set: function set(value) {
            this._currentRunningSceneName = value;
        }
    }, {
        key: "userStarNum",
        get: function get() {
            return this._userStarNum;
        },
        set: function set(value) {
            this._userStarNum = value;
        }
    }, {
        key: "userLevel",
        get: function get() {
            return this._userLevel;
        },
        set: function set(value) {
            this._userLevel = value;
        }
    }]);

    return UserInfoCacheMgr;
}(); //end class UserInfoCacheMgr

module.exports = UserInfoCacheMgr;

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
        //# sourceMappingURL=UserInfoCacheMgr.js.map
        