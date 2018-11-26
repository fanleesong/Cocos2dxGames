const CryptUtil = require("CryptUtil");
module.exports = {
    replaceString(srcStr, replaceStr){
        let idx = srcStr.lastIndexOf(replaceStr);
        if (idx >= 0) {
            return srcStr.substr(replaceStr.length, srcStr.length);
        }

        return srcStr;
    },

    /**
     * https转换http
     * @param url
     * @returns {*}
     */
    getHttpURL(url)
    {
        let httpsStr = "https";
        let idx = url.lastIndexOf(httpsStr);
        if (idx >= 0) {
            let subStr = url.substr(httpsStr.length, url.length);
            return  "http" + subStr;
        }
        return url;
    },

    /**
     * 0补位
     * @param num
     * @param n
     * @returns {string}
     */
    prefixInteger(num, n){

        return (Array(n).join(0) + num).slice(-n);
    },

    /**
     * 转换音频路径
     * @param audioUrl
     * @returns {*}
     */
    parseAudioUrlToLocalFilePath(audioUrl){
        // cc.log("[StringUtils]-->转换前-->URL：  " + audioUrl);
        if (audioUrl === null || audioUrl === undefined) return "";
        let url = this.getHttpURL(audioUrl);
        let filePath = jsb.fileUtils.getWritablePath() + cc.ss.GlobalConst.AUDIO_CACHE_PATH + CryptUtil.md5Encode(url) + '.mp3';
        // cc.log("[StringUtils]-->转换后-->URL：  " + CryptUtil.md5Encode(url) + '.mp3');
        return filePath;
    },

    /**
     * 判断非法或者空字符串
     * @param str
     * @returns {boolean}
     */
    isEmpty(str)
    {
        return (str === null || str === undefined || str === "");
    }

};