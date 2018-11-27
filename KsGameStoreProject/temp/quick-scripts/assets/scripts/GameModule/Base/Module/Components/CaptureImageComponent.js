(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/Components/CaptureImageComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6c1fts05RM0LAfWku4CaX/', 'CaptureImageComponent', __filename);
// scripts/GameModule/Base/Module/Components/CaptureImageComponent.js

"use strict";

var CryptUtil = require('CryptUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        captureContainerNode: cc.Node,
        coverNode: cc.Node,
        capturedImageName: "",
        prefixName: ""
    },

    /**
     * 截图
     * @param imageCachePath 图片存储路径
     * @param completeCallback 完成回调
     */
    captureImage: function captureImage(imageCachePath, completeCallback) {
        if (!CC_JSB) return;
        var whiteBg = this.coverNode;
        whiteBg.active = true;

        var fakePicBg = this.captureContainerNode;
        fakePicBg.active = true;

        var folderPath = jsb.fileUtils.getWritablePath() + imageCachePath;
        if (!jsb.fileUtils.isDirectoryExist(folderPath)) jsb.fileUtils.createDirectory(folderPath);

        // 创建 renderTexture
        var renderTexture = cc.RenderTexture.create(fakePicBg.width, fakePicBg.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        renderTexture.setVisible(false);
        cc.director.getScene()._sgNode.addChild(renderTexture);

        fakePicBg.x = -cc.winSize.width / 2 + fakePicBg.width / 2;
        fakePicBg.y = -cc.winSize.height / 2 + fakePicBg.height / 2;

        //实际截屏的代码
        renderTexture.begin();
        cc.director.getScene()._sgNode.visit(); //好用
        renderTexture.end();

        var currentTimeStamp = cc.ss.dateUtil.currentTimeStamp();
        var encodeImageName = "" + currentTimeStamp + this.prefixName + this.capturedImageName;
        encodeImageName = CryptUtil.md5Encode(encodeImageName) + ".jpg";
        console.log("[CaptureImageComponent]\u65B0\u56FE\u7247\u540D:" + encodeImageName);

        renderTexture.saveToFile(imageCachePath + encodeImageName, cc.ImageFormat.JPG, true, function (rt, str) {
            if (completeCallback) completeCallback(str);
        });

        fakePicBg.active = false;
        whiteBg.active = false;
    },


    /**
     * 根据不同平台获取到的
     * @param platform
     * @param imagePath
     * @returns {*}
     * @private
     */
    getNativeImagePathByPlatform: function getNativeImagePathByPlatform(platform, imagePath) {
        if (platform === cc.sys.OS_ANDROID) return imagePath;

        if (platform === cc.sys.OS_IOS) {
            var idx = imagePath.lastIndexOf('/');
            if (idx > 0) {
                var imageName = imagePath.substr(idx + 1, imagePath.length);
                return cc.ss.GlobalConst.IMAGE_CACHE_PATH + imageName;
            }
            return cc.ss.GlobalConst.IMAGE_CACHE_PATH + imagePath;
        }

        return "";
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
        //# sourceMappingURL=CaptureImageComponent.js.map
        