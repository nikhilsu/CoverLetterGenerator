var express = require('express');
var app = express();

var expressValidator = require('express-validator');
app.use(expressValidator());
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var index = require('./routes/index');
app.use('/', index);


var port = 4000;
app.listen(port, function () {
    console.log('Server running on http://localhost:' + port)
});