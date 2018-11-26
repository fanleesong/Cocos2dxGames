/**
 * Mp3预下载工具
 */

const {RequestTaskFactory, Task_Type} = require('RequestTaskFactory');
class PreDownloadMp3Util
{
    /**
     *
     * @param audioURLList 预加载音频url数组
     * @param preCompleteCallback 完成回调
     * @param progressCallback
     */
    constructor(audioURLList, preCompleteCallback, progressCallback = null)
    {
        this._preDownloadURLList = audioURLList;
        this._progerssCallback = progressCallback;

        this._currentPreDownloadIndex = 0;

        this._currentPreDownloadSubIndex = 0;
        this._currentPreDownloadAudioList = [];

        this._finishDownloadAudioFilePathList = [];

        this._dirPath =  jsb.fileUtils.getWritablePath() + cc.ss.GlobalConst.AUDIO_CACHE_PATH;
        this._completeCallback = preCompleteCallback;

        this._downloadMp3LocalPathList = [];

        this._currentDownloadCompleteNum = 0;

        this._totalDownloadFileNum = 0;
    }

    startPreDownload()
    {
        this._currentDownloadCompleteNum = 0;
        this._totalDownloadFileNum = 0;

        for (let i in this._preDownloadURLList)
        {
            let audioItem = this._preDownloadURLList[i];
            for (let j in audioItem) { this._totalDownloadFileNum++; }
        }

        this._currentPreDownloadIndex = 0;
        this._requestQuestionAudios();
    }

    _requestQuestionAudios()
    {
        if (this._currentPreDownloadIndex >= this._preDownloadURLList.length) {
            this._completeCallback(this._downloadMp3LocalPathList);
            return;
        }

        this._currentPreDownloadAudioList = this._preDownloadURLList[this._currentPreDownloadIndex];
        this._currentPreDownloadSubIndex = 0;
        this._finishDownloadAudioFilePathList = [];

        this._preDownloadAudios();
    }

    _preDownloadAudios()
    {
        if (this._currentPreDownloadSubIndex >= this._currentPreDownloadAudioList.length) {
            this._downloadMp3LocalPathList.push(this._finishDownloadAudioFilePathList);

            this._currentPreDownloadIndex++;
            this._requestQuestionAudios();
            return;
        }
        let audioURL = this._currentPreDownloadAudioList[this._currentPreDownloadSubIndex];
        let task = RequestTaskFactory.createTask(Task_Type.Audio, audioURL, this._dirPath, (filePath) => {
            this._finishDownloadAudioFilePathList.push(filePath);
            this._currentPreDownloadSubIndex++;
            this._currentDownloadCompleteNum++;
            if (this._progerssCallback) this._progerssCallback(this._currentDownloadCompleteNum, this._totalDownloadFileNum);

            setTimeout(() => {//延时0.05秒移动到开始下一轮
                this._preDownloadAudios();
            }, 50);
        });

        task.doDownload();
    }


}//end class

module.exports = PreDownloadMp3Util;
