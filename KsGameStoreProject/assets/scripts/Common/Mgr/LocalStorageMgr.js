
const USER_BGM_SETTING_PREFIX = "ksgamestore-bgm-";
const USER_SOUND_SETTING_PREFIX = "ksgamestore-sound-";
const USER_VOICE_SETTING_PREFIX = "ksgamestore-voice-";
const USER_PERSISTENCE_MEDAL_ID_PREFIX = "ksgamestore-medal-id-persistence-";
const USER_FIT_IPHONEX_TOP_BTN_POSITION_PREFIX = "ksgamestore-fit-iphonex-top-btn-position-";

//storage 本地读取
const LocalDataStorage = require('LocalDataStorage');

class LocalStorageMgr {
    constructor() {
        this._localDataStorage = new LocalDataStorage();
    }

    //////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////

    isVoiceOpen(userId) {
        let saverTag = USER_VOICE_SETTING_PREFIX + userId;
        let rlt = this._localDataStorage.getBool(saverTag);
        return !rlt;
    }

    setVoiceState(userId, newState) {
        let saverTag = USER_VOICE_SETTING_PREFIX + userId;
        this._localDataStorage.setBool(saverTag, !newState);
    }


    isSoundOpen(userId) {
        let saverTag = USER_SOUND_SETTING_PREFIX + userId;
        let rlt = this._localDataStorage.getBool(saverTag);
        return !rlt;
    }

    isBgmOpen(userId) {
        let saverTag = USER_BGM_SETTING_PREFIX + userId;
        let rlt = this._localDataStorage.getBool(saverTag);
        return !rlt;
    }

    setSoundState(userId, newState) {
        let saverTag = USER_SOUND_SETTING_PREFIX + userId;
        this._localDataStorage.setBool(saverTag, !newState);
    }

    setBgmState(userId, newState) {
        let saverTag = USER_BGM_SETTING_PREFIX + userId;
        this._localDataStorage.setBool(saverTag, !newState);
    }

    /**
     * 存储本地缓存勋章列表
     * @param userId
     * @param medalList
     */
    setPersistenceMedalList(userId, medalList) {
        let jsonStr = JSON.stringify(medalList);
        let saverTag = USER_PERSISTENCE_MEDAL_ID_PREFIX + userId;
        this._localDataStorage.setString(saverTag, jsonStr);
    }

    /**
     * 获取本地缓存勋章列表
     * @param userId
     * @returns {*}
     */
    getPersistenceMedalList(userId) {
        let saverTag = USER_PERSISTENCE_MEDAL_ID_PREFIX + userId;
        return this._localDataStorage.getString(saverTag);


    }

    /**
     * 存储适配iphoneX顶部关闭按钮的位置
     * @param userId
     * @param newPosition
     */
    setUserFitIphoneXTopButtonPosition(userId,newPosition){
        let positionJson = {
            iphoneXPos: newPosition,
        };
        let saverTag = USER_FIT_IPHONEX_TOP_BTN_POSITION_PREFIX + userId;
        this._localDataStorage.setString(saverTag, JSON.stringify(positionJson));

    }

    /**
     * 获取适配iphoneX顶部关闭按钮的位置
     * @param userId
     * @returns {*}
     */
    getUserFitIphoneXTopButtonPosition(userId){
        let saverTag = USER_FIT_IPHONEX_TOP_BTN_POSITION_PREFIX + userId;
        return this._localDataStorage.getString(saverTag);
    }

    //end class LocalStorageMgr
}

module.exports = LocalStorageMgr;
