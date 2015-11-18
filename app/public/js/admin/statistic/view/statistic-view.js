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
            status: '.js-payment-status'
        },

        onShow: function(){
            console.log(this.model.get('paymentStatus'));
            if (this.model.get('paymentStatus') === true){
                this.ui.status.addClass('b-statistic-personal-info_paid');
            }
        },

        paid: function(){
            if(this.ui.status.hasClass('b-statistic-personal-info_paid')){
                this.ui.status.removeClass('b-statistic-personal-info_paid');
            }
            else{
                this.ui.status.addClass('b-statistic-personal-info_paid');
            }
        }


    });
});
