(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Mgr/SceneMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7aa4a9nxypK5LC7vG1ABLaH', 'SceneMgr', __filename);
// scripts/Common/Mgr/SceneMgr.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SceneMgr = function () {
    function SceneMgr() {
        _classCallCheck(this, SceneMgr);
    }

    _createClass(SceneMgr, null, [{
        key: 'ToGameStore',
        value: function ToGameStore() {
            var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var sceneName = 'GameStore';
            this.LoadAndJumpToScene(sceneName, call);
        }
    }, {
        key: 'LoadAndJumpToScene',
        value: function LoadAndJumpToScene(sceneName) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            cc.director.preloadScene(sceneName, function (error) {
                if (error) {
                    console.log('[SceneMgr]' + sceneName + ' Load Error:' + error);
                    return;
                }
                if (callback) callback();
                cc.director.loadScene(sceneName);
            });
        }
    }, {
        key: 'setCurrentRunningSceneName',
        value: function setCurrentRunningSceneName(sceneName) {
            this._currentRunningSceneName = sceneName;
        }
    }, {
        key: 'getCurrentRunningSceneName',
        value: function getCurrentRunningSceneName() {
            return this._currentRunningSceneName;
        }
    }]);

    return SceneMgr;
}();

module.exports = SceneMgr;

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
        //# sourceMappingURL=SceneMgr.js.map
        