"use strict";
cc._RF.push(module, '14462+TtURIr75SRIinoIUl', 'Facade');
// scripts/Common/Framework/SimpleMVC/Core/Facade.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  @author : shilong
  @time: 2017-07-24
  @description: Facade SimpleMVC入口
**/

var Model = require("Model");
var Med = require("Med");
var Notification = require("Notification");

var Facade = function () {
    function Facade() {
        _classCallCheck(this, Facade);

        this._model = null;
        this._controller = null;
        this._med = null;
    }

    _createClass(Facade, [{
        key: "lazyInit",


        //延迟初始化
        value: function lazyInit() {
            this._model = Model.getModel();
            this._med = Med.getMed();
        }

        //发送消息

    }, {
        key: "sendNotification",
        value: function sendNotification(notificationName, body, type) {
            var notification = new Notification();
            notification.lazyInit(notificationName, body, type);
            this._med.notifyObservers(notification);
        }

        //注册Controller

    }, {
        key: "registerController",
        value: function registerController(controller) {
            this._med.registerController(controller);
        }
        //移除Controller

    }, {
        key: "removeController",
        value: function removeController(controller) {
            this._med.removeController(controller.getControllerName());
        }

        //注册Model - Proxy

    }, {
        key: "registerProxy",
        value: function registerProxy(proxyInstance) {
            this._model.registerProxy(proxyInstance);
        }

        //移除Model - Proxy

    }, {
        key: "removeProxy",
        value: function removeProxy(proxyName) {
            this._model.removeProxy(proxyName);
        }

        //获取proxy

    }, {
        key: "getProxy",
        value: function getProxy(proxyName) {
            return this._model.getProxy(proxyName);
        }
    }], [{
        key: "getFacade",
        value: function getFacade() {
            if (this._instance === null || this._instance === undefined) {
                console.log('[Facade]初始化Facade静态实例');
                this._instance = new Facade();
                this._instance.lazyInit();
            }
            return this._instance;
        }
    }]);

    return Facade;
}();

module.exports = Facade;
//
// /**
//   Facade类
// **/
// var Facade = cc.Class({
//
//     properties: {
//         _model : null,
//         _controller : null,
//         _med : null,
//     },
//
//     statics : {
//         _instance :null,
//
//         getFacade : function() {
//             if (this._instance == null) {
//                 this._instance = new Facade();
//                 this._instance.lazyInit();
//             }
//             return this._instance;
//         },
//
//     },
//
//     //延迟初始化
//     lazyInit :function () {
//       this._model = Model.getModel();
//       this._med = Med.getMed();
//     },
//
//     //发送消息
//     sendNotification : function(notificationName, body, type) {
//       if (this._med != null) {
//         // console.log("Facade - 发送消息");
//         var notification = new Notification();
//         notification.lazyInit(notificationName, body, type);
//         this._med.notifyObservers(notification);
//       }
//     },
//
//     //注册Controller
//     registerController :function(controller) {
//       if (this._med != null) {
//           this._med.registerController(controller);
//       }
//
//     },
//
//     //移除Controller
//     removeController : function(controller) {
//       if (this._med != null) {
//           this._med.removeController(controller.getControllerName());
//       }
//     },
//
//
//     //注册Model - Proxy
//     registerProxy : function(proxyInstance) {
//       if (this._model != null) {
//           this._model.registerProxy(proxyInstance);
//       }
//     },
//
//     //移除Model - Proxy
//     removeProxy : function(proxyName){
//       if (this._model != null) {
//           this._model.removeProxy(proxyName);
//       }
//     },
//
//     //获取proxy
//     getProxy : function(proxyName){
//         return this._model.getProxy(proxyName);
//     },
// });

cc._RF.pop();