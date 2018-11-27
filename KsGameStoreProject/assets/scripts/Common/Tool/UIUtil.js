const DialogMgr = require("DialogMgr");
class UIUtil {
    /**
     * 绑定点击事件
     * @param node
     * @param target
     * @param component
     * @param handler
     */
    addClickEvent(node, target, component, handler) {
        //生成EventHandler
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        //为Button绑定点击事件
        let clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    }

    /**
     * 动态切换图片 -- PS:必须图片路径在resource下
     * @param container
     * @param path
     */
    addSpriteFramePic(container, path) {
        cc.loader.loadRes(path, cc.SpriteFrame, function (err, spFrame) {
            container.spriteFrame = spFrame
        });
    }

    findNodeByName(root, name) {
        return root.getChildByName(name);
    }

    /**
     * 根据节点路径返回节点
     * @param root 根节点
     * @param path 子节点路径
     * @returns {Node}
     */
    findNodeByPathName(root, path) {
        return cc.find(path, root);
    }

    /**
     * 检测版本
     * @param notOkcallback 版本低于4.8时 点击按钮需要进行的操作<注：此时 isOKCallback可不填或者填null>
     * @param isOkCallback 只有满足要求时 才会调用
     */
    checkVersionGoUpdate(notOkCallback = null, isOkCallback = null) {

        let appVersion = cc.ss.userInfoCache.appVersion;
        let APP_TOTAL_VERSION_NUM = 4;//此处以后需要修改
        let APP_CHILD_VERSION_NUM = 8;//此处以后需要修改

        if (appVersion === undefined || appVersion === null || appVersion === "") {

            DialogMgr.showInfoDialog(null, cc.ss.GlobalConst.SHOW_TIPS_CHECKUPDATE, notOkCallback);

        } else {

            let versionArr = appVersion.split(".");
            cc.log("[UIUtil] ==版本号  " + appVersion + "  versionArr.length  ==> " + versionArr.length);
            if (versionArr.length >= 3) {
                if (versionArr[0] >= APP_TOTAL_VERSION_NUM && versionArr[1] >= APP_CHILD_VERSION_NUM) {

                    if(isOkCallback !== undefined || isOkCallback !== null) isOkCallback();

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
    isBoxInScreen(x, y, width, height){
       let winWidth = cc.winSize.width;
       let winHeight = cc.winSize.height;

       let targetRect = new cc.Rect(x -  width / 2,y - height / 2, winWidth, height);
       let winRect = new cc.Rect(-winWidth / 2, -winHeight / 2, winWidth, winHeight);

       return cc.rectOverlapsRect(targetRect, winRect);
    }


    /**
     * 是否为全面屏
     * @returns {boolean}
     */
    isIphoneXsOrAllScreen() {

        let winSize = cc.director.getWinSize();
        let ratio = winSize.height / winSize.width;
        if (ratio > 2 || ratio >= 1.97) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * 获取地图的
     */
    getScreenScaleRatio() {

        let designWith = 750;
        let designHeight = 1334;
        let resolutionPolicy = cc.view.getResolutionPolicy();

        if (resolutionPolicy === cc.ResolutionPolicy.FIXED_HEIGHT) {
            let visibleSizeWidth = cc.view.getVisibleSizeInPixel().width;
            let ratio = (visibleSizeWidth > designWith) ? (visibleSizeWidth / designWith) : (designWith / visibleSizeWidth);
            // console.log("[UiUtil]------->visibleSizeWidth:" + visibleSizeWidth + " ratio:" + ratio);
            // return this.mathDividedFloat(ratio,3);
            return ratio;
        } else if (resolutionPolicy === cc.ResolutionPolicy.FIXED_WIDTH) {
            let visibleSizeHeight = cc.view.getVisibleSizeInPixel().height;
            let ratio = (visibleSizeHeight > designHeight) ? (visibleSizeHeight / designHeight) : (designHeight / visibleSizeHeight);
            // console.log("[UiUtil]------->visibleSizeHeight:" + visibleSizeHeight + " ratio:" + ratio);
            // return this.mathDividedFloat(ratio,3);
            return ratio;
        }

        return 1;

    }

    /**
     * 获取小数点后n位
     * @param dividedResult  eg: [100/9]
     * @param pointValue 保留几位小数点
     * @returns {number}
     */
    mathDividedFloat(dividedResult, pointValue){

        return parseInt(dividedResult * Math.pow(10, pointValue) + 0.5, 10) / Math.pow(10, pointValue);

    }

    getAndroidTopBarHeight (){
        return 40;//安卓状态栏高度25
    }

}

module.exports = UIUtil;
