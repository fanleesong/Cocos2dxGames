const JsonAdItem = require('jsonItem');
// const  NotificationCenter = require('NotificationCenter');

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        _listenerId: -1,
        _adItemList: [],

    },

    // use this for initialization
    onLoad: function () {

        // cc.ss = {};
        // cc.ss.notice = new NotificationCenter();

        // cc.ss.notice.on('CHECK', function (event) {
        //     console.log("[SelectView]--->" + event.detail.msg);
        // });
        cc.find("TouchNode",this.node).on('CHECK', function (event) {
            console.log("[SelectView]--->" + event.detail.msg);
        });

        this._registerTouchEvent();
        this._initSomeData();
    },

    _initSomeData: function () {

        this._adItemList = JsonAdItem;
        let adNode = cc.find("adNode", this.node);
        let alignX = 10;
        for (let i = 0; i < this._adItemList.length; i++) {
            let prefab = cc.instantiate(this.itemPrefab);
            prefab.getComponent('ShopItem').initShopItemWithData(this._adItemList[i], i);
            prefab.setPositionX(2 * i * (prefab.width / 2) + i * alignX);
            adNode.addChild(prefab);
        }
        adNode.width = this._adItemList.length * 650;
        adNode.height = 350;

    },

    _registerTouchEvent: function () {

        let self = this;
        let listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touches, event) {
                // console.log("------>开始<------");

                return true;
            },
            onTouchMoved: function (touches, event) {
            },
            onTouchEnded: function (touches, event) {
                //获取手指触摸结束时的位置
                let location = touches.getLocation();
                let real = cc.director.getScene().convertToNodeSpace(location);
                console.log("结束点location： " + JSON.stringify(location) + "    real:  " + real);
                let adNode = cc.find("adNode", self.node);
                if (adNode.getBoundingBox().contains(real) === true){
                    console.log("------>结束<------ 接触到");
                }
            }
        };

        this._listenerId = cc.eventManager.addListener(listener, this.node);
    },

    onDestroy: function () {

        cc.eventManager.removeListener(this._listenerId);

    },


});
