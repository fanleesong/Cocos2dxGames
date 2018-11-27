"use strict";
cc._RF.push(module, '3c16c3le6hCsrtnanqK8N2W', 'Mask');
// scripts/module/Mask.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('touchstart', function (event) {
            event.stopPropagation();
        });
        this.node.on('mousedown', function (event) {
            event.stopPropagation();
        });
        this.node.on('mousemove', function (event) {
            event.stopPropagation();
        });
        this.node.on('mouseup', function (event) {
            event.stopPropagation();
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();