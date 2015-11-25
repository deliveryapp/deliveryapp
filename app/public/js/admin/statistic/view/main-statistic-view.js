define(function(require, exports, module) {
    var Marionette = require('marionette'),
        StatisticView = require ('statisticView'),
        MainStatisticView = require('hbs!statistic/view/templates/main-statistic-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainStatisticView,
        childView: StatisticView,
        childViewContainer: '.js-statistic-list',
        childEvents: {
            'payment:status:changed': 'triggerPaymentStatus'
        },
        events: {
            'click .js-statistic-current-week': 'current_week',
            'click .js-statistic-next-week': 'next_week'
        },


        onShow: function() {
            if (this.collection.status === 'getCurrentWeek') {
                $('.js-statistic-current-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-statistic-next-week').removeAttr('disabled');
            }
            else{
                $('.js-statistic-next-week').addClass('b-button-icon-text-disabled').removeClass('b-button-icon-text b-button-icon-text_green');
                $('.js-statistic-current-week').removeAttr('disabled');
            }
        },

        current_week: function(){
            location.href='admin#statistic/current';
        },
        next_week: function(){
            location.href='admin#statistic';
        },

        triggerPaymentStatus: function(data){
            this.trigger('status:changed',data.model.get('_id'));
        }



    });


});