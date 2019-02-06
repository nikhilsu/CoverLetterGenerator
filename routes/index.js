var express = require('express');
var appsScriptService = require('../service/appsScriptService');
var googleDriveService = require('../service/googleDriveService');
const httpRequest = require('request');

var app = express();

app.get('/', function (request, response) {
    response.render('index', {success: true, headlineError: false});
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

        appsScriptService.generateCoverLetter(coverLetterInfo)
            .then(function (result) {
                response.contentType('application/pdf');
                var generatedFileInfo = JSON.parse(result);
                googleDriveService.downloadFile(generatedFileInfo, response);
            })
            .catch(function (_) {
                response.render('index', {
                    headlineError: true,
                    success: true,
                    position: request.body.position,
                    company: request.body.company
                });
            });
    } else {
        var error_hash = {};
        errors.forEach(err => error_hash[err.param] = err.msg);
        response.render('index', {
            success: false,
            error: error_hash,
            position: request.body.position,
            company: request.body.company,
        })
    }
});

module.exports = app;