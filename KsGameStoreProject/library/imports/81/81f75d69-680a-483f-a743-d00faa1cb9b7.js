"use strict";
cc._RF.push(module, '81f751paApIP6dD0A+qHLm3', 'ImageDownloadTask');
// scripts/Common/Tool/WebRequest/ImageDownloadTask.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CryptUtil = require('CryptUtil');

var StringUtil = require('StringUtil');
var BaseWebRequestTask = require('BaseWebRequestTask');

var ImageDownloadTask = function (_BaseWebRequestTask) {
    _inherits(ImageDownloadTask, _BaseWebRequestTask);

    function ImageDownloadTask(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments[2];

        _classCallCheck(this, ImageDownloadTask);

        var _this = _possibleConstructorReturn(this, (ImageDownloadTask.__proto__ || Object.getPrototypeOf(ImageDownloadTask)).call(this, url, params, callback));

        _this.dirPath = params;
        return _this;
    }

    _createClass(ImageDownloadTask, [{
        key: 'doDownload',
        value: function doDownload() {
            this.url = StringUtil.getHttpURL(this.url);
            var filePath = this.dirPath + CryptUtil.md5Encode(this.url) + '.png';

            if (jsb.fileUtils.isFileExist(filePath)) {
                this._loadImage(filePath);
                return;
            }
            this._downloadImageToNative(filePath);
        }
    }, {
        key: '_downloadImageToNative',
        value: function _downloadImageToNative(filePath) {
            var _this2 = this;

            var xhr = this.getDownloadXMLHttpRequest();
            xhr.open("GET", this.url, true);
            xhr.onload = function (oEvent) {
                var responseData = xhr.response;
                if (typeof responseData !== 'undefined') {
                    if (!jsb.fileUtils.isDirectoryExist(_this2.dirPath)) jsb.fileUtils.createDirectory(_this2.dirPath);
                    if (jsb.fileUtils.writeDataToFile(new Uint8Array(responseData), filePath)) {
                        console.log("[ImageDownloadTask]图片写入本地完成");
                        _this2._loadImage(filePath);
                    } else {
                        console.log("[ImageDownloadTask]图片写入本地错误");
                    }
                } else {
                    console.log("[ImageDownloadTask]response data 错误");
                }
            };
            xhr.send();
        }
    }, {
        key: '_loadImage',


        /**
         * 本地读取Texture
         * @param filePath 本地全路径
         * @private
         */
        value: function _loadImage(filePath) {
            var _this3 = this;

            cc.loader.load(filePath, function (err, tex) {
                if (err) {
                    console.log('[ImageDownloadTask]<_loadImage>\u5F15\u64CE\u52A0\u8F7D\u56FE\u7247\u9519\u8BEF ' + err);
                } else {
                    if (tex) {
                        // console.log("[ImageDownloadTask]tex读取完成");
                        _this3.callback(tex);
                    } else {
                        // console.log("[ImageDownloadTask]<_loadImage>贴图错误");
                    }
                }
            });
        }
    }]);

    return ImageDownloadTask;
}(BaseWebRequestTask); //end class

module.exports = ImageDownloadTask;

cc._RF.pop();