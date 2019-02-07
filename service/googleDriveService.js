const request = require('request');
const queryString = require('querystring');

let googleDriveService = {
    respondAsServiceError: function (httpResponse) {
        httpResponse.render('index', {
            headlineError: true
        });
    }, downloadFile: function (generatedFileInfo, httpResponse) {
        var downloadUrl = generatedFileInfo.downloadUrl;
        var fileId = generatedFileInfo.fileCopyId;

        request.get(downloadUrl)
            .on('response', function (response) {
                if (response.statusCode !== 200) {
                    googleDriveService.respondAsServiceError(httpResponse);
                } else {
                    googleDriveService.deleteFile(fileId, httpResponse);
                }
            })
            .on('error', function (_) {
                googleDriveService.respondAsServiceError(httpResponse);
            })
            .pipe(httpResponse);
    }, deleteFile: function (fileId, httpResponse) {
        deleteUrl = 'https://script.google.com/macros/s/AKfycbzXOgqj6a1WxijVwhrPm7uV5coMsZSmaBQPFPVzPO9-SK-LJOz-/exec?';
        params = {'fileId': fileId};
        request.get(deleteUrl + queryString.stringify(params))
            .on('response', function (response) {
                if (response.statusCode !== 200) {
                    googleDriveService.respondAsServiceError(httpResponse);
                }
            })
            .on('error', function (_) {
                googleDriveService.respondAsServiceError(httpResponse);
            });
    }
};

module.exports = googleDriveService;