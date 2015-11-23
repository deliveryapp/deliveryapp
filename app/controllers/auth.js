var mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    passport = require('passport');

exports.login = function (req, res){
    res.redirect('/');
};

exports.register = function (req, res) {
    Users.register(new Users({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log('failed to register');
            return res.render('login', {user: user});
        }

        passport.authenticate('local')(req, res, function () {
            res.send(user);
        });
    });
};