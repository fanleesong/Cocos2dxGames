"use strict";
cc._RF.push(module, '2db08jFZqNN+rw8vpeF4j70', 'UpdatePanel');
// scripts/UI/UpdatePanel.js

"use strict";

module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        info: cc.Label,
        fileProgress: cc.ProgressBar,
        fileLabel: cc.Label,
        byteProgress: cc.ProgressBar,
        byteLabel: cc.Label,
        close: cc.Node,
        checkBtn: cc.Node,
        retryBtn: cc.Node,
        updateBtn: cc.Node
    },

    onLoad: function onLoad() {
        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.parent.active = false;
        }, this);
    }
});

cc._RF.pop();