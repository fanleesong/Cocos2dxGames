const CryptUtil = require('CryptUtil');

const StringUtil = require('StringUtil');
const BaseWebRequestTask = require('BaseWebRequestTask');

class ImageDownloadTask extends BaseWebRequestTask
{
    constructor(url, params = null, callback)
    {
        super(url, params, callback);
        this.dirPath = params;
    }
    doDownload() {
        this.url = StringUtil.getHttpURL(this.url);
        let filePath = this.dirPath + CryptUtil.md5Encode(this.url) + '.png';

        if (jsb.fileUtils.isFileExist(filePath))
        {
            this._loadImage(filePath);
            return;
        }
        this._downloadImageToNative(filePath);
    }

    _downloadImageToNative(filePath)
    {
        let xhr = this.getDownloadXMLHttpRequest();
        xhr.open("GET", this.url, true);
        xhr.onload = (oEvent) => {
            let responseData = xhr.response;
            if(typeof responseData !== 'undefined'){
                if (!jsb.fileUtils.isDirectoryExist(this.dirPath)) jsb.fileUtils.createDirectory(this.dirPath);
                if (jsb.fileUtils.writeDataToFile(new Uint8Array(responseData), filePath)){
                    console.log("[ImageDownloadTask]图片写入本地完成");
                    this._loadImage(filePath);
                }else {
                    console.log("[ImageDownloadTask]图片写入本地错误");
                }
            }else {
                console.log("[ImageDownloadTask]response data 错误");
            }
        };
        xhr.send();
    };


    /**
     * 本地读取Texture
     * @param filePath 本地全路径
     * @private
     */
    _loadImage(filePath){
        cc.loader.load(filePath, (err, tex) => {
            if(err){
                console.log(`[ImageDownloadTask]<_loadImage>引擎加载图片错误 ${err}`);
            }else {
                if(tex){
                    // console.log("[ImageDownloadTask]tex读取完成");
                    this.callback(tex);
                }else {
                    // console.log("[ImageDownloadTask]<_loadImage>贴图错误");
                }
            }
        });
    }

}//end class

module.exports = ImageDownloadTask;