//对话框管理类

class DialogMgr {

    /**
     *
     * 显示分享勋章对话框
     * @param parentNode
     * @param medalId
     */
    static showDisplayMedalDialog(parentNode, medalId) {
        cc.loader.loadRes('prefab/medalList/Prefab_Display_Meda_lDialog', (err, prefab_on_load) => {
            if (err) throw new Error('加载分享对话框错误');

            let prefab = cc.instantiate(prefab_on_load);
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
    static showMedalDialog(parentNode, medalId, isGetMedal, clickCloseCallback = null) {
        cc.loader.loadRes('prefab/medalList/Prefab_Medal_Dialog', (err, prefab_on_load) => {
            if (err) throw new Error('加载勋章对话框错误');

            let prefab = cc.instantiate(prefab_on_load);
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
    static showSettingDialog(parentNode) {
        cc.loader.loadRes('prefab/share/Prefab_Setting', (err, prefab_on_load) => {
            if (err) throw new Error('加载设置提示对话框Prefab错误');

            let prefab = cc.instantiate(prefab_on_load);
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
    static showNetErrorDialog(parentNode, alertType = cc.ss.GlobalConst.NET_ERROR_ALERT_TYPE.ALERT_COMMON, retryCallback = null, exitCallback = null) {
        cc.loader.loadRes('prefab/share/Prefab_Net_Error_Dialog', (err, prefab_on_load) => {
            if (err) throw new Error('加载网络错误对话框Prefab错误');

            let prefab = cc.instantiate(prefab_on_load);
            prefab.getComponent('NetErrorDialog').initWithData(alertType, retryCallback, exitCallback);
            prefab.parent = parentNode;

            prefab.setScale(0.1, 0.1);
            prefab.runAction(cc.EaseBounceOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
        });
    }

}//end class

module.exports = DialogMgr;
