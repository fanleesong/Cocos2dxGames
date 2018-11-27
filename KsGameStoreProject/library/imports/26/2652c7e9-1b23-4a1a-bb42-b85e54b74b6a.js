"use strict";
cc._RF.push(module, '2652cfpGyNKGrtCuF5Ut0tq', 'LauncherViewController');
// scripts/GameModule/Launcher/Module/ViewController/LauncherViewController.js

'use strict';

var _require = require('GameConfig'),
    ResourceList = _require.ResourceList,
    EnvConfig = _require.EnvConfig,
    Env_Config_Type = _require.Env_Config_Type,
    RES_TYPE = _require.RES_TYPE;

var KSProjectAppDelegate = require('KsProjectAppDelegate');

var BaseViewController = require("BaseViewController");

var SceneMgr = require('SceneMgr');
var DialogMgr = require('DialogMgr');

cc.Class({
    extends: BaseViewController,

    properties: {
        bgm: cc.AudioClip,

        _monkeyOriginX: 0,
        _currentLoadingIndex: 0,
        _currentLoadingProgress: 0
    },

    getHandleNotificationList: function getHandleNotificationList() {
        return [cc.ss.TagConst.TAG_LAUNCHER_GAME_INITIALIZE_INFO_COMPLETE, cc.ss.TagConst.TAG_LAUNCHER_LOADING_PROGRESS, cc.ss.TagConst.TAG_SHOW_NET_ERROR_DIALOG];
    },

    //接受通知
    onNotification: function onNotification(notification) {
        var name = notification.getName();

        if (name === cc.ss.TagConst.TAG_LAUNCHER_GAME_INITIALIZE_INFO_COMPLETE) {
            this._onCompleteGameInitializeInfoComplete(notification.getBody());
        } else if (name === cc.ss.TagConst.TAG_SHOW_NET_ERROR_DIALOG) {
            this._showNetErrorDialog(notification.getBody());
        } else if (name === cc.ss.TagConst.TAG_LAUNCHER_LOADING_PROGRESS) {
            this._handleLoadingProgress(notification.getBody());
        }
    },

    _handleLoadingProgress: function _handleLoadingProgress(loadingProgressValue) {
        this._currentLoadingProgress += loadingProgressValue;
        this._setLoadingProgress(this._currentLoadingProgress);
    },
    _onCompleteGameInitializeInfoComplete: function _onCompleteGameInitializeInfoComplete(data) {
        console.log('[LauncherViewController]\u521D\u59CB\u5316\u6570\u636E\u5B8C\u6210:' + JSON.stringify(data));
        this._setLoadingProgress(1);

        var volumeValue = cc.ss.localStorage.isBgmOpen(cc.ss.userInfoCache.userId) ? 1 : 0;
        cc.ss.audioUtil.playBgm(this.bgm, volumeValue);

        //2018年11月19添加打点
        cc.ss.reportPointUtil.reportGameStoreEnterLauncherShowEvent();

        this._handleLaunchCompleteData(data);
        this._enterGameScene();
    },


    /**
     * 是否需要进入勋章列表界面
     * @returns {boolean}
     * @private
     */
    _isNeedToMedalListScene: function _isNeedToMedalListScene() {
        var rlt = false;
        var enterGameSceneType = cc.ss.userInfoCache.enterGameSceneType;
        if (enterGameSceneType === null || enterGameSceneType === undefined || enterGameSceneType === "") {
            rlt = false;
        } else {
            rlt = enterGameSceneType === 1;
        }

        return rlt;
    },
    _enterGameScene: function _enterGameScene() {
        // if (this._isNeedToMedalListScene())
        // {
        //     console.log("[LauncherViewController]进入勋章中心");
        //     SceneMgr.ToMedalList();
        // }else {
        //     console.log("[LauncherViewController]进入World地图场景");
        //     SceneMgr.ToWorld();
        // }
        console.log("[LauncherViewController]进入星星商城场景");
        SceneMgr.ToGameStore();
    },
    _handleLaunchCompleteData: function _handleLaunchCompleteData(serverData) {
        cc.ss.lifeSystemMgr.lazyInit(cc.ss.userInfoCache.userId, parseInt(serverData.hp), parseInt(serverData.recoverLifeSeconds) * 1000);
        cc.ss.lifeSystemMgr.startUp();
        cc.ss.systemMgr.startUp();
    },
    _showNetErrorDialog: function _showNetErrorDialog(data) {
        var _this = this;

        if (data.proxyType === cc.ss.GlobalConst.PROXY_LAUNCHER_CONTROLLER) {
            DialogMgr.showNetErrorDialog(cc.find('Canvas'), cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON, function () {
                _this._requestGameInitInfo();
            }, function () {
                //退出
                cc.ss.nativeUtil.backToNative(cc.sys.os);
            });
        }
    },
    start: function start() {
        cc.find('loadingBar/loadingProgress/monkey', this.node).active = !this._isNeedToMedalListScene();
    },


    // use this for initialization
    onLoad: function onLoad() {
        var appDelegate = new KSProjectAppDelegate(); //初始化引擎
        appDelegate.setupApplication(); //初始化引擎参数

        this.setControllerName(cc.ss.NameConst.NAME_CONTROLLER_LAUNCHER);
        cc.ss.Facade.registerController(this);

        this._initUI();

        var isDeveloping = EnvConfig.Debug;
        if (isDeveloping === true) {
            //开发模式显示输入userId的输入框
            console.log('[LaunchViewController]开启游戏开发调试模式');

            this.node.getChildByName("userIdInput").active = true; //显示输入框
            //设置测试用数据
            cc.ss.userInfoCache.userName = '小美';
            cc.ss.userInfoCache.headIconURL = "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erygibDSibV2gvoasia1SEEc0ic6dksftprOsUpicFxmmmziahicJCDqH8QwZZZ5hkgsZ2m2LeVLH6brQFXw/0";
            cc.ss.httpRequestToken = '{\\"to\\":2495013475544,\\"rd\\":\\"481495013476544\\",\\"il\\":false,\\"aid\\":\\"123456\\"}|REU2NEM4NEQ0RDVBMkYxQTM0MjVDMzUwQkFCRDE2Q0Q=';
        } else {
            //正式模式
            console.log('[LaunchViewController]开启游戏发布模式');
            appDelegate.loadNativeInfo(); //加载读取Native端数据

            this.node.getChildByName("userIdInput").active = false; //隐藏输入框
            this._loadGameResources(); //加载资源
        }
    },

    _initUI: function _initUI() {
        var _this2 = this;

        var testStartBtn = cc.find('testStartBtn', this.node);
        testStartBtn.on('click', function (event) {
            console.log('点击测试开始登录按钮');
            if (EnvConfig.Debug === true) {
                var userIdInput = cc.ss.uiUtil.findNodeByPathName(_this2.node, "userIdInput");
                var inputStr = userIdInput.getComponent(cc.EditBox).string;
                userIdInput.active = false;
                console.log("[LauncherViewController]用户输入测试用UserId:" + inputStr);
                cc.ss.userInfoCache.userId = inputStr;
            }

            _this2._loadGameResources(); //加载图片资源
        });

        var monkey = cc.find('loadingBar/loadingProgress/monkey', this.node);
        this._monkeyOriginX = monkey.x;

        this._setVersionLabel(); //设置版本号
    },
    _loadGameResources: function _loadGameResources() {
        this.node.getChildByName("loadingBar").active = true;
        this.node.getChildByName("testStartBtn").active = false;
        console.log("[LauncherViewController]开始加载资源");
        this._loadRes();
    },
    _loadRes: function _loadRes() {
        var _this3 = this;

        if (this._currentLoadingIndex >= ResourceList.length) {
            console.log('[LauncherViewController]\u8D44\u6E90\u5168\u90E8\u52A0\u8F7D\u5B8C\u6210,\u8BF7\u6C42\u670D\u52A1\u5668\u5224\u65AD');
            this._requestGameInitInfo();
            return;
        }

        var res = ResourceList[this._currentLoadingIndex];
        var resPath = res.path;
        var resType = res.type;

        var assetType = null;
        if (resType === RES_TYPE.RES_TYPE_IMAGE) {
            assetType = cc.Texture2D;
        } else if (resType === RES_TYPE.RES_TYPE_AUDIO) {
            assetType = cc.AudioClip;
        }

        var progressCallback = function progressCallback(num, totalNum, item) {
            if (num !== 0 && totalNum !== 0) {
                var subProgress = num / totalNum;
                subProgress = subProgress * (1 / ResourceList.length) / 2;
                _this3._setLoadingProgress(_this3._currentLoadingProgress + subProgress);
                if (num === totalNum) {
                    _this3._currentLoadingProgress += subProgress;
                }
            }
        };

        var completeCallback = function completeCallback(err, assets) {
            console.log('[LauncherViewController]' + resPath + '\u52A0\u8F7D\u5B8C\u6210');
            _this3._currentLoadingIndex++;
            _this3._loadRes();
        };

        cc.loader.loadResDir(resPath, assetType, progressCallback, completeCallback);
    },


    /**
     * 请求游戏初始化信息
     * @private
     */
    _requestGameInitInfo: function _requestGameInitInfo() {
        console.log('[LauncherViewController]请求游戏初始化信息');
        var proxy = cc.ss.Facade.getProxy(cc.ss.NameConst.NAME_PROXY_LAUNCHER);
        proxy.requestGameInitializeInfo(cc.ss.userInfoCache.userId);
    },


    /**
     * 设置加载进度
     * @param progress
     * @private
     */
    _setLoadingProgress: function _setLoadingProgress(progress) {
        var progressComp = cc.find('loadingBar/loadingProgress', this.node).getComponent(cc.ProgressBar);
        progressComp.progress = progress;

        var bar = cc.find('loadingBar/loadingProgress/bar', this.node);
        var monkey = cc.find('loadingBar/loadingProgress/monkey', this.node);
        monkey.x = this._monkeyOriginX + bar.width * progress;
    },

    /**
     * 设置版本号
     * @private
     */
    _setVersionLabel: function _setVersionLabel() {
        var versionText = "1.0.0";
        var envMode = EnvConfig.EnvMode; //开发环境版本号使用和测试环境
        if (envMode === Env_Config_Type.Env_Config_Type_Test) versionText = cc.sys.localStorage.getItem("debug_KsGameStoreLocalVersion");else if (envMode === Env_Config_Type.Env_Config_Type_Gamma) versionText = cc.sys.localStorage.getItem("gamma_KsGameStoreLocalVersion");else if (envMode === Env_Config_Type.Env_Config_Type_Release) versionText = cc.sys.localStorage.getItem("release_KsGameStoreLocalVersion");else if (envMode === Env_Config_Type.Env_Config_Type_Dev) versionText = cc.sys.localStorage.getItem("dev_KsGameStoreLocalVersion");

        if (versionText === null || versionText === undefined) versionText = "1.0.0";
        this.node.getChildByName("versionLabel").getComponent(cc.Label).string = "version:" + versionText;
        //范林松于2018年11月13日 添加IPhoneX的 homeIndicator 的安全距离
        if (this.node.getComponent("FitScreenComponent").isIphoneXsOrAllScreen()) {
            this.node.getChildByName("versionLabel").getComponent(cc.Widget).bottom = 60;
            this.node.getChildByName("versionLabel").getComponent(cc.Widget).left = 40;
            this.node.getChildByName("versionLabel").getComponent(cc.Widget).updateAlignment();
        }
    },

    onDestroy: function onDestroy() {
        cc.ss.Facade.removeController(this);
    }

});

cc._RF.pop();