/**
  @author : shilong
  @time: 2017-07-24
  @description: Med类 --（Controller管理类）
**/
const Observer = require('Observer');

class Med
{
    constructor()
    {
        this._observerMap = [];
        this._controllerMap = [];

    }
    //获取View 静态实例
    static getMed() {
        if (this._medInstance === null || this._medInstance === undefined){
          this._medInstance = new  Med();
          console.log(`[Med]初始化Model静态实例`);
        }
        return this._medInstance;
    }

    //注册组件
    registerController(controller) {
        if (this._controllerMap[controller.getControllerName()] != null) {
            return;
        }
        this._controllerMap[controller.getControllerName()] = controller;

        let wantHandleList = controller.getHandleNotificationList();
        let observer = new Observer();
        observer.lazyInit(controller.onNotification, controller);

        for (let i = 0; i < wantHandleList.length; i++) {
            this.registerObserver(wantHandleList[i], observer);
        }

        controller.onRegister();
    }

    //注册监听器
    registerObserver(notificationName, observer) {
        if (this._observerMap[notificationName] != null) {
            this._observerMap[notificationName].push(observer);
        }else{
            this._observerMap[notificationName] = [observer];
        }
    }

    //通知
    notifyObservers(notification) {
        if (this._observerMap[notification.getName()] != null) {
            let observerArr = this._observerMap[notification.getName()];
            for (let i = 0; i < observerArr.length; i++) {
                let observer = observerArr[i];
                observer.notifyObserver(notification);
            }
        }
    }

    //移除Controller
    removeController(controllerName) {
        let controller =  this._controllerMap[controllerName];
        if (controller) {
            let handleList = controller.getHandleNotificationList();

            //删除Observer
            for (let i = 0; i < handleList.length; i++) {
                this.removeObserver(handleList[i], controller);
            }
            //从map中删除controller
            delete this._controllerMap[controllerName];
            controller.onRemove();
        }
    }

    removeObserver(notificationName, notifyContext) {
        let observers = this._observerMap[notificationName];
        for (let i = 0; i < observers.length; i++) {
            let observer = observers[i];
            if (observer.compareNotifyContext(notifyContext) === true) {
                observers.splice(i, 1);
                break;
            }
        }

        if (observers.length === 0) {//如果长度为空,删除整个item
            delete this._observerMap[notificationName];
        }
    }

}//end class

module.exports = Med;

//
// const Med = cc.Class({
//
//     //静态变量
//     statics : {
//       _medInstance : null,
//
//       //获取View 静态实例
//       getMed : function() {
//           if (this._medInstance === null) {
//             this._medInstance = new  Med();
//           }
//           return this._medInstance;
//       },
//     },
//
//     //对象变量
//     properties: {
//       _observerMap : [],
//       _controllerMap : []
//     },
//
//     //注册组件
//     registerController : function(controller) {
//       if (this._controllerMap[controller.getControllerName()] != null) {
//         return;
//       }
//       this._controllerMap[controller.getControllerName()] = controller;
//
//       let wantHandleList = controller.getHandleNotificationList();
//       let observer = new Observer();
//       observer.lazyInit(controller.onNotification, controller);
//
//       for (var i = 0; i < wantHandleList.length; i++) {;
//         this.registerObserver(wantHandleList[i], observer);
//       }
//
//       controller.onRegister();
//     },
//
//     //注册监听器
//     registerObserver : function(notificationName, observer) {
//       if (this._observerMap[notificationName] != null) {
//           this._observerMap[notificationName].push(observer);
//       }else{
//           this._observerMap[notificationName] = [observer];
//        }
//     },
//
//     //通知
//     notifyObservers : function(notification) {
//       // console.log("View notifyObservers");
//       // console.log(notification.getName());
//       // console.log(notification.getBody());
//       if (this._observerMap[notification.getName()] != null) {
//           let observerArr = this._observerMap[notification.getName()];
//
//           for (var i = 0; i < observerArr.length; i++) {
//             let observer = observerArr[i];
//             observer.notifyObserver(notification);
//           }
//       }
//     },
//
//     //移除Controller
//     removeController : function(controllerName) {
//       let controller =  this._controllerMap[controllerName];
//       if (controller) {
//         let handleList = controller.getHandleNotificationList();
//
//         //删除Observer
//         for (var i = 0; i < handleList.length; i++) {
//           this.removeObserver(handleList[i], controller);
//         }
//
//         //从map中删除controller
//         delete this._controllerMap[controllerName];
//         controller.onRemove();
//
//       }
//     },
//
//     removeObserver : function(notificationName, notifyContext) {
//         let observers = this._observerMap[notificationName];
//         for (var i = 0; i < observers.length; i++) {
//           let observer = observers[i];
//           if (observer.compareNotifyContext(notifyContext) === true) {
//               observers.splice(i, 1);
//               // console.log("成功删除");
//               break;
//           }
//         }
//
//         if (observers.length === 0) {//如果长度为空,删除整个item
//             delete this._observerMap[notificationName];
//         }
//     },
//
// });
