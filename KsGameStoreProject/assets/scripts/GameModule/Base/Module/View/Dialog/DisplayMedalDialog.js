const MedalDisplayConst = require('MedalDisplayConst');

const UI_Type = cc.Enum({
    Real : 0,
    Fake : 1
});

const Share_Type = cc.Enum({
    Download : 0,
    Friend : 1,
    TimeLine : 2,
    None : 3
});

cc.Class({
    extends: cc.Component,

    properties: {
        buttonSfx: cc.AudioClip,
        _listenerId: -1,
        _isAppInstallWechat: false,
        _shareType: Share_Type.None,//分享或炫耀的类型
        _isAllowClick : true
    },

    initWithData: function (medalId) {//from = 1 默认为用户中心
        let medalData = this._getMedalConstData(medalId);

        this._fitIphoneX();
        this._registerTouchEvent();
        this._bindClickListener();
        let platform = cc.sys.os;
        this._isAppInstallWechat = cc.ss.nativeUtil.isInstallWechat(platform);

        this.node.getChildByName("wechatBtn").active = this._isAppInstallWechat;
        this.node.getChildByName("friendlineBtn").active = this._isAppInstallWechat;

        this._initPicUIWithData(medalData);
        this._initFakePicUIWithData(medalData);
    },

    _bindClickListener: function () {
        cc.find('wechatBtn', this.node).on('click', (ev) => {
            if (!this._isAllowClick)return;
            this._isAllowClick = false;
            this._delayAllowUserClick();

            this._playButtonSfx();
            this._shareType = Share_Type.Friend;
            this._captureDisplayMedalDialogImage();
        });


        cc.find('friendlineBtn', this.node).on('click', (ev) => {
            if (!this._isAllowClick)return;
            this._isAllowClick = false;
            this._delayAllowUserClick();

            this._playButtonSfx();
            this._shareType = Share_Type.TimeLine;
            this._captureDisplayMedalDialogImage();
        });

        cc.find('downloadBtn', this.node).on('click', (ev) => {
            if (!this._isAllowClick)return;
            this._isAllowClick = false;
            this._delayAllowUserClick();

            this._playButtonSfx();
            this._shareType = Share_Type.Download;
            this._captureDisplayMedalDialogImage();
        });

        cc.find('closeBtn', this.node).on('click', (ev) => {
            this.node.destroy();
            this._playButtonSfx();

        });
    },


    /**
     * 截图
     * @private
     */
    _captureDisplayMedalDialogImage()
    {
        this._captureMedalImage((imagePath) => {
            console.log(`[DisplayMedalDialog]本地图片地址:${imagePath}`);
            let platform = cc.sys.os;
            if (platform !== cc.sys.OS_ANDROID &&  platform !== cc.sys.OS_IOS) {
                this.node.destroy();
                cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_CLOSE_DISPLAY_MEDAL_DIALOG);
                return;
            }
            let path = this.node.getComponent('CaptureImageComponent').getNativeImagePathByPlatform(platform, imagePath);
            if (this._shareType === Share_Type.Download) {
                cc.ss.nativeUtil.capturePicAndSave(platform, path);
            }else if (this._shareType === Share_Type.Friend) {
                cc.ss.nativeUtil.shareWechatFriend(platform, path);
            }else if (this._shareType === Share_Type.TimeLine) {
                cc.ss.nativeUtil.shareTimeline(platform, path);
            }
        });
    },


    /**
     * 截图
     * @param callback
     * @private
     */
    _captureMedalImage(callback) { this.node.getComponent('CaptureImageComponent').captureImage(cc.ss.GlobalConst.IMAGE_CACHE_PATH, callback); },

    _initPicUIWithData: function (data) {
        this._initDisplaySprite(UI_Type.Real, data);
        this._initHeadIconAndName(UI_Type.Real, data);//0表示真实UI
        this._initDisplayWordLabel(UI_Type.Real, data);
    },

    _initFakePicUIWithData : function(data){
        this._initDisplaySprite(UI_Type.Fake, data);
        this._initHeadIconAndName(UI_Type.Fake, data);//0表示真实UI
        this._initDisplayWordLabel(UI_Type.Fake, data);
    },

    _initDisplaySprite(uiType, data)
    {
        let displaySprite = cc.find('picBg/displaySprite', this.node);
        if (uiType === UI_Type.Fake) displaySprite = cc.find('fakePicBg/displaySprite', this.node);

        displaySprite.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(data.Image_Path));
    },

    _initHeadIconAndName(uiType, data)
    {
        let nameLabel = cc.find("picBg/userInfoBg/nameBg/nameLabel", this.node);
        if (uiType === UI_Type.Fake) nameLabel = cc.find("fakePicBg/userInfoBg/nameBg/nameLabel", this.node);

        nameLabel.getComponent(cc.RichText).string = `<b>${data.Medal_Noti}</b>`;
    },

    _initDisplayWordLabel(uiType, data)
    {
        let contentLabel = cc.find('picBg/medalWordLabel', this.node);
        if (uiType === UI_Type.Fake) contentLabel = cc.find('fakePicBg/medalWordLabel', this.node);
        contentLabel.getComponent(cc.RichText).string = `<b>${data.Medal_Share_Content}</b>`;
    },

    _playButtonSfx() {
        let isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);
        if (isSoundOpen) cc.ss.audioUtil.playSfx(this.buttonSfx);
    },

    _delayAllowUserClick() { setTimeout(() => { this._isAllowClick = true; }, 100); },


    /**
     * 获取勋章常量数据
     * @param medalId
     * @returns {*}
     * @private
     */
    _getMedalConstData(medalId){
        for(let key in MedalDisplayConst) { if (MedalDisplayConst[key].Medal_Id === medalId ) return  MedalDisplayConst[key]; }
        return null;
    },


    _registerTouchEvent : function() {
        let listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function(touches, event) { return true; },
            onTouchMoved : function(event) { },
            onTouchEnded : function(event) { }
        };
        this._listenerId = cc.eventManager.addListener(listener, this.node);
    },

    _fitIphoneX : function ()
    {
        let isIphoneX = cc.ss.uiUtil.isIphoneXsOrAllScreen();
        if(isIphoneX === true){
            let newPositionJson = cc.ss.localStorage.getUserFitIphoneXTopButtonPosition(cc.ss.userInfoCache.userId);
            if(newPositionJson !== null && newPositionJson !== undefined && newPositionJson !== ""){
                let closeBtn = cc.find('closeBtn', this.node);
                let posJson = JSON.parse(newPositionJson);
                closeBtn.setPosition(posJson.iphoneXPos);
            }

        }
    },

    onDestroy :function() { cc.eventManager.removeListener(this._listenerId); }

});
