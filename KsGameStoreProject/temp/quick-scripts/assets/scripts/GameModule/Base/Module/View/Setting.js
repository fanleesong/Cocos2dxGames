(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/View/Setting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7f46e3Ix2ZIA602f42S3rRF', 'Setting', __filename);
// scripts/GameModule/Base/Module/View/Setting.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        buttonSfx: cc.AudioClip,
        _listenerId: -1,
        _currentBgmCircleState: 0,
        _currentSoundCircleState: 0,

        bgmOpenPoint: cc.p(0, 0),
        bgmClosePoint: cc.p(0, 0),
        sfxOpenPoint: cc.p(0, 0),
        sfxClosePoint: cc.p(0, 0)
    },

    onLoad: function onLoad() {
        var _this = this;

        this._registerTouchEvent();
        this._initBtnPosition();

        var closeBtn = cc.find('layout/closeBtn', this.node);
        var bgmBtn = cc.find('layout/bgmBtn', this.node);
        var soundBtn = cc.find('layout/soundBtn', this.node);

        closeBtn.on('click', function (ev) {
            var isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);
            if (isSoundOpen) cc.ss.audioUtil.playSfx(_this.buttonSfx);

            var layoutNode = cc.find('layout', _this.node);
            layoutNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.1, 0.1), cc.callFunc(function () {
                _this.node.destroy();
            })));
        });

        bgmBtn.on('click', function (ev) {
            var targetPos = cc.p(0, 0);

            if (_this._currentBgmCircleState === 0) {
                // 关闭 --> 开启
                _this._currentBgmCircleState = 1;
                _this._openBgm();

                targetPos.x = _this.bgmOpenPoint.x;
                targetPos.y = _this.bgmOpenPoint.y;
            } else {
                //开启 --> 关闭
                _this._currentBgmCircleState = 0;
                _this._closeBgm();

                targetPos.x = _this.bgmClosePoint.x;
                targetPos.y = _this.bgmClosePoint.y;
            }

            bgmBtn.runAction(cc.moveTo(0.09, targetPos));
        });

        soundBtn.on('click', function (ev) {
            var targetPos = cc.p(0, 0);

            if (_this._currentSoundCircleState === 0) {
                // 关闭 --> 开启
                _this._currentSoundCircleState = 1;
                _this._openSound();

                targetPos.x = _this.sfxOpenPoint.x;
                targetPos.y = _this.sfxOpenPoint.y;
            } else {
                //开启 --> 关闭
                _this._currentSoundCircleState = 0;
                _this._closeSound();

                targetPos.x = _this.sfxClosePoint.x;
                targetPos.y = _this.sfxClosePoint.y;
            }

            soundBtn.runAction(cc.moveTo(0.09, targetPos));
        });

        var layoutNode = cc.find('layout', this.node);
        layoutNode.setScale(0.1);
        layoutNode.runAction(cc.EaseBounceOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
    },

    _openBgm: function _openBgm() {
        var userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setBgmState(userId, true);

        cc.ss.audioUtil.resumeBgm();
    },

    _closeBgm: function _closeBgm() {
        var userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setBgmState(userId, false);

        cc.ss.audioUtil.pauseBgm();
    },

    _openSound: function _openSound() {
        console.log("[Setting]开启sound");
        var userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setSoundState(userId, true);

        cc.ss.audioUtil.playSfx(this.buttonSfx);
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_SETTING_OPEN_SFX); //发送开启音效的通知
    },

    _closeSound: function _closeSound() {
        console.log("[Setting]关闭sound");
        var userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setSoundState(userId, false);
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_SETTING_CLOSE_SFX); //发送关闭音效的通知
    },

    _initBtnPosition: function _initBtnPosition() {
        var bgmBtn = cc.find('layout/bgmBtn', this.node);
        var soundBtn = cc.find('layout/soundBtn', this.node);

        var userId = cc.ss.userInfoCache.userId;
        var isBgmOpen = cc.ss.localStorage.isBgmOpen(userId);
        var isSoundOpen = cc.ss.localStorage.isSoundOpen(userId);

        if (isBgmOpen) {
            this._currentBgmCircleState = 1;
            bgmBtn.x = this.bgmOpenPoint.x;
            bgmBtn.y = this.bgmOpenPoint.y;
        } else {
            this._currentBgmCircleState = 0;
            bgmBtn.x = this.bgmClosePoint.x;
            bgmBtn.y = this.bgmClosePoint.y;
        }
        if (isSoundOpen) {
            soundBtn.x = this.sfxOpenPoint.x;
            soundBtn.y = this.sfxOpenPoint.y;

            this._currentSoundCircleState = 1;
        } else {
            this._currentSoundCircleState = 0;
            soundBtn.x = this.sfxClosePoint.x;
            soundBtn.y = this.sfxClosePoint.y;
        }
    },


    _registerTouchEvent: function _registerTouchEvent() {
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function onTouchBegan(touches, event) {
                return true;
            },
            onTouchMoved: function onTouchMoved(event) {},
            onTouchEnded: function onTouchEnded(event) {}
        };
        this._listenerId = cc.eventManager.addListener(listener, this.node);
    },

    onDestroy: function onDestroy() {
        cc.eventManager.removeListener(this._listenerId);
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
        //# sourceMappingURL=Setting.js.map
        