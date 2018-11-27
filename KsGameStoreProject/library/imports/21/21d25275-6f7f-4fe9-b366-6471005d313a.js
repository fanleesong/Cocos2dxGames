"use strict";
cc._RF.push(module, '21d25J1b39P6bNmZHEAXTE6', 'Notification');
// scripts/Common/Framework/SimpleMVC/Patterns/Notification.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  @author : shilong
  @time: 2017-07-24
  @description: Notification 通知类
**/

var Notification = function () {
    function Notification() {
        _classCallCheck(this, Notification);

        this._notiName = "";
        this._notiBody = null;
        this._notiType = 0;
    }

    _createClass(Notification, [{
        key: "lazyInit",
        value: function lazyInit(name, body, type) {
            this._notiName = name;
            this._notiBody = body;
            this._notiType = type;
        }
    }, {
        key: "getType",
        value: function getType() {
            return this._notiType;
        }
    }, {
        key: "getBody",
        value: function getBody() {
            return this._notiBody;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this._notiName;
        }
    }]);

    return Notification;
}(); //end class Notification

module.exports = Notification;

cc._RF.pop();