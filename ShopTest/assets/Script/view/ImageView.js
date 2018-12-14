cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {
    },

    initUIWithData: function (index) {
        cc.find('tip', this.node).getComponent(cc.Label).string = index;
    },

    _registerTouchEvent: function () {

        let listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touches, event) {
                return true;
            },
            onTouchMoved: function (touches, event) {
            },
            onTouchEnded: function (touches, event) {

                //获取手指触摸结束时的位置
                let location = touches.getLocation();
                let real = cc.director.getScene().convertToNodeSpace(location);
                console.log("结束点location： " + JSON.stringify(location) + "    real:  " + real);


            }
        };

        this._listenerId = cc.eventManager.addListener(listener, this.node);
    },

    onDestroy: function () {

    }

});
