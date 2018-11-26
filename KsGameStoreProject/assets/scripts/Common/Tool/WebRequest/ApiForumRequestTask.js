const BaseWebRequestTask = require('BaseWebRequestTask');

class ApiForumRequestTask extends BaseWebRequestTask{
    constructor(url, params = null, callback)
    {
        super(url, params, callback);
    }


    doGet() {
        let xhr = this.getXMLHttpRequest();

        let str = "?";
        for (let k in this.params)
        {
            if(str !== "?") str += "&";
            str +=`${k}=${this.params[k]}`;
        }

        if (str !== "?") this.url += encodeURI(str);
        console.log(`[ApiForumRequestTask]Get封装后请求地址:${this.url}`);

        xhr.onreadystatechange = () => { this._onReadyStateChange(xhr); };
        xhr.ontimeout = (e) => { this._onTimeOut(e); };
        xhr.onerror = (e) => { this._onError(e); };

        xhr.open("GET", this.url, true);
        xhr.send();
    }

    doPost() {
        let xhr = this.getXMLHttpRequest();

        xhr.onreadystatechange = () => { this._onReadyStateChange(xhr); };
        xhr.ontimeout = (e) => { this._onTimeOut(e); };
        xhr.onerror = (e) => { this._onError(e); };

        let dataStr = "";
        for(let k in this.params){
            if (dataStr !== "") dataStr += "&";
            dataStr += `${k}=${this.params[k]}`;
        }
        xhr.open("POST",this.url);
        xhr.send(dataStr);
    }



    _onReadyStateChange(xhr){
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
            let responseText = xhr.responseText;
            console.log(`[[ApiForumRequestTask]请求响应Response:${responseText}]`);

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
        console.log(`[[ApiForumRequestTask]请求发生超时:${error}]`);
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
        console.log(`[[ApiForumRequestTask]请求发生错误:${JSON.stringify(error)}]`);
        if (this.callback)
        {
            let respInfo = this.getRepsonseBody(2, "网络错误");
            this.callback(respInfo);
        }
    }


}//end class

module.exports = ApiForumRequestTask;
