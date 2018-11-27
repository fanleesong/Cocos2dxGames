const Controller = require('Controller');
const {RequestTaskFactory, Task_Type} = require('RequestTaskFactory');
const SceneMgr = require('SceneMgr');

cc.Class({
    extends: Controller,

    properties: {
        buttonSfx : cc.AudioClip, //btn sfx
        lifeHeartTexture :  cc.Texture2D,
        lifeHeartNoneTexture :  cc.Texture2D,
        _clickCallback : null,
    },

    getHandleNotificationList : function() {
        return [
            cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_INFO,
            cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_STAR_INFO,
            cc.ss.TagConst.TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN,
            cc.ss.TagConst.TAG_LIFE_SYSTEM_START_COUNT_DOWN,
            cc.ss.TagConst.TAG_LIFE_SYSTEM_COUNT_DOWN_TIME,
            cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE,
        ];
    },

    onNotification : function(notification) {
        let name = notification.getName();
        let body = notification.getBody();
        if(name === cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_INFO){//刷新数据
            this._initUIByData();
        }else if (name === cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_STAR_INFO){
            this._setupStarNum();

        }else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN){
            this._onHandleCountDownComplete();

        }else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_START_COUNT_DOWN){
            this._onHandleCountDownStart();

        }else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_COUNT_DOWN_TIME){
            this._onHandleCountDownTimeUpdate(body);

        }else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE){
            this._onHandleUpdateLife();
        }
    },


    _onHandleCountDownStart()
    {
        this._setCountTimeLabel(cc.ss.lifeSystemMgr.getNowCountDownSecs());
        cc.find('timeBg', this.node).active = true;
    },

    _onHandleCountDownComplete()
    {
        cc.find('timeBg', this.node).active = false;
    },

    _convertSecsToTime(secs)
    {
        secs = parseInt(secs) / 1000;

        let minute = parseInt(secs / 60);
        let second = secs % 60;

        return {minute : minute, second : second};
    },

    _setCountTimeLabel(secs)
    {
        let time = this._convertSecsToTime(secs);

        cc.find('timeBg/timeLabel', this.node).getComponent(cc.Label).string = `${cc.ss.stringUtil.prefixInteger(time.minute, 2)}:${cc.ss.stringUtil.prefixInteger(time.second, 2)}`;
    },

    _onHandleCountDownTimeUpdate(secs)
    {
        this._setCountTimeLabel(secs);
    },


    _onHandleUpdateLife()
    {
        this._setupLife();
    },

    _loadHeadIcon(headIconURL)
    {
        let headSprite = cc.find('headBgSpriteBtn/maskNode/picSprite', this.node);
        let srcWidth  = headSprite.width;
        let srcHeight  = headSprite.height;
        headSprite.opacity = 0;

        let dirPath =  jsb.fileUtils.getWritablePath() + cc.ss.GlobalConst.IMAGE_CACHE_PATH;
        let task = RequestTaskFactory.createTask(Task_Type.Image, headIconURL, dirPath, (tex, filePath) => {
            if (tex)
            {
                headSprite.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                headSprite.width = srcWidth;
                headSprite.height = srcHeight;

                headSprite.runAction(cc.fadeTo(0.8, 255));
            }
        });

        task.doDownload();
    },

    onLoad: function () {
        this.setControllerName(cc.ss.NameConst.NAME_CONTROLLER_HEAD_ICON);
        cc.ss.Facade.registerController(this);

        this._bindClickEvent();
        this._initUIByData();
    },

    _initUIByData()
    {
        this._setupLife(); //初始化体力

        this._setupStarNum(); //初始化星星数字

        this._setupHeadIcon(); //初始化头像

        this._setupTime(); //初始化时间
    },

    _setupLife()
    {
        let lifeNum = cc.ss.lifeSystemMgr.getLife();
        let lifeHeartList = cc.find('lifeInfoBg/lifeNode', this.node).getChildren();
        lifeNum = lifeNum > 5 ? 5 : lifeNum;

        lifeHeartList.forEach((heartSp) => { heartSp.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.lifeHeartNoneTexture); });

        for (let i = 0; i < lifeNum; i++) lifeHeartList[i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.lifeHeartTexture);
    },

    _setupStarNum()
    {
        let starCount = cc.ss.userInfoCache.userStarNum;
        cc.find('starInfoBg/starLabel', this.node).getComponent(cc.Label).string = (starCount > 999999999) ? "999999999+" : starCount;
    },

    _setupHeadIcon()
    {
        let headIconURL = cc.ss.userInfoCache.headIconURL;
        if (headIconURL !== "" && headIconURL !== undefined && headIconURL !== 'undefined') this._loadHeadIcon(headIconURL);
    },

    _setupTime()
    {
        let isCountingDown = cc.ss.lifeSystemMgr.isCountingDown();
        cc.find('timeBg', this.node).active = isCountingDown;

        if (isCountingDown) this._setCountTimeLabel(cc.ss.lifeSystemMgr.getNowCountDownSecs());
    },

    _bindClickEvent()
    {
        let headBgSpriteBtn = this.node.getChildByName('headBgSpriteBtn');
        headBgSpriteBtn.on('click', (event) => {
            if (this._clickCallback){
                this._clickCallback();
                if (cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId)) cc.ss.audioUtil.playSfx(this.buttonSfx);
            }
        });
    },

    onDestroy: function (){
        cc.ss.Facade.removeController(this);
    }

});
