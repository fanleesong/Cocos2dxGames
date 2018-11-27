"use strict";
cc._RF.push(module, '92d466x5WBBqq5l4v/dIb7x', 'ReportPointRequestTask');
// scripts/Common/Tool/WebRequest/ReportPointRequestTask.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseWebRequestTask = require('BaseWebRequestTask');

var ReportPointRequestTask = function (_BaseWebRequestTask) {
    _inherits(ReportPointRequestTask, _BaseWebRequestTask);

    function ReportPointRequestTask(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments[2];

        _classCallCheck(this, ReportPointRequestTask);

        return _possibleConstructorReturn(this, (ReportPointRequestTask.__proto__ || Object.getPrototypeOf(ReportPointRequestTask)).call(this, url, params, callback));
    }

    _createClass(ReportPointRequestTask, [{
        key: "doPost",
        value: function doPost() {
            var _this2 = this;

            console.log("[ReportPointRequestTask]\u6253\u70B9Post");

            var xhr = this.getXMLHttpRequest(true);

            xhr.onreadystatechange = function () {
                _this2._onReadyStateChange(xhr);
            };
            xhr.ontimeout = function (e) {
                _this2._onTimeOut(e);
            };
            xhr.onerror = function (e) {
                _this2._onError(e);
            };

            xhr.open("POST", this.url);
            xhr.send(this.params);
        }
    }, {
        key: "_onReadyStateChange",
        value: function _onReadyStateChange(xhr) {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                var responseText = xhr.responseText;
                console.log("[[ReportPointRequestTask]\u6253\u70B9\u8BF7\u6C42\u54CD\u5E94Response:" + responseText + "]");

                if (this.callback !== null) {
                    var resBody = {};
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

    }, {
        key: "_onTimeOut",
        value: function _onTimeOut(error) {
            console.log("[[ReportPointRequestTask]\u8BF7\u6C42\u53D1\u751F\u8D85\u65F6:" + error + "]");
            if (this.callback !== null) {
                var resBody = {};
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

    }, {
        key: "_onError",
        value: function _onError(error) {
            console.log("[[ReportPointRequestTask]\u8BF7\u6C42\u53D1\u751F\u9519\u8BEF:" + error + "]");
            if (this.callback !== null) {
                var resBody = {};
                resBody.infoCode = 2; //超时
                resBody.data = "网络错误";

                this.callback(resBody);
            }
        }
    }]);

    return ReportPointRequestTask;
}(BaseWebRequestTask);

module.exports = ReportPointRequestTask;

cc._RF.pop();