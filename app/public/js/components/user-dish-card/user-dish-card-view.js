define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        template = require('hbs!../components/user-dish-card/templates/user-dish-card-view');

    module.exports = DishCardView.extend({
        template: template,
        className: 'b-selected-dish',
        events: {
            'click .js-button-remove': 'dishRemoved',
            'click .js-button-minus': 'quantityMinus',
            'click .js-button-plus': 'quantityPlus'
        },

        dishRemoved: function () {
            this.trigger('dish:removed', this.model);
        },
        quantityMinus: function () {

            if(this.model.get('quantity')!==1) {
                this.model.set('quantity', this.model.get('quantity')-1);
                this.trigger('quantity:minus', this.model);
                //this.render();

            }

        },
        quantityPlus: function () {
            this.model.set('quantity', this.model.get('quantity')+1);
            //debugger;

            this.trigger('quantity:plus', this.model);
            //this.render();
        }
    });
});