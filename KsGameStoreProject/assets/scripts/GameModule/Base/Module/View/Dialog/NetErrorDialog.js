/**
 */
cc.Class({
    extends: cc.Component,

    properties: {
        btnClickSfx: cc.AudioClip,
        _isSoundOpen : false,
        _retryCallback: null,
        _exitCallback: null,
        _listenerId : -1,
    },

    onLoad: function () {
        this._registerTouchEvent();
    },

    initWithData : function (alertType = cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON,retryCallback = null,exitCallback = null) {

        this._retryCallback = retryCallback;
        this._exitCallback = exitCallback;

        this._isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);

        if(alertType === cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON){

            let retryBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/retryBtn");
            let exitBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/exitBtn");
            retryBtn.active = true;
            exitBtn.active = true;
            cc.ss.uiUtil.addClickEvent(retryBtn, this.node, "NetErrorDialog", "_clickRetryEvent");
            cc.ss.uiUtil.addClickEvent(exitBtn, this.node, "NetErrorDialog", "_clickExitEvent");

        }else if (alertType === cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_RETRY){

            let retryBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/retryBtn");
            retryBtn.active = true;
            retryBtn.setPositionX(this.node.getPositionX());
            cc.ss.uiUtil.addClickEvent(retryBtn, this.node, "NetErrorDialog", "_clickRetryEvent");
            cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/exitBtn").getComponent(cc.Button).interactable = false;

        }else if(alertType === cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_EXIT){

            let exitBtn = cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/exitBtn");
            exitBtn.active = true;
            exitBtn.setPositionX(this.node.getPositionX());
            cc.ss.uiUtil.addClickEvent(exitBtn, this.node, "NetErrorDialog", "_clickExitEvent");
            cc.ss.uiUtil.findNodeByPathName(this.node, "dlg/retryBtn").getComponent(cc.Button).interactable = false;

        }

    },

    _clickRetryEvent: function () {

        if(this._isSoundOpen === true) cc.ss.audioUtil.playSfx(this.btnClickSfx);
        if(this._retryCallback !== null) this._retryCallback();
        this.node.destroy();

    },

    _clickExitEvent: function () {

        if(this._isSoundOpen === true) cc.ss.audioUtil.playSfx(this.btnClickSfx);
        if(this._exitCallback !== null) this._exitCallback();
        this.node.destroy();

    },

    _registerTouchEvent : function() {
        let listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function(touches, event) {
                return true;
            },
            onTouchMoved : function(event) {

            },
            onTouchEnded : function(event) {

            }
        };
        this._listenerId = cc.eventManager.addListener(listener, this.node);
    },

    onDestroy : function () {
        cc.eventManager.removeListener(this._listenerId);
    }


});
