const PointConvertUtil = require('PointConvert');

const THRESHOLD = 20;
const directValue = cc.Enum({
    LEFT:0,
    RIGHT:1,
});

cc.Class({
    extends: cc.Component,

    properties: {

        _startTouchPosition : cc.p(0,0),
        _endTouchPosition : cc.p(0,0),

    },

    onLoad() {
        // this.node.on('CHECK', function (event) {
        //     console.log("[SelectView]--->" + event.detail.msg);
        // });
        this.registerEvent();
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
        this._endTouchPosition = localPoint;
        // console.log('end Event \n worldPoint=', JSON.stringify(worldPoint), 'localPoint=', JSON.stringify(localPoint));
        // console.log('end Event \n 结束点坐标-> ' + JSON.stringify(this._endTouchPosition));
        // console.log('end Event \n 开始点坐标-> ' + JSON.stringify(this._startTouchPosition));
        if (this._endTouchPosition.x > this._startTouchPosition.x
            && (Math.abs(this._endTouchPosition.x - this._startTouchPosition.x) >= THRESHOLD
                || Math.abs(this._endTouchPosition.y - this._startTouchPosition.y) >= THRESHOLD)){
            // console.log('[onEventEnd]向右滑动');
            this.node.emit('RIGHT', {
                msg: '----------测试通知这是向右滑动-----------',
            });
        } else if (this._endTouchPosition.x < this._startTouchPosition.x
            && (Math.abs(this._endTouchPosition.x - this._startTouchPosition.x) >= THRESHOLD
            || Math.abs(this._endTouchPosition.y - this._startTouchPosition.y) >= THRESHOLD)){
            // console.log('[onEventEnd]向左滑动');

            this.node.emit('LEFT', {
                msg: '----------测试通知这是向左滑动-----------',
            });

        } else {

            this.node.emit('CENTER', {
                msg: '----------测试通知这是无滑动-----------',
            });
            // console.log('[onEventEnd]没有滑动');
        }
    },

    update(dt) {

    },

    onDestroy() {
    }
});
