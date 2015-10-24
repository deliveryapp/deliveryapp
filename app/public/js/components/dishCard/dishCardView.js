define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/dishCard/templates/dishCardView');

    module.exports = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'selected-dish',
        template: template,
        events: {
            'click':'dishClicked',
            'click .btn':'dishAdded'
        },

        dishClicked: function () {
            this.trigger('dishClicked', this.model);
        },

        dishAdded: function () {
            this.trigger('dishAdded', this.model);
        },

        initialize: function () {
        }
    });
});