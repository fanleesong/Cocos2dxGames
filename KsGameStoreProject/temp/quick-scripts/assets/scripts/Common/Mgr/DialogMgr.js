(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Common/Mgr/DialogMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4a1d8FpXydKI4p3K8QO0j3Y', 'DialogMgr', __filename);
// scripts/Common/Mgr/DialogMgr.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//对话框管理类

var DialogMgr = function () {
    function DialogMgr() {
        _classCallCheck(this, DialogMgr);
    }

    _createClass(DialogMgr, null, [{
        key: 'showDisplayMedalDialog',


        /**
         *
         * 显示分享勋章对话框
         * @param parentNode
         * @param medalId
         */
        value: function showDisplayMedalDialog(parentNode, medalId) {
            cc.loader.loadRes('prefab/medalList/Prefab_Display_Meda_lDialog', function (err, prefab_on_load) {
                if (err) throw new Error('加载分享对话框错误');

                var prefab = cc.instantiate(prefab_on_load);
                prefab.getComponent('DisplayMedalDialog').initWithData(medalId);
                prefab.parent = parentNode;
            });
        }

        /**
         * 显示勋章对话框
         * @param parentNode
         * @param medalId
         * @param isGetMedal
         * @param clickCloseCallback
         */

    }, {
        key: 'showMedalDialog',
        value: function showMedalDialog(parentNode, medalId, isGetMedal) {
            var clickCloseCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            cc.loader.loadRes('prefab/medalList/Prefab_Medal_Dialog', function (err, prefab_on_load) {
                if (err) throw new Error('加载勋章对话框错误');

                var prefab = cc.instantiate(prefab_on_load);
                prefab.getComponent('MedalDialog').initWithData(medalId, isGetMedal);
                prefab.getComponent('MedalDialog').setClickCloseDialogCallback(clickCloseCallback);

                prefab.parent = parentNode;
            });
        }

        /**
         *
         * 用户中心设置对话框
         * @param parentNode
         */

    }, {
        key: 'showSettingDialog',
        value: function showSettingDialog(parentNode) {
            cc.loader.loadRes('prefab/share/Prefab_Setting', function (err, prefab_on_load) {
                if (err) throw new Error('加载设置提示对话框Prefab错误');

                var prefab = cc.instantiate(prefab_on_load);
                prefab.parent = parentNode;
            });
        }

        /**
         * 网络错误提示框
         * @param parentNode  父节点
         * @param alertType 弹框类型< 默认[退出和重试]  、退出、重试>
         * @param retryCallback 重试按钮 >callback回调函数 若传参则 方法名.bind(this,要传的data数据)
         * @param exitCallback  退出按钮 >callback回调函数 若传参则 方法名.bind(this,要传的data数据)
         *
         */

    }, {
        key: 'showNetErrorDialog',
        value: function showNetErrorDialog(parentNode) {
            var alertType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON;
            var retryCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var exitCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            cc.loader.loadRes('prefab/share/Prefab_Net_Error_Dialog', function (err, prefab_on_load) {
                if (err) throw new Error('加载网络错误对话框Prefab错误');

                var prefab = cc.instantiate(prefab_on_load);
                prefab.getComponent('NetErrorDialog').initWithData(alertType, retryCallback, exitCallback);
                prefab.parent = parentNode;

                prefab.setScale(0.1, 0.1);
                prefab.runAction(cc.EaseBounceOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
        }
    }]);

    return DialogMgr;
}(); //end class

module.exports = DialogMgr;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=DialogMgr.js.map
        