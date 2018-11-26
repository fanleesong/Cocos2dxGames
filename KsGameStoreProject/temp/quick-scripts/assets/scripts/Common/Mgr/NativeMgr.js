(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Mgr/NativeMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6cb2z0+XxCepgu8jT1kSKU', 'NativeMgr', __filename);
// scripts/Common/Mgr/NativeMgr.js

"use strict";

var Android_Class_Signature = "org/cocos2dx/javascript/CocosActivity"; //Android类完整签名
var Ios_Class_Signature = "CocosViewController"; //Ios类名-不需要路径

module.exports = {

    //石龙于2018-11-11添加震动功能
    doVibrate: function doVibrate(platform) {
        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]doVibrate模拟器不跳转");
            return;
        }

        var funcName = "doVibrate";
        if (platform === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "()V");
        } else if (platform === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName);
        }
    },

    /**
     * 跳转到app
     * @param platform 平台
     */
    backToNative: function backToNative(platform) {
        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]backToNative模拟器不跳转");
            return;
        }

        cc.ss.audioUtil.stopAllBgm();
        cc.ss.audioUtil.stopAllSfx();
        cc.sys.garbageCollect();

        var funcName = "backToNative";

        if (platform === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "()V");
        } else if (platform === cc.sys.OS_IOS) {
            cc.loader.releaseAll();
            cc.audioEngine.uncacheAll();
            cc.sys.garbageCollect();
            jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName);
        }
    },

    isInstallWechat: function isInstallWechat(platform) {
        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]isInstallWechat模拟器默认返回true ");
            return true;
        }

        var funcName = "isInstallWechat";
        if (platform === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "()Z");
        } else if (platform === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName);
        }
    },

    /**
     * 分享截图给微信好友
     * @param platform 平台
     * @param imgPath 截图本地地址
     */
    shareWechatFriend: function shareWechatFriend(platform, imgPath) {

        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]shareWechatFriend模拟器不调用");
            return;
        }

        //打点分享
        cc.ss.reportPointUtil.reportShareMedalEvent(cc.ss.GlobalConst.SHARE_APP_TYPE.TYPE_FRIENDS);

        var funcName = "shareWechat";
        if (platform === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "(Ljava/lang/String;)V", imgPath);
        } else if (platform === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName + ":", imgPath);
        }
    },

    /**
     * 分享截图到朋友圈
     * @param platform  平台
     * @param imgPath 截图本地地址
     */
    shareTimeline: function shareTimeline(platform, imgPath) {
        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]shareTimeline模拟器不调用");
            return;
        }

        //打点分享
        cc.ss.reportPointUtil.reportShareMedalEvent(cc.ss.GlobalConst.SHARE_APP_TYPE.TYPE_TIMELINE);

        var funcName = "shareTimeline";

        if (platform === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "(Ljava/lang/String;)V", imgPath);
        } else if (platform === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName + ":", imgPath);
        }
    },

    /**
     * 保存截图到本地
     * @param platform 平台
     * @param imgPath 截图本地地址
     */
    capturePicAndSave: function capturePicAndSave(platform, imgPath) {
        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]capturePicAndSave模拟器不调用");
            return;
        }

        //打点分享
        cc.ss.reportPointUtil.reportShareMedalEvent(cc.ss.GlobalConst.SHARE_APP_TYPE.TYPE_SAVEPICTURE);

        var funcName = "capturePicAndSave";
        if (platform === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "(Ljava/lang/String;)V", imgPath);
        } else if (platform === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName + ":", imgPath);
        }
    },

    //app4.8添加native交互函数函数

    /**
     *
     * @param platform
     * @param productInfoStr
     */
    jumpToProductDetailPage: function jumpToProductDetailPage(platform, productInfoStr) {

        if (platform !== cc.sys.OS_ANDROID && platform !== cc.sys.OS_IOS) {
            console.log("[NativeMgr]jumpToProductDetailPage模拟器不跳转");
            return;
        }

        //打点未付费用户跳转到商品详情界面
        cc.ss.reportPointUtil.reportJumpAppProductOrPlayerPageEvent(false);

        cc.ss.audioUtil.stopAllBgm();
        cc.ss.audioUtil.stopAllSfx();
        cc.sys.garbageCollect();

        var funcName = "jumpToProductDetailPage";
        if (platform === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(Android_Class_Signature, funcName, "(Ljava/lang/String;)V", productInfoStr);
        } else if (platform === cc.sys.OS_IOS) {
            cc.loader.releaseAll();
            cc.audioEngine.uncacheAll();
            cc.sys.garbageCollect();
            jsb.reflection.callStaticMethod(Ios_Class_Signature, funcName + ":", productInfoStr);
        }
    }
};

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
        //# sourceMappingURL=NativeMgr.js.map
        