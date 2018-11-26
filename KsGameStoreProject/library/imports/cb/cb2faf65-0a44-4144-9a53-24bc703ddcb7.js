"use strict";
cc._RF.push(module, 'cb2fa9lCkRBRJpTJLxwPdy3', 'Med');
// scripts/Common/Framework/SimpleMVC/Core/Med.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  @author : shilong
  @time: 2017-07-24
  @description: Med类 --（Controller管理类）
**/
var Observer = require('Observer');

var Med = function () {
    function Med() {
        _classCallCheck(this, Med);

        this._observerMap = [];
        this._controllerMap = [];
    }
    //获取View 静态实例


    _createClass(Med, [{
        key: 'registerController',


        //注册组件
        value: function registerController(controller) {
            if (this._controllerMap[controller.getControllerName()] != null) {
                return;
            }
            this._controllerMap[controller.getControllerName()] = controller;

            var wantHandleList = controller.getHandleNotificationList();
            var observer = new Observer();
            observer.lazyInit(controller.onNotification, controller);

            for (var i = 0; i < wantHandleList.length; i++) {
                this.registerObserver(wantHandleList[i], observer);
            }

            controller.onRegister();
        }

        //注册监听器

    }, {
        key: 'registerObserver',
        value: function registerObserver(notificationName, observer) {
            if (this._observerMap[notificationName] != null) {
                this._observerMap[notificationName].push(observer);
            } else {
                this._observerMap[notificationName] = [observer];
            }
        }

        //通知

    }, {
        key: 'notifyObservers',
        value: function notifyObservers(notification) {
            if (this._observerMap[notification.getName()] != null) {
                var observerArr = this._observerMap[notification.getName()];
                for (var i = 0; i < observerArr.length; i++) {
                    var observer = observerArr[i];
                    observer.notifyObserver(notification);
                }
            }
        }

        //移除Controller

    }, {
        key: 'removeController',
        value: function removeController(controllerName) {
            var controller = this._controllerMap[controllerName];
            if (controller) {
                var handleList = controller.getHandleNotificationList();

                //删除Observer
                for (var i = 0; i < handleList.length; i++) {
                    this.removeObserver(handleList[i], controller);
                }
                //从map中删除controller
                delete this._controllerMap[controllerName];
                controller.onRemove();
            }
        }
    }, {
        key: 'removeObserver',
        value: function removeObserver(notificationName, notifyContext) {
            var observers = this._observerMap[notificationName];
            for (var i = 0; i < observers.length; i++) {
                var observer = observers[i];
                if (observer.compareNotifyContext(notifyContext) === true) {
                    observers.splice(i, 1);
                    break;
                }
            }

            if (observers.length === 0) {
                //如果长度为空,删除整个item
                delete this._observerMap[notificationName];
            }
        }
    }], [{
        key: 'getMed',
        value: function getMed() {
            if (this._medInstance === null || this._medInstance === undefined) {
                this._medInstance = new Med();
                console.log('[Med]\u521D\u59CB\u5316Model\u9759\u6001\u5B9E\u4F8B');
            }
            return this._medInstance;
        }
    }]);

    return Med;
}(); //end class

module.exports = Med;

//
// const Med = cc.Class({
//
//     //静态变量
//     statics : {
//       _medInstance : null,
//
//       //获取View 静态实例
//       getMed : function() {
//           if (this._medInstance === null) {
//             this._medInstance = new  Med();
//           }
//           return this._medInstance;
//       },
//     },
//
//     //对象变量
//     properties: {
//       _observerMap : [],
//       _controllerMap : []
//     },
//
//     //注册组件
//     registerController : function(controller) {
//       if (this._controllerMap[controller.getControllerName()] != null) {
//         return;
//       }
//       this._controllerMap[controller.getControllerName()] = controller;
//
//       let wantHandleList = controller.getHandleNotificationList();
//       let observer = new Observer();
//       observer.lazyInit(controller.onNotification, controller);
//
//       for (var i = 0; i < wantHandleList.length; i++) {;
//         this.registerObserver(wantHandleList[i], observer);
//       }
//
//       controller.onRegister();
//     },
//
//     //注册监听器
//     registerObserver : function(notificationName, observer) {
//       if (this._observerMap[notificationName] != null) {
//           this._observerMap[notificationName].push(observer);
//       }else{
//           this._observerMap[notificationName] = [observer];
//        }
//     },
//
//     //通知
//     notifyObservers : function(notification) {
//       // console.log("View notifyObservers");
//       // console.log(notification.getName());
//       // console.log(notification.getBody());
//       if (this._observerMap[notification.getName()] != null) {
//           let observerArr = this._observerMap[notification.getName()];
//
//           for (var i = 0; i < observerArr.length; i++) {
//             let observer = observerArr[i];
//             observer.notifyObserver(notification);
//           }
//       }
//     },
//
//     //移除Controller
//     removeController : function(controllerName) {
//       let controller =  this._controllerMap[controllerName];
//       if (controller) {
//         let handleList = controller.getHandleNotificationList();
//
//         //删除Observer
//         for (var i = 0; i < handleList.length; i++) {
//           this.removeObserver(handleList[i], controller);
//         }
//
//         //从map中删除controller
//         delete this._controllerMap[controllerName];
//         controller.onRemove();
//
//       }
//     },
//
//     removeObserver : function(notificationName, notifyContext) {
//         let observers = this._observerMap[notificationName];
//         for (var i = 0; i < observers.length; i++) {
//           let observer = observers[i];
//           if (observer.compareNotifyContext(notifyContext) === true) {
//               observers.splice(i, 1);
//               // console.log("成功删除");
//               break;
//           }
//         }
//
//         if (observers.length === 0) {//如果长度为空,删除整个item
//             delete this._observerMap[notificationName];
//         }
//     },
//
// });

cc._RF.pop();