(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Constants/TagConst.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5f728ZffEVBpow+Af6egLs6', 'TagConst', __filename);
// scripts/Common/Constants/TagConst.js

"use strict";

/**
 * MVC TAG 常量
 */
var TagConst = {
    TAG_REFRESH_HEAD_ICON_INFO: "TAG_REFRESH_HEAD_ICON_INFO ", //刷新头像信息
    TAG_REFRESH_HEAD_ICON_STAR_INFO: "TAG_REFRESH_HEAD_ICON_STAR_INFO", //刷新头像星星icon


    TAG_LAUNCHER_LOADING_PROGRESS: "TAG_LAUNCHER_LOADING_PROGRESS", //launcher 进度
    TAG_LAUNCHER_GAME_INITIALIZE_INFO_COMPLETE: "TAG_LAUNCHER_GAME_INITIALIZE_INFO_COMPLETE", //请求初始化用户信息完成

    TAG_USER_CENTER_DETAIL_INFO: "TAG_USER_CENTER_DETAIL_INFO", //用户中心详细信息

    TAG_SHOW_SHARE_MEDAL_DIALOG: "TAG_SHOW_SHARE_MEDAL_DIALOG", //分享勋章

    TAG_NET_ERROR_INFO: "TAG_NET_ERROR ", //网络异常
    TAG_SHOW_NET_ERROR_DIALOG: "TAG_SHOW_NET_ERROR_DIALOG", //显示网络隐藏重试对话框
    TAG_CLOSE_DISPLAY_MEDAL_DIALOG: "TAG_CLOSE_DISPLAY_MEDAL_DIALOG",

    TAG_SETTING_CLOSE_SFX: "TAG_SETTING_CLOSE_SFX", //设置-关闭音效
    TAG_SETTING_OPEN_SFX: "TAG_SETTING_OPEN_SFX", //设置-开启音效

    //石龙于2018-9-19添加体力系统通知
    TAG_LIFE_SYSTEM_START_COUNT_DOWN: "TAG_LIFE_SYSTEM_START_COUNT_DOWN",
    TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN: "TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN",
    TAG_LIFE_SYSTEM_COUNT_DOWN_TIME: "TAG_LIFE_SYSTEM_COUNT_DOWN_TIME",
    TAG_LIFE_SYSTEM_UPDATE_LIFE: "TAG_LIFE_SYSTEM_UPDATE_LIFE",

    //体力分享
    TAG_LIFE_SYSTEM_LIFE_DISPLAY_DIALOG_CLOSE: "TAG_LIFE_SYSTEM_LIFE_DISPLAY_DIALOG_CLOSE" //体力分享关闭对话框


};

module.exports = TagConst;

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
        //# sourceMappingURL=TagConst.js.map
        