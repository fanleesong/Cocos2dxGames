const LifeCountDown = require('LifeCountDown');
const Max_Life_Num = 5;//最大生命
const {RequestTaskFactory, Task_Type} = require('RequestTaskFactory');

/**
 * 生命系统管理器
 * 通知
 *      1.倒计时时间
 *      2.开始倒计时
 *      3.结束倒计时
 *      4.增加生命
 *      5.消耗生命
 */
class LifeSystemMgr {
    constructor()
    {
        this._lifeCountDownInst = new LifeCountDown();
        this._lifeNum = 0;
        this._isStartup = false;
    }

    /**
     * 初始化
     * @param userId
     * @param lifeNum
     * @param maxCountDownSecs
     */
    lazyInit(userId, lifeNum, maxCountDownSecs)
    {
        this._lifeNum = lifeNum;

        this._lifeCountDownInst.lazyInit(maxCountDownSecs);
        this._lifeCountDownInst.setCountDownTimeCallback((secs) => {

            cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_COUNT_DOWN_TIME, secs);
        });

        this._lifeCountDownInst.setCountDownOneRoundCompleteCallback(this._onCountDownOneRoundCompleteCallback.bind(this));
    }

    startUp() {
        if (!this._isStartup) this._isStartup = true;

        if (this._lifeNum !== Max_Life_Num) this._startCountDown();
    }

    /**
     * 进入后台
     */
    enterBackground()
    {
        console.log(`[LifeSystemMgr]倒计时器接收到到进入后台信息`);
        this._pauseCountDown();
    }

    /**
     * 进入前台
     */
    enterForeground()
    {
        console.log(`[LifeSystemMgr]倒计时器接收到到进入前台信息`);
        this._resumeCountDown();
    }

    getLife() { return this._lifeNum; }

    /**
     * 倒计时一个循环回调
     * @private
     */
    _onCountDownOneRoundCompleteCallback()
    {
        this._pauseCountDown();
        this._reportCountDownTime();//请求服务器获取最新体力值是否匹配
    }

    /**
     *恢复全部体力
     */
    recoverAllLife()
    {
        this._lifeNum = Max_Life_Num;
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE, this._lifeNum);

        this._stopCountDown();
    }

    /**
     * 更新体力值
     * @param lifeNum
     */
    updateLife(lifeNum){
        this._lifeNum = parseInt(lifeNum);
        if (this._lifeNum < Max_Life_Num) this._startCountDown();

        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE, this._lifeNum);
    }

    /**
     * 是否停止倒计时,如果放回true，则在每个场景中不显示倒计时
     */
    isCountingDown() { return this._lifeCountDownInst.isWorking(); }


    /**
     * 上报倒计时完成
     * @private
     */
    _reportCountDownTime()
    {
        let task =  RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getLifeURL(), {}, this._onResponseCountDownTime.bind(this));
        task.doGet();
    }

    /**
     * 响应倒计时完成回执
     * @private
     */
    _onResponseCountDownTime(data)
    {
        let infoCode = data.infoCode;
        if (infoCode === 0) {
            let obj = JSON.parse(data.data);
            if (obj.errcode === 0) {
                let hp = parseInt(obj.result.hp);
                console.log(`[LifeSystemMgr]serverHp:${hp} | localHp : ${this._lifeNum}`);

                setTimeout(()=>{
                    this._lifeNum = hp;
                    this._lifeNum = this._lifeNum >= Max_Life_Num ? Max_Life_Num : this._lifeNum;
                    cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE);

                    if (this._lifeNum === Max_Life_Num)
                        this._stopCountDown();
                    else
                        this._resumeCountDown();
                }, 1000);

            }else {
                setTimeout(() => { this._resumeCountDown(); }, 1000);
            }
        }else {
            setTimeout(() => { this._resumeCountDown(); }, 1000);
        }

    }

    _startCountDown()
    {
        this._lifeCountDownInst.start();
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_START_COUNT_DOWN);
    }

    _stopCountDown()
    {
        this._lifeCountDownInst.stop();
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN);
    }

    _pauseCountDown() { this._lifeCountDownInst.pasue(); }

    _resumeCountDown() { this._lifeCountDownInst.resume(); }

    /**
     * 获取当前当前倒计时秒数
     * @returns {*}
     */
    getNowCountDownSecs()
    {
        return this._lifeCountDownInst.getCurrentCountDownSecs();
    }

}//end class

module.exports = LifeSystemMgr;
