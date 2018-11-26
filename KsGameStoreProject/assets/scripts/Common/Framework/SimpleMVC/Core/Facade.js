/**
  @author : shilong
  @time: 2017-07-24
  @description: Facade SimpleMVC入口
**/

const Model = require("Model");
const Med = require("Med");
const Notification = require("Notification");

class Facade
{
    constructor()
    {
        this._model = null;
        this._controller = null;
        this._med = null;
    }

    static getFacade()
    {
        if (this._instance === null || this._instance === undefined)
        {
            console.log('[Facade]初始化Facade静态实例');
           this._instance = new Facade();
           this._instance.lazyInit();
        }
       return this._instance;
    }

    //延迟初始化
    lazyInit()
    {
        this._model = Model.getModel();
        this._med = Med.getMed();
    }

    //发送消息
    sendNotification(notificationName, body, type)
    {
        let notification = new Notification();
        notification.lazyInit(notificationName, body, type);
        this._med.notifyObservers(notification);
    }

    //注册Controller
    registerController(controller)
    {
        this._med.registerController(controller);
    }
    //移除Controller
    removeController(controller)
    {
        this._med.removeController(controller.getControllerName());
    }
    
    //注册Model - Proxy
    registerProxy(proxyInstance)
    {
        this._model.registerProxy(proxyInstance);
    }

    //移除Model - Proxy
    removeProxy(proxyName)
    {
        this._model.removeProxy(proxyName);
    }
    
    //获取proxy
    getProxy(proxyName)
    {
        return this._model.getProxy(proxyName);
    }


}

module.exports = Facade;
//
// /**
//   Facade类
// **/
// var Facade = cc.Class({
//
//     properties: {
//         _model : null,
//         _controller : null,
//         _med : null,
//     },
//
//     statics : {
//         _instance :null,
//
//         getFacade : function() {
//             if (this._instance == null) {
//                 this._instance = new Facade();
//                 this._instance.lazyInit();
//             }
//             return this._instance;
//         },
//
//     },
//
//     //延迟初始化
//     lazyInit :function () {
//       this._model = Model.getModel();
//       this._med = Med.getMed();
//     },
//
//     //发送消息
//     sendNotification : function(notificationName, body, type) {
//       if (this._med != null) {
//         // console.log("Facade - 发送消息");
//         var notification = new Notification();
//         notification.lazyInit(notificationName, body, type);
//         this._med.notifyObservers(notification);
//       }
//     },
//
//     //注册Controller
//     registerController :function(controller) {
//       if (this._med != null) {
//           this._med.registerController(controller);
//       }
//
//     },
//
//     //移除Controller
//     removeController : function(controller) {
//       if (this._med != null) {
//           this._med.removeController(controller.getControllerName());
//       }
//     },
//
//
//     //注册Model - Proxy
//     registerProxy : function(proxyInstance) {
//       if (this._model != null) {
//           this._model.registerProxy(proxyInstance);
//       }
//     },
//
//     //移除Model - Proxy
//     removeProxy : function(proxyName){
//       if (this._model != null) {
//           this._model.removeProxy(proxyName);
//       }
//     },
//
//     //获取proxy
//     getProxy : function(proxyName){
//         return this._model.getProxy(proxyName);
//     },
// });
