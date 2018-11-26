/**
  @author : shilong
  @time: 2017-07-24
  @description: 观察者类
**/
class Observer
{
    constructor()
    {
        this._notifyMethod = null; // 回调方法
        this._notifyContext = null; //回调上下文
    }

    lazyInit(notifyMethod, notifyContext) {
        this._notifyMethod = notifyMethod;
        this._notifyContext = notifyContext;
    }

    getNotifyMethod() {
        return this._notifyMethod;
    }

    getNotifyContext() {
        return this._notifyContext;
    }

    //调用回调方法并传入notification对象
    notifyObserver(notification) {
        this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }

    //比较
    compareNotifyContext(obj) {
        return obj === this._notifyContext;
    }
}//end class

module.exports = Observer;

//
// cc.Class({
//     properties: {
//         _notifyMethod : null, // 回调方法
//         _notifyContext : null //回调上下文
//     },
//
//     // use this for initialization
//     onLoad: function () {
//
//     },
//
//     lazyInit : function(notifyMethod, notifyContext) {
//       this._notifyMethod = notifyMethod;
//       this._notifyContext = notifyContext;
//     },
//
//     getNotifyMethod : function() {
//       return this._notifyMethod;
//     },
//
//     getNotifyContext : function() {
//       return this._notifyContext;
//     },
//
//     //调用回调方法并传入notification对象
//     notifyObserver :function(notification) {
//         // console.log("NotifyObserver  --- >notifyObserver");
//         this.getNotifyMethod().call(this.getNotifyContext(), notification);
//     },
//
//     //比较
//     compareNotifyContext : function (obj) {
//         return obj === this._notifyContext;
//     },
//
// });
