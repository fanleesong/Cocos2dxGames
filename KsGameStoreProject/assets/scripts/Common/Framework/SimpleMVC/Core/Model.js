/**
  @author : shilong
  @time: 2017-07-24
  @description: Model类 --(Proxy管理单例类)
**/

class Model
{
    constructor()
    {
       this._proxyMap = [];
    }

    static getModel() {
        if (this._instance === null || this._instance === undefined) {
            this._instance = new Model();
            console.log(`[Model]初始化Model静态实例`);
        }
        return this._instance;
    }

    registerProxy(proxy) {
        this._proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    }

    removeProxy(proxyName) {
        let proxy = this._proxyMap[proxyName];
        if (proxy) {
            this._proxyMap[proxyName] = null;
            proxy.onRemove();
        }
    }

    getProxy(proxyName) {
        return this._proxyMap[proxyName];
    }

}

module.exports = Model;

//
// var Model = cc.Class({
//     properties: {
//       _proxyMap : [],
//     },
//
//     statics : {
//       _instance : null,
//
//       getModel : function () {
//         if (this._instance === null) {
//           this._instance = new Model();
//         }
//         return this._instance;
//
//       },
//     },
//
//     registerProxy : function(proxy) {
//       // console.log(proxy.getProxyName());
//       this._proxyMap[proxy.getProxyName()] = proxy;
//       proxy.onRegister();
//     },
//
//     getProxy :function(proxyName) {
//       return this._proxyMap[proxyName];
//     },
//
//     removeProxy : function(proxyName) {
//       let proxy = this._proxyMap[proxyName];
//       if (proxy) {
//           this._proxyMap[proxyName] = null;
//           // console.log("删除proxy");
//           proxy.onRemove();
//       }
//     },
// });
