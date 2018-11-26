(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/ReportPointUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'df90ag1GEpI8ISSj5EsJr/w', 'ReportPointUtil', __filename);
// scripts/Common/Tool/ReportPointUtil.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('GameConfig'),
    EnvConfig = _require.EnvConfig,
    Env_Config_Type = _require.Env_Config_Type;

var _require2 = require('RequestTaskFactory'),
    RequestTaskFactory = _require2.RequestTaskFactory,
    Task_Type = _require2.Task_Type;

var ReportPointUtil = function () {
    function ReportPointUtil() {
        _classCallCheck(this, ReportPointUtil);
    }

    _createClass(ReportPointUtil, [{
        key: 'reportGameStoreEnterLauncherShowEvent',


        /**
         * 进入游戏商城场景
         * @param isNewUser "is_new": Y: 是, N:否(是否是新用户)
         */
        value: function reportGameStoreEnterLauncherShowEvent() {
            var isNewUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            var userId = this.getReportUserId();
            var deviceId = this.getReportDeviceId();
            var appVersion = this.getReportAppVersion();
            var projectValue = "android-story";
            var platformType = cc.sys.os;
            var platform = "android";
            if (platformType === cc.sys.OS_ANDROID) {
                projectValue = "android-story";
                platform = "android";
            } else if (platformType === cc.sys.OS_IOS) {
                projectValue = "ios-story";
                platform = "ios";
            }

            var url = cc.ss.URLConst.getReportPointURL();
            var tz = Date.parse(new Date());

            var paramsValue = {
                uid: userId,
                app_version: appVersion,
                tz: tz
            }; //必传参数
            /**主要参数**/
            paramsValue.platform = platform; //平台ios android wx
            /**主要参数**/

            paramsValue = JSON.stringify(paramsValue);

            var param = {};
            param.page = "task_house";
            /**主要参数**/
            param.event = "show";
            /**主要参数**/
            param.isuv = "false";
            param.eventid = "";
            param.eventtime = tz;
            param.param = paramsValue;
            param.project = projectValue;
            param.source = "";
            param.userid = deviceId; //必传参数


            var array = new Array();
            array.push(param);
            var arrayStr = JSON.stringify(array);
            // console.log("----打点Json-->\n" + arrayStr);

            var task = RequestTaskFactory.createTask(Task_Type.Report, url, arrayStr, this._onReceiveGameStoreEnterLauncherShowEvent.bind(this));
            task.doPost();
        }
    }, {
        key: '_onReceiveGameStoreEnterLauncherShowEvent',
        value: function _onReceiveGameStoreEnterLauncherShowEvent(obj) {
            console.log("[ReportPointUtil]---上报点击进入小屋世界主界面回调--->" + JSON.stringify(obj));
        }

        /**
         *
         * 小屋 点位状态变化-->道具拖放事件打点
         * @param pointName [A1， A2， A3， B1， B2， B3， B4， B5， B6]
         * @param houseStatus [0=空值， 1=放入]
         *
         */

    }, {
        key: 'reportMineCraftItemChangeEvent',
        value: function reportMineCraftItemChangeEvent(pointName) {
            var houseStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            var userId = this.getReportUserId();
            var deviceId = this.getReportDeviceId();
            var appVersion = this.getReportAppVersion();
            var projectValue = "android-story";
            var platformType = cc.sys.os;
            var platform = "android";
            if (platformType === cc.sys.OS_ANDROID) {
                projectValue = "android-story";
                platform = "android";
            } else if (platformType === cc.sys.OS_IOS) {
                projectValue = "ios-story";
                platform = "ios";
            }

            var url = cc.ss.URLConst.getReportPointURL();
            var tz = Date.parse(new Date());

            var paramsValue = {
                uid: userId,
                app_version: appVersion,
                tz: tz
            }; //必传参数
            /**主要参数**/
            paramsValue.platform = platform; //平台ios android wx
            paramsValue.house_status = houseStatus; //必传参数
            paramsValue.point_name = pointName; //必传参数
            /**主要参数**/

            paramsValue = JSON.stringify(paramsValue);

            var param = {};
            param.page = "task_house";
            /**主要参数**/
            param.event = "change";
            /**主要参数**/
            param.isuv = "false";
            param.eventid = "";
            param.eventtime = tz;
            param.param = paramsValue;
            param.project = projectValue;
            param.source = "";
            param.userid = deviceId; //必传参数


            var array = new Array();
            array.push(param);
            var arrayStr = JSON.stringify(array);
            // console.log("----打点Json-->\n" + arrayStr);

            var task = RequestTaskFactory.createTask(Task_Type.Report, url, arrayStr, this._onReceiveMineCraftItemChangeEvent.bind(this));
            task.doPost();
        }
    }, {
        key: '_onReceiveMineCraftItemChangeEvent',
        value: function _onReceiveMineCraftItemChangeEvent(obj) {
            console.log("[ReportPointUtil]---上报世界道具切换变化回调--->" + JSON.stringify(obj));
        }

        /**
         * 小屋道具使用事件打点
         * @param itemName [蓝壁纸， 粉壁纸， 蓝点床单， 红格床单， 橙色窗帘， 紫色窗帘， 玩具琴， 足球， 小熊， 积木， 不倒翁， 警车，娃娃，挖掘机，篮球，兔子]
         * @param useItem [0=拖动摆放，1=点击摆放] ps:目前都是拖动摆放
         *
         */

    }, {
        key: 'reportMineCraftItemUseEvent',
        value: function reportMineCraftItemUseEvent(itemName) {
            var useItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            var userId = this.getReportUserId();
            var deviceId = this.getReportDeviceId();
            var appVersion = this.getReportAppVersion();
            var projectValue = "android-story";
            var platformType = cc.sys.os;
            var platform = "android";
            if (platformType === cc.sys.OS_ANDROID) {
                projectValue = "android-story";
                platform = "android";
            } else if (platformType === cc.sys.OS_IOS) {
                projectValue = "ios-story";
                platform = "ios";
            }

            var url = cc.ss.URLConst.getReportPointURL();
            var tz = Date.parse(new Date());

            var paramsValue = {
                uid: userId,
                app_version: appVersion,
                tz: tz
            }; //必传参数
            /**主要参数**/
            paramsValue.platform = platform; //平台ios android wx
            paramsValue.use_item = useItem; //必传参数
            paramsValue.item_name = itemName; //必传参数
            /**主要参数**/

            paramsValue = JSON.stringify(paramsValue);

            var param = {};
            param.page = "task_house";
            /**主要参数**/
            param.event = "item_use";
            /**主要参数**/
            param.isuv = "false";
            param.eventid = "";
            param.eventtime = tz;
            param.param = paramsValue;
            param.project = projectValue;
            param.source = "";
            param.userid = deviceId; //必传参数

            var array = new Array();
            array.push(param);
            var arrayStr = JSON.stringify(array);
            // console.log("----打点Json-->\n" + arrayStr);

            var task = RequestTaskFactory.createTask(Task_Type.Report, url, arrayStr, this._onReceiveMineCraftItemUseEvent.bind(this));
            task.doPost();
        }
    }, {
        key: '_onReceiveMineCraftItemUseEvent',
        value: function _onReceiveMineCraftItemUseEvent(obj) {
            console.log("[ReportPointUtil]---上报世界道具使用回调--->" + JSON.stringify(obj));
        }

        /**
         * 炫耀一下
         * {honor_name : 勋章名称,  “game_version” : “任务版本””，“num” : “星星数量”，“level”: “等级”， “is_lock”: “Y – 锁定， N – 未锁定”}
         * @param
         */

    }, {
        key: 'reportClickDisplayEvent',
        value: function reportClickDisplayEvent(medalId) {

            var userId = this.getReportUserId();
            var deviceId = this.getReportDeviceId();
            var appVersion = this.getReportAppVersion();
            var projectValue = "android-story";
            var platformType = cc.sys.os;
            var platform = "android";
            if (platformType === cc.sys.OS_ANDROID) {
                projectValue = "android-story";
                platform = "android";
            } else if (platformType === cc.sys.OS_IOS) {
                projectValue = "ios-story";
                platform = "ios";
            }

            var url = cc.ss.URLConst.getReportPointURL();
            var ts = Date.parse(new Date());
            var paramsValue = {
                uid: userId,
                app_version: appVersion,
                tz: ts
            }; //必传参数
            /**主要参数**/
            paramsValue.platform = platform; //平台ios android wx
            paramsValue.level = cc.ss.userInfoCache.userLevel;
            paramsValue.game_version = this._getGameVersion();
            paramsValue.medal_id = medalId;
            /**主要参数**/

            paramsValue = JSON.stringify(paramsValue);
            var param = {};
            param.page = "task_house";
            /**主要参数**/
            param.event = "share_trigger";
            /**主要参数**/
            param.isuv = "false";
            param.eventid = "";
            param.eventtime = ts;
            param.param = paramsValue;
            param.project = projectValue;
            param.source = "";
            param.userid = deviceId; //必传参数
            param.level = cc.ss.userInfoCache.userLevel;
            param.game_version = this._getGameVersion();
            param.medal_id = medalId;

            var array = new Array();
            array.push(param);
            var arrayStr = JSON.stringify(array);
            // console.log("----打点Json-->\n" + arrayStr);

            var task = RequestTaskFactory.createTask(Task_Type.Report, url, arrayStr, this._onReceiveClickDisplayEvent.bind(this));
            task.doPost();
        }
    }, {
        key: '_onReceiveClickDisplayEvent',
        value: function _onReceiveClickDisplayEvent(obj) {
            console.log("[ReportPointUtil]---上报打点炫耀一下勋章--->" + JSON.stringify(obj));
        }

        /**
         * 分享勋章
         * @param stageQuestionType
         * @param channelTypeString ["share_to": "定值：微信朋友/微信朋友圈/QQ/微博/保存图片"]
         *
         */

    }, {
        key: 'reportShareMedalEvent',
        value: function reportShareMedalEvent(channelTypeString) {

            var shareChannel = "";
            if (channelTypeString === cc.ss.GlobalConst.SHARE_APP_TYPE.TYPE_FRIENDS) {
                shareChannel = "微信朋友";
            } else if (channelTypeString === cc.ss.GlobalConst.SHARE_APP_TYPE.TYPE_TIMELINE) {
                shareChannel = "微信朋友圈";
            } else if (channelTypeString === cc.ss.GlobalConst.SHARE_APP_TYPE.TYPE_SAVEPICTURE) {
                shareChannel = "保存图片";
            }

            var userId = this.getReportUserId();
            var deviceId = this.getReportDeviceId();
            var appVersion = this.getReportAppVersion();
            var projectValue = "android-story";
            var platformType = cc.sys.os;
            var platform = "android";
            if (platformType === cc.sys.OS_ANDROID) {
                projectValue = "android-story";
                platform = "android";
            } else if (platformType === cc.sys.OS_IOS) {
                projectValue = "ios-story";
                platform = "ios";
            }

            var url = cc.ss.URLConst.getReportPointURL();
            var ts = Date.parse(new Date());

            var paramsValue = {
                uid: userId,
                app_version: appVersion,
                tz: ts
            }; //必传参数
            /**主要参数**/
            paramsValue.platform = platform; //平台ios android wx
            paramsValue.share_to = shareChannel;
            /**主要参数**/

            paramsValue = JSON.stringify(paramsValue);

            var param = {};
            param.page = "task_house";
            /**主要参数**/
            param.event = "share_channel";
            /**主要参数**/
            param.isuv = "false";
            param.eventid = "";
            param.eventtime = ts;
            param.param = paramsValue;
            param.project = projectValue;
            param.source = "";
            param.userid = deviceId; //必传参数


            var array = new Array();
            array.push(param);
            var arrayStr = JSON.stringify(array);
            // console.log("----打点Json-->\n" + arrayStr);

            var task = RequestTaskFactory.createTask(Task_Type.Report, url, arrayStr, this._onReceiveShareMedalEvent.bind(this));
            task.doPost();
        }
    }, {
        key: '_onReceiveShareMedalEvent',
        value: function _onReceiveShareMedalEvent(obj) {
            console.log("[ReportPointUtil]---上报打点分享勋章--->" + JSON.stringify(obj));
        }
    }, {
        key: '_getGameVersion',
        value: function _getGameVersion() {
            var gameVersion = "1.0.0";

            var envMode = EnvConfig.EnvMode;
            if (envMode === Env_Config_Type.Env_Config_Type_Test) {
                gameVersion = cc.sys.localStorage.getItem("debug_ksPoetryLocalVersion");
            } else if (envMode === Env_Config_Type.Env_Config_Type_Gamma) {
                gameVersion = cc.sys.localStorage.getItem("gamma_ksPoetryLocalVersion");
            } else if (envMode === Env_Config_Type.Env_Config_Type_Release) {
                gameVersion = cc.sys.localStorage.getItem("release_ksPoetryLocalVersion");
            } else if (envMode === Env_Config_Type.Env_Config_Type_Dev) {
                gameVersion = cc.sys.localStorage.getItem("dev_ksPoetryLocalVersion");
            }

            if (gameVersion === null || gameVersion === undefined) return "1.0.0";
            return gameVersion;
        }
    }, {
        key: 'getReportDeviceId',
        value: function getReportDeviceId() {
            var dId = cc.ss.userInfoCache.deviceId;
            if (dId === null || dId === undefined || dId === "") return "";
            return dId;
        }
    }, {
        key: 'getReportUserId',
        value: function getReportUserId() {
            var uId = cc.ss.userInfoCache.userId;
            if (uId === null || uId === undefined || uId === "") return "";
            return uId;
        }
    }, {
        key: 'getReportAppVersion',
        value: function getReportAppVersion() {
            var ver = cc.ss.userInfoCache.appVersion;
            if (ver === null || ver === undefined || ver === "") return "";
            return ver;
        }
    }]);

    return ReportPointUtil;
}();

module.exports = ReportPointUtil;

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
        //# sourceMappingURL=ReportPointUtil.js.map
        