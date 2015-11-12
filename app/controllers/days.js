var mongoose = require('mongoose'),
    Days = mongoose.model('Days'),
    _ = require('lodash');

exports.get = function (req, res) {
    if (!_.isUndefined(req.query.day)) {
        //find by query param ids
        Days.find({
            'day': {$in: req.query.day.split(',')}
        }, function (err, days) {
            if (err) return res.status(400).send(err);

            //TODO: load dishes from id's

            return res.send(days);
        })
    } else {
        //find all
        Days.find({}, function (err, dishes) {
            if (err) return res.status(400).send(err);

            res.send(dishes);
        });
    }
};

exports.delete = function (req, res) {
    Days.findById(req.params.day, function (err, day) {
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
    Days.findById(req.params.day, function (err, day) {
        if (err) return res.status(400).send(err);

        day.dishes = req.body.dishes;

        day.save(function (err, day) {
            if (err) return res.status(400).send(err);
            res.send(day);
        });
    });
};