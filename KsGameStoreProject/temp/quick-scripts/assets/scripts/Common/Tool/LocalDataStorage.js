(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/LocalDataStorage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '45868n/udxADYgRsnvZ+0EL', 'LocalDataStorage', __filename);
// scripts/Common/Tool/LocalDataStorage.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CryptUtil = require('CryptUtil');

var LocalDataStorage = function () {
    function LocalDataStorage() {
        _classCallCheck(this, LocalDataStorage);
    }

    _createClass(LocalDataStorage, [{
        key: '_writeToLocal',

        /**
         *  写入数据到本地
         * @param key
         * @param value
         */
        value: function _writeToLocal(key, value) {
            cc.sys.localStorage.setItem(key, value);
        }
    }, {
        key: '_writeToLocalWithCrypt',
        value: function _writeToLocalWithCrypt(key, value) {
            if (value === null || value === undefined) throw new Error('[LocalDataStorage]value 不能为空null或undefined');
            var encodeValue = CryptUtil.base64Encode(value);
            cc.sys.localStorage.setItem(key, encodeValue);
        }

        /**
         * 从本地读取数据
         * @param key
         * @returns {*}
         */

    }, {
        key: '_readFromLocal',
        value: function _readFromLocal(key) {

            return cc.sys.localStorage.getItem(key);
        }
    }, {
        key: '_readFromLocalWithCrypt',
        value: function _readFromLocalWithCrypt(key) {
            var value = cc.sys.localStorage.getItem(key);
            if (value === null || value === undefined) return null;

            return CryptUtil.base64Decode(value);
        }
    }, {
        key: 'setString',
        value: function setString(key, value) {
            this._writeToLocalWithCrypt(key, value);
        }
    }, {
        key: 'getString',
        value: function getString(key) {
            return this._readFromLocalWithCrypt(key);
        }
    }, {
        key: 'getBool',
        value: function getBool(key) {
            var value = this._readFromLocal(key);
            if (value === null) return false;
            return value === "true";
        }
    }, {
        key: 'setBool',
        value: function setBool(key, value) {
            var writeValue = value === true ? "true" : "false";
            this._writeToLocal(key, writeValue);
        }
    }]);

    return LocalDataStorage;
}(); //end class


module.exports = LocalDataStorage;

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
        //# sourceMappingURL=LocalDataStorage.js.map
        