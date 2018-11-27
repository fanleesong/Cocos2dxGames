(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Framework/SimpleMVC/Core/Model.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aee1bkLg4BPFrh0zNeK5U8O', 'Model', __filename);
// scripts/Common/Framework/SimpleMVC/Core/Model.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  @author : shilong
  @time: 2017-07-24
  @description: Model类 --(Proxy管理单例类)
**/

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);

        this._proxyMap = [];
    }

    _createClass(Model, [{
        key: "registerProxy",
        value: function registerProxy(proxy) {
            this._proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        }
    }, {
        key: "removeProxy",
        value: function removeProxy(proxyName) {
            var proxy = this._proxyMap[proxyName];
            if (proxy) {
                this._proxyMap[proxyName] = null;
                proxy.onRemove();
            }
        }
    }, {
        key: "getProxy",
        value: function getProxy(proxyName) {
            return this._proxyMap[proxyName];
        }
    }], [{
        key: "getModel",
        value: function getModel() {
            if (this._instance === null || this._instance === undefined) {
                this._instance = new Model();
                console.log("[Model]\u521D\u59CB\u5316Model\u9759\u6001\u5B9E\u4F8B");
            }
            return this._instance;
        }
    }]);

    return Model;
}();

module.exports = Model;

//
// var Model = cc.Class({
//     properties: {
//       _proxyMap : [],
//     },
//
//     statics : {
//       _instance : null,
//
//       getModel : function () {
//         if (this._instance === null) {
//           this._instance = new Model();
//         }
//         return this._instance;
//
//       },
//     },
//
//     registerProxy : function(proxy) {
//       // console.log(proxy.getProxyName());
//       this._proxyMap[proxy.getProxyName()] = proxy;
//       proxy.onRegister();
//     },
//
//     getProxy :function(proxyName) {
//       return this._proxyMap[proxyName];
//     },
//
//     removeProxy : function(proxyName) {
//       let proxy = this._proxyMap[proxyName];
//       if (proxy) {
//           this._proxyMap[proxyName] = null;
//           // console.log("删除proxy");
//           proxy.onRemove();
//       }
//     },
// });

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
        //# sourceMappingURL=Model.js.map
        