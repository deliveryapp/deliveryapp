define(function(require, exports, module) {
    var Marionette = require('marionette'),
        WeekUserMenuView = require ('weekUserMenuView'),
        MainDashboardView = require('hbs!dashboard/view/templates/main-dashboard-view');

    module.exports = Marionette.CompositeView.extend({
        template: MainDashboardView,
        WeekUserMenuView: [],
        childView: WeekUserMenuView,
        childViewContainer: '#week-orders',

        events: {
            'click .js-current-week': 'current_week',
            'click .js-next-week': 'next_week',
            'click .js-edit-week': 'edit_week'
        },

        current_week: function(){
            location.href='user#dashboard';
        },
        next_week: function(){
            location.href='user#dashboard/next';
        },
        edit_week: function(){
            location.href='user#menu';
        },

        onShow: function() {
            if (this.collection.state === 'getCurrentWeek') {
                $('.js-current-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-edit-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-next-week').removeAttr('disabled');
            }
            else{
                $('.js-next-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-edit-week').removeAttr('disabled');
                $('.js-current-week').removeAttr('disabled');
            }


        }
    });


});