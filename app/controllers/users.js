var mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    utils = require('../util'),
    Dishes = mongoose.model('Dishes'),
    async = require('async'),
    _ = require('lodash');

exports.post = function (req, res) {
    res.status(501).send('TBI');
};

exports.get = function (req, res) {
    Users.find({}, function (err, users) {
        if (err) return res.send(err);

        users = users.map(function (user) {
            return utils.stripUserModel(user);
        });

        res.send(users);
    });
};

exports.getById = function (req, res) {
    res.status(501).send('TBI');
};

exports.put = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.send(err);
        async.map(req.body.dishes, function (dish, callback) {
            Dishes.findById(dish, function (errr, dish) {
                callback(null, dish);
            });
        }, function (errN, resultDishes) {
            if (errN) return res.send(errN);
            user.days = user.days || [];
            var updatedModel = {
                day: req.body.day,
                dishes: resultDishes
            };
            _.remove(user.days, function (day) {
                return day.day === updatedModel.day;
            });
            user.days.push(updatedModel);

            user.save(function (errNN, user) {
                if (errNN) return res.send(errNN);
                res.send(user);
            });
        });
    });
};

exports.current = function (req, res) {
    if (!req || !req.user) return res.status('403').send('Unauthorized');
    res.send(utils.stripUserModel(req.user));
};