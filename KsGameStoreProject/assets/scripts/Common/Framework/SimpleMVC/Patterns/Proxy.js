/**
  @author : shilong
  @time: 2017-07-24
  @description: Proxy类
**/

const Facade = require('Facade');
class Proxy
{
    onRegister()
    {
       console.log('[Proxy]onRegister') ;
    }

    onRemove()
    {
        console.log('[Proxy]onRemove') ;
    }

    sendNotification(name, body, type)
    {
        let facade = Facade.getFacade();
        if (facade) facade.sendNotification(name, body, type);
    }

    getProxyName()
    {
        return "";
    }

}//end class Proxy

module.exports = Proxy;
