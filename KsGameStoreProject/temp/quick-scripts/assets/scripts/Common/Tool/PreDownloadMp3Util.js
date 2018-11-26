(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/PreDownloadMp3Util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba53fdvGdhFRqAORIRoH9O7', 'PreDownloadMp3Util', __filename);
// scripts/Common/Tool/PreDownloadMp3Util.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mp3预下载工具
 */

var _require = require('RequestTaskFactory'),
    RequestTaskFactory = _require.RequestTaskFactory,
    Task_Type = _require.Task_Type;

var PreDownloadMp3Util = function () {
    /**
     *
     * @param audioURLList 预加载音频url数组
     * @param preCompleteCallback 完成回调
     * @param progressCallback
     */
    function PreDownloadMp3Util(audioURLList, preCompleteCallback) {
        var progressCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, PreDownloadMp3Util);

        this._preDownloadURLList = audioURLList;
        this._progerssCallback = progressCallback;

        this._currentPreDownloadIndex = 0;

        this._currentPreDownloadSubIndex = 0;
        this._currentPreDownloadAudioList = [];

        this._finishDownloadAudioFilePathList = [];

        this._dirPath = jsb.fileUtils.getWritablePath() + cc.ss.GlobalConst.AUDIO_CACHE_PATH;
        this._completeCallback = preCompleteCallback;

        this._downloadMp3LocalPathList = [];

        this._currentDownloadCompleteNum = 0;

        this._totalDownloadFileNum = 0;
    }

    _createClass(PreDownloadMp3Util, [{
        key: 'startPreDownload',
        value: function startPreDownload() {
            this._currentDownloadCompleteNum = 0;
            this._totalDownloadFileNum = 0;

            for (var i in this._preDownloadURLList) {
                var audioItem = this._preDownloadURLList[i];
                for (var j in audioItem) {
                    this._totalDownloadFileNum++;
                }
            }

            this._currentPreDownloadIndex = 0;
            this._requestQuestionAudios();
        }
    }, {
        key: '_requestQuestionAudios',
        value: function _requestQuestionAudios() {
            if (this._currentPreDownloadIndex >= this._preDownloadURLList.length) {
                this._completeCallback(this._downloadMp3LocalPathList);
                return;
            }

            this._currentPreDownloadAudioList = this._preDownloadURLList[this._currentPreDownloadIndex];
            this._currentPreDownloadSubIndex = 0;
            this._finishDownloadAudioFilePathList = [];

            this._preDownloadAudios();
        }
    }, {
        key: '_preDownloadAudios',
        value: function _preDownloadAudios() {
            var _this = this;

            if (this._currentPreDownloadSubIndex >= this._currentPreDownloadAudioList.length) {
                this._downloadMp3LocalPathList.push(this._finishDownloadAudioFilePathList);

                this._currentPreDownloadIndex++;
                this._requestQuestionAudios();
                return;
            }
            var audioURL = this._currentPreDownloadAudioList[this._currentPreDownloadSubIndex];
            var task = RequestTaskFactory.createTask(Task_Type.Audio, audioURL, this._dirPath, function (filePath) {
                _this._finishDownloadAudioFilePathList.push(filePath);
                _this._currentPreDownloadSubIndex++;
                _this._currentDownloadCompleteNum++;
                if (_this._progerssCallback) _this._progerssCallback(_this._currentDownloadCompleteNum, _this._totalDownloadFileNum);

                setTimeout(function () {
                    //延时0.05秒移动到开始下一轮
                    _this._preDownloadAudios();
                }, 50);
            });

            task.doDownload();
        }
    }]);

    return PreDownloadMp3Util;
}(); //end class

module.exports = PreDownloadMp3Util;

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
        //# sourceMappingURL=PreDownloadMp3Util.js.map
        