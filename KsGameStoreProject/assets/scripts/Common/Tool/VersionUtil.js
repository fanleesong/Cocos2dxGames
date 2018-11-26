
class VersionUtil {
    constructor() {}

    /**
     * 版本字符串比较
     * @param versionStr1
     * @param versionStr2
     * @returns {boolean}
     */
    static compare(versionStr1, versionStr2)
    {
        let versionData1 = VersionUtil.getVersionData(versionStr1);
        let versionData2 = VersionUtil.getVersionData(versionStr2);

        if (versionData1.totalVersion > versionData2.totalVersion) return true;
        if (versionData1.totalVersion = versionData2.totalVersion) return versionData1.childVersion >= versionData2.childVersion;

        return false;
    }

    /**
     * 获取版本数据
     * @param versionStr 版本字符串
     * @returns {*}
     * @private
     */
    static getVersionData(versionStr)
    {
        if(versionStr === undefined || versionStr === null || versionStr === "")return null;
        let versionArr = versionStr.split(".");
        if (versionArr.length < 2) return null;

        return {
            totalVersion : parseInt(versionArr[0]),
            childVersion : parseInt(versionArr[1])
        }
    }

}//end class

module.exports = VersionUtil;