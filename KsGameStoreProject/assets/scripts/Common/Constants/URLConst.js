const {EnvConfig, Env_Config_Type} = require('GameConfig');

/**
 *
 * URL 地址
 */
const URLConst = {
    //打点
    ReportPointURL_Debug : "http://weixin.kaishustory.com/sts/t/v1/pagelog/accesslogs",//test测试环境
    ReportPointURL_Gamma : "http://weixin.kaishustory.com/sts/v1/pagelog/accesslogs",//gamma预上线环境
    ReportPointURL_Release : "http://weixin.kaishustory.com/sts/v1/pagelog/accesslogs",//release生产环境

    //游戏中心 -
    BASE_GAME_CENTER_DEV : "http://dapi.kaishustory.com/game-center/",//开发环境
    BASE_GAME_CENTER_TEST : "http://tapi.kaishustory.com/game-center/",//test环境
    BASE_GAME_CENTER_GAMMA : "http://gapi.kaishustory.com/game-center/",//gamma地址
    BASE_GAME_CENTER_RELEASE : "http://api.kaishustory.com/game-center/",//release地址


    ///////////////////////////////////////////////////地址///////////////////////////////////////////////////////////////////////////

    //用户信息-新
    UserInfo : "v1/user",

    //消耗体力-新
    ConsumeLife : "v1/hp/consume",

    //获取体力-新
    GetLife : "v1/hp",


    /**
     * 获取URLBase
     */
    getURLBase : function () {
        let envMode = EnvConfig.EnvMode;
        if (envMode === Env_Config_Type.Env_Config_Type_Test) {
            console.log("[URLConst]URLBase=>当前为test测试环境");
            return URLConst.BASE_GAME_CENTER_TEST;
        }else if (envMode === Env_Config_Type.Env_Config_Type_Gamma) {
            console.log("[URLConst]URLBase=>当前为gamma预上线环境");
            return URLConst.BASE_GAME_CENTER_GAMMA;//默认
        }else if (envMode === Env_Config_Type.Env_Config_Type_Release) {
            console.log("[URLConst]URLBase=>当前为release上线环境");
            return URLConst.BASE_GAME_CENTER_RELEASE;//生产环境
        }else if (envMode === Env_Config_Type.Env_Config_Type_Dev) {
            console.log("[URLConst]URLBase=>当前为dev开发环境");
            return URLConst.BASE_GAME_CENTER_DEV;//开发环境
        }
        return URLConst.BASE_GAME_CENTER_TEST;//默认
    },

    /**
     * 获取报点地址
     */
    getReportPointURL : function () {
        let envMode = EnvConfig.EnvMode;
        if (envMode === Env_Config_Type.Env_Config_Type_Test || envMode === Env_Config_Type.Env_Config_Type_Dev) {
            console.log("[URLConst]打点URL -- test测试环境");
            return URLConst.ReportPointURL_Debug;
        }else if (envMode === Env_Config_Type.Env_Config_Type_Gamma) {
            console.log("[URLConst]打点URL -- gamma预上线环境");
            return URLConst.ReportPointURL_Gamma;
        }else if (envMode === Env_Config_Type.Env_Config_Type_Release) {
            console.log("[URLConst]打点URL -- release生产环境");
            return URLConst.ReportPointURL_Release;
        }

        return URLConst.ReportPointURL_Debug;
    },

    /**
     * 获取初始化数据信息地址
     * @returns {string}
     */
    getUserInfoURL :function () { return URLConst.getURLBase() + URLConst.UserInfo; },

    /**
     * 获取消耗体力地址
     */
    getConsumeLifeURL() { return URLConst.getURLBase() + URLConst.ConsumeLife; },

    /**
     * 获取体力值地址
     */
    getLifeURL() { return URLConst.getURLBase() + URLConst.GetLife; },
};

module.exports = URLConst;
