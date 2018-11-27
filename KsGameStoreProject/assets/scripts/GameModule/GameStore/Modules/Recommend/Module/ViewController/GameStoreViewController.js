cc.Class({
    extends: cc.Component,

    properties: {
        bfx: cc.AudioClip,
    },

    // use this for initialization
    onLoad: function () {
        this._fitIphoneX();
    },

    /**
     * 适配IPhone X及FullScreen
     * @private
     */
    _fitIphoneX: function () {

        let isIphoneX = cc.ss.uiUtil.isIphoneXsOrAllScreen();
        if (isIphoneX === true) {
            let constValue = cc.ss.uiUtil.getAndroidTopBarHeight() + 15;
            cc.find("uiLayout/Prefab_HeadIcon", this.node).getComponent(cc.Widget).top = 178 - constValue;//94+44+40
            cc.find("uiLayout/Prefab_HeadIcon", this.node).getComponent(cc.Widget).updateAlignment();
            cc.find("uiLayout/backBtn", this.node).getComponent(cc.Widget).top = 130 - constValue;//60+44+40
            cc.find("uiLayout/backBtn", this.node).getComponent(cc.Widget).updateAlignment();
        }
    },

    onHandleClickBackBtn: function () {


        let isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);

        let backBtn = cc.find("uiLayout/backBtn", this.node);
        backBtn.on('click', (ev) => {

            if (isSoundOpen === true) cc.ss.audioUtil.playSfx(this.bfx);

        });

    },

});
