(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Mgr/LocalStorageMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3814fm2V0hLQr4MFbbgwkzh', 'LocalStorageMgr', __filename);
// scripts/Common/Mgr/LocalStorageMgr.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var USER_BGM_SETTING_PREFIX = "ksgamestore-bgm-";
var USER_SOUND_SETTING_PREFIX = "ksgamestore-sound-";
var USER_VOICE_SETTING_PREFIX = "ksgamestore-voice-";
var USER_PERSISTENCE_MEDAL_ID_PREFIX = "ksgamestore-medal-id-persistence-";
var USER_FIT_IPHONEX_TOP_BTN_POSITION_PREFIX = "ksgamestore-fit-iphonex-top-btn-position-";

//storage 本地读取
var LocalDataStorage = require('LocalDataStorage');

var LocalStorageMgr = function () {
    function LocalStorageMgr() {
        _classCallCheck(this, LocalStorageMgr);

        this._localDataStorage = new LocalDataStorage();
    }

    //////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////

    _createClass(LocalStorageMgr, [{
        key: "isVoiceOpen",
        value: function isVoiceOpen(userId) {
            var saverTag = USER_VOICE_SETTING_PREFIX + userId;
            var rlt = this._localDataStorage.getBool(saverTag);
            return !rlt;
        }
    }, {
        key: "setVoiceState",
        value: function setVoiceState(userId, newState) {
            var saverTag = USER_VOICE_SETTING_PREFIX + userId;
            this._localDataStorage.setBool(saverTag, !newState);
        }
    }, {
        key: "isSoundOpen",
        value: function isSoundOpen(userId) {
            var saverTag = USER_SOUND_SETTING_PREFIX + userId;
            var rlt = this._localDataStorage.getBool(saverTag);
            return !rlt;
        }
    }, {
        key: "isBgmOpen",
        value: function isBgmOpen(userId) {
            var saverTag = USER_BGM_SETTING_PREFIX + userId;
            var rlt = this._localDataStorage.getBool(saverTag);
            return !rlt;
        }
    }, {
        key: "setSoundState",
        value: function setSoundState(userId, newState) {
            var saverTag = USER_SOUND_SETTING_PREFIX + userId;
            this._localDataStorage.setBool(saverTag, !newState);
        }
    }, {
        key: "setBgmState",
        value: function setBgmState(userId, newState) {
            var saverTag = USER_BGM_SETTING_PREFIX + userId;
            this._localDataStorage.setBool(saverTag, !newState);
        }

        /**
         * 存储本地缓存勋章列表
         * @param userId
         * @param medalList
         */

    }, {
        key: "setPersistenceMedalList",
        value: function setPersistenceMedalList(userId, medalList) {
            var jsonStr = JSON.stringify(medalList);
            var saverTag = USER_PERSISTENCE_MEDAL_ID_PREFIX + userId;
            this._localDataStorage.setString(saverTag, jsonStr);
        }

        /**
         * 获取本地缓存勋章列表
         * @param userId
         * @returns {*}
         */

    }, {
        key: "getPersistenceMedalList",
        value: function getPersistenceMedalList(userId) {
            var saverTag = USER_PERSISTENCE_MEDAL_ID_PREFIX + userId;
            return this._localDataStorage.getString(saverTag);
        }

        /**
         * 存储适配iphoneX顶部关闭按钮的位置
         * @param userId
         * @param newPosition
         */

    }, {
        key: "setUserFitIphoneXTopButtonPosition",
        value: function setUserFitIphoneXTopButtonPosition(userId, newPosition) {
            var positionJson = {
                iphoneXPos: newPosition
            };
            var saverTag = USER_FIT_IPHONEX_TOP_BTN_POSITION_PREFIX + userId;
            this._localDataStorage.setString(saverTag, JSON.stringify(positionJson));
        }

        /**
         * 获取适配iphoneX顶部关闭按钮的位置
         * @param userId
         * @returns {*}
         */

    }, {
        key: "getUserFitIphoneXTopButtonPosition",
        value: function getUserFitIphoneXTopButtonPosition(userId) {
            var saverTag = USER_FIT_IPHONEX_TOP_BTN_POSITION_PREFIX + userId;
            return this._localDataStorage.getString(saverTag);
        }

        //end class LocalStorageMgr

    }]);

    return LocalStorageMgr;
}();

module.exports = LocalStorageMgr;

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
        //# sourceMappingURL=LocalStorageMgr.js.map
        