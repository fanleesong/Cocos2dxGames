
class SystemMgr {
    constructor() {}

    startUp()
    {
        this._registerListeners();
    }

    _registerListeners()
    {
        cc.game.on(cc.game.EVENT_SHOW, () => {
            console.log('[SystemMgr]接收到进入前台的消息');
            cc.ss.lifeSystemMgr.enterForeground();//进入前台

            let isBgmOpen = cc.ss.localStorage.isBgmOpen(cc.ss.userInfoCache.userId);
            if (isBgmOpen) cc.ss.audioUtil.resumeBgm();//恢复bgm
        });

        cc.game.on(cc.game.EVENT_HIDE, () => {
            console.log('[SystemMgr]接收到进入后台的消息');
            cc.ss.lifeSystemMgr.enterBackground();//进入后台

            let isBgmOpen = cc.ss.localStorage.isBgmOpen(cc.ss.userInfoCache.userId);
            if (isBgmOpen) cc.ss.audioUtil.pauseBgm(); //暂停bgm
        });
    }

}//end class

module.exports = SystemMgr;