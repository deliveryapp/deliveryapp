define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/DishCard/templates/DishCardView');

    module.exports = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'selected-dish',
        template: template,
        events: {
            'click':'dishClicked'
        },

        dishClicked: function () {
            this.trigger('dishClicked', this.model);
        },

        initialize: function () {

        }
    });
});