(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/AudioUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b941e/7VR1Ku6o7ZQnWgnc9', 'AudioUtil', __filename);
// scripts/Common/Tool/AudioUtil.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioUtil = function () {
    function AudioUtil() {
        _classCallCheck(this, AudioUtil);

        this._currentBgmAudioId = -1;
    }

    _createClass(AudioUtil, [{
        key: "playBgm",
        value: function playBgm(path) {
            var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            this._currentBgmAudioId = cc.audioEngine.play(path, true, volume);
        }
    }, {
        key: "playSfx",
        value: function playSfx(path) {
            var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            return cc.audioEngine.play(path, loop);
        }
    }, {
        key: "stopAllBgm",
        value: function stopAllBgm() {
            cc.audioEngine.stopAll();
        }
    }, {
        key: "stopAllSfx",
        value: function stopAllSfx() {
            cc.audioEngine.stopAll();
        }
    }, {
        key: "stopSfx",
        value: function stopSfx(sfxId) {
            cc.audioEngine.stop(sfxId);
        }
    }, {
        key: "stopBgm",
        value: function stopBgm() {
            cc.audioEngine.setVolume(this._currentBgmAudioId, 0);
        }
    }, {
        key: "pauseBgm",
        value: function pauseBgm() {
            cc.audioEngine.setVolume(this._currentBgmAudioId, 0);
        }
    }, {
        key: "resumeBgm",
        value: function resumeBgm() {
            cc.audioEngine.setVolume(this._currentBgmAudioId, 1);
        }
    }, {
        key: "pauseSfx",
        value: function pauseSfx(sfxId) {
            cc.audioEngine.pause(sfxId);
        }
    }, {
        key: "resumeSfx",
        value: function resumeSfx(sfxId) {
            cc.audioEngine.resume(sfxId);
        }
    }]);

    return AudioUtil;
}();

module.exports = AudioUtil;

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
        //# sourceMappingURL=AudioUtil.js.map
        