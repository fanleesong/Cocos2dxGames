/**
 * 用户信息缓存Mgr
 */
class UserInfoCacheMgr
{
    constructor()
    {
        this._gameMaxPopBuyDialogPopTimes = 3;
        this._gameStarTips = "";
        this._userId = "";
        this._userName = "";
        this._headIconURL = "";
        this._deviceId = "";
        this._appVersion = "";
        this._currentRunningSceneName = "";
        this._userStarNum = 0;
        this._userLevel = "";
        this._enterGameSceneType = 0;

        this._buyProduct = 0;//是否购买商品
        this._productId = -1;//商品id
        this._productType  = -1;//商品类型
    }



    /**
     * 获取转换成json字符串的商品信息
     * @returns {string}
     */
    getUserProductInfoString()
    {
        let info = {};
        info.gameType = 1; //超级诗词游戏类型
        info.buyProduct = this.buyProduct;
        info.productId = this.productId;
        info.contentType = this.productType;

        return JSON.stringify(info);
    }


    get buyProduct() {
        return this._buyProduct;
    }

    set buyProduct(value) {
        this._buyProduct = value;
    }

    get productId() {
        return this._productId;
    }

    set productId(value) {
        this._productId = value;
    }

    get productType() {
        return this._productType;
    }

    set productType(value) {
        this._productType = value;
    }

    get gameMaxPopBuyDialogPopTimes() {
        return this._gameMaxPopBuyDialogPopTimes;
    }

    set gameMaxPopBuyDialogPopTimes(value) {
        this._gameMaxPopBuyDialogPopTimes = value;
    }

    get gameStarTips() {
        return this._gameStarTips;
    }

    set gameStarTips(value) {
        this._gameStarTips = value;
    }

    get enterGameSceneType() {
        return this._enterGameSceneType;
    }

    set enterGameSceneType(value) {
        this._enterGameSceneType = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get headIconURL() {
        return this._headIconURL;
    }

    set headIconURL(value) {
        this._headIconURL = value;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get appVersion() {
        return this._appVersion;
    }

    set appVersion(value) {
        this._appVersion = value;
    }

    get currentRunningSceneName() {
        return this._currentRunningSceneName;
    }

    set currentRunningSceneName(value) {
        this._currentRunningSceneName = value;
    }

    get userStarNum() {
        return this._userStarNum;
    }

    set userStarNum(value) {
        this._userStarNum = value;
    }

    get userLevel() {
        return this._userLevel;
    }

    set userLevel(value) {
        this._userLevel = value;
    }



    toString()
    {
        console.log(`[UserInfoCacheMgr]userId:${this.userId} == userName:${this.userName} == userHeadIconURL:${this.headIconURL} == userStarNum:${this.userStarNum} == userLevel:${this.userLevel}`);
        console.log(`[UserInfoCacheMgr]appVersion:${this.appVersion} == deviceId:${this.deviceId}`);
    }
}//end class UserInfoCacheMgr

module.exports = UserInfoCacheMgr;