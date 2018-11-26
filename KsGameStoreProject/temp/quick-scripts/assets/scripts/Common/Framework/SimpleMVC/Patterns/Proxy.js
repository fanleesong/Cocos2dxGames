(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Framework/SimpleMVC/Patterns/Proxy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fdee81w3LpHKqcUaxdgxuFW', 'Proxy', __filename);
// scripts/Common/Framework/SimpleMVC/Patterns/Proxy.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  @author : shilong
  @time: 2017-07-24
  @description: Proxy类
**/

var Facade = require('Facade');

var Proxy = function () {
    function Proxy() {
        _classCallCheck(this, Proxy);
    }

    _createClass(Proxy, [{
        key: 'onRegister',
        value: function onRegister() {
            console.log('[Proxy]onRegister');
        }
    }, {
        key: 'onRemove',
        value: function onRemove() {
            console.log('[Proxy]onRemove');
        }
    }, {
        key: 'sendNotification',
        value: function sendNotification(name, body, type) {
            var facade = Facade.getFacade();
            if (facade) facade.sendNotification(name, body, type);
        }
    }, {
        key: 'getProxyName',
        value: function getProxyName() {
            return "";
        }
    }]);

    return Proxy;
}(); //end class Proxy

module.exports = Proxy;

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
        //# sourceMappingURL=Proxy.js.map
        