define(function(require, exports, module) {
    var Marionette = require('marionette'),
        StatisticView = require('hbs!statistic/view/templates/statistic-view');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-statistic-list',
        template: StatisticView,
        events:{
            'click .js-button-paid-status': 'paid'
        },
        ui:{
            status: '.js-payment-status',
            button: '.js-button-paid-status',
            icon: '.js-button-icon'
        },

        onShow: function(){
            if (this.model.get('paymentStatus') === true){
                this.ui.status.addClass('b-statistic-personal-info_paid');
                this.ui.button.addClass('b-button-icon-text_red');
                this.ui.icon.html('close');
            }
            else{
                this.ui.button.addClass('b-button-icon-text_green');
                this.ui.icon.html('done');
            }
        },

        paid: function(){
            this.trigger('payment:status:changed', this.model.get('_id'));

            if (this.ui.button.hasClass('b-button-icon-text_green')){
                this.ui.button.removeClass('b-button-icon-text_green');
                this.ui.button.addClass('b-button-icon-text_red');
                this.ui.icon.html('close');
                this.ui.status.addClass('b-statistic-personal-info_paid');
            }
            else{
                this.ui.button.removeClass('b-button-icon-text_red');
                this.ui.button.addClass('b-button-icon-text_green');
                this.ui.icon.html('done');
                this.ui.status.removeClass('b-statistic-personal-info_paid');
            }

        }


    });
});
