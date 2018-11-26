cc.Class({
    extends: cc.Component,

    properties: {
        buttonSfx : cc.AudioClip,
        _listenerId : -1,
        _currentBgmCircleState : 0,
        _currentSoundCircleState : 0,

        bgmOpenPoint : cc.p(0,0),
        bgmClosePoint : cc.p(0,0),
        sfxOpenPoint : cc.p(0,0),
        sfxClosePoint : cc.p(0,0),
    },

    onLoad: function () {
        this._registerTouchEvent();
        this._initBtnPosition();

        let closeBtn = cc.find('layout/closeBtn', this.node);
        let bgmBtn = cc.find('layout/bgmBtn', this.node);
        let soundBtn =  cc.find('layout/soundBtn', this.node);

        closeBtn.on('click', (ev) => {
            let isSoundOpen = cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId);
            if (isSoundOpen) cc.ss.audioUtil.playSfx(this.buttonSfx);

            let layoutNode = cc.find('layout', this.node);
            layoutNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.1, 0.1), cc.callFunc(() => { this.node.destroy(); })));

        });


        bgmBtn.on('click', (ev) => {
            let targetPos = cc.p(0, 0);

            if (this._currentBgmCircleState === 0) { // 关闭 --> 开启
                this._currentBgmCircleState = 1;
                this._openBgm();

                targetPos.x = this.bgmOpenPoint.x;
                targetPos.y = this.bgmOpenPoint.y;
            }else { //开启 --> 关闭
                this._currentBgmCircleState = 0;
                this._closeBgm();

                targetPos.x = this.bgmClosePoint.x;
                targetPos.y = this.bgmClosePoint.y;
            }

            bgmBtn.runAction(cc.moveTo(0.09, targetPos));

        });

        soundBtn.on('click', (ev) => {
            let targetPos = cc.p(0, 0);

            if (this._currentSoundCircleState === 0) {// 关闭 --> 开启
                this._currentSoundCircleState = 1;
                this._openSound();

                targetPos.x = this.sfxOpenPoint.x;
                targetPos.y = this.sfxOpenPoint.y;

            }else {//开启 --> 关闭
                this._currentSoundCircleState = 0;
                this._closeSound();

                targetPos.x = this.sfxClosePoint.x;
                targetPos.y = this.sfxClosePoint.y;
            }

            soundBtn.runAction(cc.moveTo(0.09, targetPos));
        });

        let layoutNode = cc.find('layout', this.node);
        layoutNode.setScale(0.1);
        layoutNode.runAction(cc.EaseBounceOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
    },

    _openBgm : function () {
        let userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setBgmState(userId, true);

        cc.ss.audioUtil.resumeBgm();
    },

    _closeBgm : function () {
        let userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setBgmState(userId, false);

        cc.ss.audioUtil.pauseBgm();
    },

    _openSound : function () {
        console.log("[Setting]开启sound");
        let userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setSoundState(userId, true);

        cc.ss.audioUtil.playSfx(this.buttonSfx);
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_SETTING_OPEN_SFX);//发送开启音效的通知
    },

    _closeSound : function () {
        console.log("[Setting]关闭sound");
        let userId = cc.ss.userInfoCache.userId;
        cc.ss.localStorage.setSoundState(userId, false);
        cc.ss.Facade.sendNotification(cc.ss.TagConst.TAG_SETTING_CLOSE_SFX);//发送关闭音效的通知
    },


    _initBtnPosition()
    {
        let bgmBtn = cc.find('layout/bgmBtn', this.node);
        let soundBtn =  cc.find('layout/soundBtn', this.node);

        let userId = cc.ss.userInfoCache.userId;
        let isBgmOpen = cc.ss.localStorage.isBgmOpen(userId);
        let isSoundOpen = cc.ss.localStorage.isSoundOpen(userId);

        if (isBgmOpen) {
            this._currentBgmCircleState = 1;
            bgmBtn.x = this.bgmOpenPoint.x;
            bgmBtn.y = this.bgmOpenPoint.y;
        }else {
            this._currentBgmCircleState = 0;
            bgmBtn.x = this.bgmClosePoint.x;
            bgmBtn.y = this.bgmClosePoint.y;
        }
        if (isSoundOpen)
        {
            soundBtn.x = this.sfxOpenPoint.x;
            soundBtn.y = this.sfxOpenPoint.y;

            this._currentSoundCircleState = 1;

        }else {
            this._currentSoundCircleState = 0;
            soundBtn.x = this.sfxClosePoint.x;
            soundBtn.y = this.sfxClosePoint.y;
        }
    },



    _registerTouchEvent : function() {
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

    onDestroy(){
        cc.eventManager.removeListener(this._listenerId);
   }

});
