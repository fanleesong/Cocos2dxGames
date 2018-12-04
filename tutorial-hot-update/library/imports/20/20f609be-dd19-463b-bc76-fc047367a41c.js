"use strict";
cc._RF.push(module, '20f60m+3RlGO7x2/ARzZ6Qc', 'Menu');
// scripts/Menu.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.audioMng = this.audioMng.getComponent('AudioMng');
        this.audioMng.playMusic();
    },

    playGame: function playGame() {
        cc.director.loadScene('table');
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();