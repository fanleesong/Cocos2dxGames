(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/View/Dialog/MedalDialog.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8a752ZDxLhEw4VaWc4AnF1Z', 'MedalDialog', __filename);
// scripts/GameModule/Base/Module/View/Dialog/MedalDialog.js

'use strict';

var MedalDialogConst = require('MedalDialogConst');
var DialogMgr = require('DialogMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        getMedalSfx: cc.AudioClip,
        buttonSfx: cc.AudioClip,
        _listenerId: -1,
        _closeBtnClickCall: null,
        _medalId: -1
    },

    initWithData: function initWithData(medalId) {
        var isGetMedal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this._medalId = medalId;
        this._fitIphoneX();
        this._registerTouchEvent();
        this._bindClickEvent();

        var medalConstData = this._getMedalData(medalId);
        if (!medalConstData) return;

        this._initMedalLogo(isGetMedal, medalConstData);
        this._initMedalContentLabel(isGetMedal, medalConstData);
        this._initMedalLabel(isGetMedal, medalConstData);

        if (!isGetMedal) this.node.getChildByName('displayBtn').active = false;

        if (isGetMedal) {
            this._showParticle();
            if (cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId)) cc.ss.audioUtil.playSfx(this.getMedalSfx);
        }
    },
    _bindClickEvent: function _bindClickEvent() {
        var _this = this;

        var closeBtn = this.node.getChildByName('closeBtn');
        closeBtn.on('click', function (ev) {
            _this._playButtonSfx();
            _this.node.destroy();
            if (_this._closeBtnClickCall) _this._closeBtnClickCall();
        });

        var displayBtn = this.node.getChildByName('displayBtn');
        displayBtn.on('click', function (ev) {
            _this._playButtonSfx();
            _this.node.destroy();
            // 于2018年11月20添加打点
            cc.ss.reportPointUtil.reportClickDisplayEvent(_this._medalId);

            DialogMgr.showDisplayMedalDialog(cc.find('Canvas'), _this._medalId);
        });
    },
    _initMedalLogo: function _initMedalLogo(isGetMedal, medalConstData) {
        cc.find('getMedalNode', this.node).active = isGetMedal;
        cc.find('unGetMedalNode', this.node).active = !isGetMedal;

        if (isGetMedal) {
            cc.find('getMedalNode/getMedalLogo', this.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(medalConstData.Get_Image_Path));
        } else {
            cc.find('unGetMedalNode/unGetMedalLogo', this.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(medalConstData.UnGet_Image_Path));
        }
    },
    _initMedalLabel: function _initMedalLabel(isGetMedal, medalConstData) {
        cc.find('getMedalTitleSprite', this.node).active = isGetMedal;
        cc.find('unGetMedalTitleSprite', this.node).active = !isGetMedal;

        if (isGetMedal) {
            cc.find('getMedalTitleSprite/medalTitleLabel', this.node).getComponent(cc.Label).string = medalConstData.Medal_Title;
            cc.find('getMedalTitleSprite/juebanSprite', this.node).active = medalConstData.isVanish;
        } else {
            cc.find('unGetMedalTitleSprite/medalTitleLabel', this.node).getComponent(cc.Label).string = medalConstData.Medal_Title;
        }
    },
    _initMedalContentLabel: function _initMedalContentLabel(isGetMedal, medalConstData) {
        this.node.getChildByName('notiLabel').getComponent(cc.Label).string = isGetMedal ? medalConstData.Medal_Noti_Get : medalConstData.Medal_Noti_UnGet;
    },
    _getMedalData: function _getMedalData(medalId) {
        for (var key in MedalDialogConst) {
            var data = MedalDialogConst[key];
            if (data.Medal_Id === medalId) return data;
        }
        return null;
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
    },

    _showParticle: function _showParticle() {
        this.node.getChildByName("starParticle").active = true;
        this.node.getChildByName("starParticle").getComponent(cc.ParticleSystem).playOnLoad = true;
    },
    _playButtonSfx: function _playButtonSfx() {
        var isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);
        if (isSoundOpen) cc.ss.audioUtil.playSfx(this.buttonSfx);
    },


    _fitIphoneX: function _fitIphoneX() {
        var isIphoneX = cc.ss.uiUtil.isIphoneXsOrAllScreen();
        if (isIphoneX === true) {
            var newPositionJson = cc.ss.localStorage.getUserFitIphoneXTopButtonPosition(cc.ss.userInfoCache.userId);
            if (newPositionJson !== null && newPositionJson !== undefined && newPositionJson !== "") {
                var closeBtn = cc.find('closeBtn', this.node);
                var posJson = JSON.parse(newPositionJson);
                closeBtn.setPosition(posJson.iphoneXPos);
            }
        }
    },

    setClickCloseDialogCallback: function setClickCloseDialogCallback(callback) {
        this._closeBtnClickCall = callback;
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
        //# sourceMappingURL=MedalDialog.js.map
        