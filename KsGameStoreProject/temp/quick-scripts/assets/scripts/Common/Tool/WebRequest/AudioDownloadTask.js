(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/WebRequest/AudioDownloadTask.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43e1cK/Y2lBKYTWS3pj6d4G', 'AudioDownloadTask', __filename);
// scripts/Common/Tool/WebRequest/AudioDownloadTask.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CryptUtil = require('CryptUtil');
var StringUtil = require('StringUtil');
var BaseWebRequestTask = require('BaseWebRequestTask');

var AudioDownloadTask = function (_BaseWebRequestTask) {
    _inherits(AudioDownloadTask, _BaseWebRequestTask);

    function AudioDownloadTask(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments[2];

        _classCallCheck(this, AudioDownloadTask);

        var _this = _possibleConstructorReturn(this, (AudioDownloadTask.__proto__ || Object.getPrototypeOf(AudioDownloadTask)).call(this, url, params, callback));

        _this.dirPath = params;
        return _this;
    }

    _createClass(AudioDownloadTask, [{
        key: 'doDownload',
        value: function doDownload() {
            this.url = StringUtil.getHttpURL(this.url);
            var filePath = this.dirPath + CryptUtil.md5Encode(this.url) + '.mp3';

            if (jsb.fileUtils.isFileExist(filePath)) {
                this._loadAudio(filePath);
                return;
            }
            this._downloadAudioToNative(filePath);
        }
    }, {
        key: '_loadAudio',
        value: function _loadAudio(filePath) {
            this.callback(filePath);
        }
    }, {
        key: '_downloadAudioToNative',
        value: function _downloadAudioToNative(filePath) {
            var _this2 = this;

            var xhr = this.getDownloadXMLHttpRequest();
            xhr.open("GET", this.url, true);
            xhr.onload = function (oEvent) {
                if (!jsb.fileUtils.isFileExist(_this2.dirPath)) jsb.fileUtils.createDirectory(_this2.dirPath);
                var arrayBuffer = xhr.response;
                if (jsb.fileUtils.writeDataToFile(new Uint8Array(arrayBuffer), filePath)) {
                    console.log("[AudioDownloadTask]Audio写入本地成功");
                    _this2._loadAudio(filePath);
                    return;
                }
                console.log("[AudioDownloadTask]Audio写入本地失败");
                _this2.callback(null);
            };
            xhr.onerror = function () {
                console.log("[AudioDownloadTask]Audio本地错误");
                _this2.callback(null);
            };

            xhr.send(null);
        }
    }]);

    return AudioDownloadTask;
}(BaseWebRequestTask); //end class

module.exports = AudioDownloadTask;

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
        //# sourceMappingURL=AudioDownloadTask.js.map
        