/**
  @author : shilong
  @time: 2017-07-24
  @description: Controller类 (PureMVC中Command + Mediator的集合体)
**/
cc.Class({
    extends: cc.Component,

    properties: {
     _controllerName : "",
     _touchListenerId : -1,
     _listenerHandle : null
    },



    /**
     * 发送请求
     * @param name
     * @param body
     */
    sendNotification : function (name, body) {
        cc.ss.Facade.sendNotification(name, body);
    },

    //设置controller名字
    setControllerName : function(name) {
      this._controllerName = name;

    },

    onRegister : function() {
        //子类可重写
    },

    onRemove : function() {
        //子类可重写
    },

    //返回Controller 名字
    getControllerName : function() {
        return this._controllerName;
    },

    //获取控制的Notification 数组
    getHandleNotificationList : function() {
        return [];
    },

    //接受通知
    onNotification : function(notification) {
      //子类必须重写，才能处理通知
    },  /**
       * 获取全局持久化节点
       * @param  {[type]} name [description]
       * @return {[type]}      [description]
       */
      findNode : function(name) {
          return cc.find(name);
      },

      /**
       * 全局查找node后获取组件
       * @param  {[type]} nodeName [description]
       * @param  {[type]} comp     [description]
       * @return {[type]}          [description]
       */
      getCompByGlobalNode : function(nodeName, comp) {
          return cc.find(node).getComponent(comp);
      },

      /**
       * 通过节点获取组件
       * @param  {[type]} node [description]
       * @param  {[type]} comp [description]
       * @return {[type]}      [description]
       */
      getCompByNode : function(node, comp) {
          return node.getComponent(comp);
      },

  /**
       * 通过节点获取组件
       * @param  {[type]} node [description]
       * @param  {[type]} comp [description]
       * @return {[type]}      [description]
       */
      getCompByLocalNode : function(node, comp) {
          return node.getComponent(comp);
      },

      //schedule once
      timerOnce :function (callback, delay) {
          this.scheduleOnce(callback, delay);
      },


      //schedule repeate
      timerAlways : function(callback, duration) {
          this.schedule(callback, duration, cc.macro.REPEAT_FOREVER);
      },

      //schedule run in repeatTimes
      timer : function(callback, duration, repeatTimes) {
          this.schedule(callback, duration, repeatTimes);
      },

      //stop all schedule timer
      stopAllTimer : function() {
          this.unscheduleAllCallbacks();
      },

      //stop scheduler by callbackPointer
      stopTimer :function(scheduleID) {
          this.unschedule(scheduleID);
      },

      registerTouchEvent : function() {
        console.log("调用");
        var listener = {
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

        this._listenerHandle = cc.eventManager.addListener(listener, this.node);
      },

      unregisterEvent : function() {
        if(this._listenerId !== -1)
        {
          cc.eventManager.removeListener(this._listenerHandle);
        }
      },
});
