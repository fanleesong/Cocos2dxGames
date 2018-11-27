const MedalDialogConst = require('MedalDialogConst');
const DialogMgr = require('DialogMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        getMedalSfx : cc.AudioClip,
        buttonSfx : cc.AudioClip,
        _listenerId: -1,
        _closeBtnClickCall : null,
        _medalId : -1
    },

    initWithData(medalId, isGetMedal = true)
    {
        this._medalId = medalId;
        this._fitIphoneX();
        this._registerTouchEvent();
        this._bindClickEvent();

        let medalConstData = this._getMedalData(medalId);
        if (!medalConstData) return;

        this._initMedalLogo(isGetMedal, medalConstData);
        this._initMedalContentLabel(isGetMedal, medalConstData);
        this._initMedalLabel(isGetMedal, medalConstData);

        if (!isGetMedal) this.node.getChildByName('displayBtn').active = false;

        if (isGetMedal) {
            this._showParticle();
            if(cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId)) cc.ss.audioUtil.playSfx(this.getMedalSfx) ;
        }
    },

    _bindClickEvent()
    {
        let closeBtn = this.node.getChildByName('closeBtn');
        closeBtn.on('click', (ev) => {
            this._playButtonSfx();
            this.node.destroy();
            if (this._closeBtnClickCall) this._closeBtnClickCall();
        });

        let displayBtn = this.node.getChildByName('displayBtn');
        displayBtn.on('click', (ev) => {
            this._playButtonSfx();
            this.node.destroy();
            // 于2018年11月20添加打点
            cc.ss.reportPointUtil.reportClickDisplayEvent(this._medalId);

           DialogMgr.showDisplayMedalDialog(cc.find('Canvas'), this._medalId);
        });

    },

    _initMedalLogo(isGetMedal, medalConstData) {
        cc.find('getMedalNode', this.node).active = isGetMedal;
        cc.find('unGetMedalNode', this.node).active = !isGetMedal;

        if (isGetMedal) { cc.find('getMedalNode/getMedalLogo', this.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(medalConstData.Get_Image_Path));
        }else { cc.find('unGetMedalNode/unGetMedalLogo', this.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(medalConstData.UnGet_Image_Path)); }
    },
    _initMedalLabel(isGetMedal, medalConstData)
    {
        cc.find('getMedalTitleSprite', this.node).active = isGetMedal;
        cc.find('unGetMedalTitleSprite', this.node).active = !isGetMedal;

        if (isGetMedal)
        {
            cc.find('getMedalTitleSprite/medalTitleLabel', this.node).getComponent(cc.Label).string = medalConstData.Medal_Title;
            cc.find('getMedalTitleSprite/juebanSprite', this.node).active = medalConstData.isVanish;
        }else {
            cc.find('unGetMedalTitleSprite/medalTitleLabel', this.node).getComponent(cc.Label).string = medalConstData.Medal_Title;
        }

    },

    _initMedalContentLabel(isGetMedal, medalConstData)
    {
        this.node.getChildByName('notiLabel').getComponent(cc.Label).string = isGetMedal ? medalConstData.Medal_Noti_Get : medalConstData.Medal_Noti_UnGet;
    },

    _getMedalData(medalId)
    {
        for(let key in MedalDialogConst)
        {
            let data = MedalDialogConst[key];
            if (data.Medal_Id === medalId ) return  data;
        }
        return null;
    },

    _registerTouchEvent : function () {
        let listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function(touches, event) {
                return true;
            },
            onTouchMoved : function(event) {

            },
            onTouchEnded : function(event) {

            }
        };
        this._listenerId = cc.eventManager.addListener(listener, this.node);

    },
    onDestroy : function () {
        cc.eventManager.removeListener(this._listenerId);
    },

    _showParticle()
    {
        this.node.getChildByName("starParticle").active = true;
        this.node.getChildByName("starParticle").getComponent(cc.ParticleSystem).playOnLoad = true;
    },

    _playButtonSfx()
    {
        let isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);
        if (isSoundOpen) cc.ss.audioUtil.playSfx(this.buttonSfx);
    },

    _fitIphoneX : function ()
    {
        let isIphoneX = cc.ss.uiUtil.isIphoneXsOrAllScreen();
        if(isIphoneX === true){
            let newPositionJson = cc.ss.localStorage.getUserFitIphoneXTopButtonPosition(cc.ss.userInfoCache.userId);
            if(newPositionJson !== null && newPositionJson !== undefined && newPositionJson !== ""){
                let closeBtn = cc.find('closeBtn',this.node);
                let posJson = JSON.parse(newPositionJson);
                closeBtn.setPosition(posJson.iphoneXPos);
            }

        }
    },

    setClickCloseDialogCallback(callback) { this._closeBtnClickCall = callback; }

});
