define(function(require, exports, module) {
    var Marionette = require('marionette'),
        WeekAdminMenuView = require ('weekAdminMenuView'),
        MainAdminDashboardView = require('hbs!dashboard/view/templates/main-admin-dashboard-view');

    module.exports = Marionette.CompositeView.extend({
        template: MainAdminDashboardView,
        WeekAdminMenuView: [],
        childView: WeekAdminMenuView,
        childViewContainer: '#week-orders',

        initialize: function(){
        console.log(this.collection);
            console.log(this.model);
    }


    });
});
