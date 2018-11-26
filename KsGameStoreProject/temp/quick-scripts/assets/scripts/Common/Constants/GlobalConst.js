(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Constants/GlobalConst.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b320f46PmFCvbmOl/MGbMfn', 'GlobalConst', __filename);
// scripts/Common/Constants/GlobalConst.js

"use strict";

var GlobalConst = {
    IMAGE_CACHE_PATH: "caches/ksGameStore/images/",
    AUDIO_CACHE_PATH: "caches/ksGameStore/audios/",
    LOWEST_VERSION_STR: "5.1.0",

    PROXY_LAUNCHER_CONTROLLER: 11,

    NET_ERROR_ALERT_TYPE: cc.Enum({
        ALERT_RETRY: 101,
        ALERT_EXIT: 102,
        ALERT_COMMON: 103
    }),

    SHARE_TYPE_MEDAL: 10001,
    SHOW_TIPS_CHECKUPDATE: "请更新到最新版本!", //请更新到最新版本!
    //定值：微信朋友/微信朋友圈/QQ/微博/保存图片
    SHARE_APP_TYPE: cc.Enum({
        TYPE_FRIENDS: 1,
        TYPE_TIMELINE: 2,
        TYPE_QQ: 3,
        TYPE_WEIBO: 4,
        TYPE_SAVEPICTURE: 5
    })

};

module.exports = GlobalConst;

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
        //# sourceMappingURL=GlobalConst.js.map
        