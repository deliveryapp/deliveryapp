var mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    utils = require('../util'),
    Dishes = mongoose.model('Dishes'),
    async = require('async'),
    _ = require('lodash'),
    passport = require('passport');

exports.post = function (req, res) {
    if ([
            req.body,
            req.body.firstName,
            req.body.lastName,
            req.body.image_path,
            req.body.mail,
            req.body.role
        ].some(_.isUndefined)) {
        return res.status(400).send('Invalid user data');
    }
    var user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image_path: req.body.image_path,
        mail: req.body.mail,
        role: req.body.role
    });
    Users.register(user, req.body.password, function (err, user) {
        if (err) return res.status(400).send(err.message);

        passport.authenticate('local')(req, res, function () {
            res.send(user);
        });
    });
};

exports.get = function (req, res) {
    Users.find({}, function (err, users) {
        if (err) return res.status(400).send(err.message);

        users = users.map(function (user) {
            return utils.stripUserModel(user);
        });

        res.send(users);
    });
};

exports.getById = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.status(400).send(err);

        return res.send(user);
    });
};

exports.put = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.status(400).send(err);

        _.extend(user, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            image_path: req.body.image_path,
            mail: req.body.mail,
            role: req.body.role
        });

        user.save(function (err, user) {
            if (err) return res.status(400).send(err);
            res.send(user);
        });
    });
};

exports.current = function (req, res) {
    if (!req || !req.user) return res.status(400).send('Unauthorized');

    res.send(utils.stripUserModel(req.user));
};

exports.delete = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.status(400).send(err);

        user.remove(function (err) {
            if (err) return res.status(400).send(err);
            res.send('OK');
        });
    });
};