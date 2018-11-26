"use strict";
cc._RF.push(module, '671c5cHHFxCarvU3Hp+Ymaa', 'FitScreenComponent');
// scripts/GameModule/Base/Module/Components/FitScreenComponent.js

"use strict";

/**
 * @className FitScreenComponent
 * @classdesc 适配使用
 */
cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this._fitIphoneXScreen();
    },

    /**
     *
     * iphoneX (1125x2436)
     * iphoneXR (828X1792)
     * iphoneXS Max (1242x2688)
     *
     * @private
     */
    _fitIphoneXScreen: function _fitIphoneXScreen() {

        var platform = cc.sys.os;
        var winSize = cc.director.getWinSize();
        var oldBg = cc.find("fitNode/bg", this.node);
        var iphoneXBg = cc.find("fitNode/iphoneXbg", this.node);
        var ratio = winSize.height / winSize.width;
        if (platform === cc.sys.OS_ANDROID && ratio > 1.97 || platform === cc.sys.OS_IOS && ratio > 2 || platform !== cc.sys.OS_IOS && platform !== cc.sys.OS_ANDROID && ratio > 2) {
            //测试使用

            if (oldBg !== undefined && oldBg !== null && iphoneXBg !== undefined && iphoneXBg !== null) {
                oldBg.active = false;
                iphoneXBg.active = true;
            }
            var iphoneName = "iphoneX";
            if (platform !== cc.sys.OS_ANDROID) {
                if (ratio === 2436 / 1125) {
                    iphoneName = "iphoneX";
                } else if (ratio === 1792 / 828) {
                    iphoneName = "iphoneXR";
                } else if (ratio === 2688 / 1242) {
                    iphoneName = "iphoneXS Max";
                }
            } else {
                if (ratio >= 1.97) {
                    iphoneName = "Android All Screen";
                } else {
                    iphoneName = "Android Other Screen";
                }
            }
            cc.view.setDesignResolutionSize(750, 2436, cc.ResolutionPolicy.FIXED_WIDTH);
            console.log(" [FitScreenComponent]  this is " + iphoneName);
        } else {
            cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.SHOW_ALL);
            console.log(" [FitScreenComponent]  this is no iphoneX");

            if (oldBg !== undefined && oldBg !== null && iphoneXBg !== undefined && iphoneXBg !== null) {
                oldBg.active = true;
                iphoneXBg.active = false;
            }
        }
    },

    isIphoneXsOrAllScreen: function isIphoneXsOrAllScreen() {

        var winSize = cc.director.getWinSize();
        var ratio = winSize.height / winSize.width;
        if (ratio > 2 || ratio >= 1.97) {
            return true;
        } else {
            return false;
        }
    }

});

cc._RF.pop();