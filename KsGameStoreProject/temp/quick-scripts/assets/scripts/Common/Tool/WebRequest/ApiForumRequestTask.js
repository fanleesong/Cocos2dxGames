(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/WebRequest/ApiForumRequestTask.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '938a6Bdo0xLh6mHln5KgPMU', 'ApiForumRequestTask', __filename);
// scripts/Common/Tool/WebRequest/ApiForumRequestTask.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseWebRequestTask = require('BaseWebRequestTask');

var ApiForumRequestTask = function (_BaseWebRequestTask) {
    _inherits(ApiForumRequestTask, _BaseWebRequestTask);

    function ApiForumRequestTask(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments[2];

        _classCallCheck(this, ApiForumRequestTask);

        return _possibleConstructorReturn(this, (ApiForumRequestTask.__proto__ || Object.getPrototypeOf(ApiForumRequestTask)).call(this, url, params, callback));
    }

    _createClass(ApiForumRequestTask, [{
        key: "doGet",
        value: function doGet() {
            var _this2 = this;

            var xhr = this.getXMLHttpRequest();

            var str = "?";
            for (var k in this.params) {
                if (str !== "?") str += "&";
                str += k + "=" + this.params[k];
            }

            if (str !== "?") this.url += encodeURI(str);
            console.log("[ApiForumRequestTask]Get\u5C01\u88C5\u540E\u8BF7\u6C42\u5730\u5740:" + this.url);

            xhr.onreadystatechange = function () {
                _this2._onReadyStateChange(xhr);
            };
            xhr.ontimeout = function (e) {
                _this2._onTimeOut(e);
            };
            xhr.onerror = function (e) {
                _this2._onError(e);
            };

            xhr.open("GET", this.url, true);
            xhr.send();
        }
    }, {
        key: "doPost",
        value: function doPost() {
            var _this3 = this;

            var xhr = this.getXMLHttpRequest();

            xhr.onreadystatechange = function () {
                _this3._onReadyStateChange(xhr);
            };
            xhr.ontimeout = function (e) {
                _this3._onTimeOut(e);
            };
            xhr.onerror = function (e) {
                _this3._onError(e);
            };

            var dataStr = "";
            for (var k in this.params) {
                if (dataStr !== "") dataStr += "&";
                dataStr += k + "=" + this.params[k];
            }
            xhr.open("POST", this.url);
            xhr.send(dataStr);
        }
    }, {
        key: "_onReadyStateChange",
        value: function _onReadyStateChange(xhr) {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                var responseText = xhr.responseText;
                console.log("[[ApiForumRequestTask]\u8BF7\u6C42\u54CD\u5E94Response:" + responseText + "]");

                if (this.callback !== null) {
                    var respInfo = this.getRepsonseBody(0, responseText);
                    this.callback(respInfo);
                }
            }
        }

        /**
         * 请求超时回调
         * @param error
         * @private
         */

    }, {
        key: "_onTimeOut",
        value: function _onTimeOut(error) {
            console.log("[[ApiForumRequestTask]\u8BF7\u6C42\u53D1\u751F\u8D85\u65F6:" + error + "]");
            if (this.callback !== null) {
                var respInfo = this.getRepsonseBody(1, "超时");
                this.callback(respInfo);
            }
        }

        /**
         * 网络错误回调
         * @param error
         * @private
         */

    }, {
        key: "_onError",
        value: function _onError(error) {
            console.log("[[ApiForumRequestTask]\u8BF7\u6C42\u53D1\u751F\u9519\u8BEF:" + JSON.stringify(error) + "]");
            if (this.callback) {
                var respInfo = this.getRepsonseBody(2, "网络错误");
                this.callback(respInfo);
            }
        }
    }]);

    return ApiForumRequestTask;
}(BaseWebRequestTask); //end class

module.exports = ApiForumRequestTask;

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
        //# sourceMappingURL=ApiForumRequestTask.js.map
        