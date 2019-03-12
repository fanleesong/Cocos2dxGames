const {ccclass, property} = cc._decorator;

@ccclass
export default class TestGuide extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)mask1:cc.Node = null;
    @property(cc.Node)clipNode:cc.Node = null;
    @property(cc.Label)testLable:cc.Label = null;
    @property(cc.Button)btn1:cc.Button = null;
    @property(cc.Button)btn2:cc.Button = null;
    @property(cc.Button)btn3:cc.Button = null;
    @property btnArray:cc.Button[] = []
    // onLoad () {}

    start () {
        //mask1 是全屏的透明层 在最上层用来监听触摸事件
        this.mask1.on(cc.Node.EventType.TOUCH_START,this.maskTouch,this)
        //测试用的
        this.btnArray.push(this.btn1);
        this.btnArray.push(this.btn2);
        this.btnArray.push(this.btn3);
    }
    //按钮点击事件
    buttonClick(sender,event){
        this.testLable.string = "点击了按钮";
        //测试用的
        this.changeToAnotherGuide()
    }
    //mask1点击事件
    maskTouch(event){
        //将点击位置转化为clipNode中坐标
        let pt = this.clipNode.convertToNodeSpace(event.getLocation());
        //获取clipNode的大小
        let rect = cc.rect(0, 0, this.clipNode.width, this.clipNode.height);
        //检测如果点击坐标不在clipNode区域内 就提示点击无效区域
        if (!cc.rectContainsPoint(rect, pt)) {
            this.testLable.string = "点击了无效区域"
        }else{
            //将mask1上的屏蔽事件传递
            this.mask1.getComponent(cc.BlockInputEvents).enabled = false;
            //移除mask1上的事件监听，然后事件就可以穿透到下面
            this.mask1.off(cc.Node.EventType.TOUCH_START,this.maskTouch,this)
        }

    }
    changeToAnotherGuide(){
        //恢复mask1上的屏蔽事件传递
        this.mask1.getComponent(cc.BlockInputEvents).enabled = true;
        this.mask1.on(cc.Node.EventType.TOUCH_START,this.maskTouch,this)
        //测试用的
        let index = Math.ceil(Math.random()*2) 
        this.clipNode.position = this.btnArray[index].node.position;
    }
   
}