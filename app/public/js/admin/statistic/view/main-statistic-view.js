define(function(require, exports, module) {
    var Marionette = require('marionette'),
        StatisticView = require ('statisticView'),
        MainStatisticView = require('hbs!statistic/view/templates/main-statistic-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainStatisticView,
        childView: StatisticView,
        childViewContainer: '.js-statistic-list'

    });


});