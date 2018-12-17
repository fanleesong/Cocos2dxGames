const PointConvertUtil = require('PointConvert');

const THRESHOLD = 20;
const directValue = cc.Enum({
    DIR_LEFT: 0,
    DIR_RIGHT: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {

        _startTouchPosition: cc.p(0, 0),
        _endTouchPosition: cc.p(0, 0),
        preBustPic: cc.Node,
        curBustPic: cc.Node,
        nextBustPic: cc.Node,
        _constWidth: 0,

    },

    onLoad() {
        // this.node.on('CHECK', function (event) {
        //     console.log("[SelectView]--->" + event.detail.msg);
        // });
        this.registerEvent();
        this._constWidth = cc.find('touchNode', this.node).width;
    },

    registerEvent() {
        //touchstart 可以换成cc.Node.EventType.TOUCH_START
        this.node.on('touchstart', this.onEventStart, this);
        //touchmove 可以换成cc.Node.EventType.TOUCH_MOVE
        this.node.on('touchmove', this.onEventMove, this);
        //touchcancel 可以换成cc.Node.EventType.TOUCH_CANCEL
        this.node.on('touchcancel', this.onEventCancel, this);
        //touchend 可以换成cc.Node.EventType.TOUCH_END
        this.node.on('touchend', this.onEventEnd, this);
    },

    init(data) {

    },

    /**
     * 触摸开始
     * @param {*} event
     */
    onEventStart(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        let localPoint = PointConvertUtil.worldConvertLocalPointAR(this.node, worldPoint);
        // let localPoint = PointConvertUtil.worldConvertLocalPoint(this.node, worldPoint);
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
        // let localPoint = PointConvertUtil.worldConvertLocalPoint(this.node, worldPoint);
        // console.log('move Move \n worldPoint=', JSON.stringify(worldPoint), 'localPoint=', JSON.stringify(localPoint));

        /**
         *
         * if (isClickOfficerMove){
        Vec2 moveDelta = pTouch->getDelta();
        m_bustPic->setPositionX(m_bustPic->getPositionX() + moveDelta.x);

        Size winSize = CCDirector::getInstance()->getWinSize();
        m_preBustPic->setPositionX(m_bustPic->getPositionX() - winSize.width);
        m_nextBustPic->setPositionX(m_bustPic->getPositionX() + winSize.width);
    }
         *
         */
        let middleX = Math.abs(localPoint.x - this._startTouchPosition.x);
        let winSize = cc.director.getWinSize();
        this.curBustPic.x = this.curBustPic.x + middleX;
        this.preBustPic.x = this.curBustPic.x - winSize.width / 2 - this._constWidth / 2;
        this.nextBustPic.x = this.curBustPic.x + winSize.width / 2 + this._constWidth / 2;
        // if (localPoint.x > this._startTouchPosition.x) {
        //     this.curBustPic.x = this.curBustPic.x + middleX;
        //     this.preBustPic.x = this.curBustPic.x - winSize.width;
        //     this.nextBustPic.x=this.curBustPic.x + winSize.width;
        // } else {
        //     this.curBustPic.x = this.curBustPic.x - middleX;
        //     this.preBustPic.x = this.curBustPic.x - winSize.width;
        //     this.nextBustPic.x=this.curBustPic.x + winSize.width;
        // }

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
        // let localPoint = PointConvertUtil.worldConvertLocalPoint(this.node, worldPoint);
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
        if (this._endTouchPosition.x > this._startTouchPosition.x
            && Math.abs(this._endTouchPosition.x - this._startTouchPosition.x) >= THRESHOLD) {
            console.log('[onEventEnd]向右滑动');
            this.node.emit('RIGHT', {
                msg: '----------测试通知这是向右滑动-----------',
            });
        } else if (this._endTouchPosition.x < this._startTouchPosition.x
            && Math.abs(this._endTouchPosition.x - this._startTouchPosition.x) >= THRESHOLD) {
            console.log('[onEventEnd]向左滑动');

            this.node.emit('LEFT', {
                msg: '----------测试通知这是向左滑动-----------',
            });

        } else {

            this.node.emit('CENTER', {
                msg: '----------测试通知这是无滑动-----------',
            });
            console.log('[onEventEnd]没有滑动');


            let max_dt = 0.1;
            let winSize = cc.director.getWinSize();
            this.preBustPic.stopAllActions();
            this.curBustPic.stopAllActions();
            this.nextBustPic.stopAllActions();

            let dt = max_dt * Math.abs(this.curBustPic.x - winSize.width / 2.0 - this._constWidth / 2) / (winSize.width / 2.0);
            let moveTo1 = cc.moveTo(dt, cc.p(-this._constWidth / 2 - winSize.width / 2, this.curBustPic.y));
            let moveTo2 = cc.moveTo(dt, cc.p(0, this.curBustPic.y));
            let moveTo3 = cc.moveTo(dt, cc.p(this._constWidth / 2 + winSize.width / 2, this.curBustPic.y));
            this.preBustPic.runAction(moveTo1);
            this.curBustPic.runAction(moveTo2);
            this.nextBustPic.runAction(moveTo3);

        }
    },

    update(dt) {

    },

    onDestroy() {
    }
});
