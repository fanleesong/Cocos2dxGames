/**
  @author : shilong
  @time: 2017-07-24
  @description: Notification 通知类
**/

class Notification
{
    constructor()
    {
        this._notiName = "";
        this._notiBody = null;
        this._notiType = 0 ;
    }

    lazyInit(name, body, type) {
        this._notiName = name;
        this._notiBody = body;
        this._notiType = type;
    }

    getType() {
        return this._notiType;
    }

    getBody() {
        return this._notiBody;
    }

    getName() {
        return this._notiName;
    }


}//end class Notification

module.exports = Notification;
