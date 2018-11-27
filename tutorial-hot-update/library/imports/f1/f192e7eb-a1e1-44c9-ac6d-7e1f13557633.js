"use strict";
cc._RF.push(module, 'f192efroeFEyaxtfh8TVXYz', 'InGameUI');
// scripts/UI/InGameUI.js

'use strict';

var Game = require('Game');

cc.Class({
    extends: cc.Component,

    properties: {
        panelChat: {
            default: null,
            type: cc.Node
        },
        panelSocial: {
            default: null,
            type: cc.Node
        },
        betStateUI: {
            default: null,
            type: cc.Node
        },
        gameStateUI: {
            default: null,
            type: cc.Node
        },
        resultTxt: {
            default: null,
            type: cc.Label
        },
        betCounter: {
            default: null,
            type: cc.Node
        },
        btnStart: {
            default: null,
            type: cc.Node
        },
        labelTotalChips: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    init: function init(betDuration) {
        this.panelChat.active = false;
        this.panelSocial.active = false;
        this.resultTxt.enabled = false;
        this.betStateUI.active = true;
        this.gameStateUI.active = false;
        // this.resultStateUI.active = false;
        this.btnStart.active = false;
        this.betDuration = betDuration;
        this.progressTimer = this.initCountdown();
    },

    initCountdown: function initCountdown() {
        var countdownTex = Game.instance.assetMng.texBetCountdown.getTexture();
        this.sgCountdown = new _ccsg.Sprite(countdownTex);
        this.sgCountdown.setColor(cc.Color.BLACK);

        var progressTimer = new cc.ProgressTimer(this.sgCountdown);
        progressTimer.setName('progressTimer');
        progressTimer.setMidpoint(cc.v2(0.5, 0.5));
        progressTimer.setType(cc.ProgressTimer.Type.RADIAL);
        progressTimer.reverseDir = true;
        this.betCounter._sgNode.addChild(progressTimer);
        progressTimer.setPosition(cc.v2(0, -this.betCounter.height / 2));
        progressTimer.setPercentage(0);

        return progressTimer;
    },

    startCountdown: function startCountdown() {
        if (this.progressTimer) {
            var fromTo = cc.progressFromTo(this.betDuration, 0, 100);
            this.progressTimer.runAction(fromTo);
        }
    },

    resetCountdown: function resetCountdown() {
        if (this.progressTimer) {
            this.progressTimer.stopAllActions();
            this.progressTimer.setPercentage(100);
        }
    },

    showBetState: function showBetState() {
        this.betStateUI.active = true;
        this.gameStateUI.active = false;
        this.btnStart.active = false;
    },

    showGameState: function showGameState() {
        this.betStateUI.active = false;
        this.gameStateUI.active = true;
        this.btnStart.active = false;
    },

    showResultState: function showResultState() {
        this.betStateUI.active = false;
        this.gameStateUI.active = false;
        this.btnStart.active = true;
    },

    toggleChat: function toggleChat() {
        this.panelChat.active = !this.panelChat.active;
    },

    toggleSocial: function toggleSocial() {
        this.panelSocial.active = !this.panelSocial.active;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();