(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameModule/Base/Module/View/HeadIcon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '59e36/ta6FIPoQrW68OwEvD', 'HeadIcon', __filename);
// scripts/GameModule/Base/Module/View/HeadIcon.js

'use strict';

var Controller = require('Controller');

var _require = require('RequestTaskFactory'),
    RequestTaskFactory = _require.RequestTaskFactory,
    Task_Type = _require.Task_Type;

var SceneMgr = require('SceneMgr');

cc.Class({
    extends: Controller,

    properties: {
        buttonSfx: cc.AudioClip, //btn sfx
        lifeHeartTexture: cc.Texture2D,
        lifeHeartNoneTexture: cc.Texture2D,
        _clickCallback: null
    },

    getHandleNotificationList: function getHandleNotificationList() {
        return [cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_INFO, cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_STAR_INFO, cc.ss.TagConst.TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN, cc.ss.TagConst.TAG_LIFE_SYSTEM_START_COUNT_DOWN, cc.ss.TagConst.TAG_LIFE_SYSTEM_COUNT_DOWN_TIME, cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE];
    },

    onNotification: function onNotification(notification) {
        var name = notification.getName();
        var body = notification.getBody();
        if (name === cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_INFO) {
            //刷新数据
            this._initUIByData();
        } else if (name === cc.ss.TagConst.TAG_REFRESH_HEAD_ICON_STAR_INFO) {
            this._setupStarNum();
        } else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_COMPLETE_COUNT_DOWN) {
            this._onHandleCountDownComplete();
        } else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_START_COUNT_DOWN) {
            this._onHandleCountDownStart();
        } else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_COUNT_DOWN_TIME) {
            this._onHandleCountDownTimeUpdate(body);
        } else if (name === cc.ss.TagConst.TAG_LIFE_SYSTEM_UPDATE_LIFE) {
            this._onHandleUpdateLife();
        }
    },

    _onHandleCountDownStart: function _onHandleCountDownStart() {
        this._setCountTimeLabel(cc.ss.lifeSystemMgr.getNowCountDownSecs());
        cc.find('timeBg', this.node).active = true;
    },
    _onHandleCountDownComplete: function _onHandleCountDownComplete() {
        cc.find('timeBg', this.node).active = false;
    },
    _convertSecsToTime: function _convertSecsToTime(secs) {
        secs = parseInt(secs) / 1000;

        var minute = parseInt(secs / 60);
        var second = secs % 60;

        return { minute: minute, second: second };
    },
    _setCountTimeLabel: function _setCountTimeLabel(secs) {
        var time = this._convertSecsToTime(secs);

        cc.find('timeBg/timeLabel', this.node).getComponent(cc.Label).string = cc.ss.stringUtil.prefixInteger(time.minute, 2) + ':' + cc.ss.stringUtil.prefixInteger(time.second, 2);
    },
    _onHandleCountDownTimeUpdate: function _onHandleCountDownTimeUpdate(secs) {
        this._setCountTimeLabel(secs);
    },
    _onHandleUpdateLife: function _onHandleUpdateLife() {
        this._setupLife();
    },
    _loadHeadIcon: function _loadHeadIcon(headIconURL) {
        var headSprite = cc.find('headBgSpriteBtn/maskNode/picSprite', this.node);
        var srcWidth = headSprite.width;
        var srcHeight = headSprite.height;
        headSprite.opacity = 0;

        var dirPath = jsb.fileUtils.getWritablePath() + cc.ss.GlobalConst.IMAGE_CACHE_PATH;
        var task = RequestTaskFactory.createTask(Task_Type.Image, headIconURL, dirPath, function (tex, filePath) {
            if (tex) {
                headSprite.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                headSprite.width = srcWidth;
                headSprite.height = srcHeight;

                headSprite.runAction(cc.fadeTo(0.8, 255));
            }
        });

        task.doDownload();
    },


    onLoad: function onLoad() {
        this.setControllerName(cc.ss.NameConst.NAME_CONTROLLER_HEAD_ICON);
        cc.ss.Facade.registerController(this);

        this._bindClickEvent();
        this._initUIByData();
    },

    _initUIByData: function _initUIByData() {
        this._setupLife(); //初始化体力

        this._setupStarNum(); //初始化星星数字

        this._setupHeadIcon(); //初始化头像

        this._setupTime(); //初始化时间
    },
    _setupLife: function _setupLife() {
        var _this = this;

        var lifeNum = cc.ss.lifeSystemMgr.getLife();
        var lifeHeartList = cc.find('lifeInfoBg/lifeNode', this.node).getChildren();
        lifeNum = lifeNum > 5 ? 5 : lifeNum;

        lifeHeartList.forEach(function (heartSp) {
            heartSp.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(_this.lifeHeartNoneTexture);
        });

        for (var i = 0; i < lifeNum; i++) {
            lifeHeartList[i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.lifeHeartTexture);
        }
    },
    _setupStarNum: function _setupStarNum() {
        var starCount = cc.ss.userInfoCache.userStarNum;
        cc.find('starInfoBg/starLabel', this.node).getComponent(cc.Label).string = starCount > 999999999 ? "999999999+" : starCount;
    },
    _setupHeadIcon: function _setupHeadIcon() {
        var headIconURL = cc.ss.userInfoCache.headIconURL;
        if (headIconURL !== "" && headIconURL !== undefined && headIconURL !== 'undefined') this._loadHeadIcon(headIconURL);
    },
    _setupTime: function _setupTime() {
        var isCountingDown = cc.ss.lifeSystemMgr.isCountingDown();
        cc.find('timeBg', this.node).active = isCountingDown;

        if (isCountingDown) this._setCountTimeLabel(cc.ss.lifeSystemMgr.getNowCountDownSecs());
    },
    _bindClickEvent: function _bindClickEvent() {
        var _this2 = this;

        var headBgSpriteBtn = this.node.getChildByName('headBgSpriteBtn');
        headBgSpriteBtn.on('click', function (event) {
            if (_this2._clickCallback) {
                _this2._clickCallback();
                if (cc.ss.localStorage.isSoundOpen(cc.ss.userInfoCache.userId)) cc.ss.audioUtil.playSfx(_this2.buttonSfx);
            }
        });
    },


    onDestroy: function onDestroy() {
        cc.ss.Facade.removeController(this);
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HeadIcon.js.map
        