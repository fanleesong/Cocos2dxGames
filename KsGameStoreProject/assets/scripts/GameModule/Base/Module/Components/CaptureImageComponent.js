const CryptUtil = require('CryptUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        captureContainerNode : cc.Node,
        coverNode : cc.Node,
        capturedImageName : "",
        prefixName: ""
    },

    /**
     * 截图
     * @param imageCachePath 图片存储路径
     * @param completeCallback 完成回调
     */
    captureImage(imageCachePath ,completeCallback)
    {
        if(!CC_JSB)return;
        let whiteBg = this.coverNode;
        whiteBg.active = true;

        let fakePicBg = this.captureContainerNode;
        fakePicBg.active = true;

        let folderPath = jsb.fileUtils.getWritablePath() + imageCachePath;
        if(!jsb.fileUtils.isDirectoryExist(folderPath)) jsb.fileUtils.createDirectory(folderPath);

        // 创建 renderTexture
        let renderTexture = cc.RenderTexture.create(fakePicBg.width, fakePicBg.height,cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        renderTexture.setVisible(false);
        cc.director.getScene()._sgNode.addChild(renderTexture);

        fakePicBg.x = -cc.winSize.width / 2 + fakePicBg.width / 2;
        fakePicBg.y = -cc.winSize.height / 2 + fakePicBg.height / 2;

        //实际截屏的代码
        renderTexture.begin();
        cc.director.getScene()._sgNode.visit();//好用
        renderTexture.end();

        let currentTimeStamp = cc.ss.dateUtil.currentTimeStamp();
        let encodeImageName = `${currentTimeStamp}${this.prefixName}${this.capturedImageName}`;
        encodeImageName = CryptUtil.md5Encode(encodeImageName) + ".jpg";
        console.log(`[CaptureImageComponent]新图片名:${encodeImageName}`);

        renderTexture.saveToFile(imageCachePath + encodeImageName, cc.ImageFormat.JPG, true, (rt, str) => { if (completeCallback) completeCallback(str); });

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
    getNativeImagePathByPlatform(platform, imagePath)
    {
        if (platform === cc.sys.OS_ANDROID)
            return imagePath;

        if (platform === cc.sys.OS_IOS) {
            let idx = imagePath.lastIndexOf('/');
            if (idx > 0) {
                let imageName = imagePath.substr(idx + 1, imagePath.length);
                return cc.ss.GlobalConst.IMAGE_CACHE_PATH + imageName;
            }
            return cc.ss.GlobalConst.IMAGE_CACHE_PATH  + imagePath;
        }

        return "";
    },

});
