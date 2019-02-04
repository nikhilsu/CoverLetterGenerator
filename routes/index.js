var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/../views/index.html'));
});


app.post('/add', function (request, response) {
    request.assert('position', 'Position is required').notEmpty();
    request.assert('company', 'Company is required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) {
        var coverLetterInfo = {
            position: request.sanitize('position').escape().trim(),
            company: request.sanitize('company').escape().trim(),
        };
        // call Google Apps Script API
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        // request.flash('error', error_msg);
        response.render('store/add', {
            position: request.body.position,
            company: request.body.company,
        })
    }
});


module.exports = app;