(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/View/Dialog/DisplayMedalDialog.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '70ed5RhEE5GYa65ixcbYBUd', 'DisplayMedalDialog', __filename);
// scripts/GameModule/Base/Module/View/Dialog/DisplayMedalDialog.js

"use strict";

var MedalDisplayConst = require('MedalDisplayConst');

var UI_Type = cc.Enum({
    Real: 0,
    Fake: 1
});

var Share_Type = cc.Enum({
    Download: 0,
    Friend: 1,
    TimeLine: 2,
    None: 3
});

cc.Class({
    extends: cc.Component,

    properties: {
        buttonSfx: cc.AudioClip,
        _listenerId: -1,
        _isAppInstallWechat: false,
        _shareType: Share_Type.None, //分享或炫耀的类型
        _isAllowClick: true
    },

    initWithData: function initWithData(medalId) {
        //from = 1 默认为用户中心
        var medalData = this._getMedalConstData(medalId);

        this._fitIphoneX();
        this._registerTouchEvent();
        this._bindClickListener();
        var platform = cc.sys.os;
        this._isAppInstallWechat = cc.ss.nativeUtil.isInstallWechat(platform);

        this.node.getChildByName("wechatBtn").active = this._isAppInstallWechat;
        this.node.getChildByName("friendlineBtn").active = this._isAppInstallWechat;

        this._initPicUIWithData(medalData);
        this._initFakePicUIWithData(medalData);
    },

    _bindClickListener: function _bindClickListener() {
        var _this = this;

        cc.find('wechatBtn', this.node).on('click', function (ev) {
            if (!_this._isAllowClick) return;
            _this._isAllowClick = false;
            _this._delayAllowUserClick();

            _this._playButtonSfx();
            _this._shareType = Share_Type.Friend;
            _this._captureDisplayMedalDialogImage();
        });

        cc.find('friendlineBtn', this.node).on('click', function (ev) {
            if (!_this._isAllowClick) return;
            _this._isAllowClick = false;
            _this._delayAllowUserClick();

            _this._playButtonSfx();
            _this._shareType = Share_Type.TimeLine;
            _this._captureDisplayMedalDialogImage();
        });

        cc.find('downloadBtn', this.node).on('click', function (ev) {
            if (!_this._isAllowClick) return;
            _this._isAllowClick = false;
            _this._delayAllowUserClick();

            _this._playButtonSfx();
            _this._shareType = Share_Type.Download;
            _this._captureDisplayMedalDialogImage();
        });

        cc.find('closeBtn', this.node).on('click', function (ev) {
            _this.node.destroy();
            _this._playButtonSfx();
        });
    },

    /**
     * 截图
     * @private
     */
    _captureDisplayMedalDialogImage: function _captureDisplayMedalDialogImage() {
        var _this2 = this;

        this._captureMedalImage(function (imagePath) {
            console.log("[DisplayMedalDialog]\u672C\u5730\u56FE\u7247\u5730\u5740:" + imagePath);
            var platform = cc.sys.os;
            if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
                _this2.node.destroy();
                cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_CLOSE_DISPLAY_MEDAL_DIALOG);
                return;
            }
            var path = _this2.node.getComponent('CaptureImageComponent').getNativeImagePathByPlatform(platform, imagePath);
            if (_this2._shareType === Share_Type.Download) {
                cc.ss.nativeUtil.capturePicAndSave(platform, path);
            } else if (_this2._shareType === Share_Type.Friend) {
                cc.ss.nativeUtil.shareWechatFriend(platform, path);
            } else if (_this2._shareType === Share_Type.TimeLine) {
                cc.ss.nativeUtil.shareTimeline(platform, path);
            }
        });
    },


    /**
     * 截图
     * @param callback
     * @private
     */
    _captureMedalImage: function _captureMedalImage(callback) {
        this.node.getComponent('CaptureImageComponent').captureImage(cc.ss.GlobalConst.IMAGE_CACHE_PATH, callback);
    },


    _initPicUIWithData: function _initPicUIWithData(data) {
        this._initDisplaySprite(UI_Type.Real, data);
        this._initHeadIconAndName(UI_Type.Real, data); //0表示真实UI
        this._initDisplayWordLabel(UI_Type.Real, data);
    },

    _initFakePicUIWithData: function _initFakePicUIWithData(data) {
        this._initDisplaySprite(UI_Type.Fake, data);
        this._initHeadIconAndName(UI_Type.Fake, data); //0表示真实UI
        this._initDisplayWordLabel(UI_Type.Fake, data);
    },

    _initDisplaySprite: function _initDisplaySprite(uiType, data) {
        var displaySprite = cc.find('picBg/displaySprite', this.node);
        if (uiType === UI_Type.Fake) displaySprite = cc.find('fakePicBg/displaySprite', this.node);

        displaySprite.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(data.Image_Path));
    },
    _initHeadIconAndName: function _initHeadIconAndName(uiType, data) {
        var nameLabel = cc.find("picBg/userInfoBg/nameBg/nameLabel", this.node);
        if (uiType === UI_Type.Fake) nameLabel = cc.find("fakePicBg/userInfoBg/nameBg/nameLabel", this.node);

        nameLabel.getComponent(cc.RichText).string = "<b>" + data.Medal_Noti + "</b>";
    },
    _initDisplayWordLabel: function _initDisplayWordLabel(uiType, data) {
        var contentLabel = cc.find('picBg/medalWordLabel', this.node);
        if (uiType === UI_Type.Fake) contentLabel = cc.find('fakePicBg/medalWordLabel', this.node);
        contentLabel.getComponent(cc.RichText).string = "<b>" + data.Medal_Share_Content + "</b>";
    },
    _playButtonSfx: function _playButtonSfx() {
        var isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);
        if (isSoundOpen) cc.ss.audioUtil.playSfx(this.buttonSfx);
    },
    _delayAllowUserClick: function _delayAllowUserClick() {
        var _this3 = this;

        setTimeout(function () {
            _this3._isAllowClick = true;
        }, 100);
    },


    /**
     * 获取勋章常量数据
     * @param medalId
     * @returns {*}
     * @private
     */
    _getMedalConstData: function _getMedalConstData(medalId) {
        for (var key in MedalDisplayConst) {
            if (MedalDisplayConst[key].Medal_Id === medalId) return MedalDisplayConst[key];
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
        //# sourceMappingURL=DisplayMedalDialog.js.map
        