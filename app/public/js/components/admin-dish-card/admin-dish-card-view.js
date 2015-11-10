define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        template = require('hbs!../components/admin-dish-card/templates/admin-dish-card-view');

    module.exports = DishCardView.extend({
        template: template,
        className: 'b-selected-dish',
        events: {
            'click .js-button-remove': 'dishRemoved'
        },

        dishRemoved: function () {
            this.trigger('dish:removed', this.model);
        }
    });
});