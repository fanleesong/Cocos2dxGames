cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {

        this._drawLine();
    },

    _drawLine: function () {


        let gNode = cc.find("demo/graphic",this.node);
        this.graphics = gNode.getComponent(cc.Graphics);
        this.graphics.strokeColor = cc.hexToColor('#ff0000');//绘制线的颜色
        this.graphics.lineCap = cc.Graphics.LineCap.ROUND;//线段末端属性,带圆角
        this.graphics.lineJoin = cc.Graphics.LineJoin.ROUND;//线段拐角 (连接处)属性
        this.graphics.lineWidth = 10;//线的宽度
        this.graphics.moveTo(-20, 0);//画线起点坐标
        this.graphics.lineTo(0, 100);//画线终点坐标
        this.graphics.stroke();//必须调用用于画线

    },
    
    onDestroy : function () {
        this.graphics.clear();
    }


});
