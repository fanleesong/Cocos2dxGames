(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Tool/Crypt/CryptUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fee019MVehGsogHTZJ8+u9w', 'CryptUtil', __filename);
// scripts/Common/Tool/Crypt/CryptUtil.js

'use strict';

var MD5Lib = require('MD5Lib');
var Base64Lib = require('Base64Lib').Base64;

module.exports = {
    md5Encode: function md5Encode(data) {
        return MD5Lib.MD5Encode(data);
    },

    base64Encode: function base64Encode(data) {
        return Base64Lib.encode(data);
    },

    base64Decode: function base64Decode(data) {
        return Base64Lib.decode(data);
    }
};

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
        //# sourceMappingURL=CryptUtil.js.map
        