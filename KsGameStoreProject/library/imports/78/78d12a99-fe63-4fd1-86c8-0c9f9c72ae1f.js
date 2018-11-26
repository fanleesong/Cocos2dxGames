"use strict";
cc._RF.push(module, '78d12qZ/mNP0YbIDJ+ccq4f', 'SystemMgr');
// scripts/Common/Mgr/SystemMgr.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SystemMgr = function () {
    function SystemMgr() {
        _classCallCheck(this, SystemMgr);
    }

    _createClass(SystemMgr, [{
        key: 'startUp',
        value: function startUp() {
            this._registerListeners();
        }
    }, {
        key: '_registerListeners',
        value: function _registerListeners() {
            cc.game.on(cc.game.EVENT_SHOW, function () {
                console.log('[SystemMgr]接收到进入前台的消息');
                cc.ss.lifeSystemMgr.enterForeground(); //进入前台

                var isBgmOpen = cc.ss.localStorage.isBgmOpen(cc.ss.userInfoCache.userId);
                if (isBgmOpen) cc.ss.audioUtil.resumeBgm(); //恢复bgm
            });

            cc.game.on(cc.game.EVENT_HIDE, function () {
                console.log('[SystemMgr]接收到进入后台的消息');
                cc.ss.lifeSystemMgr.enterBackground(); //进入后台

                var isBgmOpen = cc.ss.localStorage.isBgmOpen(cc.ss.userInfoCache.userId);
                if (isBgmOpen) cc.ss.audioUtil.pauseBgm(); //暂停bgm
            });
        }
    }]);

    return SystemMgr;
}(); //end class

module.exports = SystemMgr;

cc._RF.pop();