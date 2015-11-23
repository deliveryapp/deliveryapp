var mongoose = require('mongoose'),
    Weeks = mongoose.model('Weeks'),
    constants = require('../config').constants,
    utils = require('../util'),
    moment = require('moment'),
    _ = require('lodash');

exports.getByDate = function (req, res) {
    var predefinedStartDateStrategies = {
        'current': function () {
            var currentNearestMonday = utils.getNearestMonday(moment(new Date()).format(constants.DATE_PARSE_FORMAT));

            Weeks.findOne({startDate: currentNearestMonday}, function (err, w) {
                if(w === null) {
                    var week = new Weeks({
                        startDate: currentNearestMonday,
                        days: utils.getWeekDaysByMonday(currentNearestMonday)
                    });
                    week.save(function (err) {
                        if (err) return res.status(400).send(err);
                        Weeks.findById(week, function (err, w) {
                            if (err) return res.status(400).send(err);
                            res.send(w);
                        });
                    });
                }
                else{
                    if (err) return res.status(400).send(err);
                    res.send(w);
                }
            });
        },
        'next': function () {
            var currentNearestMonday = utils.getNextMonday(moment(new Date()).format(constants.DATE_PARSE_FORMAT));

            Weeks.findOne({startDate: currentNearestMonday}, function (err, w) {
                if(w === null) {
                    var week = new Weeks({
                        startDate: currentNearestMonday,
                        days: utils.getWeekDaysByMonday(currentNearestMonday)
                    });
                    week.save(function (err) {
                        if (err) return res.status(400).send(err);
                        Weeks.findById(week, function (err, w) {
                            if (err) return res.status(400).send(err);
                            res.send(w);
                        });
                    });
                }
                else{
                    if (err) return res.status(400).send(err);
                    res.send(w);
                }
            });
        }
    };

    if (!_.isUndefined(predefinedStartDateStrategies[req.params.startDate])) {
        predefinedStartDateStrategies[req.params.startDate]();
    } else {
        Weeks.findOne({'startDate': utils.convertToDate(req.params.startDate)}, function (err, weeks) {
            if (err) return res.status(400).send(err);

            res.send(weeks);
        });
    }
};

exports.get = function (req, res) {
    Weeks.find({}, function (err, weeks) {
        if (err) return res.status(400).send(err);

        res.send(weeks);
    });
};

exports.post = function (req, res) {
    /**
     * 1. startDate should be translated to the nearest last monday
     *
     * startDate validation rules:
     *
     * 1. should be later than today;
     * 2. should be according server date parse format
     */

    var monday = utils.getNearestMonday(req.params.startDate);
    if (!utils.isLaterThanToday(monday)) return res.status(400).send('The date must be later than today');

    var week = new Weeks({
        startDate: monday,
        days: utils.getWeekDaysByMonday(monday)
    });
    week.save(function (err) {
        if (err) return res.status(400).send(err);
        Weeks.findById(week, function (err, w) {
            if (err) return res.status(400).send(err);
            res.send(w);
        });
    });
};