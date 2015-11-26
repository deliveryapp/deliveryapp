define(function(require, exports, module) {
    var Marionette = require('marionette'),
        WeekAdminMenuView = require ('weekAdminMenuView'),
        MainAdminDashboardView = require('hbs!dashboard/view/templates/main-admin-dashboard-view');

    module.exports = Marionette.CompositeView.extend({
        template: MainAdminDashboardView,
        WeekAdminMenuView: [],
        childView: WeekAdminMenuView,
        childViewContainer: '#week-orders',

        events: {
            'click .js-dashboard-current-week': 'current_week',
            'click .js-dashboard-next-week': 'next_week'
        },

        onShow: function() {
            if (this.collection.status === 'getCurrentWeek') {
                $('.js-dashboard-current-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-dashboard-next-week').removeAttr('disabled');
            }
            else{
                $('.js-dashboard-next-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-dashboard-current-week').removeAttr('disabled');
            }
        },
        current_week: function(){
            location.href='admin#dashboard/current';
        },
        next_week: function(){
            location.href='admin#dashboard';
        },



    });
});
