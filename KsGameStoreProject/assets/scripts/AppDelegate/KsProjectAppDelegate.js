const Facade = require("Facade");
const UIUtil = require('UIUtil');
const AudioUtil = require('AudioUtil');
const DateUtil = require('DateUtil');
const ReportPointUtil = require("ReportPointUtil");
const UserInfoCacheMgr = require('UserInfoCacheMgr');

const LocalStorageMgr = require('LocalStorageMgr');
const LifeSystemMgr = require('LifeSystemMgr');
const SystemMgr = require('SystemMgr');
const LauncherProxy = require('LauncherProxy');

/**
 * 代理入口类
 */
class KsProjectAppDelegate {

    setupApplication()
    {
        this._initializeVariables();
        this._initializeProxy();
    }

    loadNativeInfo()
    {
        let userId = cc.sys.localStorage.getItem("nativeUserId");
        let userName = cc.sys.localStorage.getItem("nativeUserName");
        let userPickerURL = cc.sys.localStorage.getItem("nativeUserPickerURL");
        let httpRequestToken = cc.sys.localStorage.getItem("nativeHttpRequestToken");
        let deviceId = cc.sys.localStorage.getItem("nativeDeviceId");
        let appVersion = cc.sys.localStorage.getItem("nativeAppVersion");

        //石龙于2018-5-25添加获取用户进入界面选择
        let appEnterSceneType = cc.sys.localStorage.getItem("nativeAppEnterKsTaskSceneType");
        appEnterSceneType = parseInt(appEnterSceneType);
        console.log("[KSProjectAppDelegate]native -> appEnterSceneType:", appEnterSceneType);
        console.log("[KSProjectAppDelegate]native -> appVersion:", appVersion);
        console.log("[KSProjectAppDelegate]native -> userId:", userId);
        console.log("[KSProjectAppDelegate]native -> userName:", userName);
        console.log("[KSProjectAppDelegate]native -> userPickerURL:", userPickerURL);
        console.log("[KSProjectAppDelegate]native -> httpRequestToken:", httpRequestToken);
        console.log("[KSProjectAppDelegate]native -> deviceId:", deviceId);

        cc.ss.userInfoCache.enterGameSceneType = appEnterSceneType;
        cc.ss.userInfoCache.userId = userId;
        cc.ss.userInfoCache.userName = userName;
        cc.ss.userInfoCache.headIconURL = userPickerURL;
        cc.ss.userInfoCache.deviceId = deviceId;
        cc.ss.userInfoCache.appVersion = appVersion;
        cc.ss.httpRequestToken = httpRequestToken


    }

    _initializeVariables()
    {
        cc.ss = {}; //使用cc.ss作为本项目的namespace
        cc.ss.httpRequestToken = "";

        // //SimpleMvc 封装
        cc.ss.Facade =  Facade.getFacade(); //SimpleMvc - Facade类

        //工具类
        cc.ss.uiUtil = new UIUtil();
        cc.ss.audioUtil = new AudioUtil();  //声音工具
        cc.ss.dateUtil = new DateUtil();//日期工具
        cc.ss.localStorage = new LocalStorageMgr();//本地缓存
        cc.ss.nativeUtil = require('NativeMgr');//Native工具类
        cc.ss.reportPointUtil = new ReportPointUtil();//打点
        cc.ss.stringUtil = require('StringUtil');//字符串工具类


        //Mgr类
        cc.ss.userInfoCache = new UserInfoCacheMgr();
        cc.ss.localStorage = new LocalStorageMgr();//本地缓存
        cc.ss.lifeSystemMgr = new LifeSystemMgr(); //体力Mgr
        cc.ss.systemMgr = new SystemMgr();//系统工具


        //Const
        //常量类
        cc.ss.URLConst = require("URLConst");//声明URL常量
        cc.ss.NameConst = require("NameConst");//声明名字常量
        cc.ss.TagConst = require("TagConst");// tag常量
        cc.ss.ErrorConst = require("ErrorConst");//Error常量
        cc.ss.GlobalConst = require('GlobalConst');//Global常量

    }

    _initializeProxy()
    {
        cc.ss.Facade.registerProxy(new LauncherProxy());
    }



}//end class


module.exports = KsProjectAppDelegate;