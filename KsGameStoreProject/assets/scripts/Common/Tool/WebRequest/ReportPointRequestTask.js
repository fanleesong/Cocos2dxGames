const BaseWebRequestTask = require('BaseWebRequestTask');

class ReportPointRequestTask extends BaseWebRequestTask
{
    constructor(url, params = null, callback)
    {
        super(url, params, callback);
    }


    doPost() {
        console.log(`[ReportPointRequestTask]打点Post`);

        let xhr = this.getXMLHttpRequest(true);

        xhr.onreadystatechange = () => { this._onReadyStateChange(xhr); };
        xhr.ontimeout = (e) => { this._onTimeOut(e); };
        xhr.onerror = (e) => { this._onError(e); };

        xhr.open("POST", this.url);
        xhr.send(this.params);
    }

    _onReadyStateChange(xhr) {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
            let responseText = xhr.responseText;
            console.log(`[[ReportPointRequestTask]打点请求响应Response:${responseText}]`);

            if (this.callback !== null) {
                let resBody = {};
                resBody.infoCode = 0;
                resBody.data = responseText;
                this.callback(resBody);
            }

        }
    }

    /**
     * 请求超时回调
     * @param error
     * @private
     */
    _onTimeOut(error) {
        console.log(`[[ReportPointRequestTask]请求发生超时:${error}]`);
        if (this.callback !== null) {
            let resBody = {};
            resBody.infoCode = 1; //超时
            resBody.data = "超时";

            this.callback(resBody);
        }
    }

    /**
     * 网络错误回调
     * @param error
     * @private
     */
    _onError(error) {
        console.log(`[[ReportPointRequestTask]请求发生错误:${error}]`);
        if (this.callback !== null) {
            let resBody = {};
            resBody.infoCode = 2; //超时
            resBody.data = "网络错误";

            this.callback(resBody);
        }
    }
}

module.exports = ReportPointRequestTask;
