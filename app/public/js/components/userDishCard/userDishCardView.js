define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        template = require('hbs!../components/userDishCard/templates/userDishCardView');

    module.exports = DishCardView.extend({
        template: template,
        className: 'b-selected-dish',
        events: {
            'click .remove-user-dish': 'dishRemoved'
        },

        dishRemoved: function () {
            this.trigger('dish:removed', this.model);
        }
    });
});