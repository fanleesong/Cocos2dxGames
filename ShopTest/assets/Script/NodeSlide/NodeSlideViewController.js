const PointConvertUtil = require('PointConvert');
const THRESHOLD = 100;

const directValue = cc.Enum({
    DIR_LEFT: 0,
    DIR_CENTER: 1,
    DIR_RIGHT: 2,
});

cc.Class({
    extends: cc.Component,

    properties: {

        _imageList: [],
        m_preBustPic: cc.Node,
        m_curBustPic: cc.Node,
        m_nextBustPic: cc.Node,

        m_preIndex: 0,
        m_curIndex: 0,
        m_nextIndex: 0,
        _isSlideDirection: cc.Enum,


        _startTouchPosition: cc.p(0, 0),
        _endTouchPosition: cc.p(0, 0),
        _constWidth: 0,
        _isCanMove: false,


        pageView: cc.PageView,


        // ...
    },

    // use this for initialization
    onLoad: function () {

        // cc.find('touchNode', this.node).on('LEFT', (event) => {
        //     console.log("[NodeSlideView]------------->左滑动");
        //     this._isSlideDirection = directValue.DIR_LEFT;
        // });
        //
        // cc.find('touchNode', this.node).on('RIGHT', (event) => {
        //     console.log("[NodeSlideView]------------->右滑动");
        //     this._isSlideDirection = directValue.DIR_RIGHT;
        // });
        //
        // cc.find('touchNode', this.node).on('CENTER', (event) => {
        //     console.log("[NodeSlideView]------------->无滑动");
        //     this._isSlideDirection = directValue.DIR_CENTER;
        // });

        // this.node.on('LEFT', (event) => {
        //     console.log("[NodeSlideView]------------->左滑动");
        //     this._isSlideDirection = directValue.DIR_LEFT;
        //     let count = this._imageList.length;
        //     this.m_curIndex = this.m_preIndex;
        //     this.m_preIndex = (this.m_curIndex + count - 1) % count;
        //     this.m_nextIndex = (this.m_curIndex + count + 1) % count;
        //
        //     this._scrollBannerView(this._isSlideDirection);
        //
        // });
        //
        // this.node.on('RIGHT', (event) => {
        //     console.log("[NodeSlideView]------------->右滑动");
        //     this._isSlideDirection = directValue.DIR_RIGHT;
        //
        //     let count = this._imageList.length;
        //     this.m_curIndex = this.m_preIndex;
        //     this.m_preIndex = (this.m_curIndex + count - 1) % count;
        //     this.m_nextIndex = (this.m_curIndex + count + 1) % count;
        //
        //     this._scrollBannerView(this._isSlideDirection);
        //
        //
        // });

        this._registerTouchEvent();
        this._initImageList();
        this._initUI();

    },


    _registerTouchEvent() {
        //touchstart 可以换成cc.Node.EventType.TOUCH_START
        this.node.on('touchstart', this.onEventStart, this);
        //touchmove 可以换成cc.Node.EventType.TOUCH_MOVE
        this.node.on('touchmove', this.onEventMove, this);
        //touchcancel 可以换成cc.Node.EventType.TOUCH_CANCEL
        this.node.on('touchcancel', this.onEventCancel, this);
        //touchend 可以换成cc.Node.EventType.TOUCH_END
        this.node.on('touchend', this.onEventEnd, this);
    },

    _initUI: function () {

        this._constWidth = cc.find('touchNode', this.node).width;
        let count = this._imageList.length;
        this.m_curIndex = 1;
        this.m_preIndex = (this.m_curIndex + count - 1) % count;
        this.m_nextIndex = (this.m_curIndex + count + 1) % count;

        console.log("[NodeSlide]----上一个：" + this.m_preIndex + "  当前： " + this.m_curIndex + "  下一个： " + this.m_nextIndex);


        this.m_preBustPic.removeAllChildren(true);
        let preSp = this._imageList[this.m_preIndex];
        this.m_preBustPic.addChild(preSp);

        this.m_curBustPic.removeAllChildren(true);
        let curSp = this._imageList[this.m_curIndex];
        this.m_curBustPic.addChild(curSp);

        this.m_nextBustPic.removeAllChildren(true);
        let nextSp = this._imageList[this.m_nextIndex];
        this.m_nextBustPic.addChild(nextSp);

        this.m_preBustPic.stopAllActions();
        this.m_curBustPic.stopAllActions();
        this.m_nextBustPic.stopAllActions();

    },

    _initImageList: function () {

        for (let i = 0; i < 5; i++) {
            let name = "slide" + i;
            let spNode = new cc.Node(name);
            // spNode.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/img/scrollBackground/bg" + (i + 1) + ".png"));
            spNode.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/img/numbg/bg" + (i + 1) + ".png"));
            this._imageList.push(spNode);
        }

    },

    _scrollBannerView: function (direction) {

        let winSize = cc.director.getWinSize();
        let max_dt = 0.2;
        if (this._isSlideDirection === directValue.DIR_LEFT) {

            this.m_nextBustPic.stopAllActions();
            this.m_curBustPic.stopAllActions();
            let dt = max_dt * Math.abs(this.m_nextBustPic.x - winSize.width / 2.0) / (winSize.width / 2.0 + this._constWidth / 2);
            let moveTo = cc.moveTo(dt, cc.p(0, this.m_curBustPic.y));
            let moveTo2 = cc.moveTo(dt, cc.p(-this._constWidth / 2 - winSize.width / 2, this.m_curBustPic.y));
            this.m_nextBustPic.runAction(moveTo);
            this.m_curBustPic.runAction(cc.sequence(moveTo2, cc.callFunc(() => {
                console.log("-----向左滑动---动作完成");
                // this._updateBannerImage();

                this.m_curBustPic.removeAllChildren(true);
                let curSp = this._imageList[this.m_curIndex];
                this.m_curBustPic.addChild(curSp);

                this.m_nextBustPic.removeAllChildren(true);
                let nextSp = this._imageList[this.m_nextIndex];
                this.m_nextBustPic.addChild(nextSp);

                this.m_preBustPic.removeAllChildren(true);
                let preSp = this._imageList[this.m_preIndex];
                this.m_preBustPic.addChild(preSp);

            })));


        } else if (this._isSlideDirection === directValue.DIR_RIGHT) {

            this.m_preBustPic.stopAllActions();
            this.m_curBustPic.stopAllActions();
            let dt = max_dt * Math.abs(this.m_preBustPic.x - winSize.width / 2.0) / (winSize.width / 2.0 + this._constWidth / 2);
            let moveTo = cc.moveTo(dt, cc.p(0, this.m_curBustPic.y));
            let moveTo2 = cc.moveTo(dt, cc.p(this._constWidth / 2 + winSize.width / 2, this.m_curBustPic.y));
            this.m_preBustPic.runAction(moveTo);
            this.m_curBustPic.runAction(cc.sequence(moveTo2, cc.callFunc(() => {
                console.log("-----向右滑动---动作完成");
                // this._updateBannerImage();

                this.m_curBustPic.removeAllChildren(true);
                let curSp = this._imageList[this.m_curIndex];
                this.m_curBustPic.addChild(curSp);

                this.m_preBustPic.removeAllChildren(true);
                let preSp = this._imageList[this.m_preIndex];
                this.m_preBustPic.addChild(preSp);

                this.m_nextBustPic.removeAllChildren(true);
                let nextSp = this._imageList[this.m_nextIndex];
                this.m_nextBustPic.addChild(nextSp);

            })));

        }
    },

    _updateBannerImage: function () {
        this.m_preBustPic.removeAllChildren(true);
        let preSp = this._imageList[this.m_preIndex];
        this.m_preBustPic.addChild(preSp);

        this.m_curBustPic.removeAllChildren(true);
        let curSp = this._imageList[this.m_curIndex];
        this.m_curBustPic.addChild(curSp);

        this.m_nextBustPic.removeAllChildren(true);
        let nextSp = this._imageList[this.m_nextIndex];
        this.m_nextBustPic.addChild(nextSp);
    },


    /**
     * 触摸开始
     * @param {*} event
     */
    onEventStart(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        let localPoint = PointConvertUtil.worldConvertLocalPointAR(this.node, worldPoint);
        this._startTouchPosition = localPoint;
        // console.log('start Event \n worldPoint=', JSON.stringify(worldPoint), 'localPoint=', JSON.stringify(localPoint));

    },

    /**
     * 触摸移动
     * @param {*} event
     */
    onEventMove(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        let localPoint = PointConvertUtil.worldConvertLocalPointAR(this.node, worldPoint);
        // console.log('move Move \n worldPoint=', JSON.stringify(worldPoint), 'localPoint=', JSON.stringify(localPoint));

        let middleX = Math.abs(localPoint.x - this._startTouchPosition.x);
        let winSize = cc.director.getWinSize();
        if (localPoint.x > this._startTouchPosition.x) {
            this.m_curBustPic.x = this.m_curBustPic.x + middleX;
        } else if (localPoint.x < this._startTouchPosition.x) {
            this.m_curBustPic.x = this.m_curBustPic.x - middleX;
        }

        // this.curBustPic.x = this.curBustPic.x + middleX;
        this.m_preBustPic.x = this.m_curBustPic.x - winSize.width / 2 - this._constWidth / 2;
        this.m_nextBustPic.x = this.m_curBustPic.x + winSize.width / 2 + this._constWidth / 2;

    },

    /**
     * 触摸
     * 当手指在目标节点区域外离开屏幕时
     * 比如说，触摸node的size是200x200。
     * 当超过这个区域时，就是触发这个事件
     * @param {*} event
     */
    onEventCancel(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        let localPoint = PointConvertUtil.worldConvertLocalPointAR(this.node, worldPoint);
        // console.log('cancel Event \n worldPoint=', JSON.stringify(worldPoint), 'localPoint=', JSON.stringify(localPoint));

    },

    /**
     * 当手指在目标节点区域内离开屏幕时
     * @param {*} event
     */
    onEventEnd(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        let localPoint = PointConvertUtil.worldConvertLocalPointAR(this.node, worldPoint);
        // let localPoint = PointConvertUtil.worldConvertLocalPoint(this.node, worldPoint);
        this._endTouchPosition = localPoint;
        // console.log('end Event \n worldPoint=', JSON.stringify(worldPoint), 'localPoint=', JSON.stringify(localPoint));
        // console.log('end Event \n 结束点坐标-> ' + JSON.stringify(this._endTouchPosition));
        // console.log('end Event \n 开始点坐标-> ' + JSON.stringify(this._startTouchPosition));
        // if(this.m_curBustPic.getNumberOfRunningActions === 0){

            if (this._endTouchPosition.x > this._startTouchPosition.x
                && Math.abs(this._endTouchPosition.x - this._startTouchPosition.x) >= THRESHOLD) {
                console.log('[onEventEnd]向右滑动');
                this._isSlideDirection = directValue.DIR_RIGHT;

                let count = this._imageList.length;
                this.m_curIndex = this.m_preIndex;
                this.m_preIndex = (this.m_curIndex + count - 1) % count;
                this.m_nextIndex = (this.m_curIndex + count + 1) % count;

                this._scrollBannerView(this._isSlideDirection);


            } else if (this._endTouchPosition.x < this._startTouchPosition.x
                && Math.abs(this._endTouchPosition.x - this._startTouchPosition.x) >= THRESHOLD) {
                console.log('[onEventEnd]向左滑动');

                this._isSlideDirection = directValue.DIR_LEFT;
                let count = this._imageList.length;
                this.m_curIndex = this.m_nextIndex;
                this.m_preIndex = (this.m_curIndex + count - 1) % count;
                this.m_nextIndex = (this.m_curIndex + count + 1) % count;

                this._scrollBannerView(this._isSlideDirection);

            } else {

                console.log('[onEventEnd]没有滑动');
                let max_dt = 0.1;
                let winSize = cc.director.getWinSize();
                this.m_preBustPic.stopAllActions();
                this.m_curBustPic.stopAllActions();
                this.m_nextBustPic.stopAllActions();

                let dt = max_dt * Math.abs(this.m_curBustPic.x - winSize.width / 2.0 - this._constWidth / 2) / (winSize.width / 2.0);
                let moveTo1 = cc.moveTo(dt, cc.p(-this._constWidth / 2 - winSize.width / 2, this.m_curBustPic.y));
                let moveTo2 = cc.moveTo(dt, cc.p(0, this.m_curBustPic.y));
                let moveTo3 = cc.moveTo(dt, cc.p(this._constWidth / 2 + winSize.width / 2, this.m_curBustPic.y));
                this.m_preBustPic.runAction(moveTo1);
                this.m_curBustPic.runAction(moveTo2);
                this.m_nextBustPic.runAction(moveTo3);

            }

        // }

    },



    onDestroy: function () {

    }


});
