define(function(require, exports, module) {
    var Marionette = require('marionette'),
        WeekUserMenuView = require ('WeekUserMenuView'),
        MainDashboardView = require('hbs!dashboard/view/templates/MainDashboardView');

    module.exports = Marionette.CompositeView.extend({
        template: MainDashboardView,
        WeekUserMenuView: [],
        childView: WeekUserMenuView,
        childViewContainer: '#week-orders',
        childViewOptions: function (/*model*/) {
            //return { collection: model.get("items") };
        }
    });


});