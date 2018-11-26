const BaseWebRequestTask = require('BaseWebRequestTask');

class ApiRequestBodyRequestTask extends BaseWebRequestTask
{
    constructor(url, params = null, callback)
    {
        super(url, params, callback);
    }


    doPost() {
        let xhr = this.getXMLHttpRequest(true);

        xhr.onreadystatechange = () => { this._onReadyStateChange(xhr); };
        xhr.ontimeout = (e) => { this._onTimeOut(e); };
        xhr.onerror = (e) => { this._onError(e); };

        xhr.open("POST",this.url);
        xhr.send(this.params);
    }


    _onReadyStateChange(xhr){
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
            let responseText = xhr.responseText;
            console.log(`[[ApiRequestBodyRequestTask]请求响应Response:${responseText}]`);

            if (this.callback !== null) {
                let respInfo = this.getRepsonseBody(0, responseText);
                this.callback(respInfo);
            }

        }
    }

    /**
     * 请求超时回调
     * @param error
     * @private
     */
    _onTimeOut(error){
        console.log(`[[ApiRequestBodyRequestTask]请求发生超时:${error}]`);
        if (this.callback !== null)
        {
            let respInfo = this.getRepsonseBody(1, "超时");
            this.callback(respInfo);
        }
    }

    /**
     * 网络错误回调
     * @param error
     * @private
     */
    _onError(error)
    {
        console.log(`[[ApiRequestBodyRequestTask]请求发生错误:${JSON.stringify(error)}]`);
        if (this.callback !== null)
        {
            let respInfo = this.getRepsonseBody(2, "网络错误");
            this.callback(respInfo);
        }
    }

}//end class


module.exports = ApiRequestBodyRequestTask;

