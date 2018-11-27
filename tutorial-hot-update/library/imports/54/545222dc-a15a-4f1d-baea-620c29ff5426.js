"use strict";
cc._RF.push(module, '54522LcoVpPHbrqYgwp/1Qm', 'AssetMng');
// scripts/AssetMng.js

"use strict";

var AssetMng = cc.Class({
    extends: cc.Component,

    properties: {
        texBust: {
            default: null,
            type: cc.SpriteFrame
        },
        texCardInfo: {
            default: null,
            type: cc.SpriteFrame
        },
        texCountdown: {
            default: null,
            type: cc.SpriteFrame
        },
        texBetCountdown: {
            default: null,
            type: cc.SpriteFrame
        },
        playerPhotos: {
            default: [],
            type: cc.SpriteFrame
        }
    }
});

cc._RF.pop();