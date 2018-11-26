"use strict";
cc._RF.push(module, '180d95qxlVAtoT1uhqt8wTz', 'RequestTaskFactory');
// scripts/Common/Tool/WebRequest/RequestTaskFactory.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReportPointRequestTask = require('ReportPointRequestTask');
var ApiForumRequestTask = require('ApiForumRequestTask');
var ApiRequestBodyRequestTask = require('ApiRequestBodyRequestTask');
var ImageDownloadTask = require('ImageDownloadTask');
var AudioDownloadTask = require('AudioDownloadTask');

var Task_Type = cc.Enum({
    Api_RequestBody: 0,
    Api_Forum: 1,
    Report: 2,
    Image: 3,
    Audio: 4
});

var RequestTaskFactory = function () {
    function RequestTaskFactory() {
        _classCallCheck(this, RequestTaskFactory);
    }

    _createClass(RequestTaskFactory, null, [{
        key: 'createTask',

        /**
         * 工厂实例类
         * @param taskType
         * @param url
         * @param params
         * @param callback
         * @returns {*}
         */
        value: function createTask(taskType, url) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var callback = arguments[3];

            switch (taskType) {
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
    }]);

    return RequestTaskFactory;
}();

module.exports = {
    RequestTaskFactory: RequestTaskFactory,
    Task_Type: Task_Type
};

cc._RF.pop();