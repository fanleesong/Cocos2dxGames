"use strict";
cc._RF.push(module, 'bdaf26MbkFGTKATioYOi5sP', 'BaseWebRequestTask');
// scripts/Common/Tool/WebRequest/BaseWebRequestTask.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseWebRequestTask = function () {
    function BaseWebRequestTask(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments[2];

        _classCallCheck(this, BaseWebRequestTask);

        //!!!: 不能使用new.target 否则在cocos creator编译构建的时候会报gulp压缩错误，无法识别new.target语法
        // if (new.target === BaseWebRequestTask)
        //     throw new Error('BaseNetRequestTask不能被实例化');

        this._url = url;
        this._params = params;
        this._callback = callback;
    }

    _createClass(BaseWebRequestTask, [{
        key: '_getToken',
        value: function _getToken() {
            return cc.ss.httpRequestToken;
        }
    }, {
        key: '_getUserId',
        value: function _getUserId() {
            return cc.ss.userInfoCache.userId;
        }
    }, {
        key: 'doGet',
        value: function doGet() {
            console.log('[BaseNetRequestTask]doGet');
        }
    }, {
        key: 'doPost',
        value: function doPost() {
            console.log('[BaseNetRequestTask]doPost');
        }
    }, {
        key: 'doDownload',
        value: function doDownload() {
            console.log('[BaseNetRequestTask]doRequest');
        }
    }, {
        key: 'getXMLHttpRequest',
        value: function getXMLHttpRequest() {
            var isHaveContentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 15000;

            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "application/json;charset=UTF-8");
                xhr.setRequestHeader("token", this._getToken());
                xhr.setRequestHeader("userId", this._getUserId());
                if (isHaveContentType) {
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                }
            }
            return xhr;
        }
    }, {
        key: 'getDownloadXMLHttpRequest',
        value: function getDownloadXMLHttpRequest() {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 15000;
            xhr.responseType = 'arraybuffer'; //接受数据buffer

            return xhr;
        }
    }, {
        key: 'getRepsonseBody',
        value: function getRepsonseBody() {
            var infoCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            var resBody = {};
            resBody.infoCode = infoCode; //超时
            resBody.data = data;
            return resBody;
        }
    }, {
        key: 'url',
        get: function get() {
            return this._url;
        },
        set: function set(value) {
            this._url = value;
        }
    }, {
        key: 'params',
        get: function get() {
            return this._params;
        },
        set: function set(value) {
            this._params = value;
        }
    }, {
        key: 'callback',
        get: function get() {
            return this._callback;
        },
        set: function set(value) {
            this._callback = value;
        }
    }]);

    return BaseWebRequestTask;
}();

module.exports = BaseWebRequestTask;

cc._RF.pop();