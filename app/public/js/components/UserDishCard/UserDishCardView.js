define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('DishCardView'),
        template = require('hbs!../components/UserDishCard/templates/UserDishCardView');

    module.exports = DishCardView.extend({
        template: template,
        events: {
            'click .remove-user-dish': 'dishRemoved'
        },

        dishRemoved: function () {
            this.trigger('dishRemoved', this.model);
        }
    });
});