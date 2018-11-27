"use strict";
cc._RF.push(module, '3ea99nIII1L2JSHVpJkqzhn', 'Observer');
// scripts/Common/Framework/SimpleMVC/Patterns/Observer.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  @author : shilong
  @time: 2017-07-24
  @description: 观察者类
**/
var Observer = function () {
    function Observer() {
        _classCallCheck(this, Observer);

        this._notifyMethod = null; // 回调方法
        this._notifyContext = null; //回调上下文
    }

    _createClass(Observer, [{
        key: "lazyInit",
        value: function lazyInit(notifyMethod, notifyContext) {
            this._notifyMethod = notifyMethod;
            this._notifyContext = notifyContext;
        }
    }, {
        key: "getNotifyMethod",
        value: function getNotifyMethod() {
            return this._notifyMethod;
        }
    }, {
        key: "getNotifyContext",
        value: function getNotifyContext() {
            return this._notifyContext;
        }

        //调用回调方法并传入notification对象

    }, {
        key: "notifyObserver",
        value: function notifyObserver(notification) {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
        }

        //比较

    }, {
        key: "compareNotifyContext",
        value: function compareNotifyContext(obj) {
            return obj === this._notifyContext;
        }
    }]);

    return Observer;
}(); //end class

module.exports = Observer;

//
// cc.Class({
//     properties: {
//         _notifyMethod : null, // 回调方法
//         _notifyContext : null //回调上下文
//     },
//
//     // use this for initialization
//     onLoad: function () {
//
//     },
//
//     lazyInit : function(notifyMethod, notifyContext) {
//       this._notifyMethod = notifyMethod;
//       this._notifyContext = notifyContext;
//     },
//
//     getNotifyMethod : function() {
//       return this._notifyMethod;
//     },
//
//     getNotifyContext : function() {
//       return this._notifyContext;
//     },
//
//     //调用回调方法并传入notification对象
//     notifyObserver :function(notification) {
//         // console.log("NotifyObserver  --- >notifyObserver");
//         this.getNotifyMethod().call(this.getNotifyContext(), notification);
//     },
//
//     //比较
//     compareNotifyContext : function (obj) {
//         return obj === this._notifyContext;
//     },
//
// });

cc._RF.pop();