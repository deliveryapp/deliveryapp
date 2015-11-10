define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        template = require('hbs!../components/user-dish-card/templates/user-dish-card-view');

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