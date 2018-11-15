cc.Class({
    extends: cc.Component,

    properties: {
        _itemName : null,
        _itemType : null,
        _itemTime : null,
        _isHave : null,
        _clickCallback:null,
        _listenerId: -1,

    },

    // use this for initialization
    onLoad: function () {

        // this._registerTouchEvent();

        this.node.on("click",(ev)=>{
            if (this._clickCallback !== null) this._clickCallback();
        });


    },

    initShopItemWithData: function (data = null,pageIndex,callback=null) {
        this._itemName = data.itemName + " < " + (pageIndex + 1) + " > ";
        this._itemType = data.itemType;
        this._isHave = data.isHave;
        this._clickCallback = callback;

        let itemName = cc.find("itemName",this.node);
        let itemType = cc.find("itemType",this.node);
        let isHave = cc.find("isHave",this.node);

        itemName.getComponent(cc.Label).string = (this._itemName !== null) ? this._itemName : "无名字";
        itemType.getComponent(cc.Label).string = (this._itemType !== null) ? this._itemType : "无类型";
        isHave.getComponent(cc.Label).string = (this._isHave === true) ? "已获得" : "未获得";
    },


    _registerTouchEvent: function () {
        let listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touches, event) {
                return true;
            },
            onTouchMoved: function (event) {
            },
            onTouchEnded: function (event) {
            }
        };

        this._listenerId = cc.eventManager.addListener(listener, this.node);
    },



    onDestroy : function () {

        // cc.eventManager.removeListener(this._listenerId);
        
    }




});
