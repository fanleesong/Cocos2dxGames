const MD5Lib = require('MD5Lib');
const Base64Lib = require('Base64Lib').Base64;


module.exports = {
    md5Encode : function (data) {
        return MD5Lib.MD5Encode(data);
    },

    base64Encode : function (data) {
        return Base64Lib.encode(data);
    },

    base64Decode : function (data) {
        return Base64Lib.decode(data);
    }
};

