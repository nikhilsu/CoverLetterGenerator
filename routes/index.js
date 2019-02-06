var express = require('express');
var appsScriptService = require('../service/appsScriptService');
var googleDriveService = require('../service/googleDriveService');
const httpRequest = require('request');

var app = express();

app.get('/', function (request, response) {
    response.render('index');
});


app.post('/', function (request, response) {
    request.assert('position', 'Position is required').notEmpty();
    request.assert('company', 'Company is required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) {
        var coverLetterInfo = {
            position: request.sanitize('position').escape().trim(),
            company: request.sanitize('company').escape().trim(),
        };
        response.contentType("application/pdf");

        appsScriptService.generateCoverLetter(coverLetterInfo)
            .then(function (result) {
                var generatedFileInfo = JSON.parse(result);
                googleDriveService.downloadFile(generatedFileInfo, response);
            });
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        response.render('index', {
            error: error_msg,
            position: request.body.position,
            company: request.body.company,
        })
    }
});

module.exports = app;