define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/dish-card/templates/dish-card-view');

    module.exports = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'b-dish',
        template: template,
        events: {
            'click':'dishClicked',
            'click .js-button-add':'dishAdded'
        },

        dishAdded: function () {
            this.trigger('dish:added', this.model);
        },

        initialize: function () {
        }
    });
});