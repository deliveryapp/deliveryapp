var fs = require('fs'),
    join = require('path').join,
    express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    config = require('./config'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    app = express();

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'home', layoutsDir: 'app/views/layouts/'}));
app.set('view engine', '.hbs');

var connect = function () {
    mongoose.connect(config.db);
};

var port = process.env.PORT || config.PORT;

connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Bootstrap models
fs.readdirSync(join(__dirname, 'models')).forEach(function (file) {
    if (~file.indexOf('.js')) require(join(__dirname, 'models', file));
});
var Users = mongoose.model('Users');

passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.set('views', __dirname + '/views/');

app.use(express.static(__dirname + '/public'));

// Bootstrap routes
require('./routes')(app);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});