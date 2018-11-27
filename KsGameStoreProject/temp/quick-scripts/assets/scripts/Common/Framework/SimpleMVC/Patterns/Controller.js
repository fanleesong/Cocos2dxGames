(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Framework/SimpleMVC/Patterns/Controller.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc1c7dy8upN47mwXaX+y2CL', 'Controller', __filename);
// scripts/Common/Framework/SimpleMVC/Patterns/Controller.js

"use strict";

/**
  @author : shilong
  @time: 2017-07-24
  @description: Controller类 (PureMVC中Command + Mediator的集合体)
**/
cc.Class({
    extends: cc.Component,

    properties: {
        _controllerName: "",
        _touchListenerId: -1,
        _listenerHandle: null
    },

    /**
     * 发送请求
     * @param name
     * @param body
     */
    sendNotification: function sendNotification(name, body) {
        cc.ss.Facade.sendNotification(name, body);
    },

    //设置controller名字
    setControllerName: function setControllerName(name) {
        this._controllerName = name;
    },

    onRegister: function onRegister() {
        //子类可重写
    },

    onRemove: function onRemove() {
        //子类可重写
    },

    //返回Controller 名字
    getControllerName: function getControllerName() {
        return this._controllerName;
    },

    //获取控制的Notification 数组
    getHandleNotificationList: function getHandleNotificationList() {
        return [];
    },

    //接受通知
    onNotification: function onNotification(notification) {
        //子类必须重写，才能处理通知
    }, /**
       * 获取全局持久化节点
       * @param  {[type]} name [description]
       * @return {[type]}      [description]
       */
    findNode: function findNode(name) {
        return cc.find(name);
    },

    /**
     * 全局查找node后获取组件
     * @param  {[type]} nodeName [description]
     * @param  {[type]} comp     [description]
     * @return {[type]}          [description]
     */
    getCompByGlobalNode: function getCompByGlobalNode(nodeName, comp) {
        return cc.find(node).getComponent(comp);
    },

    /**
     * 通过节点获取组件
     * @param  {[type]} node [description]
     * @param  {[type]} comp [description]
     * @return {[type]}      [description]
     */
    getCompByNode: function getCompByNode(node, comp) {
        return node.getComponent(comp);
    },

    /**
         * 通过节点获取组件
         * @param  {[type]} node [description]
         * @param  {[type]} comp [description]
         * @return {[type]}      [description]
         */
    getCompByLocalNode: function getCompByLocalNode(node, comp) {
        return node.getComponent(comp);
    },

    //schedule once
    timerOnce: function timerOnce(callback, delay) {
        this.scheduleOnce(callback, delay);
    },

    //schedule repeate
    timerAlways: function timerAlways(callback, duration) {
        this.schedule(callback, duration, cc.macro.REPEAT_FOREVER);
    },

    //schedule run in repeatTimes
    timer: function timer(callback, duration, repeatTimes) {
        this.schedule(callback, duration, repeatTimes);
    },

    //stop all schedule timer
    stopAllTimer: function stopAllTimer() {
        this.unscheduleAllCallbacks();
    },

    //stop scheduler by callbackPointer
    stopTimer: function stopTimer(scheduleID) {
        this.unschedule(scheduleID);
    },

    registerTouchEvent: function registerTouchEvent() {
        console.log("调用");
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function onTouchBegan(touches, event) {
                return true;
            },
            onTouchMoved: function onTouchMoved(event) {},
            onTouchEnded: function onTouchEnded(event) {}
        };

        this._listenerHandle = cc.eventManager.addListener(listener, this.node);
    },

    unregisterEvent: function unregisterEvent() {
        if (this._listenerId !== -1) {
            cc.eventManager.removeListener(this._listenerHandle);
        }
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
        //# sourceMappingURL=Controller.js.map
        