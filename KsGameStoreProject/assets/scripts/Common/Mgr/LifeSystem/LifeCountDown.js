/**
 * 生命倒计时工具
 */

const Working_State = cc.Enum({
    Running : 0,
    Stopped : 1,
    Pause : 2,// 暂停中
    Invalid : 3,
});

const COUNT_DOWN_PER_SEC = 1000;

class LifeCountDown {
    constructor() {
        this._countDownTimeCallback = null;
        this._countDownOneRoundCompleteCallback = null;

        this._maxSecs = 0;
        this._countDownTimer = 0;
        this._workingState = Working_State.Invalid;
    }

    /**
     * 倒计时回调
     * @param call
     */
    setCountDownTimeCallback(call) { this._countDownTimeCallback = call; }

    /**
     * 倒计时一轮循环后的回调
     * @param call
     */
    setCountDownOneRoundCompleteCallback(call) { this._countDownOneRoundCompleteCallback = call; }

    /**
     * 通知倒计时时间
     * @param secs
     * @private
     */
    _notifyCountDownTime(secs) { if (this._countDownTimeCallback) this._countDownTimeCallback(secs); }

    /**
     * 初始化
     * @param maxSecs 最大倒计时秒数
     */
    lazyInit(maxSecs) {
        this._maxSecs = maxSecs;
        this._countDownTimer = maxSecs;

        this._runLoop();//开始倒计时服务器
    }

    _runLoop()
    {
        setInterval(() => {
            if (this._workingState === Working_State.Pause){
                console.log('暂停状态');
            }
            if (this._workingState !== Working_State.Running) return; //停止状态中

            let timer = this._countDownTimer;
            timer -= COUNT_DOWN_PER_SEC;
            this._notifyCountDownTime(timer);

            //完成一个倒计时循环
            if (timer <= 0 ) {
                timer = this._maxSecs;
                if (this._countDownOneRoundCompleteCallback)this._countDownOneRoundCompleteCallback();
            }
            this._countDownTimer = timer;
        }, COUNT_DOWN_PER_SEC);
    }


    start()
    {
        if (this._workingState === Working_State.Running || this._workingState === Working_State.Pause) return;
        this._workingState = Working_State.Running;
    }

    stop()
    {
        this._workingState = Working_State.Stopped;
        this._countDownTimer = this._maxSecs;
    }

    getCurrentCountDownSecs() { return this._countDownTimer; }

    isWorking() { return this._workingState === Working_State.Running || this._workingState === Working_State.Pause; }

    pasue()
    {
        if (this._workingState === Working_State.Running) this._workingState = Working_State.Pause;
    }

    resume()
    {
        if (this._workingState === Working_State.Pause) this._workingState = Working_State.Running;
    }

}//end class

module.exports = LifeCountDown;