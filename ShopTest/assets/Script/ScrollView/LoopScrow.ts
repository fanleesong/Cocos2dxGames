/**
 * 无限滑动组件
 * 注意点：
 * 1:无限滑动遵循横排竖滑，竖排横滑规则 即uigrid.arrangement 与ScrollView的滑动方向一定是相反的, 即：不支持横排横滑，竖排竖滑（有时候只需要横排排一排，然后横滑，必须改成竖排，限制uigrid.maxPerLine为1即可）
 * 2:不支持ScrollView.vertical 以及 不支持ScrollView.horizontal 同时为true  即不支持上下滑动的同时也可左右滑动  只支持一个方位
 * 3:uigrid排序组件是我仿照unity的ngui的uigrid排序组件写的 没有加入适配该节点的size大小，所以需要额外在挂载uigrid的节点上添加layout组件resizeMode设置为container type设置为none
 * 4:排序目前只支持TopLeft 即从左上角开始排序 (uigrid.pivot 会强制设置为Pivot.TopLeft)
 */
import {UIGrid, Pivot, Arrangement} from "./UIGrid";

const {ccclass, property} = cc._decorator;
@ccclass
export class LoopScrow extends cc.Component {
    @property({displayName: "排序组件UIGrid", type: UIGrid})
    private uiGrid: UIGrid = null; //排序组件
    @property({displayName: "滑动组件ScrollView", type: cc.ScrollView})
    private scrowView: cc.ScrollView = null; //滑动组件
    @property({displayName: "遮罩mask", type: cc.Mask})
    private mask: cc.Mask = null; //遮罩
    @property({displayName: "生成的originItem", type: cc.Prefab})
    private originItem: cc.Prefab = null; //原始item
    @property
    private itemCount: number = 0; //需要初始化的item个数
    private extents: number;//所有预制体所占长度或者是高度的一半 用在循环的时候计算item的坐标
    private rows: number = 1;//行数 (预制体所占的总行数)
    private columns: number = 1; //列数 (预制体所占的总列数)
    private dataCount: number = 0; //数据个数
    private cellWidth: number; // 宽度间隔
    private cellHeight: number; // 高度间隔
    private maxPerLine: number; //每行或者每列限制个数

    private maskSize: cc.Size; //遮罩组件的宽高
    private rightUpLocalPos: cc.Vec2; //遮罩右上局部坐标
    private leftDownLocalPos: cc.Vec2; //遮罩左下局部坐标
    private centerLocalPos: cc.Vec2; //遮罩中心点局部坐标
    private centerPos: cc.Vec2; //遮罩中心点世界坐标
    private cacheContentPos: cc.Vec2; //缓存的内容坐标（重复设置数据的时候需要还原拉动的位置）
    private items: cc.Node[]; //需要生成的item数据

    /**
     * itemIndex: 需要渲染的item下标
     * dataIndex：需要渲染的数据下标
     * item: 需要渲染的item节点
     */
    private onRenderItem: (itemIndex: number, dataIndex: number, item: cc.Node) => void; //渲染回调

    onLoad() {
        this.initObj();
        this.initMoveEvent();
        this.initMaskCornerLocalPos();
        this.initItems();
    }

    /**
     * 初始化组件信息
     */
    private initObj(): void {
        this.cellHeight = this.uiGrid.cellHeight;
        this.cellWidth = this.uiGrid.cellWidth;
        this.maxPerLine = this.uiGrid.maxPerLine;
        this.maskSize = this.scrowView.node.getContentSize();
        this.uiGrid.pivot = Pivot.TopLeft; //默认是左上开始排序

        if (this.scrowView.horizontal == true && this.scrowView.vertical == true) {
            console.error("无限滑动组件不支持上下左右一起滑动");
            return;
        }

        if (this.scrowView.horizontal == true) {
            this.uiGrid.arrangement = Arrangement.Vertical; //横排竖滑
            this.rows = this.maxPerLine;
            this.columns = this.itemCount / this.maxPerLine;
            this.extents = this.columns * this.cellWidth * 0.5;
        } else {
            this.uiGrid.arrangement = Arrangement.Horizontal; //竖排横滑
            this.columns = this.maxPerLine;
            this.rows = this.itemCount / this.maxPerLine;
            this.extents = this.rows * this.cellHeight * 0.5;
        }
    }

    /**
     * 把遮罩的边角左边转换成content内的局部坐标
     * @param otherLocalPos
     */
    private convertCornerPosToContentSpace(otherLocalPos: cc.Vec2): cc.Vec2 {
        let contentPos: cc.Vec2 = cc.Vec2.ZERO;
        let content: cc.Node = this.scrowView.content;
        let worldPos: cc.Vec2 = this.mask.node.parent.convertToWorldSpaceAR(otherLocalPos);
        contentPos = content.convertToNodeSpaceAR(worldPos);
        return contentPos;
    }

    /**
     * 初始化数据
     * @param dataCount 数据个数
     * @param onRenderItem 渲染回调
     */
    public initData(dataCount: number, onRenderItem: (itemIndex: number, dataIndex: number, item: cc.Node) => void): void {
        if (onRenderItem == null) {
            console.warn("无限滑动组件渲染回调没有注册事件");
        }
        this.onRenderItem = onRenderItem;
        this.dataCount = dataCount;
        this.onInitDatas();
    }

    /**
     * 当初始化数据的时候触发事件（第一次刷新所有的item数据）
     */
    private onInitDatas(): void {
        if (this.cacheContentPos == null) {
            this.cacheContentPos = this.scrowView.content.position;
        } else //如果不是第一次设置数据 就需要还原滑动数据（位置要回归到最原始的状态）
        {
            this.scrowView.scrollToOffset(cc.Vec2.ZERO);
            this.uiGrid.reposition();
            this.scrowView.content.position = this.cacheContentPos;
        }
        for (let index = 0; index < this.itemCount; index++) {
            let item: cc.Node = this.items[index];
            let state: boolean = (index < this.dataCount);
            item.active = state;
            if (state == true) //只有当数据足够的时候才会触发渲染回调
            {
                this.updateItem(index, index, item);
            }
        }
    }

    /**
     * 初始化item
     */
    private initItems(): void {
        this.items = [];
        for (let index = 0; index < this.itemCount; index++) {
            let item: cc.Node = cc.instantiate(this.originItem);
            this.items.push(item);
            this.uiGrid.addChild(item);
        }
        this.uiGrid.repositionNow = true;
    }

    /**
     * 初始化移动事件
     */
    private initMoveEvent(): void {
        let eventHandle: cc.Component.EventHandler = new cc.Component.EventHandler();
        eventHandle.handler = "onScrowMove";
        eventHandle.component = "LoopScrow";
        eventHandle.target = this.node;

        this.scrowView.scrollEvents.push(eventHandle);
    }

    /**
     * 初始化遮罩边角局部坐标
     */
    private initMaskCornerLocalPos(): void {
        let halfHeight: number = this.maskSize.height * 0.5;
        let halfwidth: number = this.maskSize.width * 0.5;

        let minX: number = this.mask.node.position.x - halfwidth; //最小x
        let maxX: number = minX + this.maskSize.width; //最大x
        let minY: number = this.mask.node.position.y - halfHeight; //最小y
        let maxY: number = minY + this.maskSize.height; //最大y

        this.rightUpLocalPos = cc.p(maxX, maxY); //右上
        this.leftDownLocalPos = cc.p(minX, minY); //左下
        this.centerLocalPos = (this.rightUpLocalPos.add(this.leftDownLocalPos));
        this.centerLocalPos.x = this.centerLocalPos.x * 0.5;
        this.centerLocalPos.y = this.centerLocalPos.y * 0.5;
    }

    /**
     * 初始化遮罩中心世界坐标
     */
    private getMaskCenterWorldPos(): void {
        this.centerPos = this.convertCornerPosToContentSpace(this.centerLocalPos);
    }

    /**
     * 滑动组件滑动事件回调
     */
    private onScrowMove(): void {
        this.getMaskCenterWorldPos();
        let item: cc.Node = null;
        let localPos: cc.Vec2 = null;
        let distance: number = 0;
        let realIndex: number = 0;
        let newPos: cc.Vec2 = null;
        if (this.scrowView.vertical == true) {
            for (let index = 0; index < this.itemCount; index++) {
                item = this.items[index];
                localPos = item.position;
                distance = localPos.y - this.centerPos.y;
                realIndex = 0;
                newPos = item.position;
                if (distance < -this.extents || distance > this.extents) {
                    if (distance < -this.extents) {
                        newPos.y += this.extents * 2;
                    } else {
                        newPos.y -= this.extents * 2;
                    }
                    realIndex = this.getDataIndexByItemPos(newPos);
                    if (realIndex >= 0 && realIndex < this.dataCount) {
                        item.position = newPos;
                        this.updateItem(index, realIndex, item);
                    }
                }
            }
        }
        else {
            for (let index = 0; index < this.itemCount; index++) {
                item = this.items[index];
                localPos = item.position;
                distance = localPos.x - this.centerPos.x;
                realIndex = 0;
                newPos = item.position;
                if (distance < -this.extents || distance > this.extents) {
                    if (distance < -this.extents) {
                        newPos.x += this.extents * 2;
                    } else {
                        newPos.x -= this.extents * 2;
                    }
                    realIndex = this.getDataIndexByItemPos(newPos);
                    if (realIndex >= 0 && realIndex < this.dataCount) {
                        item.position = newPos;
                        this.updateItem(index, realIndex, item);
                    }
                }
            }
        }
    }

    /**
     * 刷新Item
     * @param itemIndex item下标
     * @param dataIndex  数据下标
     * @param item 需要渲染的item
     */
    private updateItem(itemIndex: number, dataIndex: number, item: cc.Node): void {
        if (this.onRenderItem != null) {
            this.onRenderItem(itemIndex, dataIndex, item);
        }
    }

    /**
     * 根据item的坐标来计算出对应的数据的下标
     * @param itemPos item的局部坐标
     */
    private getDataIndexByItemPos(itemPos: cc.Vec2): number {
        let dataIndex: number = 0;
        //计算出行列数
        let x: number = itemPos.x / this.cellWidth;//行数
        let y: number = -itemPos.y / this.cellHeight; //列数
        if (this.uiGrid.arrangement == Arrangement.Horizontal)  //横排
        {
            dataIndex = x + y * this.maxPerLine;
        } else //竖排
        {
            dataIndex = y + x * this.maxPerLine;
        }
        return dataIndex;
    }
}