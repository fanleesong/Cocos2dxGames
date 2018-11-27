(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Mgr/LifeSystem/LifeSystemMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ec11eCygP1KGqdKW/Weq5Ty', 'LifeSystemMgr', __filename);
// scripts/Common/Mgr/LifeSystem/LifeSystemMgr.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LifeCountDown = require('LifeCountDown');
var Max_Life_Num = 5; //最大生命

var _require = require('RequestTaskFactory'),
    RequestTaskFactory = _require.RequestTaskFactory,
    Task_Type = _require.Task_Type;

/**
 * 生命系统管理器
 * 通知
 *      1.倒计时时间
 *      2.开始倒计时
 *      3.结束倒计时
 *      4.增加生命
 *      5.消耗生命
 */


var LifeSystemMgr = function () {
    function LifeSystemMgr() {
        _classCallCheck(this, LifeSystemMgr);

        this._lifeCountDownInst = new LifeCountDown();
        this._lifeNum = 0;
        this._isStartup = false;
    }

    /**
     * 初始化
     * @param userId
     * @param lifeNum
     * @param maxCountDownSecs
     */


    _createClass(LifeSystemMgr, [{
        key: 'lazyInit',
        value: function lazyInit(userId, lifeNum, maxCountDownSecs) {
            this._lifeNum = lifeNum;

            this._lifeCountDownInst.lazyInit(maxCountDownSecs);
            this._lifeCountDownInst.setCountDownTimeCallback(function (secs) {

                cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_COUNT_DOWN_TIME, secs);
            });

            this._lifeCountDownInst.setCountDownOneRoundCompleteCallback(this._onCountDownOneRoundCompleteCallback.bind(this));
        }
    }, {
        key: 'startUp',
        value: function startUp() {
            if (!this._isStartup) this._isStartup = true;

            if (this._lifeNum !== Max_Life_Num) this._startCountDown();
        }

        /**
         * 进入后台
         */

    }, {
        key: 'enterBackground',
        value: function enterBackground() {
            console.log('[LifeSystemMgr]\u5012\u8BA1\u65F6\u5668\u63A5\u6536\u5230\u5230\u8FDB\u5165\u540E\u53F0\u4FE1\u606F');
            this._pauseCountDown();
        }

        /**
         * 进入前台
         */

    }, {
        key: 'enterForeground',
        value: function enterForeground() {
            console.log('[LifeSystemMgr]\u5012\u8BA1\u65F6\u5668\u63A5\u6536\u5230\u5230\u8FDB\u5165\u524D\u53F0\u4FE1\u606F');
            this._resumeCountDown();
        }
    }, {
        key: 'getLife',
        value: function getLife() {
            return this._lifeNum;
        }

        /**
         * 倒计时一个循环回调
         * @private
         */

    }, {
        key: '_onCountDownOneRoundCompleteCallback',
        value: function _onCountDownOneRoundCompleteCallback() {
            this._pauseCountDown();
            this._reportCountDownTime(); //请求服务器获取最新体力值是否匹配
        }

        /**
         *恢复全部体力
         */

    }, {
        key: 'recoverAllLife',
        value: function recoverAllLife() {
            this._lifeNum = Max_Life_Num;
            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE, this._lifeNum);

            this._stopCountDown();
        }

        /**
         * 更新体力值
         * @param lifeNum
         */

    }, {
        key: 'updateLife',
        value: function updateLife(lifeNum) {
            this._lifeNum = parseInt(lifeNum);
            if (this._lifeNum < Max_Life_Num) this._startCountDown();

            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE, this._lifeNum);
        }

        /**
         * 是否停止倒计时,如果放回true，则在每个场景中不显示倒计时
         */

    }, {
        key: 'isCountingDown',
        value: function isCountingDown() {
            return this._lifeCountDownInst.isWorking();
        }

        /**
         * 上报倒计时完成
         * @private
         */

    }, {
        key: '_reportCountDownTime',
        value: function _reportCountDownTime() {
            var task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getLifeURL(), {}, this._onResponseCountDownTime.bind(this));
            task.doGet();
        }

        /**
         * 响应倒计时完成回执
         * @private
         */

    }, {
        key: '_onResponseCountDownTime',
        value: function _onResponseCountDownTime(data) {
            var _this = this;

            var infoCode = data.infoCode;
            if (infoCode === 0) {
                var obj = JSON.parse(data.data);
                if (obj.errcode === 0) {
                    var hp = parseInt(obj.result.hp);
                    console.log('[LifeSystemMgr]serverHp:' + hp + ' | localHp : ' + this._lifeNum);

                    setTimeout(function () {
                        _this._lifeNum = hp;
                        _this._lifeNum = _this._lifeNum >= Max_Life_Num ? Max_Life_Num : _this._lifeNum;
                        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE);

                        if (_this._lifeNum === Max_Life_Num) _this._stopCountDown();else _this._resumeCountDown();
                    }, 1000);
                } else {
                    setTimeout(function () {
                        _this._resumeCountDown();
                    }, 1000);
                }
            } else {
                setTimeout(function () {
                    _this._resumeCountDown();
                }, 1000);
            }
        }
    }, {
        key: '_startCountDown',
        value: function _startCountDown() {
            this._lifeCountDownInst.start();
            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_START_COUNT_DOWN);
        }
    }, {
        key: '_stopCountDown',
        value: function _stopCountDown() {
            this._lifeCountDownInst.stop();
            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN);
        }
    }, {
        key: '_pauseCountDown',
        value: function _pauseCountDown() {
            this._lifeCountDownInst.pasue();
        }
    }, {
        key: '_resumeCountDown',
        value: function _resumeCountDown() {
            this._lifeCountDownInst.resume();
        }

        /**
         * 获取当前当前倒计时秒数
         * @returns {*}
         */

    }, {
        key: 'getNowCountDownSecs',
        value: function getNowCountDownSecs() {
            return this._lifeCountDownInst.getCurrentCountDownSecs();
        }
    }]);

    return LifeSystemMgr;
}(); //end class

module.exports = LifeSystemMgr;

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
        //# sourceMappingURL=LifeSystemMgr.js.map
        