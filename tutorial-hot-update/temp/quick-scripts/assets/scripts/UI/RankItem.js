(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/UI/RankItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1657ewfijBOXLq5zGqr6PvE', 'RankItem', __filename);
// scripts/UI/RankItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        spRankBG: {
            default: null,
            type: cc.Sprite
        },
        labelRank: {
            default: null,
            type: cc.Label
        },
        labelPlayerName: {
            default: null,
            type: cc.Label
        },
        labelGold: {
            default: null,
            type: cc.Label
        },
        spPlayerPhoto: {
            default: null,
            type: cc.Sprite
        },
        texRankBG: {
            default: [],
            type: cc.SpriteFrame
        },
        texPlayerPhoto: {
            default: [],
            type: cc.SpriteFrame
            // ...
        } },

    // use this for initialization
    init: function init(rank, playerInfo) {
        if (rank < 3) {
            // should display trophy
            this.labelRank.node.active = false;
            this.spRankBG.spriteFrame = this.texRankBG[rank];
        } else {
            this.labelRank.node.active = true;
            this.labelRank.string = (rank + 1).toString();
        }

        this.labelPlayerName.string = playerInfo.name;
        this.labelGold.string = playerInfo.gold.toString();
        this.spPlayerPhoto.spriteFrame = this.texPlayerPhoto[playerInfo.photoIdx];
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=RankItem.js.map
        