"use strict";
cc._RF.push(module, 'fee019MVehGsogHTZJ8+u9w', 'CryptUtil');
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