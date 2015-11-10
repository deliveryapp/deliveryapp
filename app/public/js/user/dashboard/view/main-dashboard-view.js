define(function(require, exports, module) {
    var Marionette = require('marionette'),
        WeekUserMenuView = require ('weekUserMenuView'),
        MainDashboardView = require('hbs!dashboard/view/templates/main-dashboard-view');

    module.exports = Marionette.CompositeView.extend({
        template: MainDashboardView,
        WeekUserMenuView: [],
        childView: WeekUserMenuView,
        childViewContainer: '#week-orders'

    });


});