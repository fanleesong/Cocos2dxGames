class BaseWebRequestTask {

    constructor(url, params = null, callback){
        //!!!: 不能使用new.target 否则在cocos creator编译构建的时候会报gulp压缩错误，无法识别new.target语法
        // if (new.target === BaseWebRequestTask)
        //     throw new Error('BaseNetRequestTask不能被实例化');

        this._url = url;
        this._params = params;
        this._callback = callback;
    }

    _getToken()
    {
        return  cc.ss.httpRequestToken;
    }

    _getUserId()
    {
        return cc.ss.userInfoCache.userId;
    }

    doGet(){
        console.log('[BaseNetRequestTask]doGet');
    }

    doPost(){
        console.log('[BaseNetRequestTask]doPost');
    }

    doDownload()
    {
        console.log('[BaseNetRequestTask]doRequest');
    }

    getXMLHttpRequest(isHaveContentType = false)
    {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 15000;

        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate","application/json;charset=UTF-8");
            xhr.setRequestHeader("token", this._getToken());
            xhr.setRequestHeader("userId", this._getUserId());
            if (isHaveContentType){
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            }
        }
        return xhr;
    }

    getDownloadXMLHttpRequest()
    {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 15000;
        xhr.responseType = 'arraybuffer';//接受数据buffer

        return xhr;
    }

    getRepsonseBody(infoCode = 0, data = "")
    {
        let resBody = {};
        resBody.infoCode = infoCode; //超时
        resBody.data = data;
        return resBody;
    }


    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get params() {
        return this._params;
    }

    set params(value) {
        this._params = value;
    }

    get callback() {
        return this._callback;
    }

    set callback(value) {
        this._callback = value;
    }
}

module.exports = BaseWebRequestTask;
