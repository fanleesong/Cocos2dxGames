(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/GameStore/Modules/Recommend/Module/ViewController/GameStoreViewController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c26d51FHilPZ5/YFYhGfz8b', 'GameStoreViewController', __filename);
// scripts/GameModule/GameStore/Modules/Recommend/Module/ViewController/GameStoreViewController.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bfx: cc.AudioClip
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._fitIphoneX();
    },

    /**
     * 适配IPhone X及FullScreen
     * @private
     */
    _fitIphoneX: function _fitIphoneX() {

        var isIphoneX = cc.ss.uiUtil.isIphoneXsOrAllScreen();
        if (isIphoneX === true) {
            var constValue = cc.ss.uiUtil.getAndroidTopBarHeight() + 15;
            cc.find("uiLayout/Prefab_HeadIcon", this.node).getComponent(cc.Widget).top = 178 - constValue; //94+44+40
            cc.find("uiLayout/Prefab_HeadIcon", this.node).getComponent(cc.Widget).updateAlignment();
            cc.find("uiLayout/backBtn", this.node).getComponent(cc.Widget).top = 130 - constValue; //60+44+40
            cc.find("uiLayout/backBtn", this.node).getComponent(cc.Widget).updateAlignment();
        }
    },

    onHandleClickBackBtn: function onHandleClickBackBtn() {
        var _this = this;

        var isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);

        var backBtn = cc.find("uiLayout/backBtn", this.node);
        backBtn.on('click', function (ev) {

            if (isSoundOpen === true) cc.ss.audioUtil.playSfx(_this.bfx);
        });
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
        //# sourceMappingURL=GameStoreViewController.js.map
        