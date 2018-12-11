
const {ccclass, property} = cc._decorator;
import {LoopScrow} from "./LoopScrow";


@ccclass
export default class LoopScrowTest extends cc.Component {

    @property(LoopScrow)
    loopScrow: LoopScrow = null; //无限循环组件
    private dataCount: number = 100;

    start() {
        let onRenderItem: any = (itemIndex: number, dataIndex: number, item: cc.Node) => {
            if (this.dataCount <= dataIndex) {
                return;
            }
            let label = item.getChildByName("Label").getComponent(cc.Label);
            label.string = (dataIndex + 1).toString();
        }
        this.loopScrow.initData(this.dataCount, onRenderItem);
    }
}