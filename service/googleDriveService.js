const request = require('request');
const queryString = require('querystring');

let googleDriveService = {
    downloadFile: function (generatedFileInfo, httpResponse) {
        var downloadUrl = generatedFileInfo.downloadUrl;
        var fileId = generatedFileInfo.fileCopyId;

        request.get(downloadUrl).on('response', function (_) {
            googleDriveService.deleteFile(fileId)
        }).pipe(httpResponse);
    },

    deleteFile: function (fileId) {
        deleteUrl = 'https://script.google.com/macros/s/AKfycbzXOgqj6a1WxijVwhrPm7uV5coMsZSmaBQPFPVzPO9-SK-LJOz-/exec?';
        params = {'fileId': fileId};
        request.get(deleteUrl + queryString.stringify(params), function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });
    }
};

module.exports = googleDriveService;