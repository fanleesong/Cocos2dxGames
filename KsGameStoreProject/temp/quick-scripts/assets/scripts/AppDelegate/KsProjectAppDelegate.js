(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/AppDelegate/KsProjectAppDelegate.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '18e438bVjVKcqYf0ShcA/A3', 'KsProjectAppDelegate', __filename);
// scripts/AppDelegate/KsProjectAppDelegate.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Facade = require("Facade");
var UIUtil = require('UIUtil');
var AudioUtil = require('AudioUtil');
var DateUtil = require('DateUtil');
var ReportPointUtil = require("ReportPointUtil");
var UserInfoCacheMgr = require('UserInfoCacheMgr');

var LocalStorageMgr = require('LocalStorageMgr');
var LifeSystemMgr = require('LifeSystemMgr');
var SystemMgr = require('SystemMgr');
var LauncherProxy = require('LauncherProxy');

/**
 * 代理入口类
 */

var KsProjectAppDelegate = function () {
    function KsProjectAppDelegate() {
        _classCallCheck(this, KsProjectAppDelegate);
    }

    _createClass(KsProjectAppDelegate, [{
        key: 'setupApplication',
        value: function setupApplication() {
            this._initializeVariables();
            this._initializeProxy();
        }
    }, {
        key: 'loadNativeInfo',
        value: function loadNativeInfo() {
            var userId = cc.sys.localStorage.getItem("nativeUserId");
            var userName = cc.sys.localStorage.getItem("nativeUserName");
            var userPickerURL = cc.sys.localStorage.getItem("nativeUserPickerURL");
            var httpRequestToken = cc.sys.localStorage.getItem("nativeHttpRequestToken");
            var deviceId = cc.sys.localStorage.getItem("nativeDeviceId");
            var appVersion = cc.sys.localStorage.getItem("nativeAppVersion");

            //石龙于2018-5-25添加获取用户进入界面选择
            var appEnterSceneType = cc.sys.localStorage.getItem("nativeAppEnterKsTaskSceneType");
            appEnterSceneType = parseInt(appEnterSceneType);
            console.log("[KSProjectAppDelegate]native -> appEnterSceneType:", appEnterSceneType);
            console.log("[KSProjectAppDelegate]native -> appVersion:", appVersion);
            console.log("[KSProjectAppDelegate]native -> userId:", userId);
            console.log("[KSProjectAppDelegate]native -> userName:", userName);
            console.log("[KSProjectAppDelegate]native -> userPickerURL:", userPickerURL);
            console.log("[KSProjectAppDelegate]native -> httpRequestToken:", httpRequestToken);
            console.log("[KSProjectAppDelegate]native -> deviceId:", deviceId);

            cc.ss.userInfoCache.enterGameSceneType = appEnterSceneType;
            cc.ss.userInfoCache.userId = userId;
            cc.ss.userInfoCache.userName = userName;
            cc.ss.userInfoCache.headIconURL = userPickerURL;
            cc.ss.userInfoCache.deviceId = deviceId;
            cc.ss.userInfoCache.appVersion = appVersion;
            cc.ss.httpRequestToken = httpRequestToken;
        }
    }, {
        key: '_initializeVariables',
        value: function _initializeVariables() {
            cc.ss = {}; //使用cc.ss作为本项目的namespace
            cc.ss.httpRequestToken = "";

            // //SimpleMvc 封装
            cc.ss.Facade = Facade.getFacade(); //SimpleMvc - Facade类

            //工具类
            cc.ss.uiUtil = new UIUtil();
            cc.ss.audioUtil = new AudioUtil(); //声音工具
            cc.ss.dateUtil = new DateUtil(); //日期工具
            cc.ss.localStorage = new LocalStorageMgr(); //本地缓存
            cc.ss.nativeUtil = require('NativeMgr'); //Native工具类
            cc.ss.reportPointUtil = new ReportPointUtil(); //打点
            cc.ss.stringUtil = require('StringUtil'); //字符串工具类


            //Mgr类
            cc.ss.userInfoCache = new UserInfoCacheMgr();
            cc.ss.localStorage = new LocalStorageMgr(); //本地缓存
            cc.ss.lifeSystemMgr = new LifeSystemMgr(); //体力Mgr
            cc.ss.systemMgr = new SystemMgr(); //系统工具


            //Const
            //常量类
            cc.ss.URLConst = require("URLConst"); //声明URL常量
            cc.ss.NameConst = require("NameConst"); //声明名字常量
            cc.ss.TagConst = require("TagConst"); // tag常量
            cc.ss.ErrorConst = require("ErrorConst"); //Error常量
            cc.ss.GlobalConst = require('GlobalConst'); //Global常量
        }
    }, {
        key: '_initializeProxy',
        value: function _initializeProxy() {
            cc.ss.Facade.registerProxy(new LauncherProxy());
        }
    }]);

    return KsProjectAppDelegate;
}(); //end class


module.exports = KsProjectAppDelegate;

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
        //# sourceMappingURL=KsProjectAppDelegate.js.map
        