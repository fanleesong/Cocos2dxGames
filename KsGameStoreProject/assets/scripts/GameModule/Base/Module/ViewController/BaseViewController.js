/**
 * ViewController基类
 * created by shilong at 2018-4-27
 * @type {*}
 */
const Controller = require("Controller");
const Facade = require('Facade');
cc.Class({
    extends: Controller,

    properties: {

    },

    onLoad: function () {},

    /**
     *
     * 获取Proxy
     * @param proxyName
     * @returns {*}
     */
    getModelProxy : function (proxyName) {
        return this.getFacade().getProxy(proxyName);
    },

    /**
     *
     * 获取Facade
     * @returns {*}
     * @returns {*}
     */
    getFacade : function () {
        return Facade.getFacade();
    },



    /**
     * 获取当前系统
     * @returns {*}
     */
    _currentOS : function () {
        return cc.sys.os;
    },

    /**
     * IOS系统
     * @returns {boolean}
     */
    isIOS : function () {
        return this._currentOS() === cc.sys.OS_IOS;
    },

    /**
     * Android系统
     * @returns {boolean}
     */
    isAndroid : function () {
        return this._currentOS() === cc.sys.OS_ANDROID;
    },

    /**
     * 模拟器系统
     * @returns {boolean}
     */
    isSimulator : function () {
        return this._currentOS() !== cc.sys.OS_ANDROID && this._currentOS() !== cc.sys.OS_IOS;
    },


    /**
     * 跳转场景并预加载场景
     * @param sceneName 场景名
     */
    toNextScene : function (sceneName) {
        cc.director.preloadScene(sceneName, function () {
            cc.director.loadScene(sceneName);
        });


    },

});
