class SceneMgr
{

    static ToGameStore(call = null)
    {
        let sceneName = 'GameStore';
        this.LoadAndJumpToScene(sceneName, call);
    }

    static LoadAndJumpToScene(sceneName, callback = null){
        cc.director.preloadScene(sceneName, (error) => {
            if (error)  {
                console.log(`[SceneMgr]${sceneName} Load Error:${error}`);
                return;
            }
            if (callback) callback();
            cc.director.loadScene(sceneName);
        }) ;
    }

    static setCurrentRunningSceneName (sceneName){
        this._currentRunningSceneName = sceneName;
    }

    static getCurrentRunningSceneName (){
        return this._currentRunningSceneName;
    }

}

module.exports = SceneMgr;