var fs = require('fs');
var join = require('path').join;
var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();
var bodyParser = require('body-parser');

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'home', layoutsDir: 'app/views/layouts/'}));
app.set('view engine', '.hbs');

var connect = function () {
    mongoose.connect(config.db);
};

var port = process.env.PORT || config.PORT;

//connect();

// Bootstrap models
fs.readdirSync(join(__dirname, 'models')).forEach(function (file) {
    if (~file.indexOf('.js')) require(join(__dirname, 'models', file));
});
app.set('views', __dirname + '/views/');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Bootstrap routes
require('./routes')(app);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});