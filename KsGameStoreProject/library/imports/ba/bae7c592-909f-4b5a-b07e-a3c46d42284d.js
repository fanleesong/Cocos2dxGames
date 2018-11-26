"use strict";
cc._RF.push(module, 'bae7cWSkJ9LWrB+o8RtQihN', 'UIUtil');
// scripts/Common/Tool/UIUtil.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DialogMgr = require("DialogMgr");

var UIUtil = function () {
    function UIUtil() {
        _classCallCheck(this, UIUtil);
    }

    _createClass(UIUtil, [{
        key: "addClickEvent",

        /**
         * 绑定点击事件
         * @param node
         * @param target
         * @param component
         * @param handler
         */
        value: function addClickEvent(node, target, component, handler) {
            //生成EventHandler
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = target;
            eventHandler.component = component;
            eventHandler.handler = handler;

            //为Button绑定点击事件
            var clickEvents = node.getComponent(cc.Button).clickEvents;
            clickEvents.push(eventHandler);
        }

        /**
         * 动态切换图片 -- PS:必须图片路径在resource下
         * @param container
         * @param path
         */

    }, {
        key: "addSpriteFramePic",
        value: function addSpriteFramePic(container, path) {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spFrame) {
                container.spriteFrame = spFrame;
            });
        }
    }, {
        key: "findNodeByName",
        value: function findNodeByName(root, name) {
            return root.getChildByName(name);
        }

        /**
         * 根据节点路径返回节点
         * @param root 根节点
         * @param path 子节点路径
         * @returns {Node}
         */

    }, {
        key: "findNodeByPathName",
        value: function findNodeByPathName(root, path) {
            return cc.find(path, root);
        }

        /**
         * 检测版本
         * @param notOkcallback 版本低于4.8时 点击按钮需要进行的操作<注：此时 isOKCallback可不填或者填null>
         * @param isOkCallback 只有满足要求时 才会调用
         */

    }, {
        key: "checkVersionGoUpdate",
        value: function checkVersionGoUpdate() {
            var notOkCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var isOkCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            var appVersion = cc.ss.userInfoCache.appVersion;
            var APP_TOTAL_VERSION_NUM = 4; //此处以后需要修改
            var APP_CHILD_VERSION_NUM = 8; //此处以后需要修改

            if (appVersion === undefined || appVersion === null || appVersion === "") {

                DialogMgr.showInfoDialog(null, cc.ss.GlobalConst.SHOW_TIPS_CHECKUPDATE, notOkCallback);
            } else {

                var versionArr = appVersion.split(".");
                cc.log("[UIUtil] ==版本号  " + appVersion + "  versionArr.length  ==> " + versionArr.length);
                if (versionArr.length >= 3) {
                    if (versionArr[0] >= APP_TOTAL_VERSION_NUM && versionArr[1] >= APP_CHILD_VERSION_NUM) {

                        if (isOkCallback !== undefined || isOkCallback !== null) isOkCallback();
                    } else {
                        cc.log("[UIUtil]--->checkVersionGoUpdate == 版本不对>需要更新");
                        DialogMgr.showInfoDialog(null, cc.ss.GlobalConst.SHOW_TIPS_CHECKUPDATE, notOkCallback);
                    }
                } else {
                    DialogMgr.showInfoDialog(null, cc.ss.GlobalConst.SHOW_TIPS_CHECKUPDATE, notOkCallback);
                }
            }
        }

        /**
         * 完全在屏幕范围内
         * @param x
         * @param y
         * @param width
         * @param height
         * @returns {boolean}
         */

    }, {
        key: "isBoxInScreen",
        value: function isBoxInScreen(x, y, width, height) {
            var winWidth = cc.winSize.width;
            var winHeight = cc.winSize.height;

            var targetRect = new cc.Rect(x - width / 2, y - height / 2, winWidth, height);
            var winRect = new cc.Rect(-winWidth / 2, -winHeight / 2, winWidth, winHeight);

            return cc.rectOverlapsRect(targetRect, winRect);
        }

        /**
         * 是否为全面屏
         * @returns {boolean}
         */

    }, {
        key: "isIphoneXsOrAllScreen",
        value: function isIphoneXsOrAllScreen() {

            var winSize = cc.director.getWinSize();
            var ratio = winSize.height / winSize.width;
            if (ratio > 2 || ratio >= 1.97) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 获取地图的
         */

    }, {
        key: "getScreenScaleRatio",
        value: function getScreenScaleRatio() {

            var designWith = 750;
            var designHeight = 1334;
            var resolutionPolicy = cc.view.getResolutionPolicy();

            if (resolutionPolicy === cc.ResolutionPolicy.FIXED_HEIGHT) {
                var visibleSizeWidth = cc.view.getVisibleSizeInPixel().width;
                var ratio = visibleSizeWidth > designWith ? visibleSizeWidth / designWith : designWith / visibleSizeWidth;
                // console.log("[UiUtil]------->visibleSizeWidth:" + visibleSizeWidth + " ratio:" + ratio);
                // return this.mathDividedFloat(ratio,3);
                return ratio;
            } else if (resolutionPolicy === cc.ResolutionPolicy.FIXED_WIDTH) {
                var visibleSizeHeight = cc.view.getVisibleSizeInPixel().height;
                var _ratio = visibleSizeHeight > designHeight ? visibleSizeHeight / designHeight : designHeight / visibleSizeHeight;
                // console.log("[UiUtil]------->visibleSizeHeight:" + visibleSizeHeight + " ratio:" + ratio);
                // return this.mathDividedFloat(ratio,3);
                return _ratio;
            }

            return 1;
        }

        /**
         * 获取小数点后n位
         * @param dividedResult  eg: [100/9]
         * @param pointValue 保留几位小数点
         * @returns {number}
         */

    }, {
        key: "mathDividedFloat",
        value: function mathDividedFloat(dividedResult, pointValue) {

            return parseInt(dividedResult * Math.pow(10, pointValue) + 0.5, 10) / Math.pow(10, pointValue);
        }
    }, {
        key: "getAndroidTopBarHeight",
        value: function getAndroidTopBarHeight() {
            return 40; //安卓状态栏高度25
        }
    }]);

    return UIUtil;
}();

module.exports = UIUtil;

cc._RF.pop();