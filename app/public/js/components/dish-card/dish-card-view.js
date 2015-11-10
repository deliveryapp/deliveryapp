define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/dish-card/templates/dish-card-view');

    module.exports = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'b-dish',
        template: template,
        events: {
            'click':'dishClicked',
            'click .btn':'dishAdded'
        },

        dishClicked: function () {
            this.trigger('dish:clicked', this.model);
        },

        dishAdded: function () {
            this.trigger('dish:added', this.model);
        },

        initialize: function () {
        }
    });
});