"use strict";
cc._RF.push(module, '6cae40R0WVKWKlUhsLR0Nns', 'LauncherProxy');
// scripts/GameModule/Launcher/Module/Model/LauncherProxy.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Proxy = require('Proxy');

var _require = require('RequestTaskFactory'),
    RequestTaskFactory = _require.RequestTaskFactory,
    Task_Type = _require.Task_Type;

var LauncherProxy = function (_Proxy) {
    _inherits(LauncherProxy, _Proxy);

    function LauncherProxy() {
        _classCallCheck(this, LauncherProxy);

        var _this = _possibleConstructorReturn(this, (LauncherProxy.__proto__ || Object.getPrototypeOf(LauncherProxy)).call(this));

        _this._cacheRecoverLifeSeconds = 0;
        _this._cacheHpNum = 0;
        return _this;
    }

    _createClass(LauncherProxy, [{
        key: 'getProxyName',
        value: function getProxyName() {
            return cc.ss.NameConst.NAME_PROXY_LAUNCHER;
        }

        /**
         * 请求初始化信息
         * @param userId
         */

    }, {
        key: 'requestGameInitializeInfo',
        value: function requestGameInitializeInfo(userId) {
            this._requestUserInfo(userId);
        }

        /**
         * 请求用户信息
         * @param userId 用户id
         */

    }, {
        key: '_requestUserInfo',
        value: function _requestUserInfo(userId) {
            var task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getUserInfoURL(), {}, this._onResponseUserInfo.bind(this));
            task.doGet();
        }

        /**
         * 用户信息Response
         * @param data
         * @private
         */

    }, {
        key: '_onResponseUserInfo',
        value: function _onResponseUserInfo(data) {
            var infoCode = data.infoCode;
            if (infoCode === 0) {
                var obj = JSON.parse(data.data);
                if (obj.errcode === 0) {

                    var userInfo = obj.result.user;
                    console.log('' + JSON.stringify(userInfo));
                    cc.ss.userInfoCache.userLevel = userInfo.level;
                    cc.ss.userInfoCache.userStarNum = userInfo.starCount;

                    this._cacheRecoverLifeSeconds = obj.result.recoverHpSecond;

                    this._sendLoadingProgressNotification(0.1);

                    this._requestUserLife(); //请求用户体力值
                } else {
                    this._sendShowErrorDialogNotification();
                }
            } else {
                this._sendShowErrorDialogNotification();
            }
        }
    }, {
        key: '_requestUserLife',
        value: function _requestUserLife() {
            var task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getLifeURL(), {}, this._onResponseUserLifeInfo.bind(this));
            task.doGet();
        }
    }, {
        key: '_onResponseUserLifeInfo',
        value: function _onResponseUserLifeInfo(data) {
            var infoCode = data.infoCode;
            if (infoCode === 0) {
                var obj = JSON.parse(data.data);
                if (obj.errcode === 0) {

                    this._cacheHpNum = obj.result.hp;
                    var rlt = {};
                    rlt.recoverLifeSeconds = this._cacheRecoverLifeSeconds;
                    rlt.hp = this._cacheHpNum;
                    this._sendLoadingProgressNotification(0.1);
                    cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LAUNCHER_GAME_INITIALIZE_INFO_COMPLETE, rlt);
                } else {
                    this._sendShowErrorDialogNotification();
                }
            } else {
                this._sendShowErrorDialogNotification();
            }
        }

        /**
         * 请求商品推荐列表
         * @private
         */

    }, {
        key: '_requestProductRecommendList',
        value: function _requestProductRecommendList() {

            var task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getProductRecommendURL(), {}, this._onResponseProductRecommendList.bind(this));
            task.doGet();
        }
    }, {
        key: '_onResponseProductRecommendList',
        value: function _onResponseProductRecommendList(data) {

            var infoCode = data.infoCode;
            if (infoCode === 0) {
                var obj = JSON.parse(data.data);
                if (obj.errcode === 0) {} else {
                    this._sendShowErrorDialogNotification();
                }
            } else {
                this._sendShowErrorDialogNotification();
            }
        }

        /**
         * 发送显示网络对话框
         * @private
         */

    }, {
        key: '_sendShowErrorDialogNotification',
        value: function _sendShowErrorDialogNotification() {
            var errRlt = {
                proxyType: cc.ss.GlobalConst.PROXY_LAUNCHER_CONTROLLER,
                errorType: cc.ss.ErrorConst.NET_ERROR_LAUNCHER_LOGIN
            };
            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_SHOW_NET_ERROR_DIALOG, errRlt);
        }
    }, {
        key: '_sendLoadingProgressNotification',
        value: function _sendLoadingProgressNotification(value) {
            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LAUNCHER_LOADING_PROGRESS, value);
        }
    }]);

    return LauncherProxy;
}(Proxy); //end class

module.exports = LauncherProxy;

cc._RF.pop();