"use strict";
cc._RF.push(module, 'd696bcqspxG8aP62hx22lOO', 'GameConfig');
// scripts/AppDelegate/GameConfig.js

"use strict";

/**
 * 环境变量
 */
var Env_Config_Type = cc.Enum({
    Env_Config_Type_Dev: 0, //开发环境
    Env_Config_Type_Test: 1, //测试环境
    Env_Config_Type_Gamma: 2, //预上线换环境
    Env_Config_Type_Release: 3 //生产模式
});

/**
 * 资源加载类型
 */
var RES_TYPE = cc.Enum({
    RES_TYPE_IMAGE: 0,
    RES_TYPE_AUDIO: 1

});
/**
 * 加载资源列表
 * @type {*[]}
 */
var ResourceList = [{
    path: "img/share",
    type: RES_TYPE.RES_TYPE_IMAGE
}, {
    path: "img/gameStore",
    type: RES_TYPE.RES_TYPE_IMAGE
}, {
    path: "audio/music",
    type: RES_TYPE.RES_TYPE_AUDIO
}, {
    path: "audio/sfx",
    type: RES_TYPE.RES_TYPE_AUDIO
}];

// todo:打包前必修改
/**
 * 1.上线改为false
 * 2.切换对应环境
 *      Env_Config_Type_Dev 开发环境
 *      Env_Config_Type_Test 测试环境
 *      Env_Config_Type_Gamma 预上线环境
 *      Env_Config_Type_Release 生产环境
 */
var EnvConfig = {
    Debug: true,
    EnvMode: Env_Config_Type.Env_Config_Type_Dev
};

module.exports = {
    ResourceList: ResourceList,
    EnvConfig: EnvConfig,
    Env_Config_Type: Env_Config_Type,
    RES_TYPE: RES_TYPE
};

cc._RF.pop();