const CryptUtil = require('CryptUtil');

class LocalDataStorage
{
    /**
     *  写入数据到本地
     * @param key
     * @param value
     */
    _writeToLocal(key, value) {
        cc.sys.localStorage.setItem(key, value);
    }

    _writeToLocalWithCrypt(key, value)
    {
        if (value === null || value === undefined) throw  new Error('[LocalDataStorage]value 不能为空null或undefined');
        let encodeValue = CryptUtil.base64Encode(value);
        cc.sys.localStorage.setItem(key, encodeValue);
    }

    /**
     * 从本地读取数据
     * @param key
     * @returns {*}
     */
    _readFromLocal(key) {

        return cc.sys.localStorage.getItem(key);
    }

    _readFromLocalWithCrypt(key)
    {
        let value = cc.sys.localStorage.getItem(key);
        if (value === null || value === undefined) return null;

        return CryptUtil.base64Decode(value);
    }


    setString(key, value)
    {
        this._writeToLocalWithCrypt(key, value);
    }


    getString(key)
    {
        return this._readFromLocalWithCrypt(key);
    }

    getBool(key)
    {
        let value = this._readFromLocal(key);
        if (value === null) return false;
        return value === "true";
    }

    setBool(key, value)
    {
        let writeValue = value === true ? "true" : "false";
        this._writeToLocal(key, writeValue);
    }
}//end class


module.exports = LocalDataStorage;
