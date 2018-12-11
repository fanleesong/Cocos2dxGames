const {ccclass, property} = cc._decorator;

export enum Arrangement //排序枚举
{
    Horizontal = 1, //横排
    Vertical = 2, //竖排
}

export enum Pivot//锚点枚举
{
    TopLeft = 1,
    Top = 2,
    TopRight = 3,
    Left = 4,
    Center = 5,
    Right = 6,
    BottomLeft = 7,
    Bottom = 8,
    BottomRight = 9,
}

/**
 * 排序脚本
 */
@ccclass
export class UIGrid extends cc.Component {

    @property({type: cc.Enum(Arrangement), displayName: "排序枚举"})
    public arrangement: Arrangement = Arrangement.Horizontal; // 排序规则
    @property({type: cc.Enum(Pivot), serializable: true, displayName: "锚点枚举"})
    public pivot: Pivot = Pivot.TopLeft; //锚点
    @property
    public maxPerLine: number = 0; //行列个数
    @property
    public cellWidth: number = 100; //宽度
    @property
    public cellHeight: number = 100; //高度
    @property
    public hideInactive: boolean = false; //隐藏的item是否需要排序

    private mReposition: boolean = false; //
    /**
     * 排序回调
     */
    public onReposition: () => void = null;

    /**
     * 重新排序
     */
    public set repositionNow(value: boolean) {
        if (value == true) {
            this.enabled = true;
            this.mReposition = true;
        }
    }

    start() {
        this.init();
        this.reposition();
        this.enabled = false;
    }

    /**
     * 初始化值
     */
    private init(): void {
        this.maxPerLine = Math.floor(this.maxPerLine);
        this.arrangement = Math.floor(this.arrangement);
        this.pivot = Math.floor(this.pivot);

        if (this.arrangement > 2) {
            this.arrangement = 2;
        } else if (this.arrangement <= 0) {
            this.arrangement = 1
        }

        if (this.pivot > 9) {
            this.pivot = 9;
        } else if (this.pivot <= 0) {
            this.pivot = 1
        }
    }

    update(dt) {
        this.reposition();
        this.enabled = false;
    }

    /**
     * 获取子节点列表
     */
    public getChildList(): cc.Node[] {
        let childCount: number = this.node.childrenCount;
        let childList: cc.Node[] = [];
        for (let index = 0; index < childCount; index++) {
            let child: cc.Node = this.node.children[index]
            if (!this.hideInactive || (child != null && child.active == true)) {
                childList.push(child);
            }
        }
        return childList;
    }

    /**
     * 根据下标来获取子节点
     * @param index
     */
    public getChildByIndex(index: number): cc.Node {
        let childList: cc.Node[] = this.getChildList();
        return (childList.length > index) ? childList[index] : null;
    }

    /**
     * 添加子节点node
     * @param child
     * @param pos
     */
    public addChild(child: cc.Node, pos?: cc.Vec2): void {
        child.parent = this.node;
        if (pos != null) {
            child.position = pos;
        }
    }

    /**
     * 重新排序(只有当node显示的时候调用才有效) 否则请调用repositionNow = true
     */
    public reposition(): void {
        let childList: cc.Node[] = this.getChildList();
        this.resetPosition(childList);
        if (this.onReposition != null) {
            this.onReposition();
        }
    }

    /**
     * 重新设置位置（排序）
     * @param childList
     */
    private resetPosition(childList: cc.Node[]): void {
        this.mReposition = false;

        let x: number = 0;
        let y: number = 0;
        let maxX: number = 0;
        let maxY: number = 0;

        let length = childList.length;
        for (let index = 0; index < length; index++) {
            let child: cc.Node = childList[index];
            let pos: cc.Vec2 = child.position;

            pos = (this.arrangement == Arrangement.Horizontal) ? new cc.Vec2(this.cellWidth * x, -this.cellHeight * y) : new cc.Vec2(this.cellWidth * y, -this.cellHeight * x);
            child.position = pos;

            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            if (++x >= this.maxPerLine && this.maxPerLine > 0) {
                x = 0;
                ++y;
            }
        }
        if (this.pivot != Pivot.TopLeft) {
            let po: cc.Vec2 = this.GetPivotOffset(this.pivot);
            let fx, fy: number = 0;
            if (this.arrangement == Arrangement.Horizontal) {
                fx = this.lerp(0, maxX * this.cellWidth, po.x);
                fy = this.lerp(-maxY * this.cellHeight, 0, po.y);
            } else {
                fx = this.lerp(0, maxY * this.cellWidth, po.x);
                fy = this.lerp(-maxX * this.cellHeight, 0, po.y);
            }
            for (let index = 0; index < length; index++) {
                let child: cc.Node = childList[index];
                let pos: cc.Vec2 = child.position;

                pos.x -= fx;
                pos.y -= fy;
                child.position = pos;
            }
        }
    }

    /**
     * 根据Item下标来获取该Item 排序之后所在的位置
     * @param itemIndex  从1 开始算
     */
    public getPreviewPostionByIndex(itemIndex: number): cc.Vec2 {
        let chu: number = 0;
        let yu: number = 0;
        if (this.maxPerLine != 0) {
            chu = itemIndex / this.maxPerLine;
            if (chu % this.maxPerLine != 0) {
                chu = Math.ceil(chu) - 1;
            }
            yu = itemIndex % (this.maxPerLine) - 1;
            if (yu < 0) {
                yu = this.maxPerLine - 1;
            }
        }
        else {
            chu = 0;
            yu = itemIndex - 1;
        }

        let row: number = 0;
        let column: number = 0;

        if (this.arrangement == Arrangement.Horizontal) {
            row = chu;
            column = yu;
        } else {
            row = yu;
            column = chu;
        }
        let pos = cc.p((column) * this.cellWidth, (row) * -this.cellHeight);

        // column = this.maxPerLine - 1; // 计算总列数（总行数）
        // row = Math.floor(this.node.children.length / this.maxPerLine);  //计算总行数(总列数)
        if (this.pivot != Pivot.TopLeft) {
            let maxX = this.maxPerLine - 1;
            let maxY = Math.floor(this.node.children.length / this.maxPerLine);
            if (this.maxPerLine != 0) {
                maxX = this.maxPerLine - 1;
                maxY = Math.floor(this.node.children.length / this.maxPerLine);
            } else {
                maxX = this.getChildList().length - 1;
                maxY = 0;
            }
            let po: cc.Vec2 = this.GetPivotOffset(this.pivot);
            let fx, fy: number = 0;
            if (this.arrangement == Arrangement.Horizontal) {
                fx = this.lerp(0, (maxX) * this.cellWidth, po.x);
                fy = this.lerp(-maxY * this.cellHeight, 0, po.y);
            } else {
                fx = this.lerp(0, maxY * this.cellWidth, po.x);
                fy = this.lerp(-(maxX) * this.cellHeight, 0, po.y);
            }
            pos.x -= fx;
            pos.y -= fy;
        }
        //console.log(pos.x+"ppppppppppppp<<<<<<"+pos.y +">>下标："+itemIndex);
        return pos;
    }

    /**
     * 获取锚点偏移值
     * @param pv
     */
    private GetPivotOffset(pv: Pivot): cc.Vec2 {
        let v: cc.Vec2 = cc.Vec2.ZERO;

        if (pv == Pivot.Top || pv == Pivot.Center || pv == Pivot.Bottom) v.x = 0.5;
        else if (pv == Pivot.TopRight || pv == Pivot.Right || pv == Pivot.BottomRight) v.x = 1;
        else v.x = 0;

        if (pv == Pivot.Left || pv == Pivot.Center || pv == Pivot.Right) v.y = 0.5;
        else if (pv == Pivot.TopLeft || pv == Pivot.Top || pv == Pivot.TopRight) v.y = 1;
        else v.y = 0;
        return v;
    }

    /**
     * 计算插值
     * @param start 开始位置
     * @param end  结束位置
     * @param t  时间点
     */
    private lerp(start: number, end: number, t: number): number {
        let result = 0;
        if (t > 1) {
            t = 1;
        } else if (t < 0) {
            t = 0;
        }
        let tem = end - start;
        result = tem * t;
        result = result + start;
        return result;
    }
}

