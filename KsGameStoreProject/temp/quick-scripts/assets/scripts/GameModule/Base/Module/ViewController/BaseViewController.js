(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/ViewController/BaseViewController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef480cUu69PSIubFPsanWI8', 'BaseViewController', __filename);
// scripts/GameModule/Base/Module/ViewController/BaseViewController.js

"use strict";

/**
 * ViewController基类
 * created by shilong at 2018-4-27
 * @type {*}
 */
var Controller = require("Controller");
var Facade = require('Facade');
cc.Class({
    extends: Controller,

    properties: {},

    onLoad: function onLoad() {},

    /**
     *
     * 获取Proxy
     * @param proxyName
     * @returns {*}
     */
    getModelProxy: function getModelProxy(proxyName) {
        return this.getFacade().getProxy(proxyName);
    },

    /**
     *
     * 获取Facade
     * @returns {*}
     * @returns {*}
     */
    getFacade: function getFacade() {
        return Facade.getFacade();
    },

    /**
     * 获取当前系统
     * @returns {*}
     */
    _currentOS: function _currentOS() {
        return cc.sys.os;
    },

    /**
     * IOS系统
     * @returns {boolean}
     */
    isIOS: function isIOS() {
        return this._currentOS() === cc.sys.OS_IOS;
    },

    /**
     * Android系统
     * @returns {boolean}
     */
    isAndroid: function isAndroid() {
        return this._currentOS() === cc.sys.OS_ANDROID;
    },

    /**
     * 模拟器系统
     * @returns {boolean}
     */
    isSimulator: function isSimulator() {
        return this._currentOS() !== cc.sys.OS_ANDROID && this._currentOS() !== cc.sys.OS_IOS;
    },

    /**
     * 跳转场景并预加载场景
     * @param sceneName 场景名
     */
    toNextScene: function toNextScene(sceneName) {
        cc.director.preloadScene(sceneName, function () {
            cc.director.loadScene(sceneName);
        });
    }

});

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
        //# sourceMappingURL=BaseViewController.js.map
        