var mongoose = require('mongoose'),
    Days = mongoose.model('Days'),
    Dishes = mongoose.model('Dishes'),
    async = require('async'),
    _ = require('lodash');

exports.get = function (req, res) {
    if (!_.isUndefined(req.query.day)) {
        //find by query param ids
        Days.find({
            'day': {$in: req.query.day.split(',')}
        }, function (err, days) {
            if (err) return res.status(400).send(err);

            populateDaysDishes(days, res);
        })
    } else {
        //find all
        Days.find({}, function (err, days) {
            if (err) return res.status(400).send(err);

            populateDaysDishes(days, res);
        });
    }
};

var populateDaysDishes = function (days, res) {
    async.map(days, function (day, callback) {
        async.map(day.dishes, function (dish, callbackNested) {
            Dishes.findById(dish._id, function (err, fullDish) {
                callbackNested(null, fullDish);
            });
        }, function (err, fullDishes) {
            if (err) return res.status(400).send(err);
            var unlinkedDay = day.toJSON();
            unlinkedDay.dishes = fullDishes;
            callback(null, unlinkedDay);
        });
    }, function (err, days) {
        if (err) return res.status(400).send(err);
        return res.send(days);
    });
};

exports.delete = function (req, res) {
    Days.findById(req.params.id, function (err, day) {
        if (err) return res.status(400).send(err);
        day.remove(function (err) {
            if (err) return res.status(400).send(err);
            res.send('OK');
        });
    });
};

exports.post = function (req, res) {
    var day = new Days({
        day: req.body.day,
        dishes: req.body.dishes
    });
    day.save(function (err) {
        if (err) return res.status(400).send(err);

        Days.findById(day, function (err, day) {
            if (err) return res.status(400).send(err);
            res.send(day);
        });
    });
};

exports.put = function (req, res) {
    Days.findById(req.params.id, function (err, day) {
        if (err) return res.status(400).send(err);
        if (day) {
            day.dishes = req.body.dishes;
            day.save(function (err, day) {
                if (err) return res.status(400).send(err);
                res.send(day);
            });
        } else {
            res.status(200).send([]);
        }
    });
};