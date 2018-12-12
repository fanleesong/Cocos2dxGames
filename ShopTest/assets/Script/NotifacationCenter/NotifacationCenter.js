let NotificationCenter = {
    handles_: {},
    //发送事件
    emit: function (eventName, data) {
        let returns = []; //返回值
        data = data || {};

        let name = eventName;
        data.eventName = name; //保存一下事件名字

        for (let findEvenName in this.handles_) {
            if (findEvenName == eventName) {
                for (let i = 0; i < this.handles_[name].length; i++) {
                    let handler = this.handles_[name][i]
                    let returnValue = handler.callback.call(handler.target, data);
                    returns.push(returnValue);
                }
            }
        }
        return returns
    },
    //添加普通事件
    on: function (eventNames, callback, target) {

        if (Array.isArray(eventNames) == false) {
            eventNames = [eventNames];
        }
        for (let i = 0, len = eventNames.length; i < len; i++) {
            // console.log('收到事件', eventName);
            let name = eventNames[i];
            this.handles_[name] = this.handles_[name] || [];

            this.handles_[name].push({
                callback: callback,
                target: target
            });
        }
    },

    //通过事件名和target移除一个监听器
    off: function (eventNames, callback, target) {

        if (target == undefined) {
            target = callback;
            callback = undefined;
        }
        if (Array.isArray(eventNames) == false) {
            eventNames = [eventNames];
        }
        for (let idx in eventNames) {
            let eventName = eventNames[idx];
            for (let i = 0; i < this.handles_[eventName].length; i++) {
                let handler = this.handles_[eventName][i];
                if (target == handler.target &&
                    (callback.toString() == handler.callback.toString() || callback == undefined)) {
                    this.handles_[eventName].splice(i, 1);
                }
            }
        }
    },
};

module.exports = NotificationCenter;
