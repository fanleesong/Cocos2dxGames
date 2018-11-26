const ReportPointRequestTask = require('ReportPointRequestTask');
const ApiForumRequestTask = require('ApiForumRequestTask');
const ApiRequestBodyRequestTask = require('ApiRequestBodyRequestTask');
const ImageDownloadTask = require('ImageDownloadTask');
const AudioDownloadTask = require('AudioDownloadTask');

const Task_Type = cc.Enum({
    Api_RequestBody : 0,
    Api_Forum : 1,
    Report : 2,
    Image : 3,
    Audio : 4
});

class RequestTaskFactory {
    /**
     * 工厂实例类
     * @param taskType
     * @param url
     * @param params
     * @param callback
     * @returns {*}
     */
    static createTask(taskType, url, params = null, callback)
    {
        switch (taskType)
        {
            case Task_Type.Api_RequestBody:
                return new ApiRequestBodyRequestTask(url, params, callback);
            case Task_Type.Api_Forum:
                return new ApiForumRequestTask(url, params, callback);
            case Task_Type.Report:
                return new ReportPointRequestTask(url, params, callback);
            case Task_Type.Image:
                return new ImageDownloadTask(url, params, callback);
            case Task_Type.Audio:
                return new AudioDownloadTask(url, params, callback);
            default:
                throw new Error('Task Type Error');
        }
    }
}

module.exports = {
    RequestTaskFactory : RequestTaskFactory,
    Task_Type : Task_Type
};
