"use strict";
cc._RF.push(module, '01ca4tStvVH+JmZ5TNcmuAu', 'AudioMng');
// scripts/AudioMng.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        winAudio: {
            default: null,
            type: cc.AudioClip
        },

        loseAudio: {
            default: null,
            type: cc.AudioClip
        },

        cardAudio: {
            default: null,
            type: cc.AudioClip
        },

        buttonAudio: {
            default: null,
            type: cc.AudioClip
        },

        chipsAudio: {
            default: null,
            type: cc.AudioClip
        },

        bgm: {
            default: null,
            type: cc.AudioClip
        }
    },

    playMusic: function playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    pauseMusic: function pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function resumeMusic() {
        cc.audioEngine.resumeMusic();
    },

    _playSFX: function _playSFX(clip) {
        cc.audioEngine.playEffect(clip, false);
    },

    playWin: function playWin() {
        this._playSFX(this.winAudio);
    },

    playLose: function playLose() {
        this._playSFX(this.loseAudio);
    },

    playCard: function playCard() {
        this._playSFX(this.cardAudio);
    },

    playChips: function playChips() {
        this._playSFX(this.chipsAudio);
    },

    playButton: function playButton() {
        this._playSFX(this.buttonAudio);
    }
});

cc._RF.pop();