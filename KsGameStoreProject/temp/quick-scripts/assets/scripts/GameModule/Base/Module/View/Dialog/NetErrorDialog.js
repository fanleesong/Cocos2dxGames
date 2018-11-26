(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/View/Dialog/NetErrorDialog.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7b67bUGqyxF66YlSlcQ7myj', 'NetErrorDialog', __filename);
// scripts/GameModule/Base/Module/View/Dialog/NetErrorDialog.js

"use strict";

/**
 */
cc.Class({
    extends: cc.Component,

    properties: {
        btnClickSfx: cc.AudioClip,
        _isSoundOpen: false,
        _retryCallback: null,
        _exitCallback: null,
        _listenerId: -1
    },

    onLoad: function onLoad() {
        this._registerTouchEvent();
    },

    initWithData: function initWithData() {
        var alertType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON;
        var retryCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var exitCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


        this._retryCallback = retryCallback;
        this._exitCallback = exitCallback;

        this._isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);

        if (alertType === cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON) {

            var retryBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/retryBtn");
            var exitBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/exitBtn");
            retryBtn.active = true;
            exitBtn.active = true;
            cc.ss.uiUtil.addClickEvent(retryBtn, this.node, "NetErrorDialog", "_clickRetryEvent");
            cc.ss.uiUtil.addClickEvent(exitBtn, this.node, "NetErrorDialog", "_clickExitEvent");
        } else if (alertType === cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_RETRY) {

            var _retryBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/retryBtn");
            _retryBtn.active = true;
            _retryBtn.setPositionX(this.node.getPositionX());
            cc.ss.uiUtil.addClickEvent(_retryBtn, this.node, "NetErrorDialog", "_clickRetryEvent");
            cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/exitBtn").getComponent(cc.Button).interactable = false;
        } else if (alertType === cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_EXIT) {

            var _exitBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/exitBtn");
            _exitBtn.active = true;
            _exitBtn.setPositionX(this.node.getPositionX());
            cc.ss.uiUtil.addClickEvent(_exitBtn, this.node, "NetErrorDialog", "_clickExitEvent");
            cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/retryBtn").getComponent(cc.Button).interactable = false;
        }
    },

    _clickRetryEvent: function _clickRetryEvent() {

        if (this._isSoundOpen === true) cc.ss.audioUtil.playSfx(this.btnClickSfx);
        if (this._retryCallback !== null) this._retryCallback();
        this.node.destroy();
    },

    _clickExitEvent: function _clickExitEvent() {

        if (this._isSoundOpen === true) cc.ss.audioUtil.playSfx(this.btnClickSfx);
        if (this._exitCallback !== null) this._exitCallback();
        this.node.destroy();
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
        //# sourceMappingURL=NetErrorDialog.js.map
        