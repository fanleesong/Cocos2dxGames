const Proxy = require('Proxy');
const {RequestTaskFactory, Task_Type} = require('RequestTaskFactory');

class LauncherProxy extends Proxy
{
    constructor()
    {
        super();
        this._cacheRecoverLifeSeconds = 0;
        this._cacheHpNum = 0;
    }
    getProxyName() { return cc.ss.NameConst.NAME_PROXY_LAUNCHER; }

    /**
     * 请求初始化信息
     * @param userId
     */
    requestGameInitializeInfo(userId) { this._requestUserInfo(userId); }


    /**
     * 请求用户信息
     * @param userId 用户id
     */
    _requestUserInfo(userId)
    {
        let task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getUserInfoURL(), {}, this._onResponseUserInfo.bind(this));
        task.doGet();
    }


    /**
     * 用户信息Response
     * @param data
     * @private
     */
    _onResponseUserInfo(data) {
        let infoCode = data.infoCode;
        if (infoCode === 0) {
            let obj = JSON.parse(data.data);
            if (obj.errcode === 0) {

                let userInfo = obj.result.user;
                console.log(`${JSON.stringify(userInfo)}`);
                cc.ss.userInfoCache.userLevel = userInfo.level;
                cc.ss.userInfoCache.userStarNum = userInfo.starCount;

                this._cacheRecoverLifeSeconds = obj.result.recoverHpSecond;

                this._sendLoadingProgressNotification(0.1);

                this._requestUserLife();//请求用户体力值

            } else {
                this._sendShowErrorDialogNotification();
            }

        } else {
            this._sendShowErrorDialogNotification();
        }
    }


    _requestUserLife()
    {
        let task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getLifeURL(), {}, this._onResponseUserLifeInfo.bind(this));
        task.doGet();
    }

    _onResponseUserLifeInfo(data)
    {
        let infoCode = data.infoCode;
        if (infoCode === 0) {
            let obj = JSON.parse(data.data);
            if (obj.errcode === 0) {

                this._cacheHpNum = obj.result.hp;
                let rlt = {};
                rlt.recoverLifeSeconds = this._cacheRecoverLifeSeconds;
                rlt.hp = this._cacheHpNum;
                this._sendLoadingProgressNotification(0.1);
                cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LAUNCHER_GAME_INITIALIZE_INFO_COMPLETE, rlt);

            }else {
                this._sendShowErrorDialogNotification();
            }

        }else {
            this._sendShowErrorDialogNotification();
        }

    }

    /**
     * 请求商品推荐列表
     * @private
     */
    _requestProductRecommendList(){

        let task = RequestTaskFactory.createTask(Task_Type.Api_Forum, cc.ss.URLConst.getProductRecommendURL(), {}, this._onResponseProductRecommendList.bind(this));
        task.doGet();

    }

    _onResponseProductRecommendList (data){

        let infoCode = data.infoCode;
        if (infoCode === 0) {
            let obj = JSON.parse(data.data);
            if (obj.errcode === 0) {


            }else {
                this._sendShowErrorDialogNotification();
            }

        }else {
            this._sendShowErrorDialogNotification();
        }

    }

    /**
     * 发送显示网络对话框
     * @private
     */
    _sendShowErrorDialogNotification()
    {
        let errRlt = {
            proxyType : cc.ss.GlobalConst.PROXY_LAUNCHER_CONTROLLER,
            errorType : cc.ss.ErrorConst.NET_ERROR_LAUNCHER_LOGIN,
        };
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_SHOW_NET_ERROR_DIALOG, errRlt);
    }

    _sendLoadingProgressNotification(value)
    {
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_LAUNCHER_LOADING_PROGRESS, value);
    }


}//end class

module.exports = LauncherProxy;
