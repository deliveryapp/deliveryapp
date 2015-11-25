define(function(require, exports, module){

    module.exports = function(interval) {
        if (_.isNull(interval)) {
            return 'getNextWeek';
        }
        if (_.isEqual(interval, 'current') || _.isEqual(interval, 'nullmark')) {
            return 'getCurrentWeek';
        }
        if (_.isEqual(interval, 'next') || _.isEqual(interval, 'nextmark')) {
            return 'getNextWeek';
        }


        if ( _.isEqual(interval, 'nullmarkmodel')) {
            return 'currentWeekModel';
        }
        if ( _.isEqual(interval, 'nextmarkmodel')) {
            return 'nextWeekModel';
        }
    }

});