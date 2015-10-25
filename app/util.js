var constants = require('./config').constants,
    moment = require('moment');
/**
 *
 * @param {String} date - any date
 * @return {String} nearest monday
 */
exports.getNearestMonday = function (date) {
    return moment(date, constants.DATE_PARSE_FORMAT).startOf('isoWeek').toDate();
};
/**
 *
 * @param date
 * @returns {Array}
 */
exports.getWeekDaysByMonday = function (date) {
    var week = [];

    for (var i = 0; i < 7; i++) {
        week.push(moment(date).add(i, 'days').toDate());
    }

    return week;
};

exports.isLaterThanToday = function (date) {
    var today = moment().valueOf();
    date = moment(date).valueOf();

    return today > date;
};

exports.convertToDate = function (date) {
    return moment(date, constants.DATE_PARSE_FORMAT).toDate();
};

exports.stripUserModel = function (userModel) {
    var user = this.cloneObject(userModel.toJSON());
    delete user.salt;
    delete user.hash;

    return user;
};

exports.cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};