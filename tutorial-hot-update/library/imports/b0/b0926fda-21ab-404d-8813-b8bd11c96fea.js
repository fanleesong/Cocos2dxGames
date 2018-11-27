"use strict";
cc._RF.push(module, 'b0926/aIatATYgTuL0RyW/q', 'CounterTest');
// scripts/CounterTest.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // ...
        target: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.target.node.color = cc.Color.GREEN;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();