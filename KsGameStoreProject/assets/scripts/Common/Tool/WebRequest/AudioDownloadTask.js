const CryptUtil = require('CryptUtil');
const StringUtil = require('StringUtil');
const BaseWebRequestTask = require('BaseWebRequestTask');

class AudioDownloadTask extends BaseWebRequestTask{
    constructor(url, params = null, callback)
    {
        super(url, params, callback);
        this.dirPath = params;
    }


    doDownload() {
        this.url = StringUtil.getHttpURL(this.url);
        let filePath = this.dirPath + CryptUtil.md5Encode(this.url) + '.mp3';

        if(jsb.fileUtils.isFileExist(filePath)){
            this._loadAudio(filePath);
            return;
        }
        this._downloadAudioToNative(filePath);
    }

    _loadAudio(filePath)
    {
        this.callback(filePath);
    }

    _downloadAudioToNative(filePath)
    {
        let xhr = this.getDownloadXMLHttpRequest();
        xhr.open("GET", this.url, true);
        xhr.onload = (oEvent) => {
            if (!jsb.fileUtils.isFileExist(this.dirPath)) jsb.fileUtils.createDirectory(this.dirPath);
            let arrayBuffer = xhr.response;
            if (jsb.fileUtils.writeDataToFile(new Uint8Array(arrayBuffer), filePath)) {
                console.log("[AudioDownloadTask]Audio写入本地成功");
                this._loadAudio(filePath);
                return;
            }
            console.log("[AudioDownloadTask]Audio写入本地失败");
            this.callback(null);
        };
        xhr.onerror = () => {
            console.log("[AudioDownloadTask]Audio本地错误");
            this.callback(null);
        };

        xhr.send(null);
    }

}//end class

module.exports = AudioDownloadTask;