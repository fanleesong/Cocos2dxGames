"use strict";
cc._RF.push(module, 'fb858skCEhGjr1YblIxgg6d', 'LifeCountDown');
// scripts/Common/Mgr/LifeSystem/LifeCountDown.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 生命倒计时工具
 */

var Working_State = cc.Enum({
    Running: 0,
    Stopped: 1,
    Pause: 2, // 暂停中
    Invalid: 3
});

var COUNT_DOWN_PER_SEC = 1000;

var LifeCountDown = function () {
    function LifeCountDown() {
        _classCallCheck(this, LifeCountDown);

        this._countDownTimeCallback = null;
        this._countDownOneRoundCompleteCallback = null;

        this._maxSecs = 0;
        this._countDownTimer = 0;
        this._workingState = Working_State.Invalid;
    }

    /**
     * 倒计时回调
     * @param call
     */


    _createClass(LifeCountDown, [{
        key: 'setCountDownTimeCallback',
        value: function setCountDownTimeCallback(call) {
            this._countDownTimeCallback = call;
        }

        /**
         * 倒计时一轮循环后的回调
         * @param call
         */

    }, {
        key: 'setCountDownOneRoundCompleteCallback',
        value: function setCountDownOneRoundCompleteCallback(call) {
            this._countDownOneRoundCompleteCallback = call;
        }

        /**
         * 通知倒计时时间
         * @param secs
         * @private
         */

    }, {
        key: '_notifyCountDownTime',
        value: function _notifyCountDownTime(secs) {
            if (this._countDownTimeCallback) this._countDownTimeCallback(secs);
        }

        /**
         * 初始化
         * @param maxSecs 最大倒计时秒数
         */

    }, {
        key: 'lazyInit',
        value: function lazyInit(maxSecs) {
            this._maxSecs = maxSecs;
            this._countDownTimer = maxSecs;

            this._runLoop(); //开始倒计时服务器
        }
    }, {
        key: '_runLoop',
        value: function _runLoop() {
            var _this = this;

            setInterval(function () {
                if (_this._workingState === Working_State.Pause) {
                    console.log('暂停状态');
                }
                if (_this._workingState !== Working_State.Running) return; //停止状态中

                var timer = _this._countDownTimer;
                timer -= COUNT_DOWN_PER_SEC;
                _this._notifyCountDownTime(timer);

                //完成一个倒计时循环
                if (timer <= 0) {
                    timer = _this._maxSecs;
                    if (_this._countDownOneRoundCompleteCallback) _this._countDownOneRoundCompleteCallback();
                }
                _this._countDownTimer = timer;
            }, COUNT_DOWN_PER_SEC);
        }
    }, {
        key: 'start',
        value: function start() {
            if (this._workingState === Working_State.Running || this._workingState === Working_State.Pause) return;
            this._workingState = Working_State.Running;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._workingState = Working_State.Stopped;
            this._countDownTimer = this._maxSecs;
        }
    }, {
        key: 'getCurrentCountDownSecs',
        value: function getCurrentCountDownSecs() {
            return this._countDownTimer;
        }
    }, {
        key: 'isWorking',
        value: function isWorking() {
            return this._workingState === Working_State.Running || this._workingState === Working_State.Pause;
        }
    }, {
        key: 'pasue',
        value: function pasue() {
            if (this._workingState === Working_State.Running) this._workingState = Working_State.Pause;
        }
    }, {
        key: 'resume',
        value: function resume() {
            if (this._workingState === Working_State.Pause) this._workingState = Working_State.Running;
        }
    }]);

    return LifeCountDown;
}(); //end class

module.exports = LifeCountDown;

cc._RF.pop();