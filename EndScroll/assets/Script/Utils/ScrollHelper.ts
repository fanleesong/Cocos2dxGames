/*
 * @Author: HuangLang 
 * @Date: 2018-07-13 15:17:37  
 * @Description :无限循环列表
 * @Last Modified by: HuangLang
 * @Last Modified time: 2018-07-17 14:41:19
 */
/**
 * 滑动方向枚举
 */
export enum ScrollDirEnum {
    Vertical,
    Horizon
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollHelper extends cc.Component {

    //赋值用的obj
    @property(cc.Node)
    item: cc.Node = null;
    @property(cc.ScrollView)
    Scroll: cc.ScrollView = null;
    //显示用的content
    @property(cc.Node)
    content: cc.Node = null;
    //附加mask组件的对象
    @property(cc.Node)
    maskNode: cc.Node = null;
    //方向，0是垂直方向，1是水平方向
    @property(Number)
    dir: Number = 0;

    //滑动的方向
    public scrollDir: ScrollDirEnum = ScrollDirEnum.Vertical;
    public get ScrollDir() { return this.scrollDir; }
    public set ScrollDir(val) { this.scrollDir = val; }
    private num: number;//需要显示的item数量
    public get Num() { return this.num; }
    public set Num(val) { this.num = val; }
    private itemNum: number;//实际生成item数量
    public get ItemNum() { return this.itemNum; }
    public set ItemNum(val) { this.itemNum = val; }
    public distance = 100;//item之间的间距
    public needSize = 0;//需求要求的高度/宽度
    public visibleHeight = 0;//显示范围高度
    public itemsHeight = 0;//物品高度
    public OnScrollFun = null;//滑动回调
    //可见范围
    private minY: number = 0;
    private maxY: number = 0;
    //可以显示的范围，可见范围 超过 可以显示的范围，就刷新列表（把缓存的item放到下面或上面）
    private minVisibleY: number = 0;
    private maxVisibleY: number = 0;
    public initX = this.distance / 2;
    public initY = -this.distance / 2;

    start() {
        this.num = 7;
        this.itemNum = 6;
        this.scrollDir = this.dir as ScrollDirEnum;
        this.Init(this.itemNum);
    }

    Init(num: number) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "ScrollHelper";
        eventHandler.handler = "OnScroll";
        this.Scroll.scrollEvents.push(eventHandler);
        this.needSize = this.num * this.distance;
        if (this.scrollDir == ScrollDirEnum.Horizon) {
            this.initX = this.distance / 2;
            this.initY = 0;
            this.content.setContentSize(new cc.Size(this.needSize, this.content.getContentSize().height));

        } else {
            this.initX = 0;
            this.initY = -this.distance / 2;
            this.content.setContentSize(new cc.Size(this.content.getContentSize().width, this.needSize));
        }
        this.visibleHeight = this.maskNode.getContentSize().height;
        this.InitObjs();
    }

    //初始化可见的item
    private itemsList = new Array();
    InitObjs() {
        let curX = 0;
        let curY = 0;
        for (let i = 0; i < this.itemNum; i++) {
            let obj = cc.instantiate(this.item);
            obj.parent = this.content;
            obj.active = true;
            if (this.scrollDir == ScrollDirEnum.Horizon) {
                curX = this.initX + this.distance * i;
                // console.error("curX:" + curX);
            }
            else {
                curY = this.initY - this.distance * i;
                // console.error("curY:" + curY);
            }

            obj.setPositionX(curX);
            obj.setPositionY(curY);
            this.onRefresh(obj, i.toString(), i);
            this.itemsList.push(obj);
        }
    }

    //计算边界，超过边界则刷新列表
    //offest是左上角原点滑动的偏移量
    private countBorder(offest) {
        let height = this.visibleHeight;//可见高度
        this.minY = offest;//获得相对于左上角原点的最小y值
        this.maxY = offest + height;//获得相对于左上角原点的最大y值
    }

    private miniIdx = 0;
    private maxIdx = 0;
    private curOffset = 0;
    OnScroll() {
        //获取滚动视图相对于左上角原点的当前滚动偏移
        let scrollOffset: cc.Vec2 = this.Scroll.getScrollOffset();
        let offest = 0;
        if (this.scrollDir == ScrollDirEnum.Horizon)
            //水平的offset是负数，为什么会有这么sb的设计，将它取反和垂直方向的统一一下
            offest = -scrollOffset.x;
        else
            offest = scrollOffset.y;
        this.curOffset = offest;
        this.refresh();
    }

    //强行刷新
    public refresh() {
        let offest = this.curOffset;

        //最大高度，超过该高度，不刷新
        let maxY = this.needSize;
        if (offest < 0 || offest + this.visibleHeight >= maxY)
            return;
        
        let idx: number = 0;//从0开始
        this.countBorder(offest);
        this.miniIdx = Math.floor(offest / this.distance);
        // console.error("this.miniIdx:" + this.miniIdx);

        this.minVisibleY = this.miniIdx * this.distance;
        this.maxVisibleY = this.maxIdx * this.distance;
        //miniIdx到maxIdx都会刷新
        for (let i = 0; i < this.itemNum; i++) {
            let obj = this.itemsList[i];
            idx = this.miniIdx + i;
            this.refreshItem(idx, i, obj);
        }
        this.maxIdx = this.miniIdx + this.itemNum;
    }

    //idx是UI该刷新的第几个元素
    private refreshItem(idx, objIdx, obj) {
        if (idx < 0 || idx >= this.num)
            return;

        if (obj == null) {
            console.error("obj为空！");
            return;
        }
        let curX = 0;
        let curY = 0;
        if (this.scrollDir == ScrollDirEnum.Horizon)
            curX = this.initX + this.distance * idx;
        else
            curY = this.initY - this.distance * idx;
        // console.error("idx:" + idx + ",curX:" + curX + ",curY:" + curY);
        obj.setPositionX(curX);
        obj.setPositionY(curY);
        this.onRefresh(obj, idx, objIdx);
    }

    /**
     * 刷新回调
     * @param obj 
     * @param idx 需求显示的索引
     * @param objIdx 实际的item索引
     */
    private onRefresh(obj, idx: string, objIdx) {
        //测试用
        let label = cc.find("text", obj).getComponent(cc.Label);
        label.string = idx;
        if (this.OnScrollFun)
            this.OnScrollFun(obj, idx, objIdx);
    }
}
