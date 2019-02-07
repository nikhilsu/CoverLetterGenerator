const request = require('request');
const queryString = require('querystring');

let googleDriveService = {
    downloadFile: function (generatedFileInfo, httpResponse) {
        var downloadUrl = generatedFileInfo.downloadUrl;
        var fileId = generatedFileInfo.fileCopyId;

        request.get(downloadUrl)
            .on('response', function (_) {
                googleDriveService.deleteFile(fileId, httpResponse)
            })
            .on('error', function (_) {
                httpResponse.render('index', {
                    headlineError: true
                });
            })
            .pipe(httpResponse);
    },

    deleteFile: function (fileId, httpResponse) {
        deleteUrl = 'https://script.google.com/macros/s/AKfycbzXOgqj6a1WxijVwhrPm7uV5coMsZSmaBQPFPVzPO9-SK-LJOz-/exec?';
        params = {'fileId': fileId};
        request.get(deleteUrl + queryString.stringify(params))
            .on('error', function (_) {
                httpResponse.render('index', {
                    headlineError: true
                });
            });
    }
};

module.exports = googleDriveService;