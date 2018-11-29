//var ResManager = require('ResManager');
(function (global, factory) {

    /* AMD */ if (typeof define === 'function' && define["amd"])
        define(["MyUtils"], factory);
    /* CommonJS */ else if (typeof require === "function" && typeof module === "object" && module && module["exports"])
        module["exports"] = factory(require("MyUtils"), true);
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["MyUtils"] = factory(global["dcodeIO"]["MyUtils"]);

})(this, function (MyUtils, isCommonJS) {
    "use strict";
    //MyUtils 
    var MyUtils = {};
    MyUtils.parePortTypte = function (nRoomID) {
        // begin(2) , portTypeCrypt (2),commonNum(2)
        var nComNum = nRoomID % 100;
        var portTypeCrypt = (parseInt(nRoomID / 100)) % 100;
        if (nComNum >= 50) {
            portTypeCrypt = portTypeCrypt + 100 - nComNum;
        } else {
            portTypeCrypt = portTypeCrypt + 100 + nComNum;
        }
        return (portTypeCrypt %= 100);
    }
    MyUtils.eConnectState = {
        eConnect_SeverFull: 0,
        eConnect_Accepted: 1,
        eConnect_Failed: 2,
        eConnect_Banned: 3,
        eConnect_AlreadyConnected: 4,
        eConnect_Max: 5,
    }
    MyUtils.eRoomType = {
        eGame_None: 0,
        eGame_NiuNiu: 1,
        eGame_BiJi: 2,
        eGame_CYDouDiZhu: 3,
        eGame_JJDouDiZhu: 4,
        eGame_TestMJ: 5,
        eGame_Max: 6,
    }
    MyUtils.eDecideBankerType = {
        eDecideBank_NiuNiu: 0,
        eDecideBank_OneByOne: 1,
        eDecideBank_LookCardThenRobot: 2,
        eDecideBank_RandomBanker: 3,
        eDecideBank_Max: 4,
    }
    MyUtils.eRoomState = {
        // new state 
        eRoomSate_WaitReady: 0,
        eRoomState_StartGame: 1,
        eRoomState_Common_Max: 20,

        // niu niu special ;
        eRoomState_DecideBanker: 21,
        eRoomState_RobotBanker: 21,
        eRoomState_DistributeFirstCard: 22,
        eRoomState_DoBet: 23,
        eRoomState_DistributeCard: 24,
        eRoomState_DistributeFinalCard: 24,
        eRoomState_CaculateNiu: 25,
        eRoomState_GameEnd: 26,
        eRoomState_NN_Max: 50,

        // mj specail ;
        eRoomState_WaitPlayerAct: 51,  // 等待玩家操作 { idx : 0 , huaCard : 23 }
        eRoomState_DoPlayerAct: 52,  // 玩家操作 // { idx : 0 ,huIdxs : [1,3,2,], act : eMJAct_Chi , card : 23, invokeIdx : 23, eatWithA : 23 , eatWithB : 22 }
        eRoomState_AskForRobotGang: 53, // 询问玩家抢杠胡， { invokeIdx : 2 , card : 23 }
        eRoomState_WaitPlayerChu: 54, // 等待玩家出牌 { idx : 2 }
        eRoomState_MJ_Common_Max: 80,

        // bj specail 
        eRoomState_BJ_Make_Group: 81,
        eRoomState_BJ_Max: 100,
        // dou di zhu specail 
        eRoomState_DDZ_Chu: 101,
        eRoomState_JJ_DDZ_Ti_La_Chuai: 102,
        eRoomState_JJ_DDZ_Chao_Zhuang: 103,

    }
    MyUtils.playerState = function (state1, state2) {
        return (state1 & state2) == state2;
    }
    MyUtils.eRoomPeerState = {
        eRoomPeer_None: 0,
        // peer state for taxas poker peer
        eRoomPeer_SitDown: 1,
        eRoomPeer_StandUp: 2,
        eRoomPeer_Ready: 4097,
        eRoomPeer_StayThisRound: 5,
        eRoomPeer_WaitCaculate: 133,
        eRoomPeer_AllIn: 141,
        eRoomPeer_GiveUp: 21,
        eRoomPeer_CanAct: 165,
        eRoomPeer_WaitNextGame: 65,
        eRoomPeer_WithdrawingCoin: 256,  // when invoke drawing coin , must be sitdown , but when staup up , maybe in drawingCoin state 
        eRoomPeer_LackOfCoin: 513,
        eRoomPeer_WillLeave: 1026,
        eRoomPeer_Looked: 8357,
        eRoomPeer_PK_Failed: 16389,

        eRoomPeer_SysAutoAct: (1 << 18),//托管
        eRoomPeer_AlreadyHu: 32933,  //  已经胡牌的状态
        eRoomPeer_DelayLeave: 131072,  //  牌局结束后才离开

        eRoomPeer_Max: 131072 + 1,
    };
    MyUtils.WXErrCode = {
        WXSuccess: 0,    /**< 成功    */
        WXErrCodeCommon: -1,   /**< 普通错误类型    */
        WXErrCodeUserCancel: -2,   /**< 用户点击取消并返回    */
        WXErrCodeSentFail: -3,   /**< 发送失败    */
        WXErrCodeAuthDeny: -4,   /**< 授权失败    */
        WXErrCodeUnsupport: -5,   /**< 微信不支持    */
    };

    MyUtils.PlatForm = {
        CC_PLATFORM_UNKNOWN: 0,
        CC_PLATFORM_IOS: 1,
        CC_PLATFORM_ANDROID: 2,
        CC_PLATFORM_WIN32: 3,
        CC_PLATFORM_MARMALADE: 4,
        CC_PLATFORM_LINUX: 5,
        CC_PLATFORM_BADA: 6,
        CC_PLATFORM_BLACKBERRY: 7,
        CC_PLATFORM_MAC: 8,
        CC_PLATFORM_NACL: 9,
        CC_PLATFORM_EMSCRIPTEN: 10,
        CC_PLATFORM_TIZEN: 11,
        CC_PLATFORM_QT5: 12,
        CC_PLATFORM_WINRT: 13,
    }
    MyUtils.ePayChannel = {
        ePay_AppStore: 0,
        ePay_WeChat: 1,
        ePay_WeChat_365Niu: 1,
        ePay_ZhiFuBao: 2,
        ePay_XiaoMi: 3,
        ePay_WeChat_365Golden: 4,
        ePay_Max: 5,
    };
    MyUtils.eCardType = {
        eCard_None: 0,
        eCard_Diamond: 0, // fangkuai
        eCard_Club: 1, // cao hua
        eCard_Heart: 2, // hong tao
        eCard_Sword: 3, // hei tao 
        eCard_NoJoker: 4,
        eCard_Joker: 4, // xiao wang
        eCard_BigJoker: 5, // da wang
        eCard_Max: 6,
    }
    MyUtils.eMailType = {
        eMail_Wechat_Pay: 0, // { ret : 0 , diamondCnt : 23 }  // ret : 1 means verify error 
        eMail_AppleStore_Pay: 1, // { ret : 0 , diamondCnt : 23 }   // ret : 1 means verify error 
        eMail_Agent_AddCard: 2, // { agentID : 23 , serialNo : 2345 , cardOffset : 23 }
        eMail_Consume_Diamond: 3,  // { diamond : 23 , roomID :23, reason : 0 } 
        eMail_GiveBack_Diamond: 4, // { diamond : 23 , roomID :23, reason : 0  } 

        // above is new ;
        eMail_SysOfflineEvent: 5,// { event: concret type , arg:{ arg0: 0 , arg 1 = 3 } }  // processed in svr , will not send to client ;
        eMail_DlgNotice: 6, // content will be send by , stMsgDlgNotice 
        eMail_Sys_End: 499,

        eMail_RealMail_Begin: 500, // will mail will show in golden server windown ;
        eMail_PlainText: 501,  // need not parse , just display the content ;
        eMail_InvitePrize: 502, // { targetUID : 2345 , addCoin : 300 } // you invite player to join game ,and give prize to you 
        eMail_Max: 503,
    }
    MyUtils.eMailState = {
        eMailState_Unread: 0,
        eMailState_WaitSysAct: 1,
        eMailState_WaitPlayerAct: 2,
        eMailState_SysProcessed: 3,
        eMailState_Delete: 4,
        eMailState_Max: 5,
    }
    MyUtils.GetType = function (cardNum) {
        if (cardNum == 53) {
            return MyUtils.eCardType.eCard_Joker;
        }
        else if (cardNum == 54) {
            return MyUtils.eCardType.eCard_BigJoker;
        }
        else {
            return parseInt((cardNum - 1) / 13);
        }
    }
    MyUtils.GetCardNum = function (faceNum, type) {
        if (faceNum == 53) {
            return 53;
        } else if (faceNum == 54) {
            return 54;
        }
        else {
            return faceNum + type * 13;
        }
    }
    MyUtils.GetCardFaceNum = function (cardNum) {
        if (cardNum == 53) {
            return 53;
        }
        else if (cardNum == 54) {
            return 54;
        }
        else {
            var m_eType = parseInt((cardNum - 1) / 13);
            return cardNum - m_eType * 13;
        }
    }
    MyUtils.getCardNameByCompsiteNum = function (cardNum) {
        if (cardNum == 53 || cardNum == 54) {
            return "" + cardNum;
        }
        var nType = 0;
        switch (MyUtils.GetType(cardNum)) {
            case MyUtils.eCardType.eCard_Diamond:
                nType = 4;
                break;
            case MyUtils.eCardType.eCard_Heart:
                nType = 2;
                break;
            case MyUtils.eCardType.eCard_Sword:
                nType = 1;
                break;
            case MyUtils.eCardType.eCard_Club:
                nType = 3;
                break;
            default:
                break;
        }

        if (MyUtils.GetCardFaceNum(cardNum) == 1) {
            return "card-" + nType + "0e";
        } else if (MyUtils.GetCardFaceNum(cardNum) <= 9) {
            return "card-" + nType + "0" + MyUtils.GetCardFaceNum(cardNum);
        } else {
            if (MyUtils.GetCardFaceNum(cardNum) % 10 == 0) {
                return "card-" + nType + "0a";
            } else if (MyUtils.GetCardFaceNum(cardNum) % 10 == 1) {
                return "card-" + nType + "0b";
            } else if (MyUtils.GetCardFaceNum(cardNum) % 10 == 2) {
                return "card-" + nType + "0c";
            } else if (MyUtils.GetCardFaceNum(cardNum) % 10 == 3) {
                return "card-" + nType + "0d";
            } else if (MyUtils.GetCardFaceNum(cardNum) % 10 == 4) {
                return "card-" + nType + "0e";
            }
        }
    }
    MyUtils.cloneWaitMsgLayer = function (info, tag, isStopAct) {
        var newNode = cc.instantiate(ResManager.getRes("WaitMsgLayer"));
        newNode.tag = tag;
        cc.director.getScene().addChild(newNode);
        newNode.getComponent('WaitMsgLayer').setInfoString(info, isStopAct);
    }
    MyUtils.clonePromptDialogLayer = function (info, is, tag) {
        var newNode = cc.instantiate(ResManager.getRes("PromptDialogLayer"));
        cc.director.getScene().addChild(newNode);
        newNode.getComponent('PromptDialogLayer').setShowData(is, info);
        if (tag > 0) {
            newNode.tag = tag;
        }
    }
    MyUtils.cloneMyMessageBoxLayer = function (info, callback, type, tag) {
        var newNode = cc.instantiate(ResManager.getRes("MyMessageBox"));
        cc.director.getScene().addChild(newNode);
        newNode.getComponent('MyMessageBox').setCallBack(callback, info, type);
        if (tag > 0) {
            newNode.tag = tag;
        }
    }
    return MyUtils;
});